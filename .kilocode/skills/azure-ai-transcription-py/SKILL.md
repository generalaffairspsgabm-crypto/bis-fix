---
name: azure-ai-transcription-py
description: Gunakan saat membangun speech-to-text dengan Azure AI Transcription SDK Python, termasuk transkripsi batch, streaming real-time, timestamp, dan diarization.
---

# Azure AI Transcription SDK untuk Python

Skill ini dipakai saat perlu mentranskripsi audio menjadi teks menggunakan Azure AI Transcription dari Python, baik untuk file panjang berbasis batch maupun aliran audio real-time.

## Kapan digunakan

Gunakan skill ini ketika pekerjaan mencakup:

- Batch transcription untuk file audio di storage.
- Streaming transcription real-time.
- Timestamp untuk subtitle atau alignment.
- Diarization untuk banyak pembicara.
- Pipeline transkripsi meeting, call center, atau wawancara.

## Dependensi

```bash
pip install azure-ai-transcription
```

## Variabel lingkungan

```bash
TRANSCRIPTION_ENDPOINT=https://<resource>.cognitiveservices.azure.com
TRANSCRIPTION_KEY=<api-key>
```

## Autentikasi

Client ini menggunakan subscription key.

```python
import os
from azure.ai.transcription import TranscriptionClient

client = TranscriptionClient(
    endpoint=os.environ["TRANSCRIPTION_ENDPOINT"],
    credential=os.environ["TRANSCRIPTION_KEY"],
)
```

## Workflow inti

### 1. Batch transcription

Gunakan untuk file panjang yang sudah tersedia di blob storage atau URL yang dapat diakses service.

```python
job = client.begin_transcription(
    name="meeting-transcription",
    locale="en-US",
    content_urls=["https://<storage>/audio.wav"],
    diarization_enabled=True,
)

result = job.result()
print(result.status)
```

### 2. Streaming transcription real-time

Gunakan untuk audio langsung atau file yang dikirim bertahap.

```python
stream = client.begin_stream_transcription(locale="en-US")
stream.send_audio_file("audio.wav")

for event in stream:
    print(event.text)
```

## Praktik kerja yang disarankan

1. Aktifkan diarization bila ada lebih dari satu pembicara.
2. Gunakan batch transcription untuk file panjang agar lebih stabil dan mudah dipantau.
3. Simpan timestamp bila hasil akan dipakai untuk subtitle, pencarian, atau sinkronisasi media.
4. Tentukan locale secara eksplisit untuk meningkatkan akurasi.
5. Tangani backpressure pada streaming agar buffer audio tidak menumpuk.
6. Tutup sesi streaming setelah selesai untuk mencegah resource bocor.

## Checklist implementasi

- Verifikasi endpoint dan key valid.
- Verifikasi format audio didukung dan dapat diakses service.
- Verifikasi locale sesuai bahasa dominan audio.
- Verifikasi diarization diaktifkan bila multi-speaker.
- Verifikasi sesi streaming ditutup setelah selesai.

## Batasan penting

- SDK ini tidak selalu mendukung pola autentikasi yang sama dengan SDK Azure lain; gunakan key bila memang diwajibkan.
- Akurasi sangat dipengaruhi kualitas audio, noise, dan pemilihan locale.
- Streaming transcription memerlukan pengelolaan aliran audio yang disiplin agar hasil stabil.

## Referensi mandiri

- Dokumentasi Azure AI Speech dan transcription: https://learn.microsoft.com/azure/ai-services/speech-service/
- Dokumentasi Speech to Text: https://learn.microsoft.com/azure/ai-services/speech-service/speech-to-text
