---
name: azure-ai-voicelive-ts
description: Gunakan saat membangun aplikasi voice AI real-time di JavaScript atau TypeScript dengan Azure AI Voice Live, termasuk sesi WebSocket, streaming audio, subscription event, dan function calling.
license: Complete terms in LICENSE.txt
metadata:
  category: ai
  source:
    upstream: .tmp-antigravity-skills/skills/azure-ai-voicelive-ts
    type: community
  depends_on:
    - resource Azure AI dengan endpoint Voice Live aktif
    - `DefaultAzureCredential` atau API key
    - paket `@azure/ai-voicelive`
    - pipeline audio PCM16 untuk input/output
---

# Azure AI Voice Live untuk TypeScript

Skill ini merangkum pola implementasi Voice Live untuk JavaScript dan TypeScript di Node.js maupun browser modern. Fokusnya adalah pembuatan sesi, konfigurasi modalitas audio dan teks, subscription event, streaming audio, serta integrasi tool/function calling.

## Kapan digunakan

Gunakan skill ini saat perlu:
- membuat voice assistant real-time di Node.js atau browser
- mengirim audio mikrofon dan menerima audio respons model
- memproses transcript dan audio delta secara streaming
- mengatur turn detection berbasis VAD
- menambahkan function calling ke sesi suara

## Instalasi

```bash
npm install @azure/ai-voicelive @azure/identity
npm install @types/node
```

Versi upstream yang disebut: `1.0.0-beta.3`.

## Environment yang didukung

- Node.js LTS 20+
- browser modern seperti Chrome, Firefox, Safari, dan Edge

## Variabel lingkungan

```bash
AZURE_VOICELIVE_ENDPOINT=https://<resource>.cognitiveservices.azure.com
AZURE_VOICELIVE_API_KEY=<api-key>
AZURE_LOG_LEVEL=info
```

## Autentikasi

### Entra ID

```typescript
import { DefaultAzureCredential } from "@azure/identity";
import { VoiceLiveClient } from "@azure/ai-voicelive";

const credential = new DefaultAzureCredential();
const endpoint = process.env.AZURE_VOICELIVE_ENDPOINT!;
const client = new VoiceLiveClient(endpoint, credential);
```

### API key

```typescript
import { AzureKeyCredential } from "@azure/core-auth";
import { VoiceLiveClient } from "@azure/ai-voicelive";

const endpoint = process.env.AZURE_VOICELIVE_ENDPOINT!;
const credential = new AzureKeyCredential(process.env.AZURE_VOICELIVE_API_KEY!);
const client = new VoiceLiveClient(endpoint, credential);
```

## Struktur objek utama

```text
VoiceLiveClient
└── VoiceLiveSession
    ├── updateSession()
    ├── subscribe()
    ├── sendAudio()
    ├── addConversationItem()
    └── sendEvent()
```

## Quick start

```typescript
import { DefaultAzureCredential } from "@azure/identity";
import { VoiceLiveClient } from "@azure/ai-voicelive";

const credential = new DefaultAzureCredential();
const endpoint = process.env.AZURE_VOICELIVE_ENDPOINT!;

const client = new VoiceLiveClient(endpoint, credential);
const session = await client.startSession("gpt-4o-mini-realtime-preview");

await session.updateSession({
  modalities: ["text", "audio"],
  instructions: "Anda adalah asisten AI yang membantu dan menjawab natural.",
  voice: {
    type: "azure-standard",
    name: "en-US-AvaNeural",
  },
  turnDetection: {
    type: "server_vad",
    threshold: 0.5,
    prefixPaddingMs: 300,
    silenceDurationMs: 500,
  },
  inputAudioFormat: "pcm16",
  outputAudioFormat: "pcm16",
});

const subscription = session.subscribe({
  onResponseAudioDelta: async (event) => {
    playAudioChunk(event.delta);
  },
  onResponseTextDelta: async (event) => {
    process.stdout.write(event.delta);
  },
  onInputAudioTranscriptionCompleted: async (event) => {
    console.log("User said:", event.transcript);
  },
});

function sendAudioChunk(audioBuffer: ArrayBuffer) {
  session.sendAudio(audioBuffer);
}
```

## Konfigurasi sesi

```typescript
await session.updateSession({
  modalities: ["audio", "text"],
  instructions: "Anda adalah agen customer service.",
  voice: {
    type: "azure-standard",
    name: "en-US-AvaNeural",
  },
  turnDetection: {
    type: "server_vad",
    threshold: 0.5,
    prefixPaddingMs: 300,
    silenceDurationMs: 500,
  },
  inputAudioFormat: "pcm16",
  outputAudioFormat: "pcm16",
  tools: [
    {
      type: "function",
      name: "get_weather",
      description: "Ambil cuaca terkini",
      parameters: {
        type: "object",
        properties: {
          location: { type: "string" },
        },
        required: ["location"],
      },
    },
  ],
  toolChoice: "auto",
});
```

## Event handling

```typescript
const subscription = session.subscribe({
  onConnected: async (args) => {
    console.log("Connected:", args.connectionId);
  },
  onDisconnected: async (args) => {
    console.log("Disconnected:", args.code, args.reason);
  },
  onError: async (args) => {
    console.error("Error:", args.error.message);
  },
  onSessionCreated: async (_event, context) => {
    console.log("Session created:", context.sessionId);
  },
  onSessionUpdated: async () => {
    console.log("Session updated");
  },
  onInputAudioBufferSpeechStarted: async (event) => {
    console.log("Speech started at:", event.audioStartMs);
  },
  onInputAudioBufferSpeechStopped: async (event) => {
    console.log("Speech stopped at:", event.audioEndMs);
  },
  onConversationItemInputAudioTranscriptionCompleted: async (event) => {
    console.log("User said:", event.transcript);
  },
  onConversationItemInputAudioTranscriptionDelta: async (event) => {
    process.stdout.write(event.delta);
  },
  onResponseCreated: async () => {
    console.log("Response started");
  },
  onResponseDone: async () => {
    console.log("Response done");
  },
  onResponseAudioDelta: async (event) => {
    playAudioChunk(event.delta);
  },
  onResponseTextDelta: async (event) => {
    process.stdout.write(event.delta);
  },
});
```

## Function calling

Saat event function call diterima, jalankan fungsi lokal atau backend Anda, lalu kirim hasilnya kembali sebagai conversation item agar model dapat melanjutkan respons.

## Praktik yang disarankan

- gunakan `DefaultAzureCredential` untuk deployment produksi
- pastikan audio input sesuai format `pcm16`
- proses audio dan transcript secara streaming untuk UX real-time
- unsubscribe dan tutup sesi saat tidak dipakai
- tangani `onError` dan `onDisconnected` untuk recovery
- batasi tools hanya pada fungsi yang benar-benar diperlukan

## Checklist implementasi

1. Siapkan endpoint dan kredensial.
2. Buat `VoiceLiveClient` dan mulai sesi.
3. Konfigurasikan voice, modalitas, audio format, dan VAD.
4. Pasang subscription event.
5. Stream audio input dan proses audio/text delta.
6. Tangani function calling bila tools diaktifkan.

## Sumber upstream

Konten dinormalisasi dari `.tmp-antigravity-skills/skills/azure-ai-voicelive-ts` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
