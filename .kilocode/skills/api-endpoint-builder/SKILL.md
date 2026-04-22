---
name: api-endpoint-builder
description: Gunakan saat membangun endpoint REST production-ready dengan validasi, autentikasi, otorisasi, error handling, format respons konsisten, dan dokumentasi dasar agar aman serta mudah dipelihara.
license: Complete terms in LICENSE.txt
metadata:
  category: backend
  source:
    upstream: .tmp-antigravity-skills/skills/api-endpoint-builder
    type: community
  depends_on:
    - akses ke framework backend, model data, dan aturan autentikasi atau otorisasi proyek
---

# API Endpoint Builder

Skill ini membantu membangun endpoint REST yang siap produksi, bukan sekadar route yang berjalan. Fokusnya mencakup validasi input, autentikasi, otorisasi, business logic, error handling, format respons yang konsisten, dan dokumentasi minimum agar endpoint aman serta mudah dioperasikan.

## Kapan digunakan

Gunakan skill ini saat perlu:
- membuat endpoint API baru
- menambah route pada backend yang sudah ada
- membangun operasi CRUD
- menambahkan validasi request body, params, atau query
- menyiapkan endpoint dengan autentikasi dan otorisasi
- merapikan pola respons dan error handling endpoint

## Hasil yang diharapkan

Untuk setiap endpoint, usahakan tersedia:
- definisi route dan method HTTP yang tepat
- validasi input untuk body, params, dan query
- pemeriksaan autentikasi dan otorisasi bila diperlukan
- business logic yang terpisah dari concern transport
- error handling yang aman dan konsisten
- format respons yang stabil
- dokumentasi endpoint dasar
- test bila scope tugas mencakup pengujian

## Prinsip inti

- validasi dilakukan sebelum business logic berjalan
- autentikasi dan otorisasi dipisahkan jelas dari handler utama
- respons sukses dan error harus konsisten antar endpoint
- jangan bocorkan data sensitif seperti password, token, atau detail internal exception
- gunakan status code HTTP sesuai semantik operasi
- business logic kompleks sebaiknya dipindahkan ke service atau layer domain

## Alur kerja inti

### 1. Tentukan kontrak endpoint

Definisikan lebih dulu:
- method HTTP dan path
- tujuan endpoint
- siapa yang boleh mengakses
- input yang diterima
- output yang dikembalikan
- status code sukses dan error utama

### 2. Validasi semua input

Periksa:
- path params
- query params
- request body
- header penting
- batas ukuran payload bila relevan

Validasi harus mencakup tipe, format, field wajib, enum, range, dan constraint bisnis dasar.

### 3. Terapkan autentikasi dan otorisasi

Pastikan:
- route terlindungi bila memang bukan endpoint publik
- permission dicek terhadap resource yang diakses
- akses lintas tenant atau lintas user tidak lolos tanpa izin
- token, session, atau API key diproses sesuai standar proyek

### 4. Implementasikan handler dengan aman

Handler sebaiknya:
- memanggil service atau repository yang relevan
- menangani kondisi not found, duplicate, conflict, dan validation failure
- mengembalikan payload yang sudah disanitasi
- mencatat error internal tanpa membocorkan detail ke client

### 5. Dokumentasikan dan uji

Minimal dokumentasikan:
- method dan path
- autentikasi
- parameter dan body
- contoh respons sukses dan error

Jika pengujian termasuk scope, tambahkan test untuk:
- jalur sukses
- validasi gagal
- autentikasi atau otorisasi gagal
- resource tidak ditemukan
- conflict atau duplicate case

## Panduan status code

Gunakan secara konsisten:
- `200 OK` untuk operasi baca atau update yang sukses
- `201 Created` untuk pembuatan resource baru
- `204 No Content` untuk delete atau operasi tanpa body respons
- `400 Bad Request` untuk input tidak valid
- `401 Unauthorized` untuk pengguna belum terautentikasi
- `403 Forbidden` untuk pengguna tidak berhak
- `404 Not Found` untuk resource tidak ditemukan
- `409 Conflict` untuk konflik seperti duplikasi data
- `422 Unprocessable Entity` bila proyek membedakan validasi semantik dari format dasar
- `500 Internal Server Error` untuk kegagalan server tak terduga

## Pola format respons

Pilih satu pola konsisten di seluruh API. Contoh sederhana:

```json
{
  "success": true,
  "data": {}
}
```

Untuk error:

```json
{
  "error": "VALIDATION_ERROR",
  "message": "Email tidak valid"
}
```

Untuk list berpaginasi:

```json
{
  "success": true,
  "data": [],
  "pagination": {
    "page": 1,
    "limit": 20,
    "total": 100
  }
}
```

## Checklist keamanan endpoint

- [ ] autentikasi diterapkan pada route yang perlu proteksi
- [ ] otorisasi memeriksa kepemilikan resource atau permission yang tepat
- [ ] semua input tervalidasi
- [ ] query database aman dari injection
- [ ] data sensitif tidak ikut dikembalikan
- [ ] rate limiting dipertimbangkan untuk endpoint publik atau sensitif
- [ ] CORS dan batas ukuran request sesuai kebutuhan
- [ ] logging internal tersedia untuk investigasi error

## Anti-pattern penting

- handler langsung mengakses database tanpa validasi input
- mengembalikan exception mentah ke client
- mencampur autentikasi, validasi, dan business logic dalam satu blok besar
- memakai status code `200` untuk semua kondisi termasuk error
- mengembalikan password hash, token, atau field internal lain
- tidak mendokumentasikan kontrak endpoint setelah implementasi

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/api-endpoint-builder` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
