---
name: azure-ai-contentsafety-java
description: Gunakan saat membangun moderasi konten dengan Azure AI Content Safety SDK untuk Java, termasuk analisis teks, gambar, severity scoring, dan pengelolaan blocklist kustom.
license: Complete terms in LICENSE.txt
metadata:
  category: ai-safety
  source:
    repository: https://github.com/antiwork/antigravity-skills
    path: skills/azure-ai-contentsafety-java
  language: id
  sdk: azure-ai-contentsafety
  runtime: java
---

# Azure AI Content Safety Java

Gunakan skill ini saat perlu memoderasi teks atau gambar di aplikasi Java menggunakan Azure AI Content Safety.

## Kapan digunakan

Gunakan saat perlu:
- memeriksa teks user-generated atau AI-generated,
- memoderasi gambar sebelum ditampilkan,
- menerapkan threshold severity per kategori bahaya,
- memakai blocklist kustom untuk istilah domain tertentu,
- atau membangun pipeline safety sebelum konten diteruskan ke pengguna.

## Dependensi inti

```xml
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-ai-contentsafety</artifactId>
    <version>1.1.0-beta.1</version>
</dependency>
```

Variabel lingkungan umum:

```bash
CONTENT_SAFETY_ENDPOINT=https://<resource>.cognitiveservices.azure.com
CONTENT_SAFETY_KEY=<api-key>
```

## Pembuatan client

### Dengan API key

```java
import com.azure.ai.contentsafety.ContentSafetyClient;
import com.azure.ai.contentsafety.ContentSafetyClientBuilder;
import com.azure.ai.contentsafety.BlocklistClient;
import com.azure.ai.contentsafety.BlocklistClientBuilder;
import com.azure.core.credential.KeyCredential;

String endpoint = System.getenv("CONTENT_SAFETY_ENDPOINT");
String key = System.getenv("CONTENT_SAFETY_KEY");

ContentSafetyClient contentSafetyClient = new ContentSafetyClientBuilder()
    .credential(new KeyCredential(key))
    .endpoint(endpoint)
    .buildClient();

BlocklistClient blocklistClient = new BlocklistClientBuilder()
    .credential(new KeyCredential(key))
    .endpoint(endpoint)
    .buildClient();
```

### Dengan Entra ID

```java
import com.azure.identity.DefaultAzureCredentialBuilder;

ContentSafetyClient client = new ContentSafetyClientBuilder()
    .credential(new DefaultAzureCredentialBuilder().build())
    .endpoint(endpoint)
    .buildClient();
```

## Kategori bahaya

Kategori utama yang umum dipakai:
- `Hate`
- `Sexual`
- `Violence`
- `Self-harm`

Severity teks dapat memakai skala 4 level atau 8 level, tergantung kebutuhan granularitas.

## Pola implementasi inti

### Analisis teks

```java
import com.azure.ai.contentsafety.models.*;

AnalyzeTextResult result = contentSafetyClient.analyzeText(
    new AnalyzeTextOptions("Teks yang ingin dianalisis"));

for (TextCategoriesAnalysis category : result.getCategoriesAnalysis()) {
    System.out.printf("Category: %s, Severity: %d%n",
        category.getCategory(),
        category.getSeverity());
}
```

### Analisis teks dengan kategori spesifik dan 8 severity levels

```java
AnalyzeTextOptions options = new AnalyzeTextOptions("Teks untuk dianalisis")
    .setCategories(Arrays.asList(TextCategory.HATE, TextCategory.VIOLENCE))
    .setOutputType(AnalyzeTextOutputType.EIGHT_SEVERITY_LEVELS);

AnalyzeTextResult result = contentSafetyClient.analyzeText(options);
```

Gunakan mode 8 level bila perlu threshold yang lebih halus.

### Analisis teks dengan blocklist

```java
AnalyzeTextOptions options = new AnalyzeTextOptions("I h*te you and want to k*ll you")
    .setBlocklistNames(Arrays.asList("my-blocklist"))
    .setHaltOnBlocklistHit(true);

AnalyzeTextResult result = contentSafetyClient.analyzeText(options);
```

Gunakan `haltOnBlocklistHit` bila aplikasi harus langsung menolak konten tertentu.

### Analisis gambar dari file

```java
import com.azure.core.util.BinaryData;
import java.nio.file.Files;
import java.nio.file.Paths;

byte[] imageBytes = Files.readAllBytes(Paths.get("image.png"));
ContentSafetyImageData imageData = new ContentSafetyImageData()
    .setContent(BinaryData.fromBytes(imageBytes));

AnalyzeImageResult result = contentSafetyClient.analyzeImage(
    new AnalyzeImageOptions(imageData));
```

### Analisis gambar dari URL

```java
ContentSafetyImageData imageData = new ContentSafetyImageData()
    .setBlobUrl("https://example.com/image.jpg");

AnalyzeImageResult result = contentSafetyClient.analyzeImage(
    new AnalyzeImageOptions(imageData));
```

## Manajemen blocklist

### Buat atau update blocklist

```java
Map<String, String> description = Map.of("description", "Custom blocklist");
BinaryData resource = BinaryData.fromObject(description);

blocklistClient.createOrUpdateTextBlocklistWithResponse(
    "my-blocklist", resource, new RequestOptions());
```

### Tambahkan item blocklist

```java
List<TextBlocklistItem> items = Arrays.asList(
    new TextBlocklistItem("badword1").setDescription("Istilah ofensif"),
    new TextBlocklistItem("badword2").setDescription("Istilah lain")
);

blocklistClient.addOrUpdateBlocklistItems(
    "my-blocklist",
    new AddOrUpdateTextBlocklistItemsOptions(items));
```

### List blocklist

```java
PagedIterable<TextBlocklist> blocklists = blocklistClient.listTextBlocklists();
for (TextBlocklist blocklist : blocklists) {
    System.out.println(blocklist.getName());
}
```

## Strategi moderasi yang disarankan

Gunakan pola keputusan eksplisit, misalnya:
- severity 0–2: izinkan,
- severity 4: tahan untuk review,
- severity 6 atau blocklist hit: tolak.

Sesuaikan threshold dengan konteks produk. Aplikasi edukasi anak biasanya lebih ketat daripada forum profesional tertutup.

## Praktik implementasi yang disarankan

- Moderasi input pengguna sebelum diproses model.
- Moderasi output model sebelum ditampilkan.
- Simpan hasil kategori dan severity untuk audit.
- Gunakan blocklist untuk istilah internal, brand safety, atau kebijakan lokal.
- Jangan hanya memeriksa satu kategori; satu konten bisa memicu beberapa kategori sekaligus.
- Pisahkan kebijakan keputusan dari kode pemanggilan SDK agar mudah diubah.

## Checklist debugging cepat

Jika hasil tidak sesuai ekspektasi, cek:
1. endpoint dan key benar,
2. kategori yang diminta memang sesuai,
3. output type 4-level vs 8-level tidak tertukar,
4. blocklist sudah dibuat dan item sudah masuk,
5. format gambar valid dan dapat dibaca,
6. threshold aplikasi tidak terlalu agresif atau terlalu longgar.

## Hasil yang diharapkan

Setelah mengikuti skill ini, implementasi Java seharusnya mampu:
- menganalisis teks dan gambar,
- menerapkan severity threshold,
- mengelola blocklist kustom,
- dan membangun pipeline moderasi konten yang dapat diaudit.
