---
name: azure-ai-formrecognizer-java
description: Gunakan saat membangun ekstraksi dokumen dengan Azure AI Document Intelligence SDK untuk Java, termasuk analisis layout, receipt, invoice, general document, dan custom model.
license: Complete terms in LICENSE.txt
metadata:
  category: ai-development
  source:
    repository: https://github.com/antiwork/antigravity-skills
    path: skills/azure-ai-formrecognizer-java
  language: id
  sdk: azure-ai-formrecognizer
  runtime: java
---

# Azure AI Document Intelligence Java

Gunakan skill ini saat perlu menganalisis dokumen di Java menggunakan SDK `azure-ai-formrecognizer`, yang mencakup kemampuan Document Intelligence/Form Recognizer.

## Kapan digunakan

Gunakan saat perlu:
- OCR dan ekstraksi layout,
- ekstraksi receipt, invoice, business card, atau ID document,
- analisis dokumen umum dengan key-value pair,
- membangun custom model,
- atau memproses dokumen bisnis di backend Java.

## Dependensi inti

```xml
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-ai-formrecognizer</artifactId>
    <version>4.2.0-beta.1</version>
</dependency>
```

## Pembuatan client

### DocumentAnalysisClient

```java
import com.azure.ai.formrecognizer.documentanalysis.DocumentAnalysisClient;
import com.azure.ai.formrecognizer.documentanalysis.DocumentAnalysisClientBuilder;
import com.azure.core.credential.AzureKeyCredential;

DocumentAnalysisClient client = new DocumentAnalysisClientBuilder()
    .credential(new AzureKeyCredential("{key}"))
    .endpoint("{endpoint}")
    .buildClient();
```

### DocumentModelAdministrationClient

```java
import com.azure.ai.formrecognizer.documentanalysis.administration.DocumentModelAdministrationClient;
import com.azure.ai.formrecognizer.documentanalysis.administration.DocumentModelAdministrationClientBuilder;
import com.azure.core.credential.AzureKeyCredential;

DocumentModelAdministrationClient adminClient = new DocumentModelAdministrationClientBuilder()
    .credential(new AzureKeyCredential("{key}"))
    .endpoint("{endpoint}")
    .buildClient();
```

### Dengan Entra ID

```java
import com.azure.identity.DefaultAzureCredentialBuilder;

DocumentAnalysisClient client = new DocumentAnalysisClientBuilder()
    .endpoint("{endpoint}")
    .credential(new DefaultAzureCredentialBuilder().build())
    .buildClient();
```

## Model prebuilt yang umum

- `prebuilt-layout`
- `prebuilt-document`
- `prebuilt-receipt`
- `prebuilt-invoice`
- `prebuilt-businessCard`
- `prebuilt-idDocument`
- `prebuilt-tax.us.w2`

## Pola implementasi inti

### Ekstraksi layout

```java
import com.azure.ai.formrecognizer.documentanalysis.models.*;
import com.azure.core.util.BinaryData;
import com.azure.core.util.polling.SyncPoller;
import java.io.File;

File document = new File("document.pdf");
BinaryData documentData = BinaryData.fromFile(document.toPath());

SyncPoller<OperationResult, AnalyzeResult> poller =
    client.beginAnalyzeDocument("prebuilt-layout", documentData);

AnalyzeResult result = poller.getFinalResult();
```

Gunakan `result.getPages()` untuk teks dan `result.getTables()` untuk tabel.

### Analisis dari URL

```java
String documentUrl = "https://example.com/invoice.pdf";

SyncPoller<OperationResult, AnalyzeResult> poller =
    client.beginAnalyzeDocumentFromUrl("prebuilt-invoice", documentUrl);

AnalyzeResult result = poller.getFinalResult();
```

### Analisis receipt

```java
SyncPoller<OperationResult, AnalyzeResult> poller =
    client.beginAnalyzeDocumentFromUrl("prebuilt-receipt", receiptUrl);

AnalyzeResult result = poller.getFinalResult();
```

Gunakan field seperti `MerchantName`, `TransactionDate`, dan `Items` untuk expense automation.

### Analisis dokumen umum

```java
SyncPoller<OperationResult, AnalyzeResult> poller =
    client.beginAnalyzeDocumentFromUrl("prebuilt-document", documentUrl);

AnalyzeResult result = poller.getFinalResult();

for (DocumentKeyValuePair kvp : result.getKeyValuePairs()) {
    System.out.printf("Key: %s => Value: %s%n",
        kvp.getKey().getContent(),
        kvp.getValue() != null ? kvp.getValue().getContent() : "null");
}
```

Pola ini cocok untuk formulir semi-terstruktur.

## Custom model

```java
import com.azure.ai.formrecognizer.documentanalysis.administration.models.*;

String blobContainerUrl = "{SAS_URL_of_training_data}";
String prefix = "training-docs/";

SyncPoller<OperationResult, DocumentModelDetails> poller = adminClient.beginBuildDocumentModel(
    blobContainerUrl,
    DocumentModelBuildMode.TEMPLATE,
    prefix,
    new BuildDocumentModelOptions()
        .setModelId("my-custom-model")
        .setDescription("Custom invoice model"),
    Context.NONE);

DocumentModelDetails model = poller.getFinalResult();
```

Gunakan custom model bila struktur dokumen terlalu spesifik untuk model prebuilt.

## Praktik implementasi yang disarankan

- Mulai dari model prebuilt sebelum membuat custom model.
- Simpan hasil mentah dan hasil normalisasi terpisah.
- Gunakan confidence score untuk menentukan apakah field boleh diproses otomatis.
- Pisahkan parser hasil SDK dari logika bisnis.
- Gunakan URL sumber bila file besar atau pipeline berjalan di cloud.
- Pastikan training data custom model cukup representatif dan konsisten.

## Checklist debugging cepat

Jika hasil tidak sesuai ekspektasi, cek:
1. endpoint dan key benar,
2. model ID sesuai tipe dokumen,
3. file atau URL dapat diakses,
4. polling benar-benar selesai,
5. field yang dicari memang tersedia pada model tersebut,
6. custom model dilatih dengan data yang cukup.

## Hasil yang diharapkan

Setelah mengikuti skill ini, implementasi Java seharusnya mampu:
- mengekstrak layout, tabel, dan key-value pair,
- memproses receipt dan invoice,
- membangun custom model,
- dan mengintegrasikan hasil analisis dokumen ke workflow backend.
