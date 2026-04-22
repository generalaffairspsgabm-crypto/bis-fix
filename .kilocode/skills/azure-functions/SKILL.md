---
name: azure-functions
description: Gunakan saat merancang atau mengimplementasikan aplikasi Azure Functions dengan fokus pada isolated worker, Durable Functions, cold start, trigger model modern, dan pola produksi untuk .NET, Python, atau Node.js.
license: Complete terms in LICENSE.txt
metadata:
  category: cloud
  source:
    upstream: .tmp-antigravity-skills/skills/azure-functions
    type: community
  depends_on:
    - akses ke proyek Azure Functions atau kebutuhan desain serverless di Azure
---

# Azure Functions

Skill ini memandu pengembangan Azure Functions production-grade, termasuk pemilihan programming model modern, desain trigger, dependency injection, observability, dan optimasi cold start. Fokusnya adalah membangun fungsi yang mudah dioperasikan, hemat biaya, dan aman dievolusikan.

## Kapan digunakan

Gunakan skill ini saat:
- membangun HTTP trigger, timer trigger, queue trigger, blob trigger, atau event-driven workflow di Azure
- memigrasikan aplikasi Azure Functions ke model yang lebih modern
- merancang Durable Functions orchestration
- mengoptimalkan cold start dan startup path
- menata dependency injection, konfigurasi, dan logging pada Functions app
- bekerja dengan Azure Functions di .NET, Python, atau Node.js

## Tujuan utama

- memilih programming model yang sesuai bahasa dan horizon dukungan
- menjaga fungsi tetap kecil, fokus, dan mudah diuji
- menghindari coupling berlebihan antara trigger, business logic, dan infrastruktur
- memastikan observability, retry, dan error handling siap untuk produksi

## Prinsip inti

- pisahkan binding atau trigger dari business logic inti
- gunakan dependency injection atau composition root bila runtime mendukung
- perlakukan fungsi sebagai unit kecil yang idempotent bila memungkinkan
- desain retry dan poison-message handling secara eksplisit
- optimalkan startup path untuk mengurangi cold start

## Alur kerja inti

### 1. Pilih programming model modern

Panduan umum:
- .NET baru: prioritaskan isolated worker
- Node.js: gunakan model v4 yang code-centric
- Python: gunakan model v2 berbasis decorator bila sesuai runtime target

Hindari memulai proyek baru dengan model yang mendekati akhir dukungan bila ada alternatif modern yang lebih aman.

### 2. Pisahkan trigger dari logika domain

Struktur yang disarankan:
- fungsi menerima input dari trigger
- fungsi melakukan validasi dasar dan mapping request
- service atau use case menangani logika bisnis
- adapter terpisah menangani akses storage, queue, API eksternal, atau telemetry

Dengan pola ini, pengujian tidak bergantung penuh pada runtime Azure Functions.

### 3. Rancang trigger dan binding dengan hati-hati

Periksa untuk setiap fungsi:
- sumber event atau request
- format payload
- kebutuhan autentikasi atau authorization
- retry behavior bawaan dan retry tambahan yang dibutuhkan
- konsekuensi bila event diproses dua kali

Untuk HTTP trigger:
- validasi input secara eksplisit
- gunakan response yang konsisten
- jangan bocorkan detail internal pada error

Untuk queue atau event trigger:
- desain idempotensi
- siapkan dead-letter atau poison handling
- log correlation ID atau metadata penting

### 4. Gunakan Durable Functions hanya bila orkestrasi memang diperlukan

Durable Functions cocok untuk:
- workflow multi-step yang panjang
- fan-out/fan-in
- proses yang perlu checkpoint state
- human interaction atau approval step yang eksplisit

Jangan gunakan Durable Functions untuk alur sederhana yang cukup ditangani satu fungsi atau satu queue consumer biasa.

### 5. Optimalkan cold start dan startup path

Prioritas optimasi:
- minimalkan dependency berat saat startup
- hindari inisialisasi mahal yang tidak perlu di jalur awal
- gunakan koneksi dan client yang dapat dipakai ulang sesuai model runtime
- kurangi kerja sinkron yang memblokir startup
- audit ukuran deployment package dan dependency tree

Optimasi harus berbasis pengukuran, bukan asumsi.

### 6. Siapkan observability dan operasi produksi

Minimal pastikan:
- logging terstruktur tersedia
- error penting tercatat dengan konteks yang cukup
- metrik latency, failure rate, dan throughput dapat diamati
- tracing atau correlation ID tersedia untuk alur lintas layanan
- konfigurasi environment dipisahkan dari kode

## Checklist implementasi

1. Tentukan bahasa, runtime, dan programming model yang didukung.
2. Pisahkan trigger handler dari business logic inti.
3. Validasi input, error handling, dan response contract.
4. Rancang retry, idempotensi, dan poison-message handling.
5. Audit cold start dan dependency startup.
6. Verifikasi logging, telemetry, dan konfigurasi produksi.

## Anti-pattern penting

- menaruh seluruh logika bisnis langsung di function handler
- mengandalkan perilaku retry tanpa memahami efek duplikasi event
- memakai Durable Functions untuk workflow yang terlalu sederhana
- membuat startup berat dengan dependency yang tidak perlu
- membocorkan exception internal langsung ke response publik

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/azure-functions` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
