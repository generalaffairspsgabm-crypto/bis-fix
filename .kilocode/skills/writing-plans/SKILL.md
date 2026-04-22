---
name: writing-plans
description: >-
  Gunakan saat sudah ada spesifikasi atau requirement untuk pekerjaan multi-step
  sebelum menyentuh kode. Skill ini membantu membuat rencana implementasi detail
  yang executable dan mudah diikuti.
license: CC-BY-4.0
metadata:
  category: planning
  source:
    repository: 'https://github.com/sickn33/antigravity-awesome-skills'
    path: skills/writing-plans
    license_path: LICENSE-CONTENT
  original_metadata:
    risk: critical
    source: community
    date_added: '2026-02-27'
---

# Writing Plans

Skill ini digunakan untuk menyusun implementation plan yang detail, eksplisit, dan dapat dieksekusi bertahap oleh engineer yang belum memahami konteks codebase secara mendalam.

## Tujuan

Rencana harus menjelaskan:
- goal yang ingin dicapai
- pendekatan arsitektur singkat
- file yang perlu dibuat atau diubah
- langkah implementasi kecil yang berurutan
- strategi pengujian
- command yang relevan

Prinsip yang dijaga:
- DRY
- YAGNI
- TDD
- langkah kecil
- commit yang sering dan masuk akal

## Granularitas tugas

Setiap langkah idealnya satu aksi kecil berdurasi sekitar 2–5 menit, misalnya:
- tulis failing test
- jalankan test dan pastikan gagal
- implementasikan kode minimal
- jalankan test dan pastikan lolos
- commit perubahan

## Struktur dokumen rencana

Setiap plan sebaiknya diawali dengan:
- judul fitur
- goal satu kalimat
- ringkasan arsitektur 2–3 kalimat
- tech stack utama

Lalu pecah ke dalam task-task yang berisi:
- daftar file yang dibuat, diubah, dan diuji
- langkah test-first yang eksplisit
- command yang harus dijalankan
- hasil yang diharapkan

## Aturan isi plan

- selalu gunakan path file yang spesifik
- cukup konkret agar bisa diikuti tanpa menebak
- jelaskan bagaimana memverifikasi tiap task
- arahkan implementasi bertahap, bukan sekali jadi
- jika relevan, sebut skill lain yang mendukung seperti brainstorming atau TDD, tetapi jangan menjadikannya dependensi wajib

## Penyimpanan plan

Skill sumber merekomendasikan penyimpanan di jalur seperti `docs/plans/YYYY-MM-DD-<feature-name>.md`. Pada KiloCode, ikuti struktur proyek yang berlaku; jika tidak ada standar lain, pola tersebut layak dipakai sebagai default.

## Handoff eksekusi

Setelah plan selesai:
- pastikan plan sudah tersimpan secara persisten
- eksekusi harus mengikuti urutan task
- setiap task sebaiknya diverifikasi sebelum lanjut

## Catatan Kompatibilitas KiloCode

Skill sumber memiliki referensi ke workflow worktree dan skill superpowers lain. Referensi tersebut telah dinormalisasi menjadi panduan opsional agar skill tetap usable sebagai skill proyek mandiri di KiloCode.
