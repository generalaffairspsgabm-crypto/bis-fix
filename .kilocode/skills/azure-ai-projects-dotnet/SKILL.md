---
name: azure-ai-projects-dotnet
description: Gunakan saat membangun aplikasi Azure AI Foundry dari .NET memakai Azure AI Projects SDK, termasuk agents, connections, datasets, deployments, evaluations, indexes, dan akses ke persistent agents client.
---

# Azure AI Projects SDK untuk .NET

Skill ini dipakai saat perlu mengelola resource Azure AI Foundry project dari .NET melalui [`AIProjectClient`](https://learn.microsoft.com/dotnet/api/azure.ai.projects.aiprojectclient), termasuk orkestrasi agent, koneksi resource, dataset, deployment model, evaluasi, dan index pencarian.

## Kapan digunakan

Gunakan skill ini ketika pekerjaan mencakup:

- Membuat atau mengelola Azure AI Foundry project client.
- Mengakses persistent agents atau versioned agents.
- Mengelola connection, deployment, dataset, atau index.
- Menjalankan evaluasi atau menyiapkan telemetry proyek.
- Menghubungkan project dengan Azure AI Search atau OpenAI response client.

## Dependensi

Instal paket utama:

```bash
dotnet add package Azure.AI.Projects
dotnet add package Azure.Identity
```

Opsional:

```bash
dotnet add package Azure.AI.Projects.OpenAI --prerelease
dotnet add package Azure.AI.Agents.Persistent --prerelease
```

## Variabel lingkungan

```bash
PROJECT_ENDPOINT=https://<resource>.services.ai.azure.com/api/projects/<project>
MODEL_DEPLOYMENT_NAME=gpt-4o-mini
CONNECTION_NAME=<connection-name>
AI_SEARCH_CONNECTION_NAME=<ai-search-connection>
```

## Autentikasi

```csharp
using Azure.Identity;
using Azure.AI.Projects;

string endpoint = Environment.GetEnvironmentVariable("PROJECT_ENDPOINT")!;
AIProjectClient projectClient = new(
    new Uri(endpoint),
    new DefaultAzureCredential());
```

## Struktur client

Pahami operasi utama pada [`AIProjectClient`](https://learn.microsoft.com/dotnet/api/azure.ai.projects.aiprojectclient):

- `Agents`
- `Connections`
- `Datasets`
- `Deployments`
- `Evaluations`
- `Evaluators`
- `Indexes`
- `Telemetry`
- `OpenAI`
- [`GetPersistentAgentsClient()`](https://learn.microsoft.com/dotnet/api/azure.ai.projects.aiprojectclient.getpersistentagentsclient)

## Workflow inti

### 1. Persistent agents client

Gunakan client ini untuk operasi agent level rendah: agent, thread, message, dan run.

```csharp
using Azure.AI.Agents.Persistent;

PersistentAgentsClient agentsClient = projectClient.GetPersistentAgentsClient();

PersistentAgent agent = await agentsClient.Administration.CreateAgentAsync(
    model: "gpt-4o-mini",
    name: "Math Tutor",
    instructions: "You are a personal math tutor.");

PersistentAgentThread thread = await agentsClient.Threads.CreateThreadAsync();
await agentsClient.Messages.CreateMessageAsync(thread.Id, MessageRole.User, "Solve 3x + 11 = 14");
ThreadRun run = await agentsClient.Runs.CreateRunAsync(thread.Id, agent.Id);

do
{
    await Task.Delay(500);
    run = await agentsClient.Runs.GetRunAsync(thread.Id, run.Id);
}
while (run.Status == RunStatus.Queued || run.Status == RunStatus.InProgress);

await foreach (var msg in agentsClient.Messages.GetMessagesAsync(thread.Id))
{
    foreach (var content in msg.ContentItems)
    {
        if (content is MessageTextContent textContent)
            Console.WriteLine(textContent.Text);
    }
}

await agentsClient.Threads.DeleteThreadAsync(thread.Id);
await agentsClient.Administration.DeleteAgentAsync(agent.Id);
```

### 2. Versioned agents dengan tools

Gunakan paket preview bila perlu agent versioning dan tool modern.

```csharp
using Azure.AI.Projects.OpenAI;

PromptAgentDefinition agentDefinition = new(model: "gpt-4o-mini")
{
    Instructions = "You are a helpful assistant that can search the web",
    Tools =
    {
        ResponseTool.CreateWebSearchTool(
            userLocation: WebSearchToolLocation.CreateApproximateLocation(
                country: "US",
                city: "Seattle",
                region: "Washington"))
    }
};

AgentVersion agentVersion = await projectClient.Agents.CreateAgentVersionAsync(
    agentName: "myAgent",
    options: new(agentDefinition));

ProjectResponsesClient responseClient = projectClient.OpenAI.GetProjectResponsesClientForAgent(agentVersion.Name);
ResponseResult response = responseClient.CreateResponse("What's the weather in Seattle?");
Console.WriteLine(response.GetOutputText());

projectClient.Agents.DeleteAgentVersion(agentName: agentVersion.Name, agentVersion: agentVersion.Version);
```

### 3. Connections

```csharp
foreach (AIProjectConnection connection in projectClient.Connections.GetConnections())
{
    Console.WriteLine($"{connection.Name}: {connection.ConnectionType}");
}

AIProjectConnection conn = projectClient.Connections.GetConnection(
    Environment.GetEnvironmentVariable("CONNECTION_NAME")!,
    includeCredentials: true);

AIProjectConnection defaultConn = projectClient.Connections.GetDefaultConnection(includeCredentials: false);
```

### 4. Deployments

```csharp
foreach (AIProjectDeployment deployment in projectClient.Deployments.GetDeployments())
{
    Console.WriteLine($"{deployment.Name}: {deployment.ModelName}");
}

foreach (var deployment in projectClient.Deployments.GetDeployments(modelPublisher: "Microsoft"))
{
    Console.WriteLine(deployment.Name);
}

ModelDeployment details = (ModelDeployment)projectClient.Deployments.GetDeployment("gpt-4o-mini");
```

### 5. Datasets

```csharp
FileDataset fileDataset = projectClient.Datasets.UploadFile(
    name: "my-dataset",
    version: "1.0",
    filePath: "data/training.txt",
    connectionName: Environment.GetEnvironmentVariable("CONNECTION_NAME")!);

FolderDataset folderDataset = projectClient.Datasets.UploadFolder(
    name: "my-dataset",
    version: "2.0",
    folderPath: "data/training",
    connectionName: Environment.GetEnvironmentVariable("CONNECTION_NAME")!,
    filePattern: new System.Text.RegularExpressions.Regex(".*\\.txt"));

AIProjectDataset dataset = projectClient.Datasets.GetDataset("my-dataset", "1.0");
projectClient.Datasets.Delete("my-dataset", "1.0");
```

### 6. Indexes

```csharp
AzureAISearchIndex searchIndex = new(
    Environment.GetEnvironmentVariable("AI_SEARCH_CONNECTION_NAME")!,
    "my-search-index")
{
    Description = "Sample Index"
};

searchIndex = (AzureAISearchIndex)projectClient.Indexes.CreateOrUpdate(
    name: "my-index",
    version: "1.0",
    index: searchIndex);

foreach (AIProjectIndex index in projectClient.Indexes.GetIndexes())
{
    Console.WriteLine($"{index.Name}:{index.Version}");
}
```

## Praktik kerja yang disarankan

1. Gunakan [`DefaultAzureCredential`](https://learn.microsoft.com/dotnet/api/azure.identity.defaultazurecredential) agar kode konsisten lintas lokal dan cloud.
2. Pisahkan operasi project-level dan agent-level agar boundary tanggung jawab jelas.
3. Hapus thread, agent, dan dataset sementara setelah pengujian untuk mencegah resource menumpuk.
4. Simpan nama connection dan deployment di konfigurasi aplikasi.
5. Gunakan preview package hanya bila fitur GA belum mencukupi.
6. Audit versi SDK karena surface API preview dapat berubah.

## Checklist implementasi

- Verifikasi [`PROJECT_ENDPOINT`](https://learn.microsoft.com/azure/ai-foundry/) mengarah ke project yang benar.
- Verifikasi identitas memiliki izin ke project dan resource terkait.
- Verifikasi connection yang dipakai memang tersedia di project.
- Verifikasi deployment model ada sebelum membuat agent atau response.
- Verifikasi cleanup resource sementara setelah test selesai.

## Batasan penting

- Fitur versioned agents dan beberapa integrasi OpenAI masih dapat berada pada status preview.
- Operasi dataset dan index sering bergantung pada connection eksternal yang sudah dikonfigurasi di project.
- Persistent agents client dan project agents memiliki abstraksi berbeda; pilih salah satu sesuai kebutuhan kontrol.

## Referensi mandiri

- Dokumentasi Azure AI Projects .NET: https://learn.microsoft.com/dotnet/api/overview/azure/ai.projects-readme
- Dokumentasi Azure AI Foundry: https://learn.microsoft.com/azure/ai-foundry/
- Dokumentasi Azure Identity .NET: https://learn.microsoft.com/dotnet/api/azure.identity.defaultazurecredential
