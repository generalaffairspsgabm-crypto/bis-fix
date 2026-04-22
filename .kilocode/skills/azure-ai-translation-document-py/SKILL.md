---
name: azure-ai-translation-document-py
description: Gunakan saat membangun terjemahan dokumen batch dengan Azure AI Document Translation SDK Python, termasuk preservasi format, multi-target language, glossary, dan pemantauan status operasi.
---

# Azure AI Document Translation SDK untuk Python

Skill ini dipakai saat perlu menerjemahkan dokumen secara batch dengan mempertahankan format asli menggunakan Azure AI Translator Document Translation dari Python.

## Kapan digunakan

Gunakan skill ini ketika pekerjaan mencakup:

- Terjemahan dokumen Word, PDF, Excel, PowerPoint, atau format lain dalam jumlah besar.
- Preservasi format dokumen asli.
- Multi-target language dalam satu operasi.
- Single document translation dari konten file lokal.
- Penggunaan glossary untuk istilah khusus.
- Pemantauan status operasi dan status tiap dokumen.

## Dependensi

```bash
pip install azure-ai-translation-document azure-identity
```

## Variabel lingkungan

```bash
AZURE_DOCUMENT_TRANSLATION_ENDPOINT=https://<resource>.cognitiveservices.azure.com
AZURE_DOCUMENT_TRANSLATION_KEY=<api-key>
AZURE_SOURCE_CONTAINER_URL=https://<storage>.blob.core.windows.net/<container>?<sas>
AZURE_TARGET_CONTAINER_URL=https://<storage>.blob.core.windows.net/<container>?<sas>
```

## Autentikasi

### API key

```python
import os
from azure.ai.translation.document import DocumentTranslationClient
from azure.core.credentials import AzureKeyCredential

client = DocumentTranslationClient(
    os.environ["AZURE_DOCUMENT_TRANSLATION_ENDPOINT"],
    AzureKeyCredential(os.environ["AZURE_DOCUMENT_TRANSLATION_KEY"]),
)
```

### Entra ID

```python
import os
from azure.ai.translation.document import DocumentTranslationClient
from azure.identity import DefaultAzureCredential

client = DocumentTranslationClient(
    endpoint=os.environ["AZURE_DOCUMENT_TRANSLATION_ENDPOINT"],
    credential=DefaultAzureCredential(),
)
```

## Workflow inti

### 1. Batch document translation dasar

```python
import os
from azure.ai.translation.document import DocumentTranslationInput, TranslationTarget

source_url = os.environ["AZURE_SOURCE_CONTAINER_URL"]
target_url = os.environ["AZURE_TARGET_CONTAINER_URL"]

poller = client.begin_translation(
    inputs=[
        DocumentTranslationInput(
            source_url=source_url,
            targets=[
                TranslationTarget(
                    target_url=target_url,
                    language="es",
                )
            ],
        )
    ]
)

result = poller.result()
print(poller.status())
print(poller.details.documents_succeeded_count)
print(poller.details.documents_failed_count)
```

### 2. Multi-target language

```python
poller = client.begin_translation(
    inputs=[
        DocumentTranslationInput(
            source_url=source_url,
            targets=[
                TranslationTarget(target_url=target_url_es, language="es"),
                TranslationTarget(target_url=target_url_fr, language="fr"),
                TranslationTarget(target_url=target_url_de, language="de"),
            ],
        )
    ]
)
```

### 3. Single document translation

```python
from azure.ai.translation.document import SingleDocumentTranslationClient
from azure.core.credentials import AzureKeyCredential

single_client = SingleDocumentTranslationClient(
    os.environ["AZURE_DOCUMENT_TRANSLATION_ENDPOINT"],
    AzureKeyCredential(os.environ["AZURE_DOCUMENT_TRANSLATION_KEY"]),
)

with open("document.docx", "rb") as f:
    document_content = f.read()

result = single_client.translate(
    body=document_content,
    target_language="es",
    content_type="application/vnd.openxmlformats-officedocument.wordprocessingml.document",
)

with open("document_es.docx", "wb") as f:
    f.write(result)
```

### 4. Cek status operasi

```python
operations = client.list_translation_statuses()

for op in operations:
    print(op.id, op.status, op.documents_total_count)
```

### 5. Cek status tiap dokumen

```python
operation_id = poller.id
document_statuses = client.list_document_statuses(operation_id)

for doc in document_statuses:
    print(doc.source_document_url)
    print(doc.status)
    print(doc.translated_to)
    if doc.error:
        print(doc.error.message)
```

### 6. Batalkan operasi

```python
client.cancel_translation(operation_id)
```

### 7. Gunakan glossary

```python
from azure.ai.translation.document import TranslationGlossary

poller = client.begin_translation(
    inputs=[
        DocumentTranslationInput(
            source_url=source_url,
            targets=[
                TranslationTarget(
                    target_url=target_url,
                    language="es",
                    glossaries=[
                        TranslationGlossary(
                            glossary_url="https://<storage>.blob.core.windows.net/glossary/terms.csv?<sas>",
                            file_format="csv",
                        )
                    ],
                )
            ],
        )
    ]
)
```

### 8. Lihat format dan bahasa yang didukung

```python
formats = client.get_supported_document_formats()
for fmt in formats:
    print(fmt.format, fmt.file_extensions)

languages = client.get_supported_languages()
for lang in languages:
    print(lang.name, lang.code)
```

## Praktik kerja yang disarankan

1. Gunakan SAS URL dengan masa berlaku secukupnya dan permission minimum.
2. Pisahkan container sumber dan target untuk menghindari overwrite tidak sengaja.
3. Gunakan glossary untuk istilah domain, brand, atau terminologi legal/medis.
4. Pantau status tiap dokumen karena satu batch dapat berisi campuran sukses dan gagal.
5. Simpan operation ID untuk retry, audit, dan troubleshooting.
6. Gunakan single document translation hanya bila alur batch tidak diperlukan.

## Checklist implementasi

- Verifikasi endpoint dan autentikasi benar.
- Verifikasi SAS URL sumber dan target valid serta belum kedaluwarsa.
- Verifikasi format dokumen didukung.
- Verifikasi target container memiliki izin tulis.
- Verifikasi glossary cocok dengan bahasa sumber dan target.

## Batasan penting

- Operasi batch bergantung pada akses storage yang benar; kegagalan SAS adalah sumber error paling umum.
- Tidak semua format atau fitur glossary tersedia untuk semua skenario.
- Preservasi format membantu, tetapi hasil akhir tetap perlu QA untuk dokumen kompleks.

## Referensi mandiri

- Dokumentasi Azure Document Translation Python: https://learn.microsoft.com/python/api/overview/azure/ai-translation-document-readme
- Dokumentasi Azure AI Translator: https://learn.microsoft.com/azure/ai-services/translator/
- Dokumentasi Azure Identity Python: https://learn.microsoft.com/python/api/azure-identity/azure.identity.defaultazurecredential
