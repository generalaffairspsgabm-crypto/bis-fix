---
name: api-patterns
description: >-
  Gunakan saat merancang pola API agar keputusan seperti REST vs GraphQL vs
  tRPC, struktur response, versioning, authentication, pagination, dan rate
  limiting dipilih berdasarkan konteks consumer dan evolusi sistem.
license: CC-BY-4.0
metadata:
  category: api
  source:
    repository: 'https://github.com/sickn33/antigravity-awesome-skills'
    path: skills/api-patterns
    license_path: LICENSE-CONTENT
  original_metadata:
    risk: unknown
    source: community
    date_added: '2026-02-27'
---

# API Patterns

Skill ini memandu pemilihan pola API berdasarkan kebutuhan consumer, evolusi produk, dan batas operasional. Tujuannya bukan membuat API “modern” di atas kertas, tetapi memilih gaya dan kontrak yang paling sesuai untuk konteks aktual sistem.

## Kapan digunakan

Gunakan saat:
- memilih gaya API untuk fitur atau sistem baru
- menyusun kontrak API lintas consumer
- menentukan pola response, pagination, versioning, dan error format
- menilai strategi auth dan rate limiting pada level desain
- mereview apakah desain API konsisten dan siap berevolusi

## Prinsip inti

- pilih gaya API berdasarkan pola penggunaan consumer
- utamakan konsistensi kontrak daripada kreativitas endpoint
- rencanakan evolusi API sejak awal, terutama untuk versioning dan deprecation
- pastikan auth, error handling, dan rate limiting dipikirkan sebagai bagian desain, bukan tambahan belakangan
- hindari style campur aduk tanpa alasan kuat

## Alur kerja

### 1. Identifikasi consumer dan bentuk interaksi

Sebelum memilih gaya API, tentukan:
- siapa konsumennya: browser, mobile, partner, internal service, monorepo
- apakah kebutuhan data stabil atau sangat bervariasi
- apakah ada kebutuhan real-time, batching, atau orchestration kompleks
- seberapa penting type safety end-to-end
- bagaimana pola baca/tulis dan volume request

### 2. Pilih gaya API

#### REST

Pilih REST saat:
- resource dan operasi cukup natural dimodelkan sebagai resource
- consumer beragam dan butuh interoperabilitas tinggi
- caching HTTP, status code, dan tooling umum memberi nilai besar

Panduan:
- gunakan penamaan resource, bukan verb, misalnya `/users` bukan `/getUsers`
- manfaatkan HTTP method secara konsisten
- gunakan status code yang tepat
- jaga hierarki resource tetap masuk akal dan tidak terlalu dalam

#### GraphQL

Pilih GraphQL saat:
- consumer butuh fleksibilitas memilih field
- satu layar atau flow butuh gabungan banyak resource
- variasi kebutuhan data antar client tinggi

Waspadai:
- kompleksitas query
- over-fetching dan under-fetching yang bergeser menjadi masalah resolver
- kebutuhan auth field-level dan query cost control
- observability yang lebih sulit daripada REST sederhana

#### tRPC atau kontrak strongly-typed internal

Pilih saat:
- ekosistem dominan TypeScript
- client dan server hidup dalam satu boundary organisasi atau monorepo
- kecepatan delivery internal dan type safety lebih penting daripada interoperabilitas publik

Waspadai:
- coupling kuat ke stack tertentu
- keterbatasan untuk public API lintas bahasa

### 3. Tentukan struktur response dan error

Pastikan API memiliki pola yang konsisten untuk:
- data sukses
- error yang dapat dipahami client
- metadata seperti pagination atau request id

Prinsip:
- konsisten lebih penting daripada format tertentu
- jangan bocorkan detail internal, stack trace, atau query mentah
- error harus cukup spesifik untuk ditangani client, tetapi tetap aman

### 4. Rencanakan pagination, filtering, dan sorting

Tentukan sejak awal:
- apakah offset pagination cukup atau perlu cursor pagination
- field mana yang aman untuk filtering dan sorting
- batas ukuran halaman dan guardrail terhadap query berat

Heuristik:
- offset cocok untuk data kecil hingga menengah dan kebutuhan sederhana
- cursor lebih cocok untuk feed besar, data berubah cepat, atau konsistensi urutan yang penting

### 5. Putuskan strategy versioning

Pertimbangkan:
- seberapa sering kontrak berubah
- apakah consumer internal atau eksternal
- apakah perubahan bisa ditangani secara additive

Gunakan versioning secara sengaja, bukan refleks. Banyak API dapat berevolusi cukup lama dengan perubahan additive, deprecation jelas, dan kontrak yang disiplin.

### 6. Desain auth dan protection baseline

Putuskan di level pola:
- metode autentikasi utama
- model otorisasi secara garis besar
- kebutuhan rate limiting per user, API key, tenant, atau IP
- kebutuhan audit trail, idempotency, dan throttling pada endpoint sensitif

### 7. Validasi konsistensi desain

Sebelum final, cek:
- apakah style API cocok dengan consumer
- apakah naming konsisten
- apakah response dan error seragam
- apakah versioning dan deprecation masuk akal
- apakah auth, pagination, dan rate limiting sudah dipikirkan
- apakah dokumentasi dapat ditulis jelas dari desain ini

## Checklist cepat

- consumer utama sudah diidentifikasi
- gaya API dipilih karena konteks, bukan kebiasaan
- response format konsisten
- error aman dan dapat ditindaklanjuti
- pagination dan filtering punya guardrail
- versioning strategy dipahami
- auth dan rate limiting tidak diabaikan

## Anti-pattern

Hindari:
- default ke REST untuk semua kasus tanpa analisis consumer
- endpoint REST berbasis verb
- kontrak response yang berbeda-beda antar endpoint tanpa alasan
- GraphQL tanpa pembatasan kompleksitas query
- versioning berlebihan untuk perubahan additive kecil
- tidak memikirkan throttling dan proteksi abuse sejak desain awal

## Catatan kompatibilitas KiloCode

Skill upstream menyebar referensi ke banyak file dan script validator. Pada adaptasi KiloCode ini, keputusan inti tentang REST, GraphQL, tRPC, response format, pagination, auth, rate limiting, dan versioning diringkas langsung ke `SKILL.md` agar skill mandiri dan siap dipakai tanpa dependensi eksternal.