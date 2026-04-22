---
name: azure-ai-anomalydetector-java
description: Gunakan saat membangun deteksi anomali time-series dengan Azure AI Anomaly Detector SDK untuk Java, termasuk analisis univariat, multivariat, change point, training model, dan inferensi batch atau last-point.
license: Complete terms in LICENSE.txt
metadata:
  category: ai-ml
  source:
    repository: https://github.com/antiwork/antigravity-skills
    path: skills/azure-ai-anomalydetector-java
  language: id
  sdk: azure-ai-anomalydetector
  runtime: java
---

# Azure AI Anomaly Detector Java

Gunakan skill ini saat perlu membangun fitur deteksi anomali berbasis time-series di Java menggunakan Azure AI Anomaly Detector.

## Kapan digunakan

Gunakan saat pekerjaan mencakup:
- deteksi anomali pada satu sinyal time-series,
- deteksi anomali pada banyak sinyal yang saling berkorelasi,
- deteksi change point,
- training model multivariat,
- inferensi batch atau pemeriksaan titik data terbaru,
- atau monitoring operasional berbasis AI.

## Dependensi inti

```xml
<dependency>
  <groupId>com.azure</groupId>
  <artifactId>azure-ai-anomalydetector</artifactId>
  <version>3.0.0-beta.6</version>
</dependency>
```

Variabel lingkungan yang umum dipakai:

```bash
AZURE_ANOMALY_DETECTOR_ENDPOINT=https://<resource>.cognitiveservices.azure.com
AZURE_ANOMALY_DETECTOR_API_KEY=<api-key>
```

## Pembuatan client

Gunakan client terpisah untuk univariat dan multivariat:

```java
import com.azure.ai.anomalydetector.AnomalyDetectorClientBuilder;
import com.azure.ai.anomalydetector.MultivariateClient;
import com.azure.ai.anomalydetector.UnivariateClient;
import com.azure.core.credential.AzureKeyCredential;

String endpoint = System.getenv("AZURE_ANOMALY_DETECTOR_ENDPOINT");
String key = System.getenv("AZURE_ANOMALY_DETECTOR_API_KEY");

MultivariateClient multivariateClient = new AnomalyDetectorClientBuilder()
    .credential(new AzureKeyCredential(key))
    .endpoint(endpoint)
    .buildMultivariateClient();

UnivariateClient univariateClient = new AnomalyDetectorClientBuilder()
    .credential(new AzureKeyCredential(key))
    .endpoint(endpoint)
    .buildUnivariateClient();
```

Bila lingkungan mendukung Entra ID, gunakan `DefaultAzureCredential`.

## Model mental layanan

### Univariat

Pilih untuk satu seri data, misalnya trafik harian, suhu, atau jumlah transaksi.

Kemampuan utama:
- batch detection untuk seluruh seri,
- last-point detection untuk streaming,
- change point detection untuk perubahan pola.

### Multivariat

Pilih saat banyak sinyal saling memengaruhi, misalnya CPU, memori, latency, dan throughput.

Alur umumnya:
1. siapkan dataset di Blob Storage,
2. latih model,
3. jalankan inferensi,
4. baca hasil dan kontributor anomali.

## Pola implementasi inti

### Deteksi batch univariat

```java
List<TimeSeriesPoint> series = List.of(
    new TimeSeriesPoint(OffsetDateTime.parse("2023-01-01T00:00:00Z"), 1.0),
    new TimeSeriesPoint(OffsetDateTime.parse("2023-01-02T00:00:00Z"), 2.5)
    // minimal 12 titik data untuk banyak skenario
);

UnivariateDetectionOptions options = new UnivariateDetectionOptions(series)
    .setGranularity(TimeGranularity.DAILY)
    .setSensitivity(95);

UnivariateEntireDetectionResult result = univariateClient.detectUnivariateEntireSeries(options);
```

Gunakan sensitivitas tinggi hanya bila false positive masih dapat diterima.

### Deteksi titik terakhir

```java
UnivariateLastDetectionResult lastResult = univariateClient.detectUnivariateLastPoint(options);

if (lastResult.isAnomaly()) {
    System.out.println("Titik terbaru adalah anomali");
}
```

Pola ini cocok untuk monitoring near-real-time.

### Deteksi change point

```java
UnivariateChangePointDetectionOptions changeOptions =
    new UnivariateChangePointDetectionOptions(series, TimeGranularity.DAILY);

UnivariateChangePointDetectionResult changeResult =
    univariateClient.detectUnivariateChangePoint(changeOptions);
```

Gunakan untuk mendeteksi perubahan tren, bukan hanya outlier sesaat.

### Training model multivariat

```java
ModelInfo modelInfo = new ModelInfo()
    .setDataSource("https://storage.blob.core.windows.net/container/data.zip?<sas>")
    .setStartTime(OffsetDateTime.parse("2023-01-01T00:00:00Z"))
    .setEndTime(OffsetDateTime.parse("2023-06-01T00:00:00Z"))
    .setSlidingWindow(200)
    .setDisplayName("MyMultivariateModel");

AnomalyDetectionModel trainedModel = multivariateClient.trainMultivariateModel(modelInfo);
String modelId = trainedModel.getModelId();
```

Pastikan data training konsisten, tersinkronisasi waktu, dan cukup panjang.

### Inferensi batch multivariat

```java
MultivariateBatchDetectionOptions detectionOptions = new MultivariateBatchDetectionOptions()
    .setDataSource("https://storage.blob.core.windows.net/container/inference-data.zip?<sas>")
    .setStartTime(OffsetDateTime.parse("2023-07-01T00:00:00Z"))
    .setEndTime(OffsetDateTime.parse("2023-07-31T00:00:00Z"))
    .setTopContributorCount(10);

MultivariateDetectionResult detectionResult =
    multivariateClient.detectMultivariateBatchAnomaly(modelId, detectionOptions);
```

### Inferensi titik terakhir multivariat

```java
MultivariateLastDetectionOptions lastOptions = new MultivariateLastDetectionOptions()
    .setVariables(List.of(
        new VariableValues("variable1", List.of("timestamp1"), List.of(1.0f)),
        new VariableValues("variable2", List.of("timestamp1"), List.of(2.5f))
    ))
    .setTopContributorCount(5);

MultivariateLastDetectionResult lastResult =
    multivariateClient.detectMultivariateLastAnomaly(modelId, lastOptions);
```

Gunakan hasil kontribusi untuk menjelaskan sinyal mana yang paling berpengaruh terhadap anomali.

## Manajemen model

```java
PagedIterable<AnomalyDetectionModel> models = multivariateClient.listMultivariateModels();
for (AnomalyDetectionModel model : models) {
    System.out.println(model.getModelId());
}

multivariateClient.deleteMultivariateModel(modelId);
```

Hapus model eksperimen yang tidak dipakai agar inventaris tetap bersih.

## Praktik implementasi yang disarankan

- Normalisasi zona waktu sebelum mengirim data.
- Pastikan interval data konsisten dengan `TimeGranularity`.
- Pisahkan pipeline training dan inferensi.
- Simpan `modelId` sebagai artefak deployment bila model dipakai ulang.
- Validasi kualitas data sebelum inferensi: missing value, duplikasi timestamp, dan out-of-order records.
- Gunakan threshold bisnis tambahan; jangan hanya mengandalkan skor model mentah.

## Checklist debugging cepat

Jika hasil terasa tidak akurat, cek:
1. jumlah titik data cukup,
2. granularity sesuai data,
3. timestamp tersortir,
4. data multivariat sinkron antar variabel,
5. SAS URL masih valid,
6. model sudah selesai training sebelum inferensi.

## Hasil yang diharapkan

Setelah mengikuti skill ini, implementasi Java seharusnya mampu:
- menjalankan deteksi anomali univariat dan multivariat,
- mendeteksi change point,
- melatih dan mengelola model,
- serta mengintegrasikan hasil anomali ke workflow monitoring atau alerting.
