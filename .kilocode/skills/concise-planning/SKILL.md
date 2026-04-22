---
name: concise-planning
description: >-
  Gunakan ketika pengguna meminta rencana untuk tugas coding dan dibutuhkan
  checklist singkat, jelas, berurutan, dan atomik yang bisa langsung dieksekusi.
license: CC-BY-4.0
metadata:
  category: planning
  source:
    repository: 'https://github.com/sickn33/antigravity-awesome-skills'
    path: skills/concise-planning
    license_path: LICENSE-CONTENT
  original_metadata:
    risk: unknown
    source: community
    date_added: '2026-02-27'
---

# Concise Planning

Skill ini dipakai untuk mengubah permintaan pengguna menjadi **satu rencana kerja yang ringkas dan actionable**.

Berbeda dengan skill perencanaan yang lebih besar, fokus skill ini adalah menghasilkan checklist pendek yang:
- cepat dipahami
- cukup konkret untuk dieksekusi
- tidak over-design
- tetap menyertakan validasi

## Kapan digunakan

Gunakan saat:
- pengguna meminta plan untuk task coding
- pekerjaan cukup jelas dan tidak butuh eksplorasi desain panjang
- Anda perlu menyusun langkah eksekusi yang singkat namun operasional
- tugas lebih cocok dipecah menjadi checklist 6–10 langkah daripada spesifikasi panjang

Jangan gunakan sebagai default bila masalah masih kabur dan perlu klarifikasi desain mendalam. Dalam kasus itu, skill seperti brainstorming lebih tepat.

## Workflow

### 1. Scan konteks

Sebelum membuat plan:
- baca `README.md`, dokumentasi, dan file relevan
- identifikasi bahasa, framework, test setup, dan constraint penting
- pahami apakah task menyentuh implementasi, refactor, bugfix, atau validasi

Tujuan tahap ini adalah mencegah plan generik yang tidak nyambung dengan codebase.

### 2. Interaksi minimal

Aturan klarifikasi:
- ajukan paling banyak **1–2 pertanyaan**
- hanya bertanya jika informasi yang hilang benar-benar menghalangi pembuatan plan
- untuk hal non-blocking, buat asumsi yang masuk akal dan tandai secara eksplisit

Prioritasnya adalah tetap bergerak maju tanpa membebani pengguna dengan sesi tanya jawab panjang.

### 3. Hasilkan plan tunggal

Gunakan struktur berikut:
- **Approach**: 1–3 kalimat tentang apa yang akan dilakukan dan alasannya
- **Scope**: butir `In` dan `Out`
- **Action Items**: 6–10 langkah atomik, berurutan, berbentuk kata kerja
- **Validation**: minimal satu langkah untuk pengujian atau verifikasi
- **Open Questions**: hanya jika masih ada hal penting yang belum pasti

## Template plan

```markdown
# Plan

<ringkasan pendek pendekatan>

## Scope

- In:
- Out:

## Action Items

[ ] <Langkah 1: discovery>
[ ] <Langkah 2: implementasi>
[ ] <Langkah 3: implementasi>
[ ] <Langkah 4: validasi/testing>
[ ] <Langkah 5: rollout/commit>

## Open Questions

- <Maksimal 3 pertanyaan penting>
```

## Pedoman checklist

Setiap action item harus:
- **Atomik**: satu unit kerja logis per langkah
- **Verb-first**: misalnya `Tambah...`, `Refactor...`, `Verifikasi...`
- **Konkret**: sebut file, modul, endpoint, atau area sistem bila memungkinkan
- **Berurutan**: urutan harus masuk akal untuk dieksekusi langsung
- **Dapat diverifikasi**: ada hasil yang bisa dicek setelah langkah selesai

## Prinsip kualitas

Saat menyusun plan:
- utamakan langkah kecil dibanding task besar yang kabur
- hindari jargon jika tidak perlu
- jangan memasukkan pekerjaan di luar scope
- jangan menambahkan fitur spekulatif
- sertakan validasi eksplisit, bukan asumsi bahwa perubahan pasti benar

## Batasan skill

Skill ini menghasilkan **satu rencana singkat**. Ia bukan pengganti:
- eksplorasi kebutuhan mendalam
- desain arsitektur kompleks
- breakdown lintas sesi yang sangat besar

Jika tugas berkembang menjadi multi-phase atau multi-session, hasil dari skill ini bisa menjadi draft awal sebelum dinaikkan ke plan yang lebih detail.

## Catatan Kompatibilitas KiloCode

Skill sumber sangat ringkas. Pada versi KiloCode ini, instruksinya dinormalisasi ke bahasa Indonesia, ditambah guardrail untuk asumsi, scope, dan validasi agar tetap usable sebagai skill proyek mandiri tanpa dependensi eksternal.
