---
name: azure-ai-contentsafety-py
description: Gunakan saat membangun moderasi konten dengan Azure AI Content Safety SDK untuk Python, termasuk analisis teks, gambar, severity classification, dan blocklist kustom.
license: Complete terms in LICENSE.txt
metadata:
  category: ai-safety
  source:
    repository: https://github.com/antiwork/antigravity-skills
    path: skills/azure-ai-contentsafety-py
  language: id
  sdk: azure-ai-contentsafety
  runtime: python
---

# Azure AI Content Safety Python

Gunakan skill ini saat perlu memoderasi konten teks atau gambar di aplikasi Python menggunakan Azure AI Content Safety.

## Kapan digunakan

Gunakan saat perlu:
- memeriksa input pengguna sebelum diproses model,
- memeriksa output model sebelum ditampilkan,
- mengklasifikasikan tingkat bahaya konten,
- menerapkan blocklist kustom,
- atau membangun moderation gateway untuk aplikasi AI.

## Dependensi inti

```bash
pip install azure-ai-contentsafety
```

Variabel lingkungan umum:

```bash
CONTENT_SAFETY_ENDPOINT=https://<resource>.cognitiveservices.azure.com
CONTENT_SAFETY_KEY=<api-key>
```

## Autentikasi

### API key

```python
from azure.ai.contentsafety import ContentSafetyClient
from azure.core.credentials import AzureKeyCredential
import os

client = ContentSafetyClient(
    endpoint=os.environ["CONTENT_SAFETY_ENDPOINT"],
    credential=AzureKeyCredential(os.environ["CONTENT_SAFETY_KEY"])
)
```

### Entra ID

```python
from azure.ai.contentsafety import ContentSafetyClient
from azure.identity import DefaultAzureCredential
import os

client = ContentSafetyClient(
    endpoint=os.environ["CONTENT_SAFETY_ENDPOINT"],
    credential=DefaultAzureCredential()
)
```

## Kategori bahaya

Kategori utama:
- `HATE`
- `SELF_HARM`
- `SEXUAL`
- `VIOLENCE`

Severity default biasanya 4 level (`0`, `2`, `4`, `6`). Untuk kontrol lebih halus, gunakan mode 8 level (`0-7`).

## Pola implementasi inti

### Analisis teks

```python
from azure.ai.contentsafety.models import AnalyzeTextOptions, TextCategory

request = AnalyzeTextOptions(text="Konten teks yang ingin dianalisis")
response = client.analyze_text(request)

for category in [TextCategory.HATE, TextCategory.SELF_HARM,
                 TextCategory.SEXUAL, TextCategory.VIOLENCE]:
    result = next((r for r in response.categories_analysis if r.category == category), None)
    if result:
        print(f"{category}: severity {result.severity}")
```

### Analisis gambar dari file

```python
from azure.ai.contentsafety.models import AnalyzeImageOptions, ImageData
import base64

with open("image.jpg", "rb") as f:
    image_data = base64.b64encode(f.read()).decode("utf-8")

request = AnalyzeImageOptions(image=ImageData(content=image_data))
response = client.analyze_image(request)
```

### Analisis gambar dari URL

```python
from azure.ai.contentsafety.models import AnalyzeImageOptions, ImageData

request = AnalyzeImageOptions(
    image=ImageData(blob_url="https://example.com/image.jpg")
)
response = client.analyze_image(request)
```

## Blocklist kustom

### Buat blocklist

```python
from azure.ai.contentsafety import BlocklistClient
from azure.ai.contentsafety.models import TextBlocklist
from azure.core.credentials import AzureKeyCredential

blocklist_client = BlocklistClient(
    os.environ["CONTENT_SAFETY_ENDPOINT"],
    AzureKeyCredential(os.environ["CONTENT_SAFETY_KEY"])
)

blocklist = TextBlocklist(
    blocklist_name="my-blocklist",
    description="Istilah kustom yang harus diblok"
)

blocklist_client.create_or_update_text_blocklist(
    blocklist_name="my-blocklist",
    options=blocklist
)
```

### Tambahkan item blocklist

```python
from azure.ai.contentsafety.models import AddOrUpdateTextBlocklistItemsOptions, TextBlocklistItem

items = AddOrUpdateTextBlocklistItemsOptions(
    blocklist_items=[
        TextBlocklistItem(text="blocked-term-1"),
        TextBlocklistItem(text="blocked-term-2")
    ]
)

blocklist_client.add_or_update_blocklist_items(
    blocklist_name="my-blocklist",
    options=items
)
```

### Analisis teks dengan blocklist

```python
from azure.ai.contentsafety.models import AnalyzeTextOptions

request = AnalyzeTextOptions(
    text="Teks yang mungkin mengandung blocked-term-1",
    blocklist_names=["my-blocklist"],
    halt_on_blocklist_hit=True
)

response = client.analyze_text(request)
```

## Mode 8 severity levels

```python
from azure.ai.contentsafety.models import AnalyzeTextOptions, AnalyzeTextOutputType

request = AnalyzeTextOptions(
    text="Teks untuk dianalisis",
    output_type=AnalyzeTextOutputType.EIGHT_SEVERITY_LEVELS
)
```

Gunakan mode ini bila kebijakan produk membutuhkan threshold yang lebih presisi.

## Strategi keputusan moderasi

Contoh kebijakan sederhana:
- severity `0`: izinkan,
- severity `2`: izinkan dengan logging,
- severity `4`: tahan untuk review,
- severity `6+` atau blocklist hit: tolak.

Sesuaikan threshold dengan konteks bisnis dan risiko produk.

## Praktik implementasi yang disarankan

- Moderasi input dan output model, bukan hanya salah satunya.
- Simpan hasil kategori dan severity untuk audit.
- Gunakan blocklist untuk istilah lokal, brand safety, atau kebijakan internal.
- Pisahkan policy engine dari wrapper SDK agar aturan mudah diubah.
- Tangani kemungkinan satu konten memicu beberapa kategori sekaligus.
- Tambahkan fallback aman bila layanan moderation gagal.

## Checklist debugging cepat

Jika hasil moderation terasa aneh, cek:
1. endpoint dan key benar,
2. format gambar valid,
3. mode severity 4-level vs 8-level sesuai,
4. blocklist benar-benar sudah dibuat,
5. threshold aplikasi tidak terlalu ketat atau terlalu longgar,
6. konten yang diuji memang mewakili kasus nyata.

## Hasil yang diharapkan

Setelah mengikuti skill ini, implementasi Python seharusnya mampu:
- menganalisis teks dan gambar,
- menerapkan severity threshold,
- memakai blocklist kustom,
- dan membangun moderation pipeline yang aman serta dapat diaudit.
