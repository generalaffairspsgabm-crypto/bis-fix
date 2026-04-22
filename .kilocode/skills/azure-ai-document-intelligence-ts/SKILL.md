---
name: azure-ai-document-intelligence-ts
description: Gunakan saat membangun ekstraksi dokumen dengan Azure AI Document Intelligence REST SDK untuk TypeScript, termasuk analisis prebuilt model, polling long-running operation, custom model, dan document classifier.
license: Complete terms in LICENSE.txt
metadata:
  category: ai-development
  source:
    repository: https://github.com/antiwork/antigravity-skills
    path: skills/azure-ai-document-intelligence-ts
  language: id
  sdk: '@azure-rest/ai-document-intelligence'
  runtime: typescript
---

# Azure AI Document Intelligence TypeScript

Gunakan skill ini saat perlu mengekstrak teks, tabel, dan field terstruktur dari dokumen menggunakan Azure AI Document Intelligence REST SDK di TypeScript/Node.js.

## Kapan digunakan

Gunakan saat perlu:
- OCR dan ekstraksi layout,
- ekstraksi invoice, receipt, ID document, atau kontrak,
- polling long-running operation dari REST SDK,
- membangun custom model,
- membangun document classifier,
- atau memproses dokumen untuk workflow backend.

## Dependensi inti

```bash
npm install @azure-rest/ai-document-intelligence @azure/identity
```

Variabel lingkungan umum:

```bash
DOCUMENT_INTELLIGENCE_ENDPOINT=https://<resource>.cognitiveservices.azure.com
DOCUMENT_INTELLIGENCE_API_KEY=<api-key>
TRAINING_CONTAINER_SAS_URL=https://<storage>.blob.core.windows.net/<container>?<sas>
```

## Autentikasi

Penting: `DocumentIntelligence` adalah fungsi REST client, bukan class.

### Entra ID

```typescript
import DocumentIntelligence from "@azure-rest/ai-document-intelligence";
import { DefaultAzureCredential } from "@azure/identity";

const client = DocumentIntelligence(
  process.env.DOCUMENT_INTELLIGENCE_ENDPOINT!,
  new DefaultAzureCredential()
);
```

### API key

```typescript
import DocumentIntelligence from "@azure-rest/ai-document-intelligence";

const client = DocumentIntelligence(
  process.env.DOCUMENT_INTELLIGENCE_ENDPOINT!,
  { key: process.env.DOCUMENT_INTELLIGENCE_API_KEY! }
);
```

## Model prebuilt yang umum

- `prebuilt-read`
- `prebuilt-layout`
- `prebuilt-invoice`
- `prebuilt-receipt`
- `prebuilt-idDocument`
- `prebuilt-tax.us.w2`
- `prebuilt-healthInsuranceCard.us`
- `prebuilt-contract`
- `prebuilt-bankStatement.us`

## Pola implementasi inti

### Analisis dokumen dari URL

```typescript
import DocumentIntelligence, {
  isUnexpected,
  getLongRunningPoller,
  AnalyzeOperationOutput
} from "@azure-rest/ai-document-intelligence";

const initialResponse = await client
  .path("/documentModels/{modelId}:analyze", "prebuilt-layout")
  .post({
    contentType: "application/json",
    body: {
      urlSource: "https://example.com/document.pdf"
    },
    queryParameters: { locale: "en-US" }
  });

if (isUnexpected(initialResponse)) {
  throw initialResponse.body.error;
}

const poller = getLongRunningPoller(client, initialResponse);
const result = (await poller.pollUntilDone()).body as AnalyzeOperationOutput;
```

### Analisis dokumen dari file lokal

```typescript
import { readFile } from "node:fs/promises";

const fileBuffer = await readFile("./document.pdf");
const base64Source = fileBuffer.toString("base64");

const initialResponse = await client
  .path("/documentModels/{modelId}:analyze", "prebuilt-invoice")
  .post({
    contentType: "application/json",
    body: { base64Source }
  });
```

### Ekstraksi field invoice

```typescript
const initialResponse = await client
  .path("/documentModels/{modelId}:analyze", "prebuilt-invoice")
  .post({
    contentType: "application/json",
    body: { urlSource: invoiceUrl }
  });

if (isUnexpected(initialResponse)) {
  throw initialResponse.body.error;
}

const poller = getLongRunningPoller(client, initialResponse);
const result = (await poller.pollUntilDone()).body as AnalyzeOperationOutput;

const invoice = result.analyzeResult?.documents?.[0];
if (invoice) {
  console.log("Vendor:", invoice.fields?.VendorName?.content);
  console.log("Total:", invoice.fields?.InvoiceTotal?.content);
}
```

### Ekstraksi field receipt

```typescript
const initialResponse = await client
  .path("/documentModels/{modelId}:analyze", "prebuilt-receipt")
  .post({
    contentType: "application/json",
    body: { urlSource: receiptUrl }
  });
```

## List model

```typescript
import { paginate } from "@azure-rest/ai-document-intelligence";

const response = await client.path("/documentModels").get();
if (isUnexpected(response)) {
  throw response.body.error;
}

for await (const model of paginate(client, response)) {
  console.log(model.modelId);
}
```

## Build custom model

```typescript
const initialResponse = await client.path("/documentModels:build").post({
  body: {
    modelId: "my-custom-model",
    description: "Custom model untuk purchase order",
    buildMode: "template",
    azureBlobSource: {
      containerUrl: process.env.TRAINING_CONTAINER_SAS_URL!,
      prefix: "training-data/"
    }
  }
});
```

Gunakan `template` atau `neural` sesuai karakter dokumen dan volume data.

## Build document classifier

```typescript
const initialResponse = await client.path("/documentClassifiers:build").post({
  body: {
    classifierId: "my-classifier",
    description: "Classifier invoice vs receipt"
  }
});
```

Gunakan classifier bila satu endpoint menerima banyak tipe dokumen.

## Praktik implementasi yang disarankan

- Selalu tangani `isUnexpected()` pada setiap response.
- Bungkus pola polling ke helper reusable.
- Simpan hasil mentah dan hasil normalisasi terpisah.
- Validasi confidence sebelum mengisi field bisnis penting.
- Mulai dari model prebuilt sebelum membuat custom model.
- Gunakan SAS URL yang valid selama proses training berlangsung.

## Checklist debugging cepat

Jika hasil tidak sesuai ekspektasi, cek:
1. endpoint dan kredensial benar,
2. `DocumentIntelligence` dipakai sebagai fungsi,
3. polling long-running operation benar-benar dijalankan,
4. model ID valid,
5. file base64 atau URL sumber valid,
6. tipe dokumen cocok dengan model yang dipilih.

## Hasil yang diharapkan

Setelah mengikuti skill ini, implementasi TypeScript seharusnya mampu:
- menganalisis dokumen dengan model prebuilt,
- menangani polling operasi jangka panjang,
- membangun custom model dan classifier,
- serta mengintegrasikan hasil ekstraksi ke workflow backend.
