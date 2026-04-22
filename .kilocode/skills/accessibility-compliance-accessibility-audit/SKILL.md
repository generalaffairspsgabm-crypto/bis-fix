---
name: accessibility-compliance-accessibility-audit
description: >-
  Gunakan saat melakukan audit aksesibilitas web atau mobile untuk memetakan
  barrier, menguji kepatuhan WCAG, memprioritaskan remediation, dan menyiapkan
  bukti kepatuhan yang dapat ditindaklanjuti.
license: CC-BY-4.0
metadata:
  category: quality
  source:
    repository: 'https://github.com/sickn33/antigravity-awesome-skills'
    path: skills/accessibility-compliance-accessibility-audit
    license_path: LICENSE-CONTENT
  original_metadata:
    risk: safe
    source: community
    date_added: '2026-02-27'
---

# Accessibility Audit and Testing

Skill ini membantu melakukan audit aksesibilitas yang **terstruktur**, **berbasis WCAG**, dan **berorientasi perbaikan nyata** untuk produk digital.

Gunakan saat:
- mengaudit aplikasi web atau mobile terhadap WCAG
- mengidentifikasi barrier bagi pengguna keyboard, screen reader, atau low vision
- memprioritaskan remediation aksesibilitas
- menyiapkan bukti kepatuhan untuk stakeholder atau proses compliance
- membangun praktik pengujian aksesibilitas berkelanjutan

## Fokus utama

Saat skill ini aktif, fokuskan pekerjaan pada:
- ruang lingkup audit yang jelas
- kombinasi automated scan dan manual verification
- pemetaan temuan ke kriteria WCAG
- prioritas perbaikan berdasarkan dampak ke pengguna
- validasi ulang setelah remediation

## Langkah kerja

### 1. Tegaskan scope audit

Selalu klarifikasi atau tetapkan:
- platform: web, mobile, hybrid, atau design artifact
- standar target: misalnya WCAG 2.1 AA
- halaman, flow, atau user journey prioritas
- constraint lingkungan uji dan perangkat bantu yang tersedia

Tanpa scope yang jelas, hasil audit mudah menjadi dangkal atau tidak actionable.

### 2. Jalankan automated checks

Gunakan alat otomatis untuk mendapatkan baseline cepat, misalnya:
- missing alt text
- label form yang hilang
- warna dengan contrast tidak cukup
- struktur heading yang bermasalah
- ARIA misuse yang terdeteksi tooling

Namun ingat: automated scan hanya menangkap sebagian masalah.

### 3. Lakukan verifikasi manual

Pemeriksaan manual wajib mencakup area penting berikut:
- navigasi keyboard penuh tanpa mouse
- focus order dan focus visibility
- screen reader semantics untuk elemen penting
- label, instruksi, dan error message form
- contrast dan keterbacaan konten
- status dinamis, modal, dialog, toast, dan komponen interaktif kompleks

Masalah aksesibilitas yang paling berdampak sering justru lolos dari pemeriksaan otomatis.

### 4. Petakan temuan ke WCAG dan dampak pengguna

Untuk setiap temuan, dokumentasikan:
- lokasi atau flow yang terdampak
- deskripsi masalah
- kriteria WCAG terkait bila relevan
- tingkat keparahan
- tipe pengguna yang terdampak
- rekomendasi perbaikan

Hindari daftar temuan yang hanya teknis tetapi tidak menjelaskan dampaknya ke pengguna nyata.

### 5. Prioritaskan remediation

Urutkan perbaikan berdasarkan:
- blocker untuk menyelesaikan task inti
- frekuensi area yang terdampak
- luasnya komponen yang reusable
- risiko compliance dan reputasi
- biaya implementasi vs dampak pengguna

Perbaiki problem sistemik lebih dulu jika satu komponen bermasalah dipakai di banyak tempat.

### 6. Re-test setelah perbaikan

Setelah remediation dilakukan:
- ulang automated scan
- verifikasi ulang flow manual yang sebelumnya gagal
- pastikan fix tidak menimbulkan regresi pada keyboard, semantics, atau focus management

## Struktur laporan yang disarankan

Laporan audit sebaiknya memuat:
- scope dan standar audit
- metode uji dan tooling yang dipakai
- ringkasan temuan utama
- daftar issue per halaman/flow/komponen
- severity dan prioritas
- langkah remediation yang disarankan
- status verifikasi ulang bila tersedia

## Checklist audit cepat

- apakah semua fitur inti dapat dioperasikan dengan keyboard?
- apakah fokus terlihat dan berpindah secara logis?
- apakah form memiliki label, instruksi, dan error yang dapat diakses?
- apakah heading dan landmark membantu navigasi?
- apakah komponen dinamis diumumkan dengan benar ke assistive technology?
- apakah contrast cukup pada teks, icon penting, dan state interaktif?

## Anti-pattern

Hindari:
- menganggap skor tooling otomatis sebagai bukti aksesibilitas penuh
- memberi rekomendasi tanpa menyebut dampak pengguna
- tidak menyebut target WCAG atau scope audit
- memperbaiki visual tetapi mengabaikan semantics dan keyboard behavior
- menyatakan compliant tanpa retest

## Catatan Kompatibilitas KiloCode

Skill sumber merujuk ke `resources/implementation-playbook.md` dan placeholder seperti `$ARGUMENTS`. Pada versi KiloCode ini, dependensi tersebut dihilangkan dan isi dinormalisasi menjadi panduan audit mandiri berbahasa Indonesia.