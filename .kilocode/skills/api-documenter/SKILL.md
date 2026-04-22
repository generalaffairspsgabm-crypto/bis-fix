---
name: api-documenter
description: Gunakan saat menyusun dokumentasi API modern berbasis OpenAPI, AsyncAPI, portal developer, contoh kode, SDK, dan strategi pemeliharaan agar pengalaman developer lebih cepat, jelas, dan dapat diskalakan.
license: Complete terms in LICENSE.txt
metadata:
  category: documentation
  source:
    upstream: .tmp-antigravity-skills/skills/api-documenter
    type: community
  depends_on:
    - akses ke spesifikasi API, kode implementasi, dan kebutuhan audiens dokumentasi
---

# API Documenter

Skill ini berfokus pada dokumentasi API modern sebagai produk developer experience, bukan sekadar daftar endpoint. Cakupannya meliputi spesifikasi OpenAPI atau AsyncAPI, portal developer, contoh kode lintas bahasa, dokumentasi autentikasi, strategi versioning, dan otomasi pemeliharaan docs-as-code.

## Kapan digunakan

Gunakan skill ini saat perlu:
- membuat atau memperbarui spesifikasi OpenAPI 3.1 atau AsyncAPI
- membangun portal developer atau pusat dokumentasi multi-API
- meningkatkan kualitas dokumentasi API agar lebih mudah ditemukan dan dipakai
- menghasilkan contoh kode atau SDK dari spesifikasi API
- menyiapkan migration guide, changelog, atau dokumentasi deprecation
- merancang pengalaman onboarding developer yang lebih baik

## Jangan gunakan saat

- kebutuhan hanya catatan internal singkat atau ringkasan informal
- tugas murni implementasi backend tanpa kebutuhan dokumentasi
- tidak ada permukaan API atau kontrak yang perlu dijelaskan

## Tujuan utama

- mempercepat time-to-first-success bagi developer integrator
- memastikan spesifikasi API akurat, tervalidasi, dan mudah dipelihara
- menyediakan dokumentasi interaktif dengan contoh yang benar-benar berguna
- mendukung evolusi API melalui versioning, changelog, dan migration guide yang jelas
- menjadikan dokumentasi bagian dari workflow engineering, bukan artefak yang tertinggal

## Pilar kemampuan

### 1. Standar dokumentasi modern

Cakup bila relevan:
- OpenAPI 3.1 untuk REST API
- AsyncAPI untuk event-driven atau real-time API
- dokumentasi GraphQL schema dan operasi utama
- JSON Schema untuk validasi payload
- dokumentasi webhook, callback, dan event payload
- lifecycle API dari desain hingga deprecation

### 2. Pengalaman dokumentasi interaktif

Pertimbangkan:
- Swagger UI, Redoc, atau portal kustom
- API explorer dengan live request bila aman
- contoh kode multi-bahasa
- tutorial onboarding bertahap
- dokumentasi autentikasi yang dapat langsung dicoba

### 3. Portal developer dan arsitektur informasi

Rancang struktur yang memudahkan pengguna menemukan:
- quickstart
- autentikasi
- referensi endpoint atau operasi
- SDK dan contoh integrasi
- webhook atau event reference
- changelog, migration guide, dan FAQ

### 4. Otomasi dan docs-as-code

Dokumentasi sebaiknya:
- hidup bersama kode atau spesifikasi
- tervalidasi di CI bila memungkinkan
- memiliki contoh yang diuji otomatis
- punya proses update saat kontrak API berubah
- mendukung versioning dan rollback dokumentasi

## Alur kerja inti

### 1. Pahami audiens dan tujuan dokumentasi

Identifikasi:
- siapa pengguna utama: internal engineer, partner, atau publik
- use case integrasi paling umum
- hambatan onboarding saat ini
- format output yang dibutuhkan: spec, portal, markdown, SDK docs, atau kombinasi

### 2. Audit kontrak dan sumber kebenaran

Tentukan source of truth:
- spesifikasi OpenAPI atau AsyncAPI
- anotasi kode atau route definition
- schema request-response
- contoh payload nyata yang sudah disanitasi
- aturan autentikasi, rate limit, dan error model

### 3. Susun arsitektur konten

Minimal pertimbangkan bagian berikut:
- getting started
- autentikasi
- referensi endpoint atau operasi
- contoh request-response
- error handling
- pagination, filtering, sorting, dan webhook bila ada
- changelog, versioning, dan migration guide

### 4. Tambahkan contoh yang bekerja

Setiap area penting sebaiknya punya:
- cURL
- JavaScript atau TypeScript
- Python
- contoh bahasa lain bila audiens membutuhkannya
- payload sukses dan error yang realistis

### 5. Validasi dan rencanakan pemeliharaan

Pastikan:
- spesifikasi lolos validasi schema
- contoh kode tidak usang
- perubahan breaking change punya migration guide
- dokumentasi versi lama tetap dapat diakses bila diperlukan
- ada mekanisme feedback dari pengguna dokumentasi

## Checklist kualitas

- [ ] ada quickstart yang membawa pengguna ke request pertama dengan cepat
- [ ] autentikasi dijelaskan lengkap dengan contoh
- [ ] semua operasi penting punya contoh request-response
- [ ] error umum dan troubleshooting terdokumentasi
- [ ] spesifikasi tervalidasi dan sinkron dengan implementasi
- [ ] struktur navigasi mudah dipindai
- [ ] versioning, changelog, dan deprecation policy jelas
- [ ] dokumentasi dapat dipelihara lewat workflow docs-as-code

## Anti-pattern penting

- dokumentasi hanya berupa dump spesifikasi tanpa konteks penggunaan
- contoh kode tidak pernah diuji atau sudah tidak valid
- tidak ada quickstart sehingga pengguna bingung memulai
- perubahan breaking change tanpa migration guide
- portal dokumentasi berat, lambat, atau sulit dicari
- dokumentasi keamanan dangkal tanpa contoh flow autentikasi nyata

## Pendekatan respons yang direkomendasikan

Saat memakai skill ini:
1. nilai kebutuhan dokumentasi dan persona developer
2. tentukan source of truth kontrak API
3. rancang struktur informasi dengan progressive disclosure
4. hasilkan spesifikasi dan contoh yang tervalidasi
5. siapkan pengalaman interaktif bila sesuai
6. rencanakan maintenance, versioning, dan feedback loop

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/api-documenter` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
