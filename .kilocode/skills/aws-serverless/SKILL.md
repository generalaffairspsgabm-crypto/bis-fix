---
name: aws-serverless
description: >-
  Gunakan saat merancang atau mengimplementasikan aplikasi serverless di AWS
  dengan fokus pada Lambda, API Gateway, DynamoDB, pola event-driven,
  deployment, observability, dan optimasi cold start.
license: CC-BY-4.0
metadata:
  category: backend
  source:
    repository: 'https://github.com/sickn33/antigravity-awesome-skills'
    path: skills/aws-serverless
    license_path: LICENSE-CONTENT
  original_metadata:
    risk: unknown
    source: vibeship-spawner-skills (Apache 2.0)
    date_added: '2026-02-27'
---

# AWS Serverless

Skill ini memandu pembangunan sistem serverless AWS yang **siap produksi**, **terukur**, dan **tahan terhadap kegagalan operasional**.

Gunakan saat:
- membangun Lambda-based API atau worker
- merancang integrasi API Gateway dengan Lambda
- memakai DynamoDB, SQS, SNS, atau stream sebagai bagian arsitektur event-driven
- menyusun deployment dengan SAM, CDK, atau pola serupa
- mengoptimalkan cold start, observability, dan retry behavior

## Prinsip inti

Pegang prinsip berikut saat skill ini aktif:
- ukur sebelum mengoptimalkan memory dan timeout
- jaga package tetap kecil untuk mengurangi cold start
- gunakan konfigurasi via environment variable atau secret manager yang tepat
- desain untuk failure: retry, DLQ, idempotensi, dan timeout boundary
- logging harus terstruktur dan mudah dikorelasikan
- pilih layanan AWS paling sederhana yang memenuhi kebutuhan

## 1. Desain Lambda yang sehat

Pola dasar Lambda yang baik:
- inisialisasi client SDK di luar handler agar dapat dipakai ulang pada warm invocation
- pisahkan parsing input, business logic, dan response mapping
- kembalikan response yang konsisten untuk event source terkait
- log error dengan context seperti request ID, correlation ID, dan identifier domain
- validasi input sedekat mungkin dengan boundary

Lambda yang penuh logic campur aduk biasanya sulit diuji dan sulit diobservasi.

## 2. Pilih integrasi API yang tepat

Untuk HTTP endpoint:
- gunakan **HTTP API** bila fitur sederhana cukup dan latency/cost ingin ditekan
- gunakan **REST API** hanya bila butuh fitur yang memang lebih kaya seperti transformasi, usage plan tertentu, atau kebutuhan enterprise spesifik
- dokumentasikan mapping auth, CORS, dan error response secara eksplisit

Jangan memilih opsi yang lebih kompleks tanpa kebutuhan yang jelas.

## 3. Rancang alur event-driven dengan aman

Saat memakai SQS, SNS, atau stream:
- pastikan consumer idempotent
- definisikan retry behavior dengan sadar
- gunakan DLQ untuk pesan racun atau kegagalan berulang
- selaraskan visibility timeout dengan lama eksekusi Lambda
- pikirkan partial batch failure untuk batch processing
- hindari side effect yang tidak aman bila event terkirim ulang

Pada sistem event-driven, asumsi “pesan hanya diproses sekali” hampir selalu berbahaya.

## 4. DynamoDB dan storage patterns

Jika memakai DynamoDB:
- modelkan access pattern lebih dulu, bukan tabel dulu
- hindari scan sebagai pola utama produksi
- pikirkan partition key, sort key, dan hot partition risk
- gunakan TTL, stream, dan secondary index hanya bila ada kebutuhan jelas
- pastikan ukuran item, pola write, dan query cost dipahami sejak awal

Serverless yang murah di awal bisa menjadi mahal bila model data tidak disesuaikan dengan pola akses nyata.

## 5. Deployment dan konfigurasi

Untuk deployment:
- kelola infrastruktur sebagai kode dengan SAM, CDK, atau tool setara
- pisahkan environment dev/staging/prod dengan konfigurasi yang jelas
- minimalkan konfigurasi manual di console
- definisikan policy IAM se-sempit mungkin
- dokumentasikan dependency seperti queue, table, topic, dan API stage

Deployment yang tidak repeatable akan menyulitkan debugging dan recovery.

## 6. Observability

Minimal, sistem harus memiliki:
- structured logging
- correlation ID atau request ID propagation
- metric untuk latency, error, retry, dan throttling
- alarm untuk kegagalan penting
- tracing bila alur lintas layanan cukup kompleks

Tanpa observability yang memadai, masalah serverless sering terlihat seperti “acak” padahal sebenarnya dapat ditelusuri.

## 7. Cold start dan performa

Optimasi cold start difokuskan pada area yang memang sensitif:
- kecilkan dependency dan artifact deployment
- pilih runtime yang tepat sesuai SLA
- gunakan lazy initialization untuk dependency yang tidak selalu dipakai
- pertimbangkan SnapStart atau teknik setara untuk runtime yang relevan
- hindari koneksi atau setup berat yang selalu terjadi pada init jika tidak perlu

Jangan over-optimize cold start untuk workload yang tidak latency-sensitive.

## 8. Keamanan dan reliability

Selalu evaluasi:
- least-privilege IAM
- secret handling yang aman
- validasi input pada boundary API/event
- retry storm dan duplicate processing
- concurrency burst dan downstream protection
- fallback behavior saat layanan dependen gagal

Reliability pada arsitektur serverless bukan hasil default; ia harus dirancang.

## Checklist review cepat

Sebelum solusi dianggap siap:
- apakah handler Lambda dipisah dari business logic?
- apakah API Gateway choice sesuai kebutuhan nyata?
- apakah event consumer idempotent dan punya strategi retry/DLQ?
- apakah IAM policy cukup sempit?
- apakah logging, metric, dan alarm memadai?
- apakah cold start hanya dioptimalkan bila memang relevan?
- apakah model data DynamoDB mengikuti access pattern?

## Anti-pattern

Hindari:
- handler besar yang menggabungkan parsing, infra, dan domain logic
- scan DynamoDB sebagai default query strategy
- queue consumer tanpa DLQ atau idempotensi
- permission wildcard berlebihan
- deploy manual yang tidak dapat direproduksi
- mengoptimalkan semua function untuk cold start tanpa bukti kebutuhan

## Catatan Kompatibilitas KiloCode

Skill sumber sangat besar dan penuh contoh implementasi detail lintas bahasa. Pada versi KiloCode ini, kontennya dinormalisasi menjadi panduan arsitektur dan implementasi praktis yang dapat dipakai tanpa membawa seluruh contoh kode upstream.