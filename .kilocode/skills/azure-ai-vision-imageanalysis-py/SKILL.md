---
name: azure-ai-vision-imageanalysis-py
description: Gunakan saat membangun analisis gambar dengan Azure AI Vision SDK untuk Python, termasuk caption, OCR, tagging, object detection, people detection, dan smart cropping.
license: Complete terms in LICENSE.txt
metadata:
  category: ai
  source:
    upstream: .tmp-antigravity-skills/skills/azure-ai-vision-imageanalysis-py
    type: community
  depends_on:
    - resource Azure AI Vision dengan endpoint aktif
    - kredensial `VISION_KEY` atau `DefaultAzureCredential`
    - paket Python `azure-ai-vision-imageanalysis`
---

# Azure AI Vision Image Analysis untuk Python

Skill ini merangkum pola implementasi Azure AI Vision 4.0 untuk Python agar analisis gambar dapat langsung dipakai dalam aplikasi produksi atau prototipe. Cakupannya meliputi caption, dense caption, OCR, tag, objek, orang, smart crop, dan penggunaan async client.

## Kapan digunakan

Gunakan skill ini saat perlu:
- membuat caption otomatis dari gambar
- mengekstrak teks dari gambar atau scan dokumen
- mendeteksi objek dan orang pada gambar
- menghasilkan tag konten untuk indexing atau moderation ringan
- menentukan region crop terbaik untuk thumbnail
- memproses gambar dari URL publik atau bytes file lokal

## Instalasi

```bash
pip install azure-ai-vision-imageanalysis
```

Untuk autentikasi Entra ID, tambahkan juga `azure-identity`.

## Variabel lingkungan

```bash
VISION_ENDPOINT=https://<resource>.cognitiveservices.azure.com
VISION_KEY=<api-key>
```

## Autentikasi

### API key

```python
import os
from azure.ai.vision.imageanalysis import ImageAnalysisClient
from azure.core.credentials import AzureKeyCredential

client = ImageAnalysisClient(
    endpoint=os.environ["VISION_ENDPOINT"],
    credential=AzureKeyCredential(os.environ["VISION_KEY"]),
)
```

### Entra ID

```python
import os
from azure.ai.vision.imageanalysis import ImageAnalysisClient
from azure.identity import DefaultAzureCredential

client = ImageAnalysisClient(
    endpoint=os.environ["VISION_ENDPOINT"],
    credential=DefaultAzureCredential(),
)
```

## Fitur visual utama

| Fitur | Kegunaan |
|---|---|
| `CAPTION` | Deskripsi natural gambar |
| `DENSE_CAPTIONS` | Caption untuk beberapa region |
| `READ` | OCR teks |
| `TAGS` | Tag konten |
| `OBJECTS` | Deteksi objek |
| `PEOPLE` | Deteksi orang |
| `SMART_CROPS` | Region crop otomatis |

## Pola inti

### Analisis dari URL

```python
from azure.ai.vision.imageanalysis.models import VisualFeatures

image_url = "https://example.com/image.jpg"

result = client.analyze_from_url(
    image_url=image_url,
    visual_features=[
        VisualFeatures.CAPTION,
        VisualFeatures.TAGS,
        VisualFeatures.OBJECTS,
        VisualFeatures.READ,
        VisualFeatures.PEOPLE,
        VisualFeatures.SMART_CROPS,
        VisualFeatures.DENSE_CAPTIONS,
    ],
    gender_neutral_caption=True,
    language="en",
)
```

### Analisis dari file lokal

```python
with open("image.jpg", "rb") as f:
    image_data = f.read()

result = client.analyze(
    image_data=image_data,
    visual_features=[VisualFeatures.CAPTION, VisualFeatures.TAGS],
)
```

### Caption

```python
result = client.analyze_from_url(
    image_url=image_url,
    visual_features=[VisualFeatures.CAPTION],
    gender_neutral_caption=True,
)

if result.caption:
    print(f"Caption: {result.caption.text}")
    print(f"Confidence: {result.caption.confidence:.2f}")
```

### Dense captions

```python
result = client.analyze_from_url(
    image_url=image_url,
    visual_features=[VisualFeatures.DENSE_CAPTIONS],
)

if result.dense_captions:
    for caption in result.dense_captions.list:
        print(f"Caption: {caption.text}")
        print(f"Confidence: {caption.confidence:.2f}")
        print(f"Bounding box: {caption.bounding_box}")
```

### Tags

```python
result = client.analyze_from_url(
    image_url=image_url,
    visual_features=[VisualFeatures.TAGS],
)

if result.tags:
    for tag in result.tags.list:
        print(f"Tag: {tag.name} ({tag.confidence:.2f})")
```

### Object detection

```python
result = client.analyze_from_url(
    image_url=image_url,
    visual_features=[VisualFeatures.OBJECTS],
)

if result.objects:
    for obj in result.objects.list:
        box = obj.bounding_box
        print(f"Object: {obj.tags[0].name}")
        print(f"Confidence: {obj.tags[0].confidence:.2f}")
        print(f"Box: x={box.x}, y={box.y}, w={box.width}, h={box.height}")
```

### OCR

```python
result = client.analyze_from_url(
    image_url=image_url,
    visual_features=[VisualFeatures.READ],
)

if result.read:
    for block in result.read.blocks:
        for line in block.lines:
            print(f"Line: {line.text}")
            for word in line.words:
                print(f"  Word: {word.text} ({word.confidence:.2f})")
```

### People detection

```python
result = client.analyze_from_url(
    image_url=image_url,
    visual_features=[VisualFeatures.PEOPLE],
)

if result.people:
    for person in result.people.list:
        box = person.bounding_box
        print(f"Person confidence: {person.confidence:.2f}")
        print(f"Box: x={box.x}, y={box.y}, w={box.width}, h={box.height}")
```

### Smart cropping

```python
result = client.analyze_from_url(
    image_url=image_url,
    visual_features=[VisualFeatures.SMART_CROPS],
    smart_crops_aspect_ratios=[0.9, 1.33, 1.78],
)

if result.smart_crops:
    for crop in result.smart_crops.list:
        box = crop.bounding_box
        print(f"Aspect ratio: {crop.aspect_ratio}")
        print(f"Crop: x={box.x}, y={box.y}, w={box.width}, h={box.height}")
```

## Async client

```python
from azure.ai.vision.imageanalysis.aio import ImageAnalysisClient
from azure.identity.aio import DefaultAzureCredential

async def analyze_image(endpoint: str, image_url: str):
    async with ImageAnalysisClient(
        endpoint=endpoint,
        credential=DefaultAzureCredential(),
    ) as client:
        result = await client.analyze_from_url(
            image_url=image_url,
            visual_features=[VisualFeatures.CAPTION],
        )
        if result.caption:
            print(result.caption.text)
```

## Praktik yang disarankan

- gunakan `DefaultAzureCredential` untuk deployment produksi
- kirim hanya fitur visual yang benar-benar dibutuhkan
- cek keberadaan properti hasil sebelum mengakses `.list`
- simpan confidence score untuk filtering downstream
- gunakan analisis berbasis bytes untuk file upload privat
- pisahkan OCR dan caption bila kebutuhan retry atau timeout berbeda

## Checklist implementasi

1. Pastikan endpoint dan kredensial tersedia.
2. Tentukan sumber gambar: URL atau bytes.
3. Pilih fitur visual minimum.
4. Tangani hasil kosong dan confidence rendah.
5. Simpan bounding box bila hasil dipakai untuk anotasi UI.

## Sumber upstream

Konten dinormalisasi dari `.tmp-antigravity-skills/skills/azure-ai-vision-imageanalysis-py` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
