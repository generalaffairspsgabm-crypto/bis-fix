---
name: code-review-excellence
description: >-
  Gunakan saat meninjau perubahan kode agar review menjadi sistematis,
  konstruktif, dan berorientasi perbaikan, bukan sekadar gatekeeping.
license: CC-BY-4.0
metadata:
  category: quality
  source:
    repository: 'https://github.com/sickn33/antigravity-awesome-skills'
    path: skills/code-review-excellence
    license_path: LICENSE-CONTENT
  original_metadata:
    risk: safe
    source: community
    date_added: '2026-02-27'
---

# Code Review Excellence

Ubah code review dari aktivitas mencari salah menjadi proses berbagi pengetahuan, menemukan risiko nyata, dan membantu perubahan menjadi lebih aman untuk digabungkan.

## Kapan digunakan

Gunakan skill ini saat:
- meninjau pull request atau kumpulan perubahan kode
- mengevaluasi correctness, security, performance, dan maintainability
- menyusun feedback review yang jelas dan bisa ditindaklanjuti
- melakukan audit perubahan sebelum merge

Jangan gunakan saat:
- belum ada perubahan kode yang bisa direview
- diskusi masih murni di level desain tanpa implementasi
- tugas utamanya adalah memperbaiki kode, bukan mereviewnya

## Prinsip review

Review yang baik harus:
- berangkat dari konteks dan requirement
- membedakan masalah nyata dari preferensi pribadi
- menyertakan alasan teknis, bukan opini kosong
- memberi saran yang actionable
- menjaga nada kolaboratif

Fokus utama review:
- **correctness**
- **security**
- **performance**
- **maintainability**
- **test coverage dan verifikasi**

## Workflow review

### 1. Baca konteks dulu

Sebelum memberi penilaian:
- pahami tujuan perubahan
- baca requirement, issue, plan, atau deskripsi PR bila ada
- periksa sinyal test, linter, build, dan validasi lain
- pahami area sistem yang disentuh serta dampaknya

Jangan langsung menilai potongan kode tanpa memahami mengapa perubahan itu dibuat.

### 2. Evaluasi berdasarkan risiko

Tinjau perubahan dengan urutan prioritas berikut:
1. apakah perubahan bisa salah secara fungsional
2. apakah ada risiko keamanan atau data integrity
3. apakah perubahan memperburuk performa atau resource usage
4. apakah kode menjadi lebih sulit dipahami, diuji, atau dipelihara
5. apakah test dan verifikasi cukup untuk mendukung perubahan

Pisahkan isu yang benar-benar perlu diperbaiki dari saran peningkatan opsional.

### 3. Tulis feedback yang actionable

Setiap temuan sebaiknya memuat:
- lokasi atau area yang terdampak
- masalah yang diamati
- kenapa itu penting
- dampak yang mungkin terjadi
- saran perbaikan bila memungkinkan

Hindari komentar seperti “ini jelek” atau “kurang bagus” tanpa penjelasan konkret.

### 4. Gunakan tingkat severity

Kelompokkan hasil review ke dalam severity berikut:
- **blocking**: harus diperbaiki sebelum merge
- **important**: tidak selalu memblokir, tetapi berisiko signifikan
- **minor**: peningkatan kecil, readability, konsistensi, atau saran opsional

Gunakan severity secara disiplin. Jangan memberi label blocking untuk preferensi gaya semata.

### 5. Catat status pengujian

Review harus selalu menyebut:
- test apa yang ada atau tidak ada
- apakah cakupan validasi memadai
- area yang masih perlu dibuktikan
- apakah perubahan tampak aman untuk merge dari sisi verifikasi

Jika tidak ada bukti test, nyatakan itu sebagai gap, bukan asumsi.

## Format output yang disarankan

Gunakan struktur hasil berikut:

### 1. Ringkasan umum
- tujuan perubahan menurut pemahaman reviewer
- impresi singkat mengenai kualitas keseluruhan
- apakah perubahan tampak siap merge atau belum

### 2. Temuan per severity
- **Blocking**
- **Important**
- **Minor**

Untuk tiap temuan, jelaskan masalah, alasan, dan saran.

### 3. Pertanyaan dan asumsi
- hal yang belum jelas
- area yang perlu konfirmasi intent

### 4. Catatan test dan coverage
- test yang terlihat
- test yang hilang
- risiko yang belum tervalidasi

## Heuristik review

Saat membaca perubahan, periksa hal-hal berikut:
- logic baru konsisten dengan perilaku lama atau requirement
- edge case tertangani
- error handling masuk akal
- data sensitif tidak bocor
- API contract tidak rusak tanpa migrasi yang jelas
- perubahan schema, state, atau side effect terdokumentasi
- kode tetap mudah dibaca dan dipelihara
- test meng-cover jalur penting, bukan hanya happy path

## Nada komunikasi

Gunakan bahasa review yang:
- spesifik
- profesional
- tidak menyerang penulis kode
- berfokus pada perubahan, bukan orangnya
- membantu penulis memahami trade-off

Contoh framing yang baik:
- “Perubahan ini berisiko karena…”
- “Kasus ini tampaknya belum tertangani ketika…”
- “Akan lebih aman jika validasi dipindah ke…”

## Batasan skill

Skill ini membantu menghasilkan review yang kuat, tetapi tidak menggantikan:
- kebutuhan menjalankan test nyata bila bukti belum ada
- pengetahuan domain spesifik proyek
- keputusan maintainers tentang trade-off yang memang disengaja

## Catatan Kompatibilitas KiloCode

Skill sumber merujuk ke resource tambahan `resources/implementation-playbook.md`. Pada batch ini resource tersebut tidak dibawa karena inti skill sudah usable tanpa dependensi tambahan. Instruksi utama dinormalisasi ke format KiloCode dan bahasa Indonesia.
