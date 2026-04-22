---
name: api-security-testing
description: Gunakan saat menguji keamanan API REST atau GraphQL agar autentikasi, otorisasi, rate limiting, validasi input, error handling, dan kontrol keamanan API lain diperiksa secara sistematis.
license: Complete terms in LICENSE.txt
metadata:
  category: security
  source:
    upstream: .tmp-antigravity-skills/skills/api-security-testing
    type: personal
  depends_on:
    - akses ke endpoint API target, dokumentasi kontrak, dan izin pengujian yang sah
---

# API Security Testing

Skill ini memandu pengujian keamanan API secara sistematis untuk REST maupun GraphQL. Fokusnya adalah menemukan kelemahan pada autentikasi, otorisasi, validasi input, rate limiting, error handling, dan kontrol keamanan spesifik API tanpa melampaui izin pengujian yang diberikan.

## Kapan digunakan

Gunakan skill ini saat perlu:
- mengaudit keamanan REST API
- menilai keamanan endpoint GraphQL
- memverifikasi implementasi autentikasi API
- menguji rate limiting dan proteksi brute force
- melakukan assessment keamanan API dalam konteks bug bounty atau audit internal yang sah

## Batasan penggunaan

- hanya gunakan pada sistem yang memang diizinkan untuk diuji
- jangan melakukan pengujian destruktif tanpa persetujuan eksplisit
- jangan memakai data pelanggan nyata atau kredensial produksi di luar izin yang diberikan

## Tujuan utama

- memetakan permukaan serangan API
- memverifikasi kontrol autentikasi dan otorisasi
- menemukan kelemahan validasi input dan penanganan error
- menilai ketahanan terhadap abuse seperti brute force atau resource exhaustion
- menghasilkan temuan yang dapat diremediasi dengan jelas

## Alur kerja inti

### 1. Discovery API

Mulai dengan:
- enumerasi endpoint, method, dan versi API
- identifikasi parameter path, query, header, dan body
- pemetaan flow data sensitif
- peninjauan dokumentasi, schema, atau koleksi request yang tersedia
- identifikasi apakah API berbasis REST, GraphQL, webhook, atau campuran

### 2. Uji autentikasi

Periksa:
- validasi API key, session, JWT, atau OAuth flow
- perilaku token kedaluwarsa
- refresh token dan revocation
- endpoint yang seharusnya privat tetapi bisa diakses anonim
- kelemahan pada login, reset, atau token issuance bila termasuk scope

### 3. Uji otorisasi

Verifikasi:
- object-level authorization seperti IDOR atau BOLA
- function-level authorization untuk aksi sensitif
- pembatasan role dan permission
- isolasi tenant pada sistem multi-tenant
- kemungkinan privilege escalation horizontal maupun vertikal

### 4. Uji validasi input

Periksa semua permukaan input terhadap:
- validasi tipe dan format
- SQL injection atau NoSQL injection
- command injection bila ada integrasi shell atau worker
- XXE, deserialization, atau parser abuse bila relevan
- payload besar, nested object, atau input anomali lain yang dapat memicu crash

### 5. Uji rate limiting dan abuse resistance

Nilai:
- keberadaan header rate limit
- proteksi brute force pada endpoint sensitif
- pembatasan resource-intensive query
- kemungkinan bypass rate limit
- dampak request paralel atau burst traffic terhadap stabilitas layanan

### 6. Uji GraphQL bila ada

Untuk GraphQL, cek khusus:
- introspection exposure
- query depth dan complexity limit
- batching abuse
- field suggestion leakage
- akses ke field sensitif yang tidak semestinya tersedia

### 7. Uji error handling dan informasi bocor

Pastikan:
- pesan error tidak membocorkan stack trace atau detail internal
- kode error konsisten dan tidak mengungkap implementasi sensitif
- logging internal cukup tanpa mengekspos data rahasia ke client
- respons gagal tetap mengikuti kontrak yang aman

## Checklist audit

- [ ] semua endpoint penting telah dipetakan
- [ ] autentikasi diverifikasi untuk jalur sukses dan gagal
- [ ] otorisasi diuji pada level objek dan fungsi
- [ ] input tervalidasi dan tahan terhadap payload berbahaya
- [ ] rate limiting dan proteksi abuse dinilai
- [ ] error handling tidak membocorkan informasi sensitif
- [ ] HTTPS, CORS, dan header keamanan relevan ditinjau bila termasuk scope
- [ ] temuan dan remediation terdokumentasi jelas

## Format temuan yang direkomendasikan

Untuk setiap temuan, dokumentasikan:
- judul singkat
- endpoint atau operasi terdampak
- prasyarat eksploitasi
- langkah reproduksi tingkat tinggi yang aman
- dampak bisnis atau teknis
- tingkat keparahan
- rekomendasi remediation

## Anti-pattern penting

- menguji tanpa izin eksplisit
- langsung menyerang endpoint tanpa discovery dan pemetaan kontrak
- hanya fokus pada autentikasi dan mengabaikan otorisasi
- tidak membedakan bug validasi dari bug otorisasi
- menghasilkan laporan tanpa langkah reproduksi dan remediation yang jelas

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/api-security-testing` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
