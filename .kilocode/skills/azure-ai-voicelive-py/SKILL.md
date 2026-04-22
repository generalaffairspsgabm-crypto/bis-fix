---
name: azure-ai-voicelive-py
description: Gunakan saat membangun aplikasi voice AI real-time di Python dengan Azure AI Voice Live, termasuk koneksi WebSocket dua arah, streaming audio, event handling, dan function calling.
license: Complete terms in LICENSE.txt
metadata:
  category: ai
  source:
    upstream: .tmp-antigravity-skills/skills/azure-ai-voicelive-py
    type: community
  depends_on:
    - resource Azure AI dengan endpoint Voice Live aktif
    - `DefaultAzureCredential` atau API key
    - paket `azure-ai-voicelive`
    - pipeline audio PCM16 24kHz mono
---

# Azure AI Voice Live untuk Python

Skill ini merangkum pola implementasi Voice Live di Python untuk percakapan suara real-time. Fokusnya adalah koneksi async, konfigurasi sesi, streaming audio base64 PCM16, pemrosesan event, mode turn detection otomatis atau manual, dan integrasi function calling.

## Kapan digunakan

Gunakan skill ini saat perlu:
- membuat voice assistant real-time di Python
- mengirim audio mikrofon ke model dan menerima audio respons
- mengaktifkan transkripsi input audio
- mengelola sesi suara berbasis event async
- menambahkan tool/function ke percakapan suara

## Instalasi

```bash
pip install azure-ai-voicelive aiohttp azure-identity
```

## Variabel lingkungan

```bash
AZURE_COGNITIVE_SERVICES_ENDPOINT=https://<region>.api.cognitive.microsoft.com
AZURE_COGNITIVE_SERVICES_KEY=<api-key>
```

## Autentikasi

### DefaultAzureCredential

```python
import os
from azure.ai.voicelive.aio import connect
from azure.identity.aio import DefaultAzureCredential

async with connect(
    endpoint=os.environ["AZURE_COGNITIVE_SERVICES_ENDPOINT"],
    credential=DefaultAzureCredential(),
    model="gpt-4o-realtime-preview",
    credential_scopes=["https://cognitiveservices.azure.com/.default"],
) as conn:
    ...
```

### API key

```python
import os
from azure.ai.voicelive.aio import connect
from azure.core.credentials import AzureKeyCredential

async with connect(
    endpoint=os.environ["AZURE_COGNITIVE_SERVICES_ENDPOINT"],
    credential=AzureKeyCredential(os.environ["AZURE_COGNITIVE_SERVICES_KEY"]),
    model="gpt-4o-realtime-preview",
) as conn:
    ...
```

## Quick start

```python
import asyncio
import os
from azure.ai.voicelive.aio import connect
from azure.identity.aio import DefaultAzureCredential

async def main():
    async with connect(
        endpoint=os.environ["AZURE_COGNITIVE_SERVICES_ENDPOINT"],
        credential=DefaultAzureCredential(),
        model="gpt-4o-realtime-preview",
        credential_scopes=["https://cognitiveservices.azure.com/.default"],
    ) as conn:
        await conn.session.update(session={
            "instructions": "Anda adalah asisten suara yang membantu.",
            "modalities": ["text", "audio"],
            "voice": "alloy",
        })

        async for event in conn:
            print(f"Event: {event.type}")
            if event.type == "response.audio_transcript.done":
                print(f"Transcript: {event.transcript}")
            elif event.type == "response.done":
                break

asyncio.run(main())
```

## Resource koneksi utama

| Resource | Kegunaan | Method penting |
|---|---|---|
| `conn.session` | konfigurasi sesi | `update()` |
| `conn.response` | membuat atau membatalkan respons | `create()`, `cancel()` |
| `conn.input_audio_buffer` | audio input | `append()`, `commit()`, `clear()` |
| `conn.output_audio_buffer` | audio output | `clear()` |
| `conn.conversation` | state percakapan | `item.create()`, `item.delete()` |
| `conn.transcription_session` | konfigurasi transkripsi | `update()` |

## Konfigurasi sesi

```python
from azure.ai.voicelive.models import RequestSession, FunctionTool

await conn.session.update(session=RequestSession(
    instructions="Anda adalah asisten suara yang membantu.",
    modalities=["text", "audio"],
    voice="alloy",
    input_audio_format="pcm16",
    output_audio_format="pcm16",
    turn_detection={
        "type": "server_vad",
        "threshold": 0.5,
        "prefix_padding_ms": 300,
        "silence_duration_ms": 500,
    },
    tools=[
        FunctionTool(
            type="function",
            name="get_weather",
            description="Ambil cuaca terkini",
            parameters={
                "type": "object",
                "properties": {
                    "location": {"type": "string"}
                },
                "required": ["location"],
            },
        )
    ],
))
```

## Streaming audio

### Kirim audio

```python
import base64

audio_chunk = await read_audio_from_microphone()  # PCM16 24kHz mono
b64_audio = base64.b64encode(audio_chunk).decode()
await conn.input_audio_buffer.append(audio=b64_audio)
```

### Terima audio

```python
import base64

async for event in conn:
    if event.type == "response.audio.delta":
        audio_bytes = base64.b64decode(event.delta)
        await play_audio(audio_bytes)
    elif event.type == "response.audio.done":
        print("Audio selesai")
```

## Event handling

```python
import json
import base64

async for event in conn:
    match event.type:
        case "session.created":
            print(f"Session: {event.session}")
        case "session.updated":
            print("Session updated")
        case "input_audio_buffer.speech_started":
            print(f"Speech started at {event.audio_start_ms}ms")
        case "input_audio_buffer.speech_stopped":
            print(f"Speech stopped at {event.audio_end_ms}ms")
        case "conversation.item.input_audio_transcription.completed":
            print(f"User said: {event.transcript}")
        case "conversation.item.input_audio_transcription.delta":
            print(f"Partial: {event.delta}")
        case "response.created":
            print(f"Response started: {event.response.id}")
        case "response.audio_transcript.delta":
            print(event.delta, end="", flush=True)
        case "response.audio.delta":
            audio = base64.b64decode(event.delta)
        case "response.done":
            print(f"Response complete: {event.response.status}")
        case "response.function_call_arguments.done":
            result = handle_function(event.name, event.arguments)
            await conn.conversation.item.create(item={
                "type": "function_call_output",
                "call_id": event.call_id,
                "output": json.dumps(result),
            })
            await conn.response.create()
        case "error":
            print(f"Error: {event.error.message}")
```

## Manual turn mode

```python
await conn.session.update(session={"turn_detection": None})
await conn.input_audio_buffer.append(audio=b64_audio)
await conn.input_audio_buffer.commit()
await conn.response.create()
```

Gunakan mode ini bila Anda ingin mengontrol akhir giliran bicara secara eksplisit, misalnya pada push-to-talk.

## Praktik yang disarankan

- gunakan `DefaultAzureCredential` untuk produksi
- pastikan audio input selalu PCM16 mono 24kHz
- proses event secara streaming agar UX tetap responsif
- tangani event `error` dan status koneksi secara eksplisit
- gunakan VAD untuk percakapan natural, atau manual turn untuk kontrol penuh
- batasi tools hanya pada fungsi yang benar-benar dibutuhkan

## Checklist implementasi

1. Siapkan endpoint dan kredensial.
2. Buka koneksi dengan `connect()`.
3. Konfigurasikan sesi, modalitas, voice, dan turn detection.
4. Stream audio input ke `input_audio_buffer`.
5. Proses event audio, transcript, response, dan error.
6. Tangani function call bila tools diaktifkan.

## Sumber upstream

Konten dinormalisasi dari `.tmp-antigravity-skills/skills/azure-ai-voicelive-py` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
