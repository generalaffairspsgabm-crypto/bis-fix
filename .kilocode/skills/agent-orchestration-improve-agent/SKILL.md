---
name: agent-orchestration-improve-agent
description: Gunakan saat meningkatkan agen yang sudah ada melalui analisis performa, evaluasi kegagalan, prompt engineering, dan iterasi terukur agar kualitas, reliabilitas, dan efisiensi meningkat.
license: Complete terms in LICENSE.txt
metadata:
  category: optimization
  source:
    upstream: .tmp-antigravity-skills/skills/agent-orchestration-improve-agent
    type: community
  depends_on:
    - baseline metrik atau contoh interaksi agen yang representatif
    - kemampuan menjalankan evaluasi atau pengujian regresi setelah perubahan
---

# Agent Orchestration Improve Agent

Skill ini membantu meningkatkan agen yang sudah ada secara sistematis. Fokusnya adalah mengukur baseline, mengidentifikasi failure mode, memperbaiki prompt dan workflow, lalu memvalidasi perubahan dengan pengujian yang dapat diulang.

## Kapan digunakan

Gunakan skill ini saat perlu:
- meningkatkan performa atau reliabilitas agen yang sudah berjalan
- menganalisis pola kegagalan, kualitas prompt, atau penggunaan tool
- menjalankan eksperimen A/B atau evaluasi terstruktur
- merancang siklus optimasi agen yang berulang dan terukur

## Jangan gunakan saat

- sedang membangun agen baru dari nol
- tidak ada metrik, feedback, atau contoh kasus yang bisa dianalisis
- tugas tidak berkaitan dengan kualitas agen atau optimasi prompt

## Tujuan utama

- menetapkan baseline performa yang jelas
- menemukan akar masalah dengan dampak terbesar
- menerapkan perbaikan yang terukur pada prompt dan workflow
- memvalidasi perubahan sebelum rollout lebih luas

## Prinsip inti

- optimasi harus berbasis bukti, bukan intuisi semata
- perbaikan kecil yang terukur lebih aman daripada perubahan besar sekaligus
- setiap perubahan prompt atau workflow harus diuji regresinya
- rollback harus selalu memungkinkan bila kualitas menurun

## Alur kerja inti

### 1. Tetapkan baseline

Kumpulkan data seperti:
- tingkat keberhasilan tugas
- akurasi atau kualitas jawaban
- efisiensi penggunaan tool
- latensi dan konsumsi token
- koreksi pengguna, retry, atau abandonment
- insiden halusinasi atau pelanggaran constraint

### 2. Klasifikasikan failure mode

Kelompokkan kegagalan ke kategori seperti:
- salah memahami instruksi
- format output tidak sesuai
- kehilangan konteks pada percakapan panjang
- pemilihan tool yang salah atau boros
- pelanggaran aturan bisnis atau safety
- penanganan edge case yang lemah

### 3. Prioritaskan perbaikan

Utamakan perubahan yang:
- berdampak besar pada metrik utama
- mudah diverifikasi
- berisiko rendah terhadap regresi luas
- menyasar pola kegagalan yang sering berulang

### 4. Perbaiki prompt dan workflow

Pertimbangkan teknik berikut:
- langkah reasoning yang lebih terstruktur
- contoh few-shot dari kasus sukses dan gagal
- definisi peran agen yang lebih tajam
- self-check atau critique-and-revise loop
- template output yang lebih konsisten

### 5. Validasi perubahan

Uji dengan:
- golden path scenario
- kasus yang sebelumnya gagal
- edge case dan stress case
- input adversarial
- perbandingan A/B terhadap versi lama

### 6. Rollout bertahap

Sebelum adopsi penuh:
- pantau metrik pasca-perubahan
- siapkan rollback cepat
- dokumentasikan apa yang berubah dan mengapa
- evaluasi apakah perbaikan benar-benar signifikan

## Checklist optimasi agen

- [ ] baseline metrik sudah ditetapkan
- [ ] failure mode utama sudah diklasifikasikan
- [ ] prioritas perbaikan didasarkan pada dampak
- [ ] perubahan prompt atau workflow terdokumentasi
- [ ] ada pengujian regresi dan pembanding versi lama
- [ ] rollback plan tersedia bila kualitas menurun

## Anti-pattern penting

- mengubah banyak hal sekaligus tanpa baseline
- mengandalkan opini tanpa data evaluasi
- rollout prompt baru tanpa regression testing
- mengabaikan feedback pengguna yang berulang
- tidak menyiapkan rollback saat eksperimen gagal

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/agent-orchestration-improve-agent` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
