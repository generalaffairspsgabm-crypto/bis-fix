---
name: airflow-dag-patterns
description: Gunakan saat membangun DAG Apache Airflow production-grade agar desain pipeline, operator, sensor, retry, observabilitas, pengujian, dan deployment tetap andal serta mudah dioperasikan.
license: Complete terms in LICENSE.txt
metadata:
  category: data-engineering
  source:
    upstream: .tmp-antigravity-skills/skills/airflow-dag-patterns
    type: community
  depends_on:
    - akses ke kode DAG, konfigurasi Airflow, dan lingkungan deployment terkait
---

# Airflow DAG Patterns

Skill ini membantu merancang dan mengimplementasikan DAG Apache Airflow yang siap produksi. Fokusnya adalah pipeline yang idempoten, dependency yang jelas, observabilitas yang memadai, serta aman saat dijalankan ulang, backfill, atau dipromosikan ke environment lain.

## Kapan digunakan

Gunakan skill ini saat perlu:
- membuat pipeline data atau workflow batch dengan Apache Airflow
- merancang struktur DAG, task dependency, dan schedule
- memilih operator, sensor, hook, atau pola task grouping yang tepat
- menyiapkan strategi retry, alerting, dan observabilitas DAG
- menguji DAG secara lokal atau di staging sebelum rilis
- men-debug DAG run yang gagal, macet, atau menghasilkan duplikasi data

## Jangan gunakan saat

- kebutuhan cukup dipenuhi cron sederhana atau script tunggal tanpa orkestrasi kompleks
- Airflow bukan bagian dari stack yang dipakai
- tugas tidak berkaitan dengan workflow orchestration atau pipeline terjadwal

## Tujuan utama

- menghasilkan DAG yang idempoten dan aman untuk rerun
- menjaga dependency eksplisit dan mudah dipahami operator manusia
- meminimalkan coupling antar task dan antar DAG
- memastikan pipeline punya logging, alerting, dan runbook operasional yang memadai
- mengurangi risiko duplikasi data saat retry, catchup, atau backfill

## Prinsip inti

- desain task harus idempoten; rerun tidak boleh merusak state atau menggandakan output
- pisahkan ekstraksi, transformasi, validasi, dan publish agar kegagalan mudah diisolasi
- gunakan retry hanya untuk error transien; jangan menutupi bug deterministik dengan retry berlebihan
- hindari task terlalu besar; pecah menjadi unit yang punya input-output jelas
- simpan konfigurasi penting di variable, connection, atau config terkelola, bukan hardcode
- pastikan SLA, timeout, concurrency, dan resource limit dipilih sadar sesuai karakter workload

## Alur kerja inti

### 1. Pahami pipeline dan constraint operasional

Identifikasi lebih dulu:
- sumber data, target data, dan kontrak skema
- frekuensi eksekusi, timezone, dan kebutuhan catchup
- dependency eksternal seperti storage, warehouse, API, atau queue
- kebutuhan latency, throughput, dan toleransi keterlambatan
- risiko duplikasi, partial write, atau side effect saat rerun

### 2. Rancang struktur DAG

Tentukan:
- satu DAG per domain atau per alur bisnis yang koheren
- task boundary yang jelas dan mudah diuji
- dependency eksplisit antar task
- penggunaan `TaskGroup`, dynamic task mapping, atau subworkflow hanya bila benar-benar membantu
- trigger rule, branching, dan failure path yang mudah dipahami

### 3. Pilih operator dan sensor dengan hemat

Utamakan:
- operator bawaan atau provider resmi sebelum membuat custom operator
- sensor yang efisien; pertimbangkan mode deferrable bila tersedia
- hook atau abstraction yang memisahkan akses sistem eksternal dari business logic
- custom operator hanya jika pola dipakai berulang dan memberi nilai reuse nyata

### 4. Tambahkan observabilitas dan guardrail

Pastikan DAG memiliki:
- logging yang cukup untuk menelusuri input, output, dan keputusan penting
- alerting untuk failure, SLA miss, atau anomali penting
- timeout, retry policy, dan dead-letter atau fallback bila relevan
- dokumentasi runbook singkat untuk failure mode umum

### 5. Uji sebelum rilis

Lakukan verifikasi minimal:
- validasi import DAG dan parsing tanpa error
- unit test untuk helper, transformasi, dan custom operator penting
- uji dependency dan schedule di staging
- simulasi retry, backfill, atau rerun pada skenario berisiko tinggi

## Checklist desain DAG

- [ ] schedule, timezone, dan catchup sudah sesuai kebutuhan bisnis
- [ ] setiap task idempoten atau punya mekanisme deduplikasi
- [ ] dependency antar task eksplisit dan mudah dibaca
- [ ] retry, timeout, dan concurrency sudah ditetapkan sadar
- [ ] secret dan connection tidak di-hardcode
- [ ] logging dan alerting cukup untuk investigasi insiden
- [ ] ada strategi backfill yang aman
- [ ] ada dokumentasi singkat untuk operasi dan troubleshooting

## Anti-pattern penting

- satu task raksasa yang melakukan terlalu banyak langkah sekaligus
- retry agresif pada error validasi atau bug logika deterministik
- side effect tanpa proteksi idempoten
- sensor polling mahal tanpa batas waktu yang jelas
- dependency implisit antar DAG tanpa dokumentasi atau kontrak data
- perubahan schedule produksi tanpa analisis dampak dan persetujuan

## Panduan troubleshooting cepat

Jika DAG gagal:
1. cek apakah kegagalan berasal dari parsing, dependency, credential, atau data quality
2. bedakan error transien dari error deterministik sebelum menaikkan retry
3. verifikasi apakah rerun aman terhadap output yang sudah terlanjur ditulis
4. cek bottleneck pada concurrency, pool, queue, atau resource worker
5. dokumentasikan akar masalah dan perbarui runbook bila pola berulang

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/airflow-dag-patterns` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
