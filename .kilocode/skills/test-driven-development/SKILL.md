---
name: test-driven-development
description: >-
  Gunakan saat mengimplementasikan fitur, bugfix, refactor, atau perubahan
  perilaku. Skill ini memaksa alur test-first: tulis test gagal, lihat gagal,
  lalu implementasikan kode minimal hingga lolos.
license: CC-BY-4.0
metadata:
  category: development
  source:
    repository: 'https://github.com/sickn33/antigravity-awesome-skills'
    path: skills/test-driven-development
    license_path: LICENSE-CONTENT
  original_metadata:
    risk: unknown
    source: community
    date_added: '2026-02-27'
---

# Test-Driven Development (TDD)

Tulis test lebih dulu. Pastikan test gagal. Baru tulis kode minimal agar test lolos.

Prinsip inti: jika Anda tidak pernah melihat test gagal, Anda tidak benar-benar tahu apakah test itu memverifikasi perilaku yang tepat.

## Iron Law

`NO PRODUCTION CODE WITHOUT A FAILING TEST FIRST`

Jika kode produksi sudah ditulis sebelum test, perlakukan itu sebagai pelanggaran alur TDD dan kembali ke pendekatan test-first.

## Kapan digunakan

Gunakan untuk:
- fitur baru
- bug fix
- refactor
- perubahan perilaku

Pengecualian harus sangat terbatas, misalnya prototipe sekali pakai atau file konfigurasi sederhana, dan idealnya dikonfirmasi terlebih dahulu.

## Siklus Red-Green-Refactor

### RED — tulis test gagal
Tulis satu test minimal yang menunjukkan perilaku yang diinginkan.

Syarat test yang baik:
- menguji satu perilaku
- nama test jelas
- sebisa mungkin memakai kode nyata, bukan mock berlebihan

### Verify RED — lihat test gagal
Jalankan test dan pastikan:
- test **gagal**, bukan error karena typo atau setup rusak
- alasan gagalnya sesuai harapan
- test tidak lolos karena ternyata menguji perilaku lama

### GREEN — tulis kode minimal
Implementasikan solusi paling sederhana agar test lolos.
Jangan menambah fitur lain, jangan refactor tambahan, dan jangan over-engineer.

### Verify GREEN — lihat test lolos
Pastikan:
- test target lolos
- test lain tidak rusak
- output bersih dari error atau warning yang relevan

### REFACTOR — rapikan setelah hijau
Hanya setelah semua hijau:
- hilangkan duplikasi
- perbaiki nama
- ekstrak helper

Jangan menambah perilaku baru saat refactor.

## Aturan kualitas test

- satu test untuk satu perilaku
- nama harus menjelaskan intent
- test harus menunjukkan API atau perilaku yang diinginkan
- hindari test yang hanya membuktikan mock dipanggil

## Mengapa urutan penting

Menulis test setelah kode membuat test mudah bias terhadap implementasi yang sudah ada. TDD memaksa Anda menjelaskan apa yang **seharusnya** dilakukan sistem sebelum memikirkan bagaimana mengimplementasikannya.

## Rasionalisasi yang harus ditolak

Hentikan jika muncul pikiran seperti:
- "terlalu sederhana untuk ditest"
- "nanti saya tambahkan test setelah selesai"
- "saya sudah manual test"
- "pakai kode yang sudah ada sebagai referensi saja"
- "TDD terlalu dogmatis"

Semua itu biasanya pertanda Anda keluar dari disiplin TDD.

## Checklist verifikasi

Sebelum pekerjaan dianggap selesai, periksa:
- setiap fungsi atau perubahan baru punya test
- setiap test pernah dilihat gagal sebelum implementasi
- kegagalan awal terjadi karena alasan yang benar
- kode yang ditulis minimal untuk meloloskan test
- seluruh test relevan lolos
- edge case penting juga tercakup

## Integrasi dengan debugging

Saat menemukan bug, tulis dulu test gagal yang mereproduksi bug tersebut. Setelah fix, test itu menjadi pelindung regresi.

## Catatan Kompatibilitas KiloCode

Skill sumber merujuk file tambahan seperti `testing-anti-patterns.md`. Karena aset tersebut tidak dibutuhkan agar alur inti TDD usable, instalasi proyek ini memfokuskan versi yang kompatibel dan mandiri untuk KiloCode.
