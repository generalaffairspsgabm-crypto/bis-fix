---
name: azure-ai-document-intelligence-dotnet
description: Gunakan saat membangun ekstraksi dokumen dengan Azure AI Document Intelligence SDK untuk .NET, termasuk analisis prebuilt model, layout, invoice, receipt, custom model, dan document classifier.
license: Complete terms in LICENSE.txt
metadata:
  category: ai-development
  source:
    repository: https://github.com/antiwork/antigravity-skills
    path: skills/azure-ai-document-intelligence-dotnet
  language: id
  sdk: Azure.AI.DocumentIntelligence
  runtime: dotnet
---

# Azure AI Document Intelligence .NET

Gunakan skill ini saat perlu mengekstrak teks, tabel, field terstruktur, atau klasifikasi dokumen menggunakan Azure AI Document Intelligence di .NET.

## Kapan digunakan

Gunakan saat perlu:
- OCR dan ekstraksi layout dokumen,
- ekstraksi field invoice, receipt, ID document, atau formulir umum,
- membangun custom model,
- membangun document classifier,
- atau memproses dokumen untuk workflow otomatis dan RAG.

## Dependensi inti

```bash
dotnet add package Azure.AI.DocumentIntelligence
dotnet add package Azure.Identity
```

Variabel lingkungan umum:

```bash
DOCUMENT_INTELLIGENCE_ENDPOINT=https://<resource-name>.cognitiveservices.azure.com/
DOCUMENT_INTELLIGENCE_API_KEY=<api-key>
BLOB_CONTAINER_SAS_URL=https://<storage>.blob.core.windows.net/<container>?<sas-token>
```

## Autentikasi

### Entra ID

```csharp
using Azure.Identity;
using Azure.AI.DocumentIntelligence;

string endpoint = Environment.GetEnvironmentVariable("DOCUMENT_INTELLIGENCE_ENDPOINT");
var client = new DocumentIntelligenceClient(new Uri(endpoint), new DefaultAzureCredential());
```

Gunakan custom subdomain endpoint untuk Entra ID.

### API key

```csharp
using Azure;
using Azure.AI.DocumentIntelligence;

string endpoint = Environment.GetEnvironmentVariable("DOCUMENT_INTELLIGENCE_ENDPOINT");
string apiKey = Environment.GetEnvironmentVariable("DOCUMENT_INTELLIGENCE_API_KEY");
var client = new DocumentIntelligenceClient(new Uri(endpoint), new AzureKeyCredential(apiKey));
```

## Client utama

- `DocumentIntelligenceClient` untuk analisis dokumen dan klasifikasi.
- `DocumentIntelligenceAdministrationClient` untuk custom model dan classifier.

## Model prebuilt yang umum

- `prebuilt-read`
- `prebuilt-layout`
- `prebuilt-invoice`
- `prebuilt-receipt`
- `prebuilt-idDocument`
- `prebuilt-businessCard`
- `prebuilt-tax.us.w2`
- `prebuilt-healthInsuranceCard.us`

## Pola implementasi inti

### Analisis invoice

```csharp
Uri invoiceUri = new Uri("https://example.com/invoice.pdf");

Operation<AnalyzeResult> operation = await client.AnalyzeDocumentAsync(
    WaitUntil.Completed,
    "prebuilt-invoice",
    invoiceUri);

AnalyzeResult result = operation.Value;
```

Gunakan `result.Documents` untuk membaca field seperti `VendorName`, `InvoiceTotal`, dan `Items`.

### Ekstraksi layout

```csharp
Uri fileUri = new Uri("https://example.com/document.pdf");

Operation<AnalyzeResult> operation = await client.AnalyzeDocumentAsync(
    WaitUntil.Completed,
    "prebuilt-layout",
    fileUri);

AnalyzeResult result = operation.Value;
```

Gunakan `result.Pages` untuk teks per halaman dan `result.Tables` untuk struktur tabel.

### Analisis receipt

```csharp
Operation<AnalyzeResult> operation = await client.AnalyzeDocumentAsync(
    WaitUntil.Completed,
    "prebuilt-receipt",
    receiptUri);

AnalyzeResult result = operation.Value;
```

Pola ini cocok untuk expense automation atau rekonsiliasi transaksi.

## Custom model

```csharp
var adminClient = new DocumentIntelligenceAdministrationClient(
    new Uri(endpoint),
    new AzureKeyCredential(apiKey));

string modelId = "my-custom-model";
Uri blobContainerUri = new Uri("<blob-container-sas-url>");

var blobSource = new BlobContentSource(blobContainerUri);
var options = new BuildDocumentModelOptions(modelId, DocumentBuildMode.Template, blobSource);

Operation<DocumentModelDetails> operation = await adminClient.BuildDocumentModelAsync(
    WaitUntil.Completed,
    options);
```

Gunakan custom model bila field dokumen tidak tercakup baik oleh model prebuilt.

## Document classifier

```csharp
string classifierId = "my-classifier";
Uri blobContainerUri = new Uri("<blob-container-sas-url>");

var sourceA = new BlobContentSource(blobContainerUri) { Prefix = "TypeA/train" };
var sourceB = new BlobContentSource(blobContainerUri) { Prefix = "TypeB/train" };
```

Gunakan classifier untuk menentukan tipe dokumen sebelum ekstraksi lanjutan.

## Praktik implementasi yang disarankan

- Mulai dari model prebuilt sebelum membuat custom model.
- Simpan hasil mentah dan hasil normalisasi terpisah.
- Validasi confidence sebelum mengisi field bisnis kritikal.
- Gunakan classifier bila satu pipeline menerima banyak tipe dokumen.
- Simpan `modelId` dan `classifierId` sebagai artefak deployment.
- Gunakan SAS URL yang masa berlakunya cukup panjang untuk training job.

## Checklist debugging cepat

Jika hasil tidak sesuai ekspektasi, cek:
1. endpoint dan kredensial benar,
2. model ID valid,
3. file atau URL dapat diakses,
4. tipe dokumen cocok dengan model yang dipilih,
5. training data custom model cukup representatif,
6. confidence field terlalu rendah untuk dipakai otomatis atau tidak.

## Hasil yang diharapkan

Setelah mengikuti skill ini, implementasi .NET seharusnya mampu:
- mengekstrak teks, tabel, dan field terstruktur,
- memakai model prebuilt maupun custom,
- mengklasifikasikan dokumen,
- dan mengintegrasikan hasil ekstraksi ke workflow bisnis.
