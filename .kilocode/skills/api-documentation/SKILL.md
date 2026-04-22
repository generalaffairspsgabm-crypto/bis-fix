---
name: api-documentation
description: >-
  Gunakan saat menyusun dokumentasi API agar endpoint, skema, autentikasi,
  contoh pemakaian, dan alur pemeliharaannya terdokumentasi lengkap serta mudah
  dipakai developer.
license: CC-BY-4.0
metadata:
  category: documentation
  source:
    repository: 'https://github.com/sickn33/antigravity-awesome-skills'
    path: skills/api-documentation
    license_path: LICENSE-CONTENT
  original_metadata:
    category: granular-workflow-bundle
    risk: safe
    source: personal
    date_added: '2026-02-27'
---

# API Documentation

Skill ini memandu pembuatan dokumentasi API yang **lengkap, konsisten, dan benar-benar bisa dipakai** oleh developer internal maupun eksternal.

Gunakan saat:
- membuat dokumentasi API baru
- menulis atau memperbarui OpenAPI/Swagger spec
- menyusun developer guide dan getting started
- menambahkan contoh request/response dan SDK usage
- menyiapkan dokumentasi interaktif atau portal API

## Tujuan utama

Dokumentasi API yang baik harus membantu pembaca:
- memahami apa yang tersedia
- tahu cara autentikasi dan mengakses endpoint
- mengetahui bentuk request/response dan error
- melihat contoh pemakaian nyata
- mengerti batasan, rate limit, serta perubahan versi

## Alur kerja yang direkomendasikan

### 1. Discovery API

Mulai dengan inventaris yang jelas:
- daftar endpoint atau operasi yang ada
- method, path, dan tujuan masing-masing endpoint
- parameter path, query, header, dan body
- response sukses dan error utama
- mekanisme autentikasi, otorisasi, dan rate limit

Jika inventaris belum jelas, jangan langsung menulis dokumentasi final.

### 2. Bangun kontrak formal

Bila memungkinkan, gunakan spesifikasi seperti OpenAPI agar dokumentasi dapat divalidasi dan dipakai tooling.

Pastikan kontrak memuat:
- info versi API
- paths atau operations lengkap
- schema request dan response
- authentication/security schemes
- error response penting
- examples yang realistis

Spesifikasi formal adalah source of truth yang baik, tetapi tetap perlu didampingi narasi manusia.

### 3. Tulis developer guide

Dokumentasi naratif sebaiknya mencakup:
- cara mendapatkan credential
- langkah autentikasi pertama
- quick start yang bisa dijalankan cepat
- pola umum penggunaan API
- troubleshooting dasar
- FAQ bila ada area yang sering membingungkan

Jangan mengasumsikan pembaca sudah tahu konteks internal sistem.

### 4. Tambahkan code examples

Sediakan contoh yang langsung berguna:
- curl
- JavaScript/TypeScript
- Python
- contoh SDK internal bila relevan

Contoh sebaiknya menunjukkan:
- request lengkap
- header auth bila diperlukan
- payload realistis
- response yang masuk akal
- penanganan error dasar

Contoh palsu yang tidak pernah diuji akan menurunkan kepercayaan pada dokumentasi.

### 5. Siapkan dokumentasi interaktif bila relevan

Untuk API yang dipakai banyak consumer, pertimbangkan:
- Swagger UI atau Redoc
- sandbox atau try-it flow
- navigasi berbasis tag atau domain
- pencarian dokumentasi

Pastikan dokumentasi interaktif tidak menggantikan penjelasan konsep penting.

### 6. Rancang pemeliharaan

Dokumentasi API cepat basi bila tidak dijaga. Tetapkan:
- siapa owner dokumentasi
- kapan perubahan spec wajib diperbarui
- validasi otomatis untuk spec
- review checklist pada PR
- kebijakan versi dan deprecation

## Struktur isi minimum

Setiap dokumentasi API sebaiknya punya bagian berikut:
- ringkasan API dan use case utama
- autentikasi dan authorization
- endpoint atau operasi per domain
- schema request dan response
- error codes dan maknanya
- rate limit, pagination, filtering, dan sorting bila relevan
- contoh request/response
- changelog atau informasi versi

## Checklist kualitas

Sebelum dokumentasi dianggap siap:
- apakah semua endpoint penting sudah tercakup?
- apakah auth flow dijelaskan dari sudut pandang consumer?
- apakah skema request/response sinkron dengan implementasi?
- apakah contoh benar-benar realistis dan dapat diuji?
- apakah error penting didokumentasikan?
- apakah pembaca baru bisa melakukan request pertama tanpa konteks tambahan?

## Anti-pattern

Hindari:
- dokumentasi hanya berisi daftar endpoint tanpa konteks penggunaan
- contoh request yang tidak cocok dengan skema nyata
- auth dijelaskan setengah-setengah
- dokumentasi interaktif tanpa panduan getting started
- perubahan API yang tidak disertai pembaruan dokumentasi

## Output yang diharapkan

Saat skill ini dipakai, hasil akhir sebaiknya berupa:
- spesifikasi OpenAPI atau kontrak setara
- developer guide ringkas namun usable
- contoh penggunaan lintas bahasa yang penting
- panduan maintenance dokumentasi

## Catatan Kompatibilitas KiloCode

Skill sumber berbentuk workflow bundle dan merujuk banyak skill lain. Pada versi KiloCode ini, dependensi tersebut dinormalisasi menjadi satu panduan mandiri agar tetap usable tanpa instalasi skill upstream tambahan.