---
name: azure-ai-agents-persistent-java
description: Gunakan saat membangun agent persisten di Azure AI Foundry memakai SDK Java level rendah, termasuk pembuatan agent, thread, message, run, polling status, dan cleanup resource.
license: Complete terms in LICENSE.txt
metadata:
  category: ai-development
  source:
    repository: https://github.com/antiwork/antigravity-skills
    path: skills/azure-ai-agents-persistent-java
  language: id
  sdk: azure-ai-agents-persistent
  runtime: java
---

# Azure AI Agents Persistent Java

Gunakan skill ini saat perlu mengimplementasikan agent persisten dengan SDK Java untuk Azure AI Foundry Projects.

## Kapan digunakan

Gunakan saat perlu:
- membuat agent yang dapat dipakai ulang lintas sesi,
- mengelola thread dan message secara eksplisit,
- menjalankan run dengan polling status,
- menangani lifecycle resource agent/thread,
- atau menulis backend Java yang berinteraksi langsung dengan Azure AI Agents Persistent.

## Dependensi inti

Tambahkan dependensi Maven berikut:

```xml
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-ai-agents-persistent</artifactId>
    <version>1.0.0-beta.1</version>
</dependency>
```

Variabel lingkungan minimum:

```bash
PROJECT_ENDPOINT=https://<resource>.services.ai.azure.com/api/projects/<project>
MODEL_DEPLOYMENT_NAME=gpt-4o-mini
```

## Autentikasi

Gunakan `DefaultAzureCredential` sebagai default produksi:

```java
import com.azure.ai.agents.persistent.PersistentAgentsClient;
import com.azure.ai.agents.persistent.PersistentAgentsClientBuilder;
import com.azure.identity.DefaultAzureCredentialBuilder;

String endpoint = System.getenv("PROJECT_ENDPOINT");
PersistentAgentsClient client = new PersistentAgentsClientBuilder()
    .endpoint(endpoint)
    .credential(new DefaultAzureCredentialBuilder().build())
    .buildClient();
```

Pastikan endpoint adalah endpoint Azure AI Project.

## Konsep inti

Client utama tersedia dalam dua bentuk:
- `PersistentAgentsClient` untuk operasi sinkron.
- `PersistentAgentsAsyncClient` untuk throughput lebih tinggi atau integrasi reaktif.

Objek domain utama:
- `PersistentAgent`
- `PersistentAgentThread`
- `PersistentThreadMessage`
- `ThreadRun`

## Alur kerja dasar

### 1. Buat agent

```java
PersistentAgent agent = client.createAgent(
    System.getenv("MODEL_DEPLOYMENT_NAME"),
    "Math Tutor",
    "Bantu pengguna menyelesaikan soal matematika secara bertahap."
);
```

### 2. Buat thread

```java
PersistentAgentThread thread = client.createThread();
```

### 3. Tambahkan pesan pengguna

```java
client.createMessage(
    thread.getId(),
    MessageRole.USER,
    "Saya butuh bantuan menyelesaikan persamaan."
);
```

### 4. Jalankan agent

```java
ThreadRun run = client.createRun(thread.getId(), agent.getId());

while (run.getStatus() == RunStatus.QUEUED || run.getStatus() == RunStatus.IN_PROGRESS) {
    Thread.sleep(500);
    run = client.getRun(thread.getId(), run.getId());
}
```

### 5. Ambil respons

```java
PagedIterable<PersistentThreadMessage> messages = client.listMessages(thread.getId());
for (PersistentThreadMessage message : messages) {
    System.out.println(message.getRole() + ": " + message.getContent());
}
```

### 6. Cleanup

```java
client.deleteThread(thread.getId());
client.deleteAgent(agent.getId());
```

## Praktik implementasi yang disarankan

- Gunakan satu thread untuk satu konteks percakapan.
- Simpan ID agent dan thread bila proses perlu dilanjutkan di request berikutnya.
- Poll dengan jeda tetap, misalnya 500 ms, agar tidak membebani API.
- Tangani semua status run, bukan hanya `QUEUED` dan `IN_PROGRESS`.
- Hapus resource sementara setelah selesai agar biaya dan clutter tetap rendah.
- Gunakan async client bila aplikasi menangani banyak run paralel.

## Penanganan error

```java
import com.azure.core.exception.HttpResponseException;

try {
    PersistentAgent agent = client.createAgent(modelName, name, instructions);
} catch (HttpResponseException e) {
    System.err.println("Error: " + e.getResponse().getStatusCode() + " - " + e.getMessage());
}
```

Saat debugging, cek juga:
- nama deployment model,
- izin kredensial ke project,
- endpoint project,
- dan status run akhir seperti `FAILED`, `CANCELLED`, atau `REQUIRES_ACTION`.

## Kapan memilih skill ini dibanding SDK lain

Pilih skill ini bila membutuhkan kontrol level rendah atas lifecycle agent persisten. Bila kebutuhan hanya chat sederhana tanpa thread/run eksplisit, pertimbangkan SDK yang lebih tinggi levelnya.

## Hasil yang diharapkan

Setelah mengikuti skill ini, implementasi Java seharusnya mampu:
- membuat agent persisten,
- membuat thread dan message,
- menjalankan run dengan polling,
- membaca hasil percakapan,
- dan membersihkan resource dengan aman.
