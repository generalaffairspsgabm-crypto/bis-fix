---
name: azure-ai-agents-persistent-dotnet
description: Gunakan saat membangun agent persisten di Azure AI Foundry memakai SDK .NET level rendah, termasuk agent, thread, message, run, streaming, function calling, file, dan vector store.
license: Complete terms in LICENSE.txt
metadata:
  category: ai-development
  source:
    repository: https://github.com/antiwork/antigravity-skills
    path: skills/azure-ai-agents-persistent-dotnet
  language: id
  sdk: Azure.AI.Agents.Persistent
  runtime: dotnet
---

# Azure AI Agents Persistent .NET

Gunakan skill ini saat perlu mengimplementasikan agent persisten berbasis Azure AI Foundry Projects dengan SDK [.NET](https://learn.microsoft.com/dotnet/).

## Kapan digunakan

Gunakan saat pekerjaan mencakup salah satu kebutuhan berikut:
- Membuat agent persisten yang dapat dipakai ulang lintas sesi.
- Mengelola thread, message, dan run secara eksplisit.
- Menangani polling status run, streaming token, atau `requires_action`.
- Menghubungkan tool seperti code interpreter, function calling, file search, atau vector store.
- Menulis contoh integrasi backend .NET untuk Azure AI Foundry.

## Dependensi inti

Instal paket berikut:

```bash
dotnet add package Azure.AI.Agents.Persistent --prerelease
dotnet add package Azure.Identity
```

Variabel lingkungan yang umum dipakai:

```bash
PROJECT_ENDPOINT=https://<resource>.services.ai.azure.com/api/projects/<project>
MODEL_DEPLOYMENT_NAME=gpt-4o-mini
AZURE_BING_CONNECTION_ID=<resource-id-koneksi-bing>
AZURE_AI_SEARCH_CONNECTION_ID=<resource-id-koneksi-search>
```

## Autentikasi dasar

Gunakan `DefaultAzureCredential` sebagai default:

```csharp
using Azure.AI.Agents.Persistent;
using Azure.Identity;

var endpoint = Environment.GetEnvironmentVariable("PROJECT_ENDPOINT");
PersistentAgentsClient client = new(endpoint, new DefaultAzureCredential());
```

Pastikan endpoint mengarah ke Azure AI Project, bukan endpoint OpenAI biasa.

## Model mental SDK

Struktur client utama:

- `Administration`: CRUD agent.
- `Threads`: membuat dan menghapus thread percakapan.
- `Messages`: menambah dan membaca pesan.
- `Runs`: mengeksekusi agent, polling, streaming, submit tool output.
- `Files`: upload file untuk kebutuhan agent.
- `VectorStores`: membuat knowledge store untuk file search.

## Alur kerja standar

### 1. Buat agent

```csharp
var model = Environment.GetEnvironmentVariable("MODEL_DEPLOYMENT_NAME");

PersistentAgent agent = await client.Administration.CreateAgentAsync(
    model: model,
    name: "Math Tutor",
    instructions: "Bantu pengguna menyelesaikan soal matematika secara bertahap.",
    tools: [new CodeInterpreterToolDefinition()]
);
```

Gunakan instruksi yang spesifik dan pilih tool sesedikit mungkin agar perilaku agent tetap terkontrol.

### 2. Buat thread dan kirim pesan pengguna

```csharp
PersistentAgentThread thread = await client.Threads.CreateThreadAsync();

await client.Messages.CreateMessageAsync(
    thread.Id,
    MessageRole.User,
    "Tolong bantu selesaikan persamaan 3x + 11 = 14"
);
```

Pisahkan thread per percakapan atau per unit kerja agar histori tetap jelas.

### 3. Jalankan agent dengan polling

```csharp
ThreadRun run = await client.Runs.CreateRunAsync(
    thread.Id,
    agent.Id,
    additionalInstructions: "Jawab ringkas dan gunakan bahasa Indonesia."
);

do
{
    await Task.Delay(TimeSpan.FromMilliseconds(500));
    run = await client.Runs.GetRunAsync(thread.Id, run.Id);
}
while (run.Status == RunStatus.Queued || run.Status == RunStatus.InProgress);
```

Setelah selesai, baca pesan hasil:

```csharp
await foreach (PersistentThreadMessage message in client.Messages.GetMessagesAsync(
    threadId: thread.Id,
    order: ListSortOrder.Ascending))
{
    Console.Write($"{message.Role}: ");
    foreach (MessageContent content in message.ContentItems)
    {
        if (content is MessageTextContent text)
            Console.WriteLine(text.Text);
    }
}
```

## Streaming

Gunakan streaming bila UI perlu menampilkan output bertahap:

```csharp
AsyncCollectionResult<StreamingUpdate> stream = client.Runs.CreateRunStreamingAsync(
    thread.Id,
    agent.Id
);

await foreach (StreamingUpdate update in stream)
{
    if (update.UpdateKind == StreamingUpdateReason.RunCreated)
        Console.WriteLine("run dimulai");
    else if (update is MessageContentUpdate contentUpdate)
        Console.Write(contentUpdate.Text);
    else if (update.UpdateKind == StreamingUpdateReason.RunCompleted)
        Console.WriteLine("\nrun selesai");
}
```

## Function calling

Saat status run menjadi `RequiresAction`, baca tool call lalu submit hasilnya kembali:

```csharp
FunctionToolDefinition weatherTool = new(
    name: "getCurrentWeather",
    description: "Mengambil cuaca saat ini berdasarkan lokasi.",
    parameters: BinaryData.FromObjectAsJson(new
    {
        Type = "object",
        Properties = new
        {
            Location = new { Type = "string", Description = "Kota dan negara/provinsi" },
            Unit = new { Type = "string", Enum = new[] { "c", "f" } }
        },
        Required = new[] { "location" }
    }, new JsonSerializerOptions { PropertyNamingPolicy = JsonNamingPolicy.CamelCase })
);
```

Loop penanganan tool:

```csharp
do
{
    await Task.Delay(500);
    run = await client.Runs.GetRunAsync(thread.Id, run.Id);

    if (run.Status == RunStatus.RequiresAction &&
        run.RequiredAction is SubmitToolOutputsAction submitAction)
    {
        List<ToolOutput> outputs = [];

        foreach (RequiredToolCall toolCall in submitAction.ToolCalls)
        {
            if (toolCall is RequiredFunctionToolCall funcCall)
            {
                string result = ExecuteFunction(funcCall.Name, funcCall.Arguments);
                outputs.Add(new ToolOutput(toolCall, result));
            }
        }

        run = await client.Runs.SubmitToolOutputsToRunAsync(run, outputs, toolApprovals: null);
    }
}
while (run.Status == RunStatus.Queued || run.Status == RunStatus.InProgress);
```

## File search dan vector store

Gunakan pola ini untuk grounding dokumen:

```csharp
PersistentAgentFileInfo file = await client.Files.UploadFileAsync(
    filePath: "document.txt",
    purpose: PersistentAgentFilePurpose.Agents
);

PersistentAgentsVectorStore vectorStore = await client.VectorStores.CreateVectorStoreAsync(
    fileIds: [file.Id],
    name: "knowledge-store"
);

FileSearchToolResource fileSearchResource = new();
fileSearchResource.VectorStoreIds.Add(vectorStore.Id);

PersistentAgent agent = await client.Administration.CreateAgentAsync(
    model: model,
    name: "Document Assistant",
    instructions: "Jawab pertanyaan berdasarkan dokumen yang tersedia.",
    tools: [new FileSearchToolDefinition()],
    toolResources: new ToolResources { FileSearch = fileSearchResource }
);
```

## Praktik implementasi yang disarankan

- Gunakan satu thread untuk satu konteks percakapan yang konsisten.
- Simpan `agent.Id`, `thread.Id`, dan `run.Id` bila perlu melanjutkan proses di request berikutnya.
- Tangani status selain sukses: `Failed`, `Cancelled`, `Expired`, dan `RequiresAction`.
- Tambahkan timeout aplikasi sendiri; jangan polling tanpa batas.
- Bersihkan file, vector store, thread, atau agent sementara bila tidak lagi dipakai.
- Pisahkan definisi tool function dari handler bisnis agar mudah diuji.

## Checklist debugging cepat

Jika run tidak selesai atau hasil kosong, cek urutan berikut:
1. `PROJECT_ENDPOINT` benar-benar endpoint project.
2. Deployment model tersedia dan nama deployment benar.
3. Kredensial memiliki izin ke project.
4. Tool output dikirim kembali saat status `RequiresAction`.
5. File sudah terunggah dengan purpose yang benar.
6. Vector store sudah terhubung ke `toolResources` agent.

## Batasan penting

- SDK ini bersifat level rendah; orchestration, retry, timeout, dan observability perlu ditangani aplikasi.
- Beberapa fitur dapat berubah antar versi preview.
- Jangan mengandalkan contoh versi lama tanpa mengecek signature SDK yang terpasang.

## Hasil yang diharapkan

Setelah mengikuti skill ini, implementasi .NET seharusnya mampu:
- membuat agent persisten,
- menjalankan percakapan berbasis thread,
- menangani streaming dan function calling,
- serta menambahkan grounding dokumen melalui file search dan vector store.
