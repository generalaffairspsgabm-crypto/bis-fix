---
name: systematic-debugging
description: >-
  Gunakan saat menghadapi bug, kegagalan test, error build, atau perilaku tak
  terduga. Skill ini memaksa investigasi akar masalah sebelum mengusulkan
  perbaikan.
license: CC-BY-4.0
metadata:
  category: debugging
  source:
    repository: 'https://github.com/sickn33/antigravity-awesome-skills'
    path: skills/systematic-debugging
    license_path: LICENSE-CONTENT
  original_metadata:
    risk: unknown
    source: community
    date_added: '2026-02-27'
---

# Systematic Debugging

Perbaikan acak membuang waktu dan sering menciptakan bug baru. Prinsip intinya: **selalu temukan root cause sebelum mencoba fix**. Memperbaiki gejala tanpa memahami sumbernya dianggap kegagalan debugging.

## Iron Law

`NO FIXES WITHOUT ROOT CAUSE INVESTIGATION FIRST`

Jika fase investigasi belum selesai, jangan mengusulkan fix.

## Kapan digunakan

Gunakan untuk masalah teknis apa pun:
- test failure
- bug di produksi
- perilaku tak terduga
- masalah performa
- build failure
- integration issue

Terutama wajib saat:
- ada tekanan waktu
- terlihat seperti "quick fix"
- beberapa fix sebelumnya sudah dicoba
- fix sebelumnya gagal
- Anda belum benar-benar memahami isu

## Empat Fase Wajib

### 1. Root Cause Investigation

Sebelum fix apa pun:
1. baca error message dengan teliti
2. reproduksi masalah secara konsisten
3. cek perubahan terbaru yang mungkin memicu masalah
4. kumpulkan evidence pada sistem multi-komponen
5. telusuri alur data hingga sumber nilai atau kondisi yang salah

Pada sistem berlapis, tambahkan instrumentasi diagnostik di setiap batas komponen:
- data yang masuk
- data yang keluar
- propagasi environment atau konfigurasi
- state tiap layer

Jalankan sekali untuk mengumpulkan bukti, lalu analisis layer mana yang rusak.

Jika error muncul jauh di call stack, gunakan teknik backward tracing. Skill ini menyertakan referensi pendukung di [`root-cause-tracing.md`](.kilocode/skills/systematic-debugging/root-cause-tracing.md), [`defense-in-depth.md`](.kilocode/skills/systematic-debugging/defense-in-depth.md), dan [`condition-based-waiting.md`](.kilocode/skills/systematic-debugging/condition-based-waiting.md).

### 2. Pattern Analysis

Sebelum memperbaiki:
- cari contoh serupa yang berjalan dengan benar di codebase
- baca implementasi referensi secara penuh, jangan sekadar skim
- daftar semua perbedaan antara yang berjalan dan yang rusak
- pahami dependency, konfigurasi, dan asumsi pola tersebut

### 3. Hypothesis and Testing

Gunakan metode ilmiah:
- buat satu hipotesis spesifik: "Saya menduga X adalah akar masalah karena Y"
- uji dengan perubahan sekecil mungkin
- ubah satu variabel pada satu waktu
- verifikasi hasil sebelum melanjutkan
- jika gagal, buat hipotesis baru alih-alih menumpuk fix

Jika belum paham, nyatakan dengan jujur bahwa ada bagian yang belum dipahami dan lanjutkan investigasi.

### 4. Implementation

Perbaiki root cause, bukan gejala:
1. buat test gagal yang mereproduksi bug
2. implementasikan satu fix yang menarget akar masalah
3. verifikasi fix
4. jika fix gagal, berhenti dan kembali ke fase 1

Jika sudah ada 3 percobaan fix atau lebih dan semuanya gagal, pertanyakan arsitekturnya. Bisa jadi masalahnya bukan sekadar bug lokal, tetapi pola desain yang keliru.

## Red Flags

Jika mulai berpikir seperti berikut, hentikan dan kembali ke proses:
- "coba quick fix dulu"
- "ubah beberapa hal sekaligus"
- "skip test dulu"
- "mungkin penyebabnya X"
- "saya belum paham penuh tapi ini mungkin jalan"
- "satu percobaan lagi" setelah beberapa kegagalan

## Ringkasan Sukses per Fase

| Fase | Aktivitas utama | Kriteria sukses |
|---|---|---|
| Root Cause | baca error, reproduksi, cek perubahan, kumpulkan bukti | tahu apa dan mengapa masalah terjadi |
| Pattern | cari contoh kerja, bandingkan | perbedaan penting teridentifikasi |
| Hypothesis | bentuk teori, uji minimal | hipotesis terkonfirmasi atau dipatahkan |
| Implementation | test gagal, fix tunggal, verifikasi | bug selesai tanpa regresi |

## Teknik Pendukung

### [`root-cause-tracing.md`](.kilocode/skills/systematic-debugging/root-cause-tracing.md)
Panduan menelusuri bug ke belakang melalui call chain sampai menemukan pemicu asli.

### [`defense-in-depth.md`](.kilocode/skills/systematic-debugging/defense-in-depth.md)
Pola menambahkan validasi di banyak lapisan agar bug menjadi sulit atau mustahil terulang.

### [`condition-based-waiting.md`](.kilocode/skills/systematic-debugging/condition-based-waiting.md)
Panduan mengganti delay arbitrer dengan penantian berbasis kondisi untuk mengurangi flaky test.

## Catatan Kompatibilitas KiloCode

Skill sumber mereferensikan skill TDD dan verifikasi sebagai skill terkait. Referensi itu diperlakukan sebagai rekomendasi, bukan dependensi wajib, agar skill tetap bisa dipakai mandiri pada instalasi proyek ini.
