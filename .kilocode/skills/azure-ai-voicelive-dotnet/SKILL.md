---
name: azure-ai-voicelive-dotnet
description: Gunakan saat membangun aplikasi voice AI real-time di .NET dengan Azure AI Voice Live, termasuk sesi WebSocket dua arah, streaming audio, event loop, dan function calling.
license: Complete terms in LICENSE.txt
metadata:
  category: ai
  source:
    upstream: .tmp-antigravity-skills/skills/azure-ai-voicelive-dotnet
    type: community
  depends_on:
    - resource Azure AI dengan endpoint Voice Live aktif
    - `DefaultAzureCredential` atau API key
    - paket `Azure.AI.VoiceLive`
    - library audio seperti `NAudio` bila perlu capture/playback lokal
---

# Azure AI Voice Live untuk .NET

Skill ini memandu implementasi asisten suara real-time berbasis Azure AI Voice Live di .NET. Fokusnya adalah sesi dua arah melalui WebSocket, konfigurasi voice session, streaming audio masuk dan keluar, event handling, serta integrasi function calling.

## Kapan digunakan

Gunakan skill ini saat perlu:
- membuat voice assistant real-time
- mengirim audio mikrofon dan menerima audio respons model
- menggabungkan modalitas teks dan audio dalam satu sesi
- mengatur turn detection berbasis VAD
- menangani function calling selama percakapan suara

## Instalasi

```bash
dotnet add package Azure.AI.VoiceLive
dotnet add package Azure.Identity
dotnet add package NAudio
```

Versi yang disebut upstream: stabil `1.0.0`, preview `1.1.0-beta.1`.

## Variabel lingkungan

```bash
AZURE_VOICELIVE_ENDPOINT=https://<resource>.services.ai.azure.com/
AZURE_VOICELIVE_MODEL=gpt-4o-realtime-preview
AZURE_VOICELIVE_VOICE=en-US-AvaNeural
AZURE_VOICELIVE_API_KEY=<api-key>
```

## Autentikasi

### Entra ID

```csharp
using Azure.AI.VoiceLive;
using Azure.Identity;

Uri endpoint = new Uri(Environment.GetEnvironmentVariable("AZURE_VOICELIVE_ENDPOINT")!);
VoiceLiveClient client = new VoiceLiveClient(endpoint, new DefaultAzureCredential());
```

Role yang umumnya dibutuhkan: `Cognitive Services User`.

### API key

```csharp
using Azure;
using Azure.AI.VoiceLive;

Uri endpoint = new Uri(Environment.GetEnvironmentVariable("AZURE_VOICELIVE_ENDPOINT")!);
AzureKeyCredential credential = new AzureKeyCredential(Environment.GetEnvironmentVariable("AZURE_VOICELIVE_API_KEY")!);
VoiceLiveClient client = new VoiceLiveClient(endpoint, credential);
```

## Struktur objek utama

```text
VoiceLiveClient
└── VoiceLiveSession
    ├── ConfigureSessionAsync()
    ├── GetUpdatesAsync()
    ├── AddItemAsync()
    ├── SendAudioAsync()
    └── StartResponseAsync()
```

## Alur kerja inti

### 1. Mulai sesi dan konfigurasi

```csharp
using Azure.AI.VoiceLive;
using Azure.Identity;

var endpoint = new Uri(Environment.GetEnvironmentVariable("AZURE_VOICELIVE_ENDPOINT")!);
var client = new VoiceLiveClient(endpoint, new DefaultAzureCredential());
var model = Environment.GetEnvironmentVariable("AZURE_VOICELIVE_MODEL") ?? "gpt-4o-mini-realtime-preview";

using VoiceLiveSession session = await client.StartSessionAsync(model);

VoiceLiveSessionOptions sessionOptions = new()
{
    Model = model,
    Instructions = "Anda adalah asisten suara yang membantu dan menjawab natural.",
    Voice = new AzureStandardVoice("en-US-AvaNeural"),
    TurnDetection = new AzureSemanticVadTurnDetection()
    {
        Threshold = 0.5f,
        PrefixPadding = TimeSpan.FromMilliseconds(300),
        SilenceDuration = TimeSpan.FromMilliseconds(500)
    },
    InputAudioFormat = InputAudioFormat.Pcm16,
    OutputAudioFormat = OutputAudioFormat.Pcm16
};

sessionOptions.Modalities.Clear();
sessionOptions.Modalities.Add(InteractionModality.Text);
sessionOptions.Modalities.Add(InteractionModality.Audio);

await session.ConfigureSessionAsync(sessionOptions);
```

### 2. Proses event server

```csharp
await foreach (SessionUpdate serverEvent in session.GetUpdatesAsync())
{
    switch (serverEvent)
    {
        case SessionUpdateResponseAudioDelta audioDelta:
            byte[] audioData = audioDelta.Delta.ToArray();
            // Putar audio dengan NAudio atau pipeline audio lain
            break;

        case SessionUpdateResponseTextDelta textDelta:
            Console.Write(textDelta.Delta);
            break;

        case SessionUpdateResponseFunctionCallArgumentsDone functionCall:
            Console.WriteLine($"Function call: {functionCall.Name}");
            break;

        case SessionUpdateError error:
            Console.WriteLine($"Error: {error.Error.Message}");
            break;

        case SessionUpdateResponseDone:
            Console.WriteLine("\n--- Respons selesai ---");
            break;
    }
}
```

### 3. Kirim pesan user berbasis teks

```csharp
await session.AddItemAsync(new UserMessageItem("Halo, bantu saya memahami status pesanan."));
await session.StartResponseAsync();
```

### 4. Kirim audio user

Gunakan `SendAudioAsync()` untuk mengirim chunk PCM16 dari mikrofon. Pastikan format audio konsisten dengan konfigurasi sesi.

## Function calling

```csharp
using System.Text.Json;

var weatherFunction = new VoiceLiveFunctionDefinition("get_current_weather")
{
    Description = "Ambil cuaca terkini untuk lokasi tertentu",
    Parameters = BinaryData.FromString("""
        {
            "type": "object",
            "properties": {
                "location": {
                    "type": "string",
                    "description": "Nama kota atau wilayah"
                }
            },
            "required": ["location"]
        }
        """)
};

sessionOptions.Tools.Add(weatherFunction);

if (serverEvent is SessionUpdateResponseFunctionCallArgumentsDone functionCall &&
    functionCall.Name == "get_current_weather")
{
    var parameters = JsonSerializer.Deserialize<Dictionary<string, string>>(functionCall.Arguments);
    string location = parameters?["location"] ?? "";
    string weatherInfo = $"Cuaca di {location} cerah, 29°C.";

    await session.AddItemAsync(new FunctionCallOutputItem(functionCall.CallId, weatherInfo));
    await session.StartResponseAsync();
}
```

## Opsi voice

| Jenis | Class | Contoh |
|---|---|---|
| Azure Standard | `AzureStandardVoice` | `en-US-AvaNeural` |
| Azure HD | `AzureStandardVoice` | `en-US-Ava:DragonHDLatestNeural` |
| Azure Custom | `AzureCustomVoice` | voice kustom dengan endpoint ID |

## Model yang umum dipakai

| Model | Kegunaan |
|---|---|
| `gpt-4o-realtime-preview` | voice AI real-time penuh |
| `gpt-4o-mini-realtime-preview` | lebih ringan dan cepat |
| `phi4-mm-realtime` | opsi multimodal hemat biaya |

## Praktik yang disarankan

- gunakan `DefaultAzureCredential` untuk produksi bila memungkinkan
- pastikan audio input PCM16 sesuai sample rate yang didukung pipeline Anda
- proses event audio dan teks secara streaming, jangan menunggu respons penuh bila UX harus real-time
- tangani `SessionUpdateError` secara eksplisit dan log detailnya
- batasi tool/function hanya yang benar-benar diperlukan
- tutup sesi dengan benar agar koneksi WebSocket tidak bocor

## Checklist implementasi

1. Siapkan endpoint, model, dan kredensial.
2. Buat `VoiceLiveClient` lalu mulai sesi.
3. Konfigurasikan modalitas, voice, VAD, dan format audio.
4. Jalankan loop `GetUpdatesAsync()`.
5. Kirim teks atau audio user.
6. Tangani audio delta, text delta, error, dan function call.

## Sumber upstream

Konten dinormalisasi dari `.tmp-antigravity-skills/skills/azure-ai-voicelive-dotnet` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
