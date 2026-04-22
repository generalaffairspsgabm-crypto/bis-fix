---
name: api-documentation-generator
description: Gunakan saat perlu menghasilkan dokumentasi API yang lengkap dan ramah developer dari kode atau kontrak API, termasuk endpoint, parameter, autentikasi, contoh request-response, error, dan panduan penggunaan.
license: Complete terms in LICENSE.txt
metadata:
  category: documentation
  source:
    upstream: .tmp-antigravity-skills/skills/api-documentation-generator
    type: community
  depends_on:
    - akses ke kode API, spesifikasi kontrak, atau contoh request-response yang representatif
---

# API Documentation Generator

Skill ini memandu pembuatan dokumentasi API yang jelas, lengkap, dan siap dipakai developer internal maupun eksternal. Fokusnya adalah akurasi kontrak, contoh yang benar-benar dapat dijalankan, serta struktur dokumentasi yang mempercepat integrasi.

## Kapan digunakan

Gunakan skill ini saat perlu:
- mendokumentasikan API baru
- memperbarui dokumentasi API yang sudah ada
- menutup gap dokumentasi pada REST, GraphQL, atau WebSocket API
- menyiapkan dokumentasi onboarding untuk developer baru
- membuat spesifikasi OpenAPI atau Swagger dari implementasi yang ada
- menyiapkan dokumentasi publik untuk consumer eksternal

## Tujuan utama

- menjelaskan kontrak API secara akurat dan mudah dipahami
- menyediakan contoh request-response yang realistis
- mendokumentasikan autentikasi, error, pagination, filtering, dan rate limit bila relevan
- mengurangi kebutuhan trial-and-error saat integrasi
- menjaga dokumentasi tetap sinkron dengan implementasi

## Prinsip inti

- dokumentasi harus berasal dari implementasi atau kontrak nyata, bukan asumsi
- setiap endpoint perlu menjelaskan input, output, dan failure mode utama
- contoh kode harus runnable atau setidaknya sangat dekat dengan penggunaan nyata
- istilah, struktur respons, dan penamaan field harus konsisten di seluruh dokumen
- dokumentasi harus membantu developer mencapai time-to-first-success secepat mungkin

## Alur kerja inti

### 1. Analisis struktur API

Identifikasi terlebih dahulu:
- daftar endpoint atau operasi yang tersedia
- method HTTP atau jenis operasi GraphQL/WebSocket
- parameter path, query, header, dan body
- format respons sukses dan error
- kebutuhan autentikasi dan otorisasi
- pola pagination, filtering, sorting, dan rate limiting

### 2. Dokumentasikan setiap endpoint

Untuk tiap endpoint, minimal sertakan:
- method dan path atau nama operasi
- ringkasan fungsi endpoint
- kebutuhan autentikasi
- parameter yang diterima beserta tipe, validasi, dan status wajib/opsional
- skema body request
- respons sukses beserta status code
- respons error yang umum dan artinya
- contoh request dan contoh respons

### 3. Tambahkan panduan penggunaan

Lengkapi dokumentasi dengan:
- langkah mulai cepat
- cara memperoleh credential atau token
- contoh use case umum
- pola pagination dan filtering
- batasan rate limit atau quota bila ada
- best practice integrasi dan retry

### 4. Dokumentasikan error handling

Pastikan ada penjelasan tentang:
- daftar error code penting
- format payload error
- penyebab umum kegagalan
- langkah troubleshooting dasar
- perbedaan error validasi, autentikasi, otorisasi, dan server

### 5. Siapkan artefak turunan bila relevan

Jika konteks mendukung, hasilkan atau sarankan:
- spesifikasi OpenAPI atau Swagger
- koleksi Postman atau Insomnia
- contoh kode multi-bahasa
- mock response atau sandbox guide

## Template minimum per endpoint

Gunakan struktur seperti berikut:

```markdown
## Buat Pengguna

**Endpoint:** `POST /api/v1/users`

**Tujuan:** Membuat akun pengguna baru.

**Autentikasi:** Bearer token diperlukan.

### Request Body
| Field | Tipe | Wajib | Keterangan |
|------|------|------|-----------|
| email | string | ya | Email valid dan unik |
| password | string | ya | Minimal 8 karakter |
| name | string | ya | Nama tampilan pengguna |

### Success Response `201 Created`
```json
{
  "id": "usr_123",
  "email": "user@example.com",
  "name": "John Doe"
}
```

### Error Responses
- `400 Bad Request` untuk input tidak valid
- `409 Conflict` bila email sudah terdaftar

### Contoh cURL
```bash
curl -X POST https://api.example.com/api/v1/users \
  -H "Authorization: Bearer TOKEN" \
  -H "Content-Type: application/json" \
  -d '{"email":"user@example.com","password":"SecurePass123!","name":"John Doe"}'
```
```

## Checklist kualitas dokumentasi

- [ ] semua endpoint penting tercakup
- [ ] autentikasi dijelaskan jelas
- [ ] contoh request-response konsisten dengan implementasi
- [ ] status code sukses dan error terdokumentasi
- [ ] field wajib, opsional, dan validasi dijelaskan
- [ ] ada panduan mulai cepat untuk integrator baru
- [ ] istilah dan format konsisten di seluruh dokumen

## Anti-pattern penting

- mendokumentasikan endpoint yang sudah tidak aktif tanpa penanda deprecation
- contoh payload yang tidak cocok dengan implementasi nyata
- hanya menulis deskripsi tinggi tanpa contoh konkret
- mengabaikan error response dan troubleshooting
- mencampur detail internal yang tidak relevan bagi consumer API

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/api-documentation-generator` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
