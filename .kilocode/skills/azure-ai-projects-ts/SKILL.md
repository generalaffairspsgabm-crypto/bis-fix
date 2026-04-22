---
name: azure-ai-projects-ts
description: Gunakan saat membangun aplikasi Azure AI Foundry dengan SDK TypeScript, termasuk agents, connections, deployments, datasets, indexes, evaluators, memory stores, dan integrasi OpenAI client proyek.
---

# Azure AI Projects SDK untuk TypeScript

Skill ini dipakai saat perlu mengelola Azure AI Foundry project dari TypeScript atau Node.js melalui [`AIProjectClient`](https://learn.microsoft.com/javascript/api/overview/azure/ai-projects-readme), termasuk agent, deployment, dataset, connection, index, dan integrasi OpenAI client yang diturunkan dari project.

## Kapan digunakan

Gunakan skill ini ketika pekerjaan mencakup:

- Membuat atau mengelola agent di Azure AI Foundry.
- Mengakses OpenAI client dari konteks project.
- Mengelola connection, deployment, dataset, atau index.
- Menggunakan tool agent seperti code interpreter, file search, web search, function tool, atau MCP.
- Mengelola memory store agent.

## Dependensi

```bash
npm install @azure/ai-projects @azure/identity
```

Untuk tracing:

```bash
npm install @azure/monitor-opentelemetry @opentelemetry/api
```

## Variabel lingkungan

```bash
AZURE_AI_PROJECT_ENDPOINT=https://<resource>.services.ai.azure.com/api/projects/<project>
MODEL_DEPLOYMENT_NAME=gpt-4o
```

## Autentikasi

```typescript
import { AIProjectClient } from "@azure/ai-projects";
import { DefaultAzureCredential } from "@azure/identity";

const client = new AIProjectClient(
  process.env.AZURE_AI_PROJECT_ENDPOINT!,
  new DefaultAzureCredential()
);
```

## Operation groups

Kelompok operasi yang umum dipakai:

- `client.agents`
- `client.connections`
- `client.deployments`
- `client.datasets`
- `client.indexes`
- `client.evaluators`
- `client.memoryStores`

## Workflow inti

### 1. Ambil OpenAI client dari project

Gunakan ini bila ingin memakai response atau conversation API dengan konteks project.

```typescript
const openAIClient = await client.getOpenAIClient();

const response = await openAIClient.responses.create({
  model: "gpt-4o",
  input: "What is the capital of France?"
});

const conversation = await openAIClient.conversations.create({
  items: [{ type: "message", role: "user", content: "Hello!" }]
});
```

### 2. Buat agent dasar

```typescript
const agent = await client.agents.createVersion("my-agent", {
  kind: "prompt",
  model: "gpt-4o",
  instructions: "You are a helpful assistant."
});
```

### 3. Buat agent dengan tools

#### Code Interpreter

```typescript
const codeAgent = await client.agents.createVersion("code-agent", {
  kind: "prompt",
  model: "gpt-4o",
  instructions: "You can execute code.",
  tools: [{ type: "code_interpreter", container: { type: "auto" } }]
});
```

#### File Search

```typescript
const searchAgent = await client.agents.createVersion("search-agent", {
  kind: "prompt",
  model: "gpt-4o",
  tools: [{ type: "file_search", vector_store_ids: [vectorStoreId] }]
});
```

#### Web Search

```typescript
const webAgent = await client.agents.createVersion("web-agent", {
  kind: "prompt",
  model: "gpt-4o",
  tools: [{
    type: "web_search_preview",
    user_location: { type: "approximate", country: "US", city: "Seattle" }
  }]
});
```

#### Azure AI Search

```typescript
const aiSearchAgent = await client.agents.createVersion("aisearch-agent", {
  kind: "prompt",
  model: "gpt-4o",
  tools: [{
    type: "azure_ai_search",
    azure_ai_search: {
      indexes: [{
        project_connection_id: connectionId,
        index_name: "my-index",
        query_type: "simple"
      }]
    }
  }]
});
```

#### Function Tool

```typescript
const funcAgent = await client.agents.createVersion("func-agent", {
  kind: "prompt",
  model: "gpt-4o",
  tools: [{
    type: "function",
    function: {
      name: "get_weather",
      description: "Get weather for a location",
      strict: true,
      parameters: {
        type: "object",
        properties: { location: { type: "string" } },
        required: ["location"]
      }
    }
  }]
});
```

#### MCP Tool

```typescript
const mcpAgent = await client.agents.createVersion("mcp-agent", {
  kind: "prompt",
  model: "gpt-4o",
  tools: [{
    type: "mcp",
    server_label: "my-mcp",
    server_url: "https://mcp-server.example.com",
    require_approval: "always"
  }]
});
```

### 4. Jalankan agent

```typescript
const openAIClient = await client.getOpenAIClient();

const conversation = await openAIClient.conversations.create({
  items: [{ type: "message", role: "user", content: "Hello!" }]
});

const response = await openAIClient.responses.create(
  { conversation: conversation.id },
  { body: { agent: { name: agent.name, type: "agent_reference" } } }
);

await openAIClient.conversations.delete(conversation.id);
await client.agents.deleteVersion(agent.name, agent.version);
```

### 5. Connections

```typescript
for await (const conn of client.connections.list()) {
  console.log(conn.name, conn.type);
}

const conn = await client.connections.get("my-connection");
const connWithCreds = await client.connections.getWithCredentials("my-connection");
const defaultAzureOpenAI = await client.connections.getDefault("AzureOpenAI", true);
```

### 6. Deployments

```typescript
for await (const deployment of client.deployments.list()) {
  if (deployment.type === "ModelDeployment") {
    console.log(deployment.name, deployment.modelName);
  }
}

for await (const d of client.deployments.list({ modelPublisher: "OpenAI" })) {
  console.log(d.name);
}

const deployment = await client.deployments.get("gpt-4o");
```

## Praktik kerja yang disarankan

1. Gunakan [`DefaultAzureCredential`](https://learn.microsoft.com/javascript/api/@azure/identity/defaultazurecredential) untuk lokal dan produksi.
2. Pisahkan definisi agent dari eksekusi response agar mudah diuji dan diiterasi.
3. Hapus conversation dan agent versi sementara setelah pengujian.
4. Gunakan tool yang paling sempit kebutuhannya untuk mengurangi kompleksitas dan risiko.
5. Simpan ID vector store, connection, dan deployment di konfigurasi aplikasi.
6. Aktifkan tracing bila perlu observabilitas lintas request.

## Checklist implementasi

- Verifikasi endpoint project benar.
- Verifikasi deployment model tersedia.
- Verifikasi connection atau vector store yang dirujuk memang ada.
- Verifikasi tool schema function strict bila output akan diproses otomatis.
- Verifikasi cleanup resource sementara setelah test.

## Batasan penting

- Beberapa tool agent atau surface API dapat berubah mengikuti versi SDK.
- Integrasi tertentu bergantung pada resource yang sudah dikonfigurasi di Azure AI Foundry project.
- Penggunaan `getWithCredentials()` perlu dibatasi hanya pada konteks yang benar-benar membutuhkan secret.

## Referensi mandiri

- Dokumentasi Azure AI Projects TypeScript: https://learn.microsoft.com/javascript/api/overview/azure/ai-projects-readme
- Dokumentasi Azure Identity TypeScript: https://learn.microsoft.com/javascript/api/@azure/identity/
- Dokumentasi Azure AI Foundry: https://learn.microsoft.com/azure/ai-foundry/
