---
name: app-builder
description: Gunakan saat ingin mengorkestrasi pembangunan aplikasi dari kebutuhan bahasa alami, termasuk deteksi tipe proyek, pemilihan stack, perencanaan struktur, dan koordinasi peran implementasi.
license: Complete terms in LICENSE.txt
metadata:
  category: application-orchestration
  source:
    upstream: .tmp-antigravity-skills/skills/app-builder
    type: community
  depends_on:
    - requirement awal dari pengguna
    - akses ke struktur repo atau ruang kerja target bila implementasi akan dilanjutkan
---

# App Builder

Skill ini berfungsi sebagai orkestrator pembangunan aplikasi. Fokusnya adalah menerjemahkan permintaan pengguna menjadi keputusan proyek yang konkret: tipe aplikasi, stack teknologi, struktur awal, fitur inti, dan pembagian kerja implementasi.

## Kapan digunakan

Gunakan skill ini saat perlu:
- memulai proyek aplikasi baru dari deskripsi bahasa alami
- menentukan jenis aplikasi dan stack yang paling cocok
- menyusun rencana struktur proyek sebelum coding
- mengoordinasikan pekerjaan lintas frontend, backend, database, dan deployment
- menambahkan fitur besar ke aplikasi yang sudah ada dengan pendekatan terstruktur

## Tujuan utama

- mengubah permintaan kabur menjadi rencana implementasi yang jelas
- memilih stack yang sesuai konteks, bukan sekadar default generik
- memecah pekerjaan menjadi area tanggung jawab yang dapat dieksekusi
- menjaga agar pembacaan konteks tetap selektif dan hemat

## Prinsip kerja

- baca hanya artefak yang relevan dengan permintaan
- identifikasi tipe proyek sebelum memilih teknologi
- bedakan kebutuhan greenfield dan perubahan pada proyek existing
- prioritaskan struktur dan dependency inti sebelum fitur tambahan
- hasilkan rencana yang bisa diteruskan ke implementasi bertahap

## Alur kerja inti

### 1. Deteksi tipe proyek
Klasifikasikan permintaan pengguna, misalnya:
- aplikasi web full-stack
- landing page atau situs statis
- REST API atau backend service
- aplikasi mobile
- desktop app
- browser extension
- CLI tool
- monorepo

### 2. Pilih stack teknologi
Pertimbangkan:
- kebutuhan frontend dan backend
- kebutuhan autentikasi
- database dan ORM
- kebutuhan real-time
- deployment target
- preferensi bahasa atau framework dari pengguna

Jika tidak ada constraint khusus, pilih stack yang modern, stabil, dan mudah dipelihara.

### 3. Definisikan struktur proyek
Tentukan:
- direktori utama
- modul inti
- entry point aplikasi
- area shared code bila perlu
- lokasi konfigurasi, test, dan dokumentasi

### 4. Pecah fitur inti
Uraikan fitur menjadi komponen implementasi, misalnya:
- skema data
- endpoint API
- halaman atau screen
- komponen UI
- background jobs atau integrasi eksternal

### 5. Koordinasikan peran kerja
Pisahkan tanggung jawab seperti:
- perencana proyek
- spesialis frontend
- spesialis backend
- arsitek database
- engineer deployment atau devops

Walau semua dikerjakan oleh satu agen, pembagian ini membantu sequencing dan kualitas keputusan.

## Template mental yang berguna

### Untuk aplikasi web full-stack
Biasanya perlu:
- autentikasi
- database
- API layer
- halaman utama dan dashboard
- deployment dan environment management

### Untuk API service
Biasanya perlu:
- kontrak endpoint
- validasi input
- autentikasi atau otorisasi
- persistence layer
- observabilitas dasar

### Untuk mobile app
Biasanya perlu:
- navigasi
- state management
- integrasi API
- penyimpanan lokal
- strategi build dan distribusi

## Output yang sebaiknya dihasilkan

Hasil kerja skill ini idealnya mencakup:
- klasifikasi tipe proyek
- stack yang dipilih beserta alasan singkat
- struktur direktori awal
- daftar fitur inti
- urutan implementasi
- risiko atau keputusan penting yang perlu dikonfirmasi

## Praktik terbaik

- jangan langsung scaffold sebelum tipe proyek jelas
- cocokkan stack dengan kebutuhan nyata, bukan hype
- pisahkan MVP dari fitur lanjutan
- identifikasi dependency kritis sejak awal
- buat rencana yang cukup detail untuk coding, tetapi tidak terlalu abstrak

## Anti-pattern

- memilih stack tanpa melihat kebutuhan pengguna
- membaca seluruh repo padahal hanya satu area yang relevan
- mencampur keputusan arsitektur dengan detail implementasi terlalu dini
- memulai coding sebelum struktur dan fitur inti dipetakan
- membuat rencana yang terlalu umum sehingga tidak bisa dieksekusi

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/app-builder` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
