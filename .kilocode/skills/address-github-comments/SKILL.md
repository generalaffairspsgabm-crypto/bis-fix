---
name: address-github-comments
description: >-
  Gunakan saat perlu menindaklanjuti komentar review atau issue pada Pull Request
  GitHub dengan alur sistematis berbasis gh CLI, termasuk inspeksi thread,
  pengelompokan feedback, penerapan perbaikan, dan respons penutupan.
license: CC-BY-4.0
metadata:
  category: collaboration
  source:
    repository: 'https://github.com/sickn33/antigravity-awesome-skills'
    path: skills/address-github-comments
    license_path: LICENSE-CONTENT
  original_metadata:
    risk: unknown
    source: community
    date_added: '2026-02-27'
---

# Address GitHub Comments

Skill ini memandu penanganan komentar review atau feedback issue pada Pull Request GitHub secara sistematis agar tidak ada thread penting yang terlewat.

## Kapan digunakan

Gunakan saat:
- ada komentar review pada PR yang perlu ditindaklanjuti
- ada banyak thread yang perlu dikelompokkan sebelum diperbaiki
- perlu memastikan setiap komentar dipahami, diperbaiki, diverifikasi, lalu direspons
- memakai `gh` CLI sebagai jalur kerja utama

## Prasyarat

Pastikan `gh` CLI tersedia dan sudah terautentikasi.

Contoh pemeriksaan:

```bash
gh auth status
```

Jika belum login, autentikasi terlebih dahulu sebelum mencoba membaca atau merespons PR.

## Workflow

### 1. Inspeksi komentar

Mulai dengan mengumpulkan seluruh konteks review:
- baca komentar dan thread PR yang aktif
- identifikasi apakah komentar berasal dari review code, issue linked, atau catatan manual
- pisahkan komentar yang benar-benar actionable dari komentar yang hanya observasional

Contoh perintah umum:

```bash
gh pr view --comments
```

Jika ada script lokal atau tooling lain yang lebih kaya konteks, gunakan bila memang tersedia.

### 2. Kategorisasi dan rencana

Untuk setiap komentar:
- tulis inti masalah yang diminta reviewer
- identifikasi file, fungsi, atau perilaku yang terdampak
- klasifikasikan jenis perubahan: bugfix, style, naming, test, docs, atau arsitektur
- gabungkan komentar yang bisa diselesaikan dalam satu perubahan yang koheren

Jika thread sangat banyak, prioritaskan:
- blocker correctness
- keamanan
- test failure
- maintainability
- nit atau stylistic notes

Jangan mulai mengubah kode sebelum konteks komentar dipahami.

### 3. Terapkan perbaikan

Saat mengerjakan komentar:
- fokuskan perubahan pada maksud reviewer, bukan asumsi pribadi
- baca kode sekitar komentar agar perubahan tidak merusak alur lain
- perbaiki beberapa komentar sekaligus hanya bila memang berkaitan erat
- verifikasi hasil dengan test, lint, atau pemeriksaan lokal yang relevan

Jika komentar ternyata tidak tepat atau bertentangan dengan konteks kode terbaru, dokumentasikan alasan sebelum merespons thread.

### 4. Respons dan penutupan thread

Setelah perbaikan diverifikasi:
- jelaskan singkat apa yang diubah
- sebutkan bila komentar ditangani dalam commit/perubahan terbaru
- tandai thread resolved jika proses review dan platform mendukung
- untuk komentar yang tidak diikuti secara literal, berikan alasan teknis yang jelas

Contoh respons manual via CLI dapat menggunakan pola seperti:

```bash
gh pr comment <PR_NUMBER> --body "Addressed in latest commit."
```

Sesuaikan dengan mekanisme review aktual pada repo agar komentar tidak hanya “dibalas”, tetapi benar-benar tercatat tertangani.

## Prinsip penting

Pegang prinsip berikut:
- pahami komentar sebelum menyentuh kode
- batch perubahan yang saling berkaitan
- verifikasi sebelum menyatakan komentar selesai
- bedakan komentar wajib tindak lanjut dari preferensi opsional
- gunakan respons singkat tetapi spesifik

## Checklist cepat

Sebelum menutup putaran review, pastikan:
- semua thread actionable sudah dibaca
- setiap komentar punya rencana tindak lanjut atau alasan penolakan
- perubahan sudah diverifikasi secara lokal bila relevan
- respons di PR konsisten dengan perubahan nyata di kode
- tidak ada komentar penting yang tertinggal hanya karena tersembunyi di thread lama

## Anti-pattern

Hindari:
- memperbaiki komentar tanpa membaca konteks file sekitar
- menutup thread tanpa bukti perubahan
- membalas “done” padahal belum diverifikasi
- menganggap seluruh komentar punya prioritas yang sama
- membuat perubahan besar yang tidak diminta hanya karena sedang berada di file yang sama

## Catatan Kompatibilitas KiloCode

Skill sumber sangat ringkas. Versi KiloCode ini memperluasnya menjadi workflow review comment handling yang lebih mandiri tanpa bergantung pada script upstream tambahan.
