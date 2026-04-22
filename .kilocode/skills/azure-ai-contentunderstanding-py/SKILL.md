---
name: azure-ai-contentunderstanding-py
description: Gunakan saat membangun ekstraksi multimodal dengan Azure AI Content Understanding SDK untuk Python, termasuk analisis dokumen, gambar, audio, video, dan custom analyzer untuk field terstruktur.
license: Complete terms in LICENSE.txt
metadata:
  category: ai-development
  source:
    repository: https://github.com/antiwork/antigravity-skills
    path: skills/azure-ai-contentunderstanding-py
  language: id
  sdk: azure-ai-contentunderstanding
  runtime: python
---

# Azure AI Content Understanding Python

Gunakan skill ini saat perlu mengekstrak konten semantik dari dokumen, gambar, audio, atau video menggunakan Azure AI Content Understanding di Python.

## Kapan digunakan

Gunakan saat perlu:
- mengekstrak markdown atau struktur dokumen untuk RAG,
- membaca isi gambar secara semantik,
- mentranskripsi audio,
- mengekstrak transcript, key frame, atau ringkasan video,
- membuat custom analyzer dengan field schema,
- atau membangun pipeline ekstraksi multimodal.

## Dependensi inti

```bash
pip install azure-ai-contentunderstanding
```

Variabel lingkungan minimum:

```bash
CONTENTUNDERSTANDING_ENDPOINT=https://<resource>.cognitiveservices.azure.com/
```

## Autentikasi

```python
import os
from azure.ai.contentunderstanding import ContentUnderstandingClient
from azure.identity import DefaultAzureCredential

endpoint = os.environ["CONTENTUNDERSTANDING_ENDPOINT"]
credential = DefaultAzureCredential()
client = ContentUnderstandingClient(endpoint=endpoint, credential=credential)
```

## Model mental layanan

Operasi utama bersifat asynchronous long-running operation:
1. mulai analisis dengan `begin_analyze()`,
2. tunggu hasil dengan poller,
3. baca hasil terstruktur dari `result.contents` atau `result.fields`.

## Analyzer bawaan yang umum

- `prebuilt-documentSearch` untuk dokumen dan output markdown.
- `prebuilt-imageSearch` untuk gambar.
- `prebuilt-audioSearch` untuk audio.
- `prebuilt-videoSearch` untuk video.
- `prebuilt-invoice` untuk ekstraksi invoice.

## Pola implementasi inti

### Analisis dokumen

```python
from azure.ai.contentunderstanding.models import AnalyzeInput

poller = client.begin_analyze(
    analyzer_id="prebuilt-documentSearch",
    inputs=[AnalyzeInput(url="https://example.com/document.pdf")]
)

result = poller.result()
content = result.contents[0]
print(content.markdown)
```

Gunakan output markdown untuk indexing RAG atau summarization pipeline.

### Akses detail dokumen

```python
from azure.ai.contentunderstanding.models import MediaContentKind, DocumentContent

content = result.contents[0]
if content.kind == MediaContentKind.DOCUMENT:
    document_content: DocumentContent = content
    print(document_content.start_page_number)
```

### Analisis gambar

```python
from azure.ai.contentunderstanding.models import AnalyzeInput

poller = client.begin_analyze(
    analyzer_id="prebuilt-imageSearch",
    inputs=[AnalyzeInput(url="https://example.com/image.jpg")]
)
result = poller.result()
print(result.contents[0].markdown)
```

### Analisis video

```python
poller = client.begin_analyze(
    analyzer_id="prebuilt-videoSearch",
    inputs=[AnalyzeInput(url="https://example.com/video.mp4")]
)

result = poller.result()
content = result.contents[0]

for phrase in content.transcript_phrases:
    print(f"[{phrase.start_time} - {phrase.end_time}]: {phrase.text}")

for frame in content.key_frames:
    print(f"Frame at {frame.time}: {frame.description}")
```

### Analisis audio

```python
poller = client.begin_analyze(
    analyzer_id="prebuilt-audioSearch",
    inputs=[AnalyzeInput(url="https://example.com/audio.mp3")]
)

result = poller.result()
content = result.contents[0]
for phrase in content.transcript_phrases:
    print(f"[{phrase.start_time}] {phrase.text}")
```

## Custom analyzer

Gunakan custom analyzer bila perlu field terstruktur spesifik domain:

```python
analyzer = client.create_analyzer(
    analyzer_id="my-invoice-analyzer",
    analyzer={
        "description": "Custom invoice analyzer",
        "base_analyzer_id": "prebuilt-documentSearch",
        "field_schema": {
            "fields": {
                "vendor_name": {"type": "string"},
                "invoice_total": {"type": "number"},
                "line_items": {
                    "type": "array",
                    "items": {
                        "type": "object",
                        "properties": {
                            "description": {"type": "string"},
                            "amount": {"type": "number"}
                        }
                    }
                }
            }
        }
    }
)
```

Lalu gunakan analyzer tersebut:

```python
poller = client.begin_analyze(
    analyzer_id="my-invoice-analyzer",
    inputs=[AnalyzeInput(url="https://example.com/invoice.pdf")]
)

result = poller.result()
print(result.fields["vendor_name"])
print(result.fields["invoice_total"])
```

## Manajemen analyzer

```python
analyzers = client.list_analyzers()
for analyzer in analyzers:
    print(f"{analyzer.analyzer_id}: {analyzer.description}")

client.get_analyzer("prebuilt-documentSearch")
client.delete_analyzer("my-custom-analyzer")
```

## Async client

Gunakan client async bila pipeline memproses banyak file paralel:

```python
from azure.ai.contentunderstanding.aio import ContentUnderstandingClient
from azure.identity.aio import DefaultAzureCredential
```

Pastikan lifecycle credential async ditutup dengan benar.

## Praktik implementasi yang disarankan

- Pilih analyzer paling spesifik untuk tipe media.
- Simpan hasil markdown dan field terstruktur secara terpisah.
- Gunakan URL blob yang stabil untuk file besar.
- Tambahkan timeout dan retry di level aplikasi.
- Validasi hasil `contents` sebelum mengakses indeks pertama.
- Untuk custom analyzer, mulai dari schema kecil lalu iterasi berdasarkan error nyata.

## Checklist debugging cepat

Jika hasil tidak sesuai ekspektasi, cek:
1. endpoint benar,
2. kredensial punya izin,
3. URL input dapat diakses layanan,
4. analyzer ID valid,
5. operasi long-running benar-benar ditunggu sampai selesai,
6. struktur `result.contents` atau `result.fields` sesuai tipe media.

## Hasil yang diharapkan

Setelah mengikuti skill ini, implementasi Python seharusnya mampu:
- mengekstrak konten dari dokumen, gambar, audio, dan video,
- memanfaatkan analyzer bawaan maupun custom,
- serta menghasilkan output multimodal yang siap dipakai untuk RAG atau workflow otomatis.
