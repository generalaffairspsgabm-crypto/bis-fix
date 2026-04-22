---
name: azure-ai-translation-ts
description: Gunakan saat membangun terjemahan teks dan dokumen dengan Azure Translator REST SDK TypeScript, termasuk translate, detect, transliterate, single document translation, dan batch document translation.
---

# Azure Translation SDK untuk TypeScript

Skill ini dipakai saat perlu mengakses Azure Translator dari TypeScript atau Node.js menggunakan REST-style client untuk text translation dan document translation.

## Kapan digunakan

Gunakan skill ini ketika pekerjaan mencakup:

- Terjemahan teks real-time.
- Deteksi bahasa dan transliterasi.
- Pengambilan daftar bahasa yang didukung.
- Single document translation.
- Batch document translation berbasis container SAS.
- Integrasi translator ke backend Node.js atau service TypeScript.

## Dependensi

Untuk text translation:

```bash
npm install @azure-rest/ai-translation-text @azure/identity
```

Untuk document translation:

```bash
npm install @azure-rest/ai-translation-document @azure/identity
```

## Variabel lingkungan

```bash
TRANSLATOR_ENDPOINT=https://api.cognitive.microsofttranslator.com
TRANSLATOR_SUBSCRIPTION_KEY=<api-key>
TRANSLATOR_REGION=<region>
```

## Text Translation Client

### Autentikasi

```typescript
import TextTranslationClient, { TranslatorCredential } from "@azure-rest/ai-translation-text";

const credential: TranslatorCredential = {
  key: process.env.TRANSLATOR_SUBSCRIPTION_KEY!,
  region: process.env.TRANSLATOR_REGION!,
};

const client = TextTranslationClient(process.env.TRANSLATOR_ENDPOINT!, credential);
```

Alternatif bila memakai endpoint global default:

```typescript
const client = TextTranslationClient(credential);
```

### Translate text

```typescript
import TextTranslationClient, { isUnexpected } from "@azure-rest/ai-translation-text";

const response = await client.path("/translate").post({
  body: {
    inputs: [
      {
        text: "Hello, how are you?",
        language: "en",
        targets: [{ language: "es" }, { language: "fr" }],
      },
    ],
  },
});

if (isUnexpected(response)) {
  throw response.body.error;
}

for (const result of response.body.value) {
  for (const translation of result.translations) {
    console.log(translation.language, translation.text);
  }
}
```

### Translate dengan opsi

```typescript
const response = await client.path("/translate").post({
  body: {
    inputs: [
      {
        text: "Hello world",
        language: "en",
        textType: "Plain",
        targets: [
          {
            language: "de",
            profanityAction: "NoAction",
            tone: "formal",
          },
        ],
      },
    ],
  },
});
```

### Get supported languages

```typescript
const response = await client.path("/languages").get();

if (isUnexpected(response)) {
  throw response.body.error;
}

for (const [code, lang] of Object.entries(response.body.translation || {})) {
  console.log(code, lang.name, lang.nativeName);
}
```

### Transliterate

```typescript
const response = await client.path("/transliterate").post({
  body: { inputs: [{ text: "这是个测试" }] },
  queryParameters: {
    language: "zh-Hans",
    fromScript: "Hans",
    toScript: "Latn",
  },
});

if (!isUnexpected(response)) {
  for (const item of response.body.value) {
    console.log(item.script, item.text);
  }
}
```

### Detect language

```typescript
const response = await client.path("/detect").post({
  body: { inputs: [{ text: "Bonjour le monde" }] },
});

if (!isUnexpected(response)) {
  for (const result of response.body.value) {
    console.log(result.language, result.score);
  }
}
```

## Document Translation Client

### Autentikasi

```typescript
import DocumentTranslationClient from "@azure-rest/ai-translation-document";
import { DefaultAzureCredential } from "@azure/identity";

const endpoint = "https://<translator>.cognitiveservices.azure.com";
const client = DocumentTranslationClient(endpoint, new DefaultAzureCredential());
```

Alternatif API key:

```typescript
const client = DocumentTranslationClient(endpoint, { key: "<api-key>" });
```

### Single document translation

```typescript
import { writeFile } from "node:fs/promises";

const response = await client.path("/document:translate").post({
  queryParameters: {
    targetLanguage: "es",
    sourceLanguage: "en",
  },
  contentType: "multipart/form-data",
  body: [
    {
      name: "document",
      body: "Hello, this is a test document.",
      filename: "test.txt",
      contentType: "text/plain",
    },
  ],
}).asNodeStream();

if (response.status === "200") {
  await writeFile("translated.txt", response.body);
}
```

### Batch document translation

```typescript
const response = await client.path("/document/batches").post({
  body: {
    inputs: [
      {
        source: { sourceUrl: sourceSas },
        targets: [{ targetUrl: targetSas, language: "fr" }],
      },
    ],
  },
});
```

Gunakan SAS URL dengan permission minimum yang cukup untuk baca sumber dan tulis target.

## Praktik kerja yang disarankan

1. Gunakan helper [`isUnexpected()`](https://learn.microsoft.com/javascript/api/overview/azure-rest-ai-translation-text-readme) untuk semua response text translation.
2. Pisahkan client text dan document translation agar konfigurasi lebih jelas.
3. Gunakan endpoint global hanya bila sesuai dengan model deployment resource yang dipakai.
4. Validasi bahasa target sebelum request untuk mengurangi error runtime.
5. Gunakan SAS URL dengan masa berlaku pendek untuk batch document translation.
6. Simpan operation metadata bila batch translation perlu dipantau atau diulang.

## Checklist implementasi

- Verifikasi endpoint, key, dan region benar.
- Verifikasi pasangan bahasa didukung.
- Verifikasi `contentType` cocok untuk single document translation.
- Verifikasi SAS URL sumber dan target valid untuk batch.
- Verifikasi error handling pada response tak terduga.

## Batasan penting

- Text translation dan document translation memakai paket berbeda dengan surface API berbeda.
- Transliteration hanya mengubah script, bukan arti.
- Batch document translation sangat bergantung pada izin storage dan SAS URL.

## Referensi mandiri

- Dokumentasi Azure REST Text Translation TypeScript: https://learn.microsoft.com/javascript/api/overview/azure-rest-ai-translation-text-readme
- Dokumentasi Azure REST Document Translation TypeScript: https://learn.microsoft.com/javascript/api/overview/azure-rest-ai-translation-document-readme
- Dokumentasi Azure AI Translator: https://learn.microsoft.com/azure/ai-services/translator/
