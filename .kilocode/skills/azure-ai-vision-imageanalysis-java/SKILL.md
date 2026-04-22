---
name: azure-ai-vision-imageanalysis-java
description: Gunakan saat membangun analisis gambar dengan Azure AI Vision SDK untuk Java, termasuk caption, OCR, deteksi objek, tagging, people detection, dan smart crop.
license: Complete terms in LICENSE.txt
metadata:
  category: ai
  source:
    upstream: .tmp-antigravity-skills/skills/azure-ai-vision-imageanalysis-java
    type: community
  depends_on:
    - resource Azure AI Vision dengan endpoint aktif
    - kredensial `VISION_KEY` atau `DefaultAzureCredential`
    - dependensi Maven `com.azure:azure-ai-vision-imageanalysis`
---

# Azure AI Vision Image Analysis untuk Java

Skill ini membantu implementasi analisis gambar berbasis Azure AI Vision di Java. Fokusnya adalah pola praktis untuk membuat client, memilih fitur visual, memproses hasil OCR, caption, objek, tag, orang, dan smart crop tanpa bergantung pada dokumentasi eksternal saat eksekusi.

## Kapan digunakan

Gunakan skill ini saat perlu:
- membuat caption gambar dari file atau URL
- mengekstrak teks OCR dari gambar atau dokumen
- mendeteksi objek, orang, dan tag konten
- menghasilkan region smart crop atau dense caption
- menggabungkan beberapa fitur visual dalam satu request

## Dependensi

Tambahkan dependensi Maven berikut:

```xml
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-ai-vision-imageanalysis</artifactId>
    <version>1.1.0-beta.1</version>
</dependency>
```

Autentikasi Entra ID biasanya memerlukan paket identitas Azure juga.

## Variabel lingkungan

```bash
VISION_ENDPOINT=https://<resource>.cognitiveservices.azure.com
VISION_KEY=<api-key>
```

## Pola autentikasi

### API key

```java
import com.azure.ai.vision.imageanalysis.ImageAnalysisClient;
import com.azure.ai.vision.imageanalysis.ImageAnalysisClientBuilder;
import com.azure.core.credential.KeyCredential;

String endpoint = System.getenv("VISION_ENDPOINT");
String key = System.getenv("VISION_KEY");

ImageAnalysisClient client = new ImageAnalysisClientBuilder()
    .endpoint(endpoint)
    .credential(new KeyCredential(key))
    .buildClient();
```

### Async client

```java
import com.azure.ai.vision.imageanalysis.ImageAnalysisAsyncClient;

ImageAnalysisAsyncClient asyncClient = new ImageAnalysisClientBuilder()
    .endpoint(endpoint)
    .credential(new KeyCredential(key))
    .buildAsyncClient();
```

### Entra ID

```java
import com.azure.identity.DefaultAzureCredentialBuilder;

ImageAnalysisClient client = new ImageAnalysisClientBuilder()
    .endpoint(endpoint)
    .credential(new DefaultAzureCredentialBuilder().build())
    .buildClient();
```

## Fitur visual utama

| Fitur | Kegunaan |
|---|---|
| `CAPTION` | Membuat deskripsi natural gambar |
| `DENSE_CAPTIONS` | Caption untuk beberapa region |
| `READ` | OCR teks dari gambar |
| `TAGS` | Tag konten, objek, aksi, atau scene |
| `OBJECTS` | Deteksi objek dengan bounding box |
| `SMART_CROPS` | Region crop yang relevan |
| `PEOPLE` | Deteksi orang dan lokasinya |

## Pola inti

### Caption dari file

```java
import com.azure.ai.vision.imageanalysis.models.ImageAnalysisOptions;
import com.azure.ai.vision.imageanalysis.models.ImageAnalysisResult;
import com.azure.ai.vision.imageanalysis.models.VisualFeatures;
import com.azure.core.util.BinaryData;
import java.io.File;
import java.util.Arrays;

BinaryData imageData = BinaryData.fromFile(new File("image.jpg").toPath());

ImageAnalysisResult result = client.analyze(
    imageData,
    Arrays.asList(VisualFeatures.CAPTION),
    new ImageAnalysisOptions().setGenderNeutralCaption(true));

System.out.printf("Caption: \"%s\" (confidence: %.4f)%n",
    result.getCaption().getText(),
    result.getCaption().getConfidence());
```

### Caption dari URL

```java
ImageAnalysisResult result = client.analyzeFromUrl(
    "https://example.com/image.jpg",
    Arrays.asList(VisualFeatures.CAPTION),
    new ImageAnalysisOptions().setGenderNeutralCaption(true));
```

### OCR teks

```java
import com.azure.ai.vision.imageanalysis.models.DetectedTextBlock;
import com.azure.ai.vision.imageanalysis.models.DetectedTextLine;
import com.azure.ai.vision.imageanalysis.models.DetectedTextWord;

ImageAnalysisResult result = client.analyze(
    BinaryData.fromFile(new File("document.jpg").toPath()),
    Arrays.asList(VisualFeatures.READ),
    null);

for (DetectedTextBlock block : result.getRead().getBlocks()) {
    for (DetectedTextLine line : block.getLines()) {
        System.out.printf("Line: '%s'%n", line.getText());
        for (DetectedTextWord word : line.getWords()) {
            System.out.printf("  Word: '%s' (confidence: %.4f)%n",
                word.getText(),
                word.getConfidence());
        }
    }
}
```

### Deteksi objek

```java
import com.azure.ai.vision.imageanalysis.models.DetectedObject;
import com.azure.ai.vision.imageanalysis.models.ImageBoundingBox;

ImageAnalysisResult result = client.analyzeFromUrl(
    imageUrl,
    Arrays.asList(VisualFeatures.OBJECTS),
    null);

for (DetectedObject obj : result.getObjects()) {
    ImageBoundingBox box = obj.getBoundingBox();
    System.out.printf("Object: %s (confidence: %.4f)%n",
        obj.getTags().get(0).getName(),
        obj.getTags().get(0).getConfidence());
    System.out.printf("  x=%d y=%d w=%d h=%d%n",
        box.getX(), box.getY(), box.getWidth(), box.getHeight());
}
```

### Tagging

```java
import com.azure.ai.vision.imageanalysis.models.DetectedTag;

ImageAnalysisResult result = client.analyzeFromUrl(
    imageUrl,
    Arrays.asList(VisualFeatures.TAGS),
    null);

for (DetectedTag tag : result.getTags()) {
    System.out.printf("Tag: %s (confidence: %.4f)%n",
        tag.getName(),
        tag.getConfidence());
}
```

### People detection

```java
import com.azure.ai.vision.imageanalysis.models.DetectedPerson;

ImageAnalysisResult result = client.analyzeFromUrl(
    imageUrl,
    Arrays.asList(VisualFeatures.PEOPLE),
    null);

for (DetectedPerson person : result.getPeople()) {
    ImageBoundingBox box = person.getBoundingBox();
    System.out.printf("Person x=%d y=%d confidence=%.4f%n",
        box.getX(), box.getY(), person.getConfidence());
}
```

### Smart crop

```java
import com.azure.ai.vision.imageanalysis.models.CropRegion;

ImageAnalysisResult result = client.analyzeFromUrl(
    imageUrl,
    Arrays.asList(VisualFeatures.SMART_CROPS),
    new ImageAnalysisOptions().setSmartCropsAspectRatios(Arrays.asList(1.0, 1.5)));

for (CropRegion crop : result.getSmartCrops()) {
    System.out.printf("Aspect %.2f -> x=%d y=%d w=%d h=%d%n",
        crop.getAspectRatio(),
        crop.getBoundingBox().getX(),
        crop.getBoundingBox().getY(),
        crop.getBoundingBox().getWidth(),
        crop.getBoundingBox().getHeight());
}
```

### Dense captions

```java
import com.azure.ai.vision.imageanalysis.models.DenseCaption;

ImageAnalysisResult result = client.analyzeFromUrl(
    imageUrl,
    Arrays.asList(VisualFeatures.DENSE_CAPTIONS),
    new ImageAnalysisOptions().setGenderNeutralCaption(true));

for (DenseCaption caption : result.getDenseCaptions()) {
    System.out.printf("Caption: %s (%.4f)%n", caption.getText(), caption.getConfidence());
}
```

### Multi-feature request

Gunakan satu request bila perlu menghemat round-trip jaringan, misalnya menggabungkan `CAPTION`, `TAGS`, dan `READ`. Pastikan hanya fitur yang benar-benar dibutuhkan yang diaktifkan agar biaya dan latensi tetap terkendali.

## Praktik yang disarankan

- prioritaskan `DefaultAzureCredential` untuk aplikasi produksi
- validasi ukuran dan format gambar sebelum upload
- gunakan URL analysis untuk aset publik, dan `BinaryData` untuk file lokal atau upload user
- cek nullability hasil seperti `getCaption()` atau `getRead()` sebelum akses detail
- log confidence score untuk thresholding downstream
- pisahkan pipeline OCR dan caption bila kebutuhan retry atau SLA berbeda

## Checklist implementasi

1. Pastikan endpoint dan kredensial tersedia.
2. Pilih fitur visual minimum yang diperlukan.
3. Tentukan sumber gambar: file lokal atau URL.
4. Tangani hasil kosong atau confidence rendah.
5. Simpan bounding box bila hasil akan dipakai UI atau anotasi.

## Sumber upstream

Konten dinormalisasi dari `.tmp-antigravity-skills/skills/azure-ai-vision-imageanalysis-java` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
