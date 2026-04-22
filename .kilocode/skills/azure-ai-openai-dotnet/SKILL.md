---
name: azure-ai-openai-dotnet
description: Gunakan saat membangun integrasi Azure OpenAI atau OpenAI dari .NET, termasuk chat completion, streaming, structured output JSON schema, embeddings, image, audio, dan assistant client.
---

# Azure OpenAI SDK untuk .NET

Skill ini dipakai saat perlu memakai paket [`Azure.AI.OpenAI`](https://learn.microsoft.com/dotnet/api/overview/azure/ai.openai-readme) atau kompatibilitas [`OpenAI`](https://www.nuget.org/packages/OpenAI/) di aplikasi .NET untuk mengakses deployment Azure OpenAI, menjalankan percakapan multi-turn, menghasilkan output terstruktur, atau memakai kapabilitas multimodal.

## Kapan digunakan

Gunakan skill ini ketika pekerjaan mencakup:

- Integrasi chat completion sinkron atau asinkron.
- Streaming token atau partial response.
- Structured output berbasis JSON schema.
- Reasoning model seperti `o1` atau `o4-mini`.
- Embeddings, image generation, audio transcription, atau assistant client.
- Migrasi dari OpenAI SDK umum ke endpoint Azure OpenAI.

## Dependensi

Instal paket utama:

```bash
dotnet add package Azure.AI.OpenAI
dotnet add package Azure.Identity
```

Jika perlu kompatibilitas langsung dengan SDK OpenAI:

```bash
dotnet add package OpenAI
```

## Variabel lingkungan

```bash
AZURE_OPENAI_ENDPOINT=https://<resource-name>.openai.azure.com
AZURE_OPENAI_API_KEY=<api-key>
AZURE_OPENAI_DEPLOYMENT_NAME=gpt-4o-mini
```

## Hierarki client

Pahami pola client berikut agar pemilihan API konsisten:

- [`AzureOpenAIClient`](https://learn.microsoft.com/dotnet/api/azure.ai.openai.azureopenaiclient) sebagai client utama.
- [`GetChatClient()`](https://learn.microsoft.com/dotnet/api/azure.ai.openai.azureopenaiclient.getchatclient) untuk chat.
- [`GetEmbeddingClient()`](https://learn.microsoft.com/dotnet/api/azure.ai.openai.azureopenaiclient.getembeddingclient) untuk embeddings.
- [`GetImageClient()`](https://learn.microsoft.com/dotnet/api/azure.ai.openai.azureopenaiclient.getimageclient) untuk image.
- [`GetAudioClient()`](https://learn.microsoft.com/dotnet/api/azure.ai.openai.azureopenaiclient.getaudioclient) untuk audio.
- [`GetAssistantClient()`](https://learn.microsoft.com/dotnet/api/azure.ai.openai.azureopenaiclient.getassistantclient) untuk assistant.

## Autentikasi

### API key

```csharp
using Azure;
using Azure.AI.OpenAI;

AzureOpenAIClient client = new(
    new Uri(Environment.GetEnvironmentVariable("AZURE_OPENAI_ENDPOINT")!),
    new AzureKeyCredential(Environment.GetEnvironmentVariable("AZURE_OPENAI_API_KEY")!));
```

### Microsoft Entra ID

Gunakan ini sebagai default untuk produksi.

```csharp
using Azure.Identity;
using Azure.AI.OpenAI;

AzureOpenAIClient client = new(
    new Uri(Environment.GetEnvironmentVariable("AZURE_OPENAI_ENDPOINT")!),
    new DefaultAzureCredential());
```

### OpenAI SDK langsung ke Azure

Gunakan hanya bila proyek sudah distandardisasi pada paket [`OpenAI`](https://www.nuget.org/packages/OpenAI/).

```csharp
using Azure.Identity;
using OpenAI;
using OpenAI.Chat;
using System.ClientModel.Primitives;

#pragma warning disable OPENAI001

BearerTokenPolicy tokenPolicy = new(
    new DefaultAzureCredential(),
    "https://cognitiveservices.azure.com/.default");

ChatClient client = new(
    model: "gpt-4o-mini",
    authenticationPolicy: tokenPolicy,
    options: new OpenAIClientOptions
    {
        Endpoint = new Uri("https://YOUR-RESOURCE.openai.azure.com/openai/v1")
    });
```

## Workflow inti

### 1. Chat dasar

```csharp
using Azure.AI.OpenAI;
using OpenAI.Chat;

AzureOpenAIClient azureClient = new(
    new Uri(Environment.GetEnvironmentVariable("AZURE_OPENAI_ENDPOINT")!),
    new DefaultAzureCredential());

ChatClient chatClient = azureClient.GetChatClient(
    Environment.GetEnvironmentVariable("AZURE_OPENAI_DEPLOYMENT_NAME")!);

ChatCompletion completion = chatClient.CompleteChat(
[
    new SystemChatMessage("You are a helpful assistant."),
    new UserChatMessage("What is Azure OpenAI?")
]);

Console.WriteLine(completion.Content[0].Text);
```

### 2. Chat async dengan metrik token

```csharp
ChatCompletion completion = await chatClient.CompleteChatAsync(
[
    new SystemChatMessage("You are a helpful assistant."),
    new UserChatMessage("Explain cloud computing in simple terms.")
]);

Console.WriteLine(completion.Content[0].Text);
Console.WriteLine(completion.Usage.TotalTokenCount);
```

### 3. Streaming

```csharp
await foreach (StreamingChatCompletionUpdate update in chatClient.CompleteChatStreamingAsync(messages))
{
    if (update.ContentUpdate.Count > 0)
    {
        Console.Write(update.ContentUpdate[0].Text);
    }
}
```

### 4. Opsi generasi

```csharp
ChatCompletionOptions options = new()
{
    MaxOutputTokenCount = 1000,
    Temperature = 0.7f,
    TopP = 0.95f,
    FrequencyPenalty = 0,
    PresencePenalty = 0,
};

ChatCompletion completion = await chatClient.CompleteChatAsync(messages, options);
```

### 5. Percakapan multi-turn

```csharp
List<ChatMessage> messages = new()
{
    new SystemChatMessage("You are a helpful assistant."),
    new UserChatMessage("Hi, can you help me?"),
    new AssistantChatMessage("Of course! What do you need help with?"),
    new UserChatMessage("What's the capital of France?")
};

ChatCompletion completion = await chatClient.CompleteChatAsync(messages);
messages.Add(new AssistantChatMessage(completion.Content[0].Text));
```

### 6. Structured output JSON schema

Gunakan [`ChatResponseFormat.CreateJsonSchemaFormat()`](https://learn.microsoft.com/dotnet/api/openai.chat.chatresponseformat.createjsonschemaformat) saat output harus dapat diparse secara deterministik.

```csharp
using System.Text.Json;

ChatCompletionOptions options = new()
{
    ResponseFormat = ChatResponseFormat.CreateJsonSchemaFormat(
        jsonSchemaFormatName: "math_reasoning",
        jsonSchema: BinaryData.FromBytes("""
            {
              "type": "object",
              "properties": {
                "steps": {
                  "type": "array",
                  "items": {
                    "type": "object",
                    "properties": {
                      "explanation": { "type": "string" },
                      "output": { "type": "string" }
                    },
                    "required": ["explanation", "output"],
                    "additionalProperties": false
                  }
                },
                "final_answer": { "type": "string" }
              },
              "required": ["steps", "final_answer"],
              "additionalProperties": false
            }
            """u8.ToArray()),
        jsonSchemaIsStrict: true)
};

ChatCompletion completion = await chatClient.CompleteChatAsync(
    [new UserChatMessage("How can I solve 8x + 7 = -23?")],
    options);

using JsonDocument json = JsonDocument.Parse(completion.Content[0].Text);
Console.WriteLine(json.RootElement.GetProperty("final_answer"));
```

### 7. Reasoning model

```csharp
ChatCompletionOptions options = new()
{
    ReasoningEffortLevel = ChatReasoningEffortLevel.Low,
    MaxOutputTokenCount = 100000,
};

ChatCompletion completion = await chatClient.CompleteChatAsync(messages, options);
```

## Praktik kerja yang disarankan

1. Gunakan [`DefaultAzureCredential`](https://learn.microsoft.com/dotnet/api/azure.identity.defaultazurecredential) untuk produksi dan CI.
2. Simpan nama deployment di konfigurasi, bukan hardcode di banyak service.
3. Gunakan structured output untuk kontrak data yang harus stabil.
4. Gunakan streaming untuk UX interaktif dan response panjang.
5. Pisahkan system prompt, user prompt, dan schema output agar mudah diuji.
6. Catat penggunaan token dari properti [`Usage`](https://learn.microsoft.com/dotnet/api/openai.chat.chatcompletion.usage) untuk observabilitas biaya.

## Checklist implementasi

- Verifikasi deployment Azure OpenAI benar-benar ada dan cocok dengan jenis model.
- Verifikasi endpoint memakai domain resource Azure yang benar.
- Verifikasi autentikasi berhasil sebelum menguji prompt kompleks.
- Verifikasi schema JSON strict bila output akan diparse downstream.
- Verifikasi fallback error handling untuk rate limit dan content filter.

## Batasan penting

- Nama deployment Azure tidak selalu sama dengan nama model dasar.
- Beberapa fitur preview atau reasoning model mungkin memerlukan versi SDK tertentu.
- Paket [`OpenAI`](https://www.nuget.org/packages/OpenAI/) dan [`Azure.AI.OpenAI`](https://www.nuget.org/packages/Azure.AI.OpenAI/) memiliki surface API berbeda; jangan campur pola tanpa alasan jelas.

## Referensi mandiri

- Dokumentasi Azure OpenAI .NET: https://learn.microsoft.com/dotnet/api/overview/azure/ai.openai-readme
- Dokumentasi autentikasi Azure Identity: https://learn.microsoft.com/dotnet/api/azure.identity.defaultazurecredential
- Dokumentasi structured outputs OpenAI/Azure OpenAI: https://learn.microsoft.com/azure/ai-services/openai/how-to/structured-outputs
