---
name: azure-ai-projects-java
description: Gunakan saat membangun aplikasi Azure AI Foundry dengan SDK Java untuk mengelola connections, datasets, deployments, indexes, evaluations, dan operasi proyek tingkat tinggi.
---

# Azure AI Projects SDK untuk Java

Skill ini dipakai saat perlu mengakses Azure AI Foundry project dari Java melalui builder dan sub-client khusus untuk connection, dataset, deployment, index, dan evaluasi.

## Kapan digunakan

Gunakan skill ini ketika pekerjaan mencakup:

- Membuat client Java untuk Azure AI Foundry project.
- Mengelola koneksi resource Azure yang terhubung ke project.
- Mengunggah dataset atau mengelola index pencarian.
- Menginspeksi deployment model yang tersedia.
- Menjalankan atau mengonfigurasi evaluasi.

## Dependensi

Tambahkan dependensi Maven berikut:

```xml
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-ai-projects</artifactId>
    <version>1.0.0-beta.1</version>
</dependency>
```

Untuk autentikasi modern, tambahkan juga paket [`azure-identity`](https://learn.microsoft.com/java/api/overview/azure/identity-readme).

## Variabel lingkungan

```bash
PROJECT_ENDPOINT=https://<resource>.services.ai.azure.com/api/projects/<project>
AI_SEARCH_CONNECTION_NAME=<ai-search-connection>
AI_SEARCH_INDEX_NAME=<ai-search-index>
```

## Autentikasi

Gunakan [`DefaultAzureCredentialBuilder`](https://learn.microsoft.com/java/api/com.azure.identity.defaultazurecredentialbuilder) sebagai default.

```java
import com.azure.ai.projects.AIProjectClientBuilder;
import com.azure.identity.DefaultAzureCredentialBuilder;

AIProjectClientBuilder builder = new AIProjectClientBuilder()
    .endpoint(System.getenv("PROJECT_ENDPOINT"))
    .credential(new DefaultAzureCredentialBuilder().build());
```

## Struktur sub-client

Bangun sub-client dari builder yang sama agar konfigurasi konsisten:

```java
ConnectionsClient connectionsClient = builder.buildConnectionsClient();
DatasetsClient datasetsClient = builder.buildDatasetsClient();
DeploymentsClient deploymentsClient = builder.buildDeploymentsClient();
IndexesClient indexesClient = builder.buildIndexesClient();
EvaluationsClient evaluationsClient = builder.buildEvaluationsClient();
```

Sub-client yang umum dipakai:

- `ConnectionsClient`
- `DatasetsClient`
- `DeploymentsClient`
- `IndexesClient`
- `EvaluationsClient`
- `EvaluatorsClient`
- `SchedulesClient`

## Workflow inti

### 1. List connections

```java
import com.azure.ai.projects.models.Connection;
import com.azure.core.http.rest.PagedIterable;

PagedIterable<Connection> connections = connectionsClient.listConnections();
for (Connection connection : connections) {
    System.out.println("Name: " + connection.getName());
    System.out.println("Type: " + connection.getType());
    System.out.println("Credential Type: " + connection.getCredentials().getType());
}
```

### 2. List indexes

```java
indexesClient.listLatest().forEach(index -> {
    System.out.println("Index name: " + index.getName());
    System.out.println("Version: " + index.getVersion());
    System.out.println("Description: " + index.getDescription());
});
```

### 3. Create atau update index

```java
import com.azure.ai.projects.models.AzureAISearchIndex;
import com.azure.ai.projects.models.Index;

String indexName = "my-index";
String indexVersion = "1.0";
String searchConnectionName = System.getenv("AI_SEARCH_CONNECTION_NAME");
String searchIndexName = System.getenv("AI_SEARCH_INDEX_NAME");

Index index = indexesClient.createOrUpdate(
    indexName,
    indexVersion,
    new AzureAISearchIndex()
        .setConnectionName(searchConnectionName)
        .setIndexName(searchIndexName)
);

System.out.println("Created index: " + index.getName());
```

### 4. Akses evaluasi berbasis OpenAI

SDK ini dapat mengekspos client evaluasi OpenAI resmi.

```java
import com.openai.services.EvalService;

EvalService evalService = evaluationsClient.getOpenAIClient();
```

Gunakan pola ini bila evaluasi perlu memanfaatkan API OpenAI yang dibungkus oleh project.

## Praktik kerja yang disarankan

1. Gunakan satu [`AIProjectClientBuilder`](https://learn.microsoft.com/java/api/com.azure.ai.projects.aiprojectclientbuilder) untuk membangun semua sub-client.
2. Gunakan [`DefaultAzureCredentialBuilder`](https://learn.microsoft.com/java/api/com.azure.identity.defaultazurecredentialbuilder) untuk produksi.
3. Tangani pagination pada [`PagedIterable`](https://learn.microsoft.com/java/api/com.azure.core.http.rest.pagediterable) saat daftar resource bisa besar.
4. Verifikasi tipe connection sebelum membaca credential atau memakainya untuk operasi lanjutan.
5. Simpan nama connection dan index di konfigurasi aplikasi, bukan hardcode.

## Error handling

```java
import com.azure.core.exception.HttpResponseException;
import com.azure.core.exception.ResourceNotFoundException;

try {
    Index index = indexesClient.get("my-index", "1.0");
} catch (ResourceNotFoundException e) {
    System.err.println("Index not found");
} catch (HttpResponseException e) {
    System.err.println("HTTP error: " + e.getResponse().getStatusCode());
}
```

## Checklist implementasi

- Verifikasi endpoint project benar dan dapat diakses.
- Verifikasi identitas memiliki izin ke Azure AI Foundry project.
- Verifikasi connection atau index yang dirujuk memang ada.
- Verifikasi dependensi beta cocok dengan versi Java dan dependency tree proyek.
- Verifikasi error handling untuk resource tidak ditemukan dan kegagalan HTTP.

## Batasan penting

- Paket Java ini masih dapat berada pada status beta sehingga surface API dapat berubah.
- Operasi tertentu bergantung pada resource eksternal yang sudah dikonfigurasi di project.
- Tidak semua fitur agent tingkat lanjut tersedia pada SDK Java dengan tingkat kematangan yang sama seperti SDK lain.

## Referensi mandiri

- Dokumentasi Azure AI Foundry: https://learn.microsoft.com/azure/ai-foundry/
- Dokumentasi Azure Identity Java: https://learn.microsoft.com/java/api/overview/azure/identity-readme
- Referensi REST AI Projects: https://learn.microsoft.com/rest/api/aifoundry/aiprojects/
- Sumber SDK Java Azure AI Projects: https://github.com/Azure/azure-sdk-for-java/tree/main/sdk/ai/azure-ai-projects
