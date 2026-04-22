---
name: agent-orchestrator
description: Gunakan saat perlu mengorkestrasi banyak skill atau agen sekaligus, melakukan discovery kemampuan, memilih kombinasi skill yang relevan, dan menyusun alur kerja multi-skill secara sistematis.
license: Complete terms in LICENSE.txt
metadata:
  category: orchestration
  source:
    upstream: .tmp-antigravity-skills/skills/agent-orchestrator
    type: community
  depends_on:
    - akses ke katalog skill atau agen yang tersedia di workspace
    - deskripsi tugas pengguna yang cukup jelas untuk dipetakan ke kemampuan skill
---

# Agent Orchestrator

Skill ini berfungsi sebagai meta-skill untuk memilih, menggabungkan, dan mengurutkan penggunaan banyak skill atau agen dalam satu pekerjaan. Fokusnya bukan mengerjakan domain spesifik, tetapi memastikan tugas kompleks diarahkan ke kombinasi kemampuan yang paling relevan.

## Kapan digunakan

Gunakan skill ini saat perlu:
- memetakan permintaan pengguna ke satu atau beberapa skill yang tersedia
- menentukan apakah tugas cukup ditangani satu skill atau perlu orkestrasi multi-skill
- menyusun urutan kerja antar skill pada workflow kompleks
- mengelola registry atau inventaris skill agar tetap konsisten
- memprioritaskan skill yang paling relevan untuk proyek aktif

## Jangan gunakan saat

- tugas hanya membutuhkan satu skill yang sudah jelas dan spesifik
- tidak ada katalog skill atau konteks kemampuan yang bisa dipindai
- pekerjaan bersifat sederhana dan tidak membutuhkan koordinasi lintas skill

## Tujuan utama

- menemukan skill yang paling relevan untuk suatu permintaan
- mengurangi pemilihan skill secara manual dan ad hoc
- menyusun pola orkestrasi yang jelas untuk tugas multi-skill
- menjaga registry skill tetap mutakhir dan dapat dicari
- meningkatkan konsistensi eksekusi pada workflow kompleks

## Prinsip inti

- selalu mulai dari discovery kemampuan sebelum memilih skill
- prioritaskan skill paling spesifik yang benar-benar cocok dengan tugas
- gunakan satu skill bila cukup; gunakan banyak skill hanya bila ada nilai tambah nyata
- dokumentasikan alasan pemilihan skill dan urutan eksekusinya
- perlakukan registry skill sebagai source of truth yang harus tetap sinkron

## Alur kerja inti

### 1. Discovery katalog skill

Identifikasi:
- skill apa saja yang tersedia di workspace
- deskripsi, kategori, dan trigger utama tiap skill
- skill mana yang aktif, belum lengkap, atau tidak relevan
- skill yang punya konteks khusus untuk proyek aktif

### 2. Match permintaan ke kemampuan

Untuk setiap permintaan pengguna, nilai:
- kecocokan nama skill dengan istilah pada permintaan
- kecocokan kata kunci domain
- kecocokan capability atau kategori
- kebutuhan workflow tunggal vs multi-step
- apakah ada skill proyek yang layak diprioritaskan

### 3. Tentukan strategi eksekusi

Pilih salah satu pola berikut:
- **single-skill** bila satu skill sudah cukup
- **pipeline sekuensial** bila output skill A menjadi input skill B
- **eksekusi paralel** bila beberapa skill mengerjakan aspek berbeda secara independen
- **primary + support** bila satu skill utama dibantu skill pendukung

### 4. Susun rencana orkestrasi

Rencana minimal harus menjelaskan:
- skill yang dipilih
- alasan pemilihannya
- urutan langkah
- data atau artefak yang berpindah antar langkah
- titik verifikasi sebelum lanjut ke tahap berikutnya

### 5. Jaga registry tetap sehat

Pastikan:
- skill baru terdeteksi dan tercatat
- skill yang dihapus tidak lagi dianggap aktif
- metadata penting tetap konsisten
- status skill mudah diaudit

## Heuristik pemilihan skill

Gunakan sinyal berikut untuk menentukan relevansi:
- nama skill disebut langsung dalam permintaan
- kata kunci domain cocok secara eksplisit
- deskripsi skill menutupi outcome yang diminta pengguna
- skill punya konteks proyek atau dependency yang sesuai
- skor gabungan cukup tinggi dibanding alternatif lain

## Pola orkestrasi yang disarankan

### Pipeline sekuensial

Gunakan bila hasil satu skill menjadi bahan skill berikutnya.

Contoh:
- riset -> perencanaan -> implementasi -> review
- ekstraksi data -> analisis -> pelaporan

### Eksekusi paralel

Gunakan bila beberapa skill dapat bekerja pada aspek berbeda tanpa saling menunggu.

Contoh:
- audit keamanan dan audit performa pada artefak yang sama
- riset kompetitor dan riset pengguna secara bersamaan

### Primary + support

Gunakan bila ada satu skill dominan dan skill lain hanya memperkaya konteks.

Contoh:
- skill implementasi utama dibantu skill dokumentasi atau evaluasi

## Checklist orkestrasi

- [ ] katalog skill sudah dipindai atau dipahami
- [ ] skill paling relevan sudah dipilih berdasarkan bukti, bukan tebakan
- [ ] pola orkestrasi sudah ditentukan dengan jelas
- [ ] urutan langkah dan handoff antar skill terdokumentasi
- [ ] ada titik verifikasi untuk mencegah workflow salah arah
- [ ] registry skill tetap sinkron setelah perubahan katalog

## Anti-pattern penting

- memilih terlalu banyak skill tanpa alasan yang jelas
- memakai meta-skill untuk tugas sederhana yang bisa langsung dikerjakan
- tidak menjelaskan mengapa suatu skill dipilih atau diabaikan
- mengandalkan registry usang yang tidak mencerminkan katalog aktual
- mengorkestrasi workflow kompleks tanpa checkpoint verifikasi

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/agent-orchestrator` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
