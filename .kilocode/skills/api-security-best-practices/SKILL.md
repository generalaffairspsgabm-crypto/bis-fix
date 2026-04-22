---
name: api-security-best-practices
description: >-
  Gunakan saat merancang atau mereview keamanan API agar autentikasi,
  otorisasi, validasi input, rate limiting, perlindungan data, dan pengujian
  terhadap kerentanan umum diterapkan secara menyeluruh.
license: CC-BY-4.0
metadata:
  category: security
  source:
    repository: 'https://github.com/sickn33/antigravity-awesome-skills'
    path: skills/api-security-best-practices
    license_path: LICENSE-CONTENT
  original_metadata:
    risk: unknown
    source: community
    date_added: '2026-02-27'
---

# API Security Best Practices

Skill ini memandu desain dan review keamanan API secara end-to-end. Fokusnya meliputi autentikasi, otorisasi, validasi input, perlindungan data, pembatasan abuse, dan pengujian kontrol keamanan. Skill ini relevan untuk REST, GraphQL, maupun pola API lain selama ada permukaan serangan berbasis request/response.

## Kapan digunakan

Gunakan saat:
- merancang endpoint API baru
- mengamankan API yang sudah ada
- memilih atau memperbaiki mekanisme autentikasi dan otorisasi
- menyiapkan API menghadapi audit keamanan
- mereview API terhadap risiko OWASP API Top 10 atau serangan umum lain
- menambahkan rate limiting, throttling, atau proteksi abuse
- menangani data sensitif melalui API

## Prinsip inti

- anggap semua input tidak tepercaya sampai tervalidasi
- pisahkan autentikasi, otorisasi, dan validasi; ketiganya bukan hal yang sama
- terapkan least privilege di setiap boundary
- lindungi rahasia, token, dan data sensitif baik in transit maupun at rest
- desain error handling agar membantu client tanpa membocorkan detail internal
- verifikasi kontrol keamanan dengan testing, bukan asumsi

## Alur kerja

### 1. Tetapkan model autentikasi dan otorisasi

Tentukan lebih dulu:
- siapa aktor yang mengakses API: user, service, partner, tenant
- apakah konteks lebih cocok untuk session, JWT, OAuth2/OIDC, atau API key
- bagaimana lifecycle token: issuance, expiry, refresh, revocation, rotation
- di mana enforcement authorization terjadi: route, service, policy engine, atau field-level
- apakah RBAC, permission-based access, ownership check, atau kombinasi diperlukan

Prinsip penting:
- gunakan secret kuat dan simpan aman
- batasi umur access token
- gunakan refresh token hanya bila benar-benar perlu dan perlakukan sebagai credential sensitif
- jangan pernah log token, secret, atau credential mentah

### 2. Validasi dan sanitasi seluruh input

Untuk semua request:
- validasi schema dan tipe data
- validasi constraint bisnis seperti panjang, rentang, enum, dan format
- gunakan parameterized query atau ORM yang aman
- cegah injection: SQL, NoSQL, command, template, dan XSS sesuai konteks
- sanitasi output bila API mengembalikan konten yang nantinya dirender

Prinsip penting:
- validation failure harus menghasilkan respons yang aman dan konsisten
- jangan mengandalkan validasi client-side sebagai kontrol utama

### 3. Lindungi dari abuse dan denial of service

Rancang guardrail seperti:
- rate limiting per IP, user, tenant, atau API key
- throttling pada endpoint mahal atau sensitif
- quota dan burst policy yang masuk akal
- pembatasan ukuran payload dan kompleksitas request
- monitoring pola request mencurigakan

Untuk GraphQL atau query yang ekspresif, tambahkan pembatasan depth, complexity, atau cost analysis.

### 4. Amankan data dan transport

Pastikan:
- HTTPS/TLS diwajibkan
- data sensitif dienkripsi bila perlu saat disimpan
- header keamanan relevan diterapkan
- error message tidak membocorkan stack trace, detail query, atau informasi user existence secara berlebihan
- response hanya mengembalikan field yang memang dibutuhkan

Jangan pernah:
- mengirim password hash, secret internal, atau credential turunan ke client
- menaruh data sensitif berlebihan ke dalam payload token

### 5. Uji kontrol keamanan

Verifikasi minimal terhadap:
- bypass autentikasi
- escalation atau bypass otorisasi
- broken object level authorization
- injection dan input validation weakness
- rate limit bypass
- kebocoran data pada error path
- kelemahan lifecycle token seperti refresh/revocation yang tidak benar

Gunakan referensi seperti OWASP API Top 10 sebagai checklist, tetapi sesuaikan dengan arsitektur nyata sistem.

## Checklist implementasi cepat

- metode autentikasi dipilih sesuai actor dan threat model
- secret dan token disimpan aman
- access token pendek, refresh token dikontrol ketat
- semua input tervalidasi di server
- query menggunakan parameterization atau ORM aman
- authorization diuji per resource, bukan hanya per route global
- rate limiting dan payload guardrail aktif
- error handling aman dan tidak informatif berlebihan
- endpoint sensitif memiliki audit trail yang memadai

## Pola otorisasi yang umum

Gunakan kombinasi berikut sesuai kebutuhan:
- **RBAC** untuk pembagian akses per peran
- **permission-based access** saat hak akses lebih granular
- **resource ownership** saat akses bergantung pada kepemilikan objek
- **tenant isolation** saat sistem multi-tenant
- **policy-based checks** saat aturan akses kompleks dan kontekstual

## Anti-pattern

Hindari:
- membedakan pesan login gagal antara user tidak ada dan password salah tanpa alasan kuat
- menyimpan refresh token mentah tanpa kontrol memadai
- menganggap autentikasi sudah cukup tanpa authorization per resource
- menggunakan query mentah yang menyisipkan input user langsung
- tidak membatasi ukuran dan laju request
- membocorkan detail internal lewat error response
- tidak menguji skenario bypass pada endpoint sensitif

## Catatan kompatibilitas KiloCode

Skill upstream berisi playbook dan contoh kode yang sangat panjang. Pada adaptasi KiloCode ini, dependensi eksternal dihilangkan dan workflow dipadatkan menjadi pedoman desain dan review keamanan API yang mandiri, sehingga tetap usable tanpa membuka resource tambahan.