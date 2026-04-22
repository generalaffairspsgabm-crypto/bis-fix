---
name: azure-ai-contentsafety-ts
description: Gunakan saat membangun moderasi konten dengan Azure AI Content Safety REST SDK untuk TypeScript, termasuk analisis teks, gambar, severity scoring, dan blocklist kustom.
license: Complete terms in LICENSE.txt
metadata:
  category: ai-safety
  source:
    repository: https://github.com/antiwork/antigravity-skills
    path: skills/azure-ai-contentsafety-ts
  language: id
  sdk: '@azure-rest/ai-content-safety'
  runtime: typescript
---

# Azure AI Content Safety TypeScript

Gunakan skill ini saat perlu memoderasi teks atau gambar di aplikasi TypeScript/Node.js menggunakan Azure AI Content Safety REST SDK.

## Kapan digunakan

Gunakan saat perlu:
- memoderasi input pengguna,
- memoderasi output model,
- menerapkan severity threshold per kategori,
- mengelola blocklist kustom,
- atau membangun moderation middleware di backend Node.js.

## Dependensi inti

```bash
npm install @azure-rest/ai-content-safety @azure/identity @azure/core-auth
```

Variabel lingkungan umum:

```bash
CONTENT_SAFETY_ENDPOINT=https://<resource>.cognitiveservices.azure.com
CONTENT_SAFETY_KEY=<api-key>
```

## Autentikasi

Penting: SDK ini berbasis REST client. `ContentSafetyClient` adalah fungsi, bukan class.

### API key

```typescript
import ContentSafetyClient from "@azure-rest/ai-content-safety";
import { AzureKeyCredential } from "@azure/core-auth";

const client = ContentSafetyClient(
  process.env.CONTENT_SAFETY_ENDPOINT!,
  new AzureKeyCredential(process.env.CONTENT_SAFETY_KEY!)
);
```

### Entra ID

```typescript
import ContentSafetyClient from "@azure-rest/ai-content-safety";
import { DefaultAzureCredential } from "@azure/identity";

const client = ContentSafetyClient(
  process.env.CONTENT_SAFETY_ENDPOINT!,
  new DefaultAzureCredential()
);
```

## Pola implementasi inti

### Analisis teks

```typescript
import ContentSafetyClient, { isUnexpected } from "@azure-rest/ai-content-safety";

const result = await client.path("/text:analyze").post({
  body: {
    text: "Konten teks untuk dianalisis",
    categories: ["Hate", "Sexual", "Violence", "SelfHarm"],
    outputType: "FourSeverityLevels"
  }
});

if (isUnexpected(result)) {
  throw result.body;
}
```

### Analisis gambar dari file lokal

```typescript
import { readFileSync } from "node:fs";

const imageBuffer = readFileSync("./image.png");
const base64Image = imageBuffer.toString("base64");

const result = await client.path("/image:analyze").post({
  body: {
    image: { content: base64Image }
  }
});

if (isUnexpected(result)) {
  throw result.body;
}
```

### Analisis gambar dari URL blob

```typescript
const result = await client.path("/image:analyze").post({
  body: {
    image: { blobUrl: "https://storage.blob.core.windows.net/container/image.png" }
  }
});
```

## Blocklist kustom

### Buat blocklist

```typescript
const result = await client
  .path("/text/blocklists/{blocklistName}", "my-blocklist")
  .patch({
    contentType: "application/merge-patch+json",
    body: {
      description: "Blocklist kustom untuk istilah terlarang"
    }
  });

if (isUnexpected(result)) {
  throw result.body;
}
```

### Tambahkan item blocklist

```typescript
const result = await client
  .path("/text/blocklists/{blocklistName}:addOrUpdateBlocklistItems", "my-blocklist")
  .post({
    body: {
      blocklistItems: [
        { text: "prohibited-term-1", description: "Istilah pertama" },
        { text: "prohibited-term-2", description: "Istilah kedua" }
      ]
    }
  });

if (isUnexpected(result)) {
  throw result.body;
}
```

### Analisis teks dengan blocklist

```typescript
const result = await client.path("/text:analyze").post({
  body: {
    text: "Teks yang mungkin mengandung istilah terlarang",
    blocklistNames: ["my-blocklist"],
    haltOnBlocklistHit: true
  }
});

if (isUnexpected(result)) {
  throw result.body;
}
```

## Kategori dan severity

Kategori utama API:
- `Hate`
- `Sexual`
- `Violence`
- `SelfHarm`

Output severity:
- `FourSeverityLevels`: `0`, `2`, `4`, `6`
- `EightSeverityLevels`: `0-7`

Gunakan `EightSeverityLevels` bila perlu kontrol kebijakan yang lebih detail.

## Strategi keputusan moderasi

Contoh kebijakan sederhana:
- `0`: izinkan,
- `2`: izinkan dengan logging,
- `4`: tahan untuk review,
- `6+` atau blocklist hit: tolak.

Pisahkan aturan ini ke fungsi policy tersendiri agar mudah diuji.

## Praktik implementasi yang disarankan

- Moderasi input dan output model.
- Gunakan helper wrapper agar semua endpoint moderation konsisten.
- Tangani `isUnexpected(result)` di semua request.
- Simpan hasil kategori dan severity untuk audit.
- Gunakan blocklist untuk istilah lokal, brand safety, atau compliance internal.
- Tambahkan fallback aman bila layanan moderation gagal.

## Checklist debugging cepat

Jika hasil tidak sesuai ekspektasi, cek:
1. endpoint dan key benar,
2. `ContentSafetyClient` dipakai sebagai fungsi,
3. payload body sesuai bentuk REST SDK,
4. gambar sudah di-encode base64 dengan benar,
5. output type sesuai kebutuhan,
6. blocklist name benar dan sudah dibuat.

## Hasil yang diharapkan

Setelah mengikuti skill ini, implementasi TypeScript seharusnya mampu:
- menganalisis teks dan gambar,
- menerapkan severity threshold,
- mengelola blocklist kustom,
- dan membangun moderation layer yang aman untuk aplikasi AI.
