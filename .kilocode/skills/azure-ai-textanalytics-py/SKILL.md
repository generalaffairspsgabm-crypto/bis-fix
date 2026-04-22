---
name: azure-ai-textanalytics-py
description: Gunakan saat membangun analisis bahasa alami dengan Azure AI Language SDK Python, termasuk sentiment analysis, entity recognition, key phrase extraction, language detection, PII detection, dan healthcare NLP.
---

# Azure AI Text Analytics SDK untuk Python

Skill ini dipakai saat perlu menjalankan NLP berbasis Azure AI Language dari Python menggunakan [`TextAnalyticsClient`](https://learn.microsoft.com/python/api/overview/azure/ai-textanalytics-readme), baik untuk analisis sentimen, ekstraksi entitas, deteksi PII, maupun analisis domain kesehatan.

## Kapan digunakan

Gunakan skill ini ketika pekerjaan mencakup:

- Sentiment analysis dan opinion mining.
- Named entity recognition atau linked entities.
- Key phrase extraction.
- Language detection.
- PII detection dan redaction.
- Healthcare text analytics.
- Batch multi-analysis dengan satu request.

## Dependensi

```bash
pip install azure-ai-textanalytics azure-identity
```

## Variabel lingkungan

```bash
AZURE_LANGUAGE_ENDPOINT=https://<resource>.cognitiveservices.azure.com
AZURE_LANGUAGE_KEY=<api-key>
```

## Autentikasi

### API key

```python
import os
from azure.core.credentials import AzureKeyCredential
from azure.ai.textanalytics import TextAnalyticsClient

client = TextAnalyticsClient(
    os.environ["AZURE_LANGUAGE_ENDPOINT"],
    AzureKeyCredential(os.environ["AZURE_LANGUAGE_KEY"]),
)
```

### Entra ID

```python
import os
from azure.ai.textanalytics import TextAnalyticsClient
from azure.identity import DefaultAzureCredential

client = TextAnalyticsClient(
    endpoint=os.environ["AZURE_LANGUAGE_ENDPOINT"],
    credential=DefaultAzureCredential(),
)
```

## Workflow inti

### 1. Sentiment analysis

```python
documents = [
    "I had a wonderful trip to Seattle last week!",
    "The food was terrible and the service was slow.",
]

result = client.analyze_sentiment(documents, show_opinion_mining=True)

for doc in result:
    if not doc.is_error:
        print(doc.sentiment)
        print(doc.confidence_scores.positive)
        for sentence in doc.sentences:
            for opinion in sentence.mined_opinions:
                print(opinion.target.text, opinion.target.sentiment)
```

### 2. Entity recognition

```python
documents = ["Microsoft was founded by Bill Gates and Paul Allen in Albuquerque."]

result = client.recognize_entities(documents)

for doc in result:
    if not doc.is_error:
        for entity in doc.entities:
            print(entity.text, entity.category, entity.subcategory, entity.confidence_score)
```

### 3. PII detection

```python
documents = ["My SSN is 123-45-6789 and my email is john@example.com"]

result = client.recognize_pii_entities(documents)

for doc in result:
    if not doc.is_error:
        print(doc.redacted_text)
        for entity in doc.entities:
            print(entity.text, entity.category)
```

### 4. Key phrase extraction

```python
documents = ["Azure AI provides powerful machine learning capabilities for developers."]

result = client.extract_key_phrases(documents)

for doc in result:
    if not doc.is_error:
        print(doc.key_phrases)
```

### 5. Language detection

```python
documents = ["Ce document est en francais.", "This is written in English."]

result = client.detect_language(documents)

for doc in result:
    if not doc.is_error:
        print(doc.primary_language.name, doc.primary_language.iso6391_name)
```

### 6. Healthcare text analytics

```python
documents = ["Patient has diabetes and was prescribed metformin 500mg twice daily."]

poller = client.begin_analyze_healthcare_entities(documents)
result = poller.result()

for doc in result:
    if not doc.is_error:
        for entity in doc.entities:
            print(entity.text, entity.category, entity.normalized_text)
            for link in entity.data_sources:
                print(link.name, link.entity_id)
```

### 7. Batch multi-analysis

```python
from azure.ai.textanalytics import (
    RecognizeEntitiesAction,
    ExtractKeyPhrasesAction,
    AnalyzeSentimentAction,
)

documents = ["Microsoft announced new Azure AI features at Build conference."]

poller = client.begin_analyze_actions(
    documents,
    actions=[
        RecognizeEntitiesAction(),
        ExtractKeyPhrasesAction(),
        AnalyzeSentimentAction(),
    ],
)

results = poller.result()
for doc_results in results:
    for result in doc_results:
        print(result.kind)
```

### 8. Async client

```python
from azure.ai.textanalytics.aio import TextAnalyticsClient
from azure.identity.aio import DefaultAzureCredential

async def analyze(endpoint: str, documents: list[str]):
    async with TextAnalyticsClient(
        endpoint=endpoint,
        credential=DefaultAzureCredential(),
    ) as client:
        result = await client.analyze_sentiment(documents)
        return result
```

## Operasi yang tersedia

Metode yang paling sering dipakai:

- `analyze_sentiment`
- `recognize_entities`
- `recognize_pii_entities`
- `recognize_linked_entities`
- `extract_key_phrases`
- `detect_language`
- `begin_analyze_healthcare_entities`
- `begin_analyze_actions`

## Praktik kerja yang disarankan

1. Gunakan [`DefaultAzureCredential`](https://learn.microsoft.com/python/api/azure-identity/azure.identity.defaultazurecredential) untuk produksi.
2. Pisahkan dokumen besar ke batch yang masuk akal agar retry lebih mudah.
3. Gunakan opinion mining hanya bila memang perlu detail aspek sentimen.
4. Redact PII sebelum menyimpan hasil ke log atau analytics downstream.
5. Perlakukan healthcare NLP sebagai data sensitif dengan kontrol akses ketat.
6. Tangani `is_error` pada setiap hasil dokumen, bukan hanya pada level request.

## Checklist implementasi

- Verifikasi endpoint Azure Language benar.
- Verifikasi autentikasi berhasil sebelum batch besar.
- Verifikasi bahasa input sesuai ekspektasi atau aktifkan deteksi bahasa.
- Verifikasi hasil PII tidak bocor ke log mentah.
- Verifikasi polling long-running operation untuk healthcare atau analyze actions.

## Batasan penting

- Beberapa fitur seperti healthcare NLP tersedia hanya pada region atau tier tertentu.
- Hasil confidence score bersifat probabilistik dan tidak boleh diperlakukan sebagai kepastian absolut.
- Dokumen yang gagal dapat muncul berdampingan dengan dokumen yang sukses dalam batch yang sama.

## Referensi mandiri

- Dokumentasi Azure AI Text Analytics Python: https://learn.microsoft.com/python/api/overview/azure/ai-textanalytics-readme
- Dokumentasi Azure AI Language: https://learn.microsoft.com/azure/ai-services/language-service/
- Dokumentasi Azure Identity Python: https://learn.microsoft.com/python/api/azure-identity/azure.identity.defaultazurecredential
