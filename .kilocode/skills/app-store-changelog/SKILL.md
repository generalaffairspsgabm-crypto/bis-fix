---
name: app-store-changelog
description: Gunakan saat perlu menyusun catatan rilis App Store yang ramah pengguna dari riwayat git, issue, atau daftar perubahan teknis agar update mudah dipahami pengguna akhir.
license: Complete terms in LICENSE.txt
metadata:
  category: documentation
  source:
    upstream: .tmp-antigravity-skills/skills/app-store-changelog
    type: community
  depends_on:
    - akses baca ke riwayat git, tag rilis, atau daftar perubahan produk
---

# App Store Changelog

Skill ini membantu mengubah riwayat perubahan teknis menjadi catatan rilis App Store yang singkat, jelas, dan berorientasi manfaat pengguna. Fokusnya adalah memilah perubahan yang benar-benar user-facing, mengelompokkan tema utama, lalu menulis bullet yang mudah dipahami tanpa jargon internal.

## Kapan digunakan

Gunakan skill ini saat perlu:
- membuat teks `What's New` untuk App Store atau Play Store
- merangkum perubahan sejak tag rilis terakhir
- mengubah commit, PR, atau changelog teknis menjadi release notes yang ramah pengguna
- memisahkan perubahan internal dari perubahan yang benar-benar dirasakan pengguna

## Tujuan utama

- menghasilkan catatan rilis yang akurat dan mudah dipahami
- menonjolkan manfaat pengguna, bukan detail implementasi
- menghindari jargon teknis, nama modul internal, atau istilah engineering yang tidak perlu
- memastikan setiap bullet benar-benar didukung oleh perubahan nyata

## Input yang dapat dipakai

Skill ini dapat bekerja dari salah satu atau kombinasi sumber berikut:
- riwayat git sejak tag terakhir
- daftar PR atau issue yang sudah dirilis
- changelog internal
- daftar fitur, perbaikan, dan peningkatan dari tim produk atau engineering

Jika sumber data belum rapi, kumpulkan dulu:
- rentang rilis yang ingin dirangkum
- versi aplikasi atau nama rilis
- daftar perubahan mentah
- batas panjang teks bila ada

## Alur kerja inti

### 1. Kumpulkan perubahan dalam rentang rilis

Sumber yang umum dipakai:
- commit sejak tag terakhir
- PR yang masuk ke release branch
- daftar issue yang ditandai selesai
- catatan QA atau release checklist

Jika tidak ada tag, gunakan rentang waktu atau milestone yang paling masuk akal.

### 2. Pilah perubahan berdasarkan dampak pengguna

Pertahankan hanya perubahan yang benar-benar user-facing, misalnya:
- fitur baru
- peningkatan performa yang terasa
- perbaikan bug yang memengaruhi pengalaman pengguna
- perubahan UI atau alur utama
- dukungan perangkat atau mode baru yang relevan

Buang atau turunkan prioritas untuk perubahan seperti:
- refactor internal
- upgrade dependency
- perubahan CI/CD
- tooling build
- rename file atau restrukturisasi kode
- pekerjaan backend yang tidak mengubah pengalaman pengguna secara nyata

### 3. Kelompokkan berdasarkan tema

Kelompok yang umum:
- Baru
- Ditingkatkan
- Diperbaiki

Namun untuk storefront, sering kali cukup langsung menjadi daftar bullet tanpa heading tambahan jika pengguna menginginkan versi singkat.

### 4. Tulis bullet yang berorientasi manfaat

Prinsip penulisan:
- satu bullet = satu manfaat atau perubahan utama
- gunakan bahasa sederhana
- mulai dengan kata kerja yang jelas
- fokus pada hasil bagi pengguna
- hindari menyebut nama komponen internal

Contoh transformasi:

| Perubahan teknis mentah | Bullet ramah pengguna |
|---|---|
| `fix(auth): resolve token refresh race condition on iOS 17` | Memperbaiki masalah login yang dapat membuat sebagian pengguna keluar dari akun secara tiba-tiba. |
| `feat(search): add voice input to search bar` | Menambahkan pencarian suara agar Anda bisa mencari lebih cepat tanpa mengetik. |
| `perf(timeline): lazy-load images to reduce scroll jank` | Meningkatkan kelancaran saat menggulir timeline, terutama pada daftar yang panjang. |

### 5. Validasi sebelum final

Periksa kembali:
- setiap bullet benar-benar berasal dari perubahan nyata
- tidak ada duplikasi antar bullet
- tidak ada istilah teknis yang membingungkan pengguna
- panjang teks sesuai batas storefront bila diketahui
- nada bahasa konsisten dengan brand produk

## Struktur output yang direkomendasikan

### Versi singkat

Gunakan bila ruang terbatas atau perubahan sedikit.

```markdown
## What's New
- Menambahkan pencarian suara untuk membantu Anda menemukan konten lebih cepat.
- Meningkatkan performa saat membuka daftar yang panjang.
- Memperbaiki masalah login yang memengaruhi sebagian pengguna.
```

### Versi standar

Gunakan bila ada beberapa perubahan penting.

```markdown
## What's New in Version 3.4
- Menambahkan pencarian suara untuk pengalaman pencarian yang lebih cepat.
- Meningkatkan kecepatan saat membuka album besar.
- Memperbaiki bug login yang dapat menyebabkan sesi terputus.
- Menyempurnakan tampilan pengaturan agar lebih mudah digunakan.
```

## Checklist review

- apakah semua bullet user-facing?
- apakah ada perubahan internal yang seharusnya dibuang?
- apakah manfaat pengguna terlihat jelas di setiap bullet?
- apakah ada bullet yang terlalu teknis atau terlalu panjang?
- apakah jumlah bullet proporsional dengan skala rilis?

## Praktik baik

- prioritaskan 3 sampai 8 perubahan paling penting
- gabungkan perubahan kecil yang serupa menjadi satu bullet bila perlu
- gunakan bahasa aktif dan sederhana
- sesuaikan panjang dengan batas platform dan gaya brand
- bila perubahan ambigu, tandai sebagai perlu klarifikasi daripada menebak

## Anti-pattern

- menyalin commit mentah ke release notes
- menyebut nama branch, modul, atau library internal
- memasukkan perubahan CI, refactor, atau dependency bump sebagai bullet utama
- menulis terlalu umum seperti "bug fixes and improvements" tanpa konteks sama sekali
- mengklaim manfaat yang tidak didukung perubahan nyata

## Batasan

- skill ini bergantung pada kualitas sumber perubahan yang tersedia
- jika commit message buruk atau terlalu teknis, interpretasi perlu lebih hati-hati
- bila tidak jelas apakah perubahan user-facing, lebih aman meminta klarifikasi atau menurunkan prioritasnya

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/app-store-changelog` agar mandiri, berbahasa Indonesia, dan tidak bergantung pada skrip atau referensi eksternal yang tidak tersedia di workspace.
