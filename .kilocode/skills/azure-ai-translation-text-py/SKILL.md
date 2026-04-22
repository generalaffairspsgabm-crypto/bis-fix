---
name: azure-ai-translation-text-py
description: Gunakan saat membangun terjemahan teks real-time dengan Azure AI Translator SDK Python, termasuk translate, transliteration, language detection, dictionary lookup, dan sentence boundary detection.
---

# Azure AI Text Translation SDK untuk Python

Skill ini dipakai saat perlu menerjemahkan teks secara real-time menggunakan Azure AI Translator dari Python, termasuk transliterasi, deteksi bahasa, lookup kamus, dan opsi terjemahan lanjutan.

## Kapan digunakan

Gunakan skill ini ketika pekerjaan mencakup:

- Terjemahan teks satu atau banyak bahasa target.
- Auto-detect atau penentuan bahasa sumber.
- Transliteration antar script.
- Dictionary lookup dan contoh penggunaan istilah.
- Sentence boundary detection.
- Opsi terjemahan seperti HTML mode, profanity handling, atau alignment.

## Dependensi

```bash
pip install azure-ai-translation-text azure-identity
```

## Variabel lingkungan

```bash
AZURE_TRANSLATOR_KEY=<api-key>
AZURE_TRANSLATOR_REGION=<region>
AZURE_TRANSLATOR_ENDPOINT=https://<resource>.cognitiveservices.azure.com
```

## Autentikasi

### API key dengan region

```python
import os
from azure.ai.translation.text import TextTranslationClient
from azure.core.credentials import AzureKeyCredential

client = TextTranslationClient(
    credential=AzureKeyCredential(os.environ["AZURE_TRANSLATOR_KEY"]),
    region=os.environ["AZURE_TRANSLATOR_REGION"],
)
```

### API key dengan custom endpoint

```python
client = TextTranslationClient(
    credential=AzureKeyCredential(os.environ["AZURE_TRANSLATOR_KEY"]),
    endpoint=os.environ["AZURE_TRANSLATOR_ENDPOINT"],
)
```

### Entra ID

```python
import os
from azure.ai.translation.text import TextTranslationClient
from azure.identity import DefaultAzureCredential

client = TextTranslationClient(
    credential=DefaultAzureCredential(),
    endpoint=os.environ["AZURE_TRANSLATOR_ENDPOINT"],
)
```

## Workflow inti

### 1. Terjemahan dasar

```python
result = client.translate(
    body=["Hello, how are you?", "Welcome to Azure!"],
    to=["es"],
)

for item in result:
    for translation in item.translations:
        print(translation.text, translation.to)
```

### 2. Multi-target language

```python
result = client.translate(
    body=["Hello, world!"],
    to=["es", "fr", "de", "ja"],
)

for item in result:
    print(item.detected_language.language if item.detected_language else "unknown")
    for translation in item.translations:
        print(translation.to, translation.text)
```

### 3. Tentukan bahasa sumber

```python
result = client.translate(
    body=["Bonjour le monde"],
    from_parameter="fr",
    to=["en", "es"],
)
```

### 4. Deteksi bahasa

```python
result = client.translate(
    body=["Hola, como estas?"],
    to=["en"],
)

for item in result:
    if item.detected_language:
        print(item.detected_language.language, item.detected_language.score)
```

### 5. Transliteration

```python
result = client.transliterate(
    body=["konnichiwa"],
    language="ja",
    from_script="Latn",
    to_script="Jpan",
)

for item in result:
    print(item.text, item.script)
```

### 6. Dictionary lookup

```python
result = client.lookup_dictionary_entries(
    body=["fly"],
    from_parameter="en",
    to="es",
)

for item in result:
    print(item.normalized_source)
    for translation in item.translations:
        print(translation.normalized_target, translation.pos_tag, translation.confidence)
```

### 7. Dictionary examples

```python
from azure.ai.translation.text.models import DictionaryExampleTextItem

result = client.lookup_dictionary_examples(
    body=[DictionaryExampleTextItem(text="fly", translation="volar")],
    from_parameter="en",
    to="es",
)

for item in result:
    for example in item.examples:
        print(example.source_prefix + example.source_term + example.source_suffix)
        print(example.target_prefix + example.target_term + example.target_suffix)
```

### 8. Bahasa yang didukung

```python
languages = client.get_supported_languages()

for code, lang in languages.translation.items():
    print(code, lang.name, lang.native_name)
```

### 9. Sentence boundary detection

```python
result = client.find_sentence_boundaries(
    body=["Hello! How are you? I hope you are well."],
    language="en",
)

for item in result:
    print(item.sent_len)
```

### 10. Opsi terjemahan

```python
result = client.translate(
    body=["<p>Hello, world!</p>"],
    to=["de"],
    text_type="html",
)
```

## Praktik kerja yang disarankan

1. Gunakan region atau endpoint yang konsisten dengan resource Translator yang dipakai.
2. Tentukan bahasa sumber bila sudah diketahui untuk meningkatkan stabilitas hasil.
3. Gunakan transliteration hanya untuk perubahan script, bukan terjemahan makna.
4. Gunakan dictionary lookup untuk UX kamus atau terminologi, bukan sebagai pengganti terjemahan penuh.
5. Perlakukan HTML mode dengan hati-hati agar markup tetap valid.
6. Simpan daftar bahasa yang didukung bila aplikasi perlu validasi input sebelum request.

## Checklist implementasi

- Verifikasi key, region, atau endpoint benar.
- Verifikasi bahasa target didukung.
- Verifikasi mode `text_type` sesuai isi input.
- Verifikasi hasil dictionary dipakai hanya untuk konteks leksikal.
- Verifikasi fallback bila deteksi bahasa gagal atau confidence rendah.

## Batasan penting

- Transliteration tidak mengubah arti, hanya script.
- Auto-detect bahasa dapat keliru pada teks sangat pendek atau campuran bahasa.
- Opsi tertentu bergantung pada pasangan bahasa atau kapabilitas service.

## Referensi mandiri

- Dokumentasi Azure Text Translation Python: https://learn.microsoft.com/python/api/overview/azure/ai-translation-text-readme
- Dokumentasi Azure AI Translator: https://learn.microsoft.com/azure/ai-services/translator/
- Dokumentasi Azure Identity Python: https://learn.microsoft.com/python/api/azure-identity/azure.identity.defaultazurecredential
