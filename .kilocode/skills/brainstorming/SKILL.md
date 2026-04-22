---
name: brainstorming
description: >-
  Gunakan sebelum pekerjaan kreatif atau konstruktif seperti perancangan fitur,
  arsitektur, atau perilaku sistem. Skill ini mengubah ide yang masih kabur
  menjadi desain tervalidasi melalui dialog terstruktur sebelum implementasi.
license: CC-BY-4.0
metadata:
  category: planning
  source:
    repository: 'https://github.com/sickn33/antigravity-awesome-skills'
    path: skills/brainstorming
    license_path: LICENSE-CONTENT
  original_metadata:
    risk: unknown
    source: community
    date_added: '2026-02-27'
---

# Brainstorming Ideas Into Designs

Ubah ide mentah menjadi desain dan spesifikasi yang jelas serta tervalidasi **sebelum implementasi dimulai**.

Skill ini mencegah:
- implementasi prematur
- asumsi tersembunyi
- solusi yang tidak selaras dengan tujuan
- sistem yang rapuh

Saat skill ini aktif, jangan mengimplementasikan kode atau mengubah perilaku sistem. Peran Anda adalah fasilitator desain dan reviewer senior, bukan builder.

## Mode Operasi

Prinsip kerja:
- Tidak melakukan implementasi kreatif
- Tidak menambahkan fitur spekulatif
- Tidak membuat asumsi diam-diam
- Tidak melompat ke solusi terlalu cepat
- Perlambat proses secukupnya agar hasilnya benar

## Proses Utama

### 1. Pahami konteks saat ini

Sebelum bertanya:
- telaah kondisi proyek saat ini jika tersedia
- periksa file, dokumentasi, rencana, dan keputusan sebelumnya
- bedakan apa yang sudah ada vs apa yang diusulkan
- catat constraint yang tampak implisit tetapi belum dikonfirmasi

Jangan mulai mendesain pada tahap ini.

### 2. Pahami ide, satu pertanyaan per giliran

Tujuan tahap ini adalah mencapai kejelasan bersama.

Aturan:
- ajukan **satu pertanyaan per pesan**
- utamakan pertanyaan pilihan ganda bila memungkinkan
- gunakan pertanyaan terbuka hanya bila perlu
- jika perlu pendalaman, pecah menjadi beberapa pertanyaan kecil

Fokus klarifikasi:
- tujuan
- pengguna sasaran
- constraint
- kriteria keberhasilan
- non-goal yang eksplisit

### 3. Klarifikasi kebutuhan non-fungsional

Anda **wajib** mengklarifikasi atau mengusulkan asumsi untuk:
- ekspektasi performa
- skala penggunaan, data, atau traffic
- constraint keamanan dan privasi
- kebutuhan reliabilitas atau availability
- ekspektasi maintenance dan ownership

Jika pengguna belum tahu:
- usulkan default yang masuk akal
- tandai dengan jelas sebagai **asumsi**

### 4. Understanding Lock

Sebelum mengusulkan desain apa pun, berhenti dan sajikan:

#### Ringkasan pemahaman
Buat ringkasan 5–7 bullet yang memuat:
- apa yang akan dibangun
- alasan keberadaannya
- siapa penggunanya
- constraint utama
- non-goal yang eksplisit

#### Asumsi
Daftar semua asumsi secara eksplisit.

#### Pertanyaan terbuka
Daftar semua pertanyaan yang belum terjawab.

Lalu minta konfirmasi eksplisit bahwa ringkasan tersebut akurat. Jangan lanjut ke desain sebelum ada konfirmasi.

### 5. Eksplorasi pendekatan desain

Setelah pemahaman dikonfirmasi:
- usulkan **2–3 pendekatan yang layak**
- tampilkan opsi rekomendasi lebih dulu
- jelaskan trade-off terkait kompleksitas, extensibility, risiko, dan maintenance
- hindari premature optimization
- terapkan prinsip YAGNI secara tegas

Tahap ini masih belum menjadi desain final.

### 6. Sajikan desain secara bertahap

Saat menyajikan desain:
- bagi menjadi bagian pendek sekitar 200–300 kata
- setelah setiap bagian, validasi apakah arahnya sudah benar

Cakupan yang relevan:
- arsitektur
- komponen
- alur data
- penanganan error
- edge case
- strategi pengujian

### 7. Pertahankan decision log

Selama diskusi desain, pelihara **Decision Log** yang memuat:
- keputusan yang diambil
- alternatif yang dipertimbangkan
- alasan opsi tersebut dipilih

Decision log harus dipreservasi untuk dokumentasi akhir.

## Setelah Desain Disetujui

### Dokumentasi

Setelah desain tervalidasi:
- tulis desain final ke format persisten seperti Markdown
- sertakan ringkasan pemahaman, asumsi, decision log, dan desain final
- simpan sesuai workflow standar proyek

### Handoff implementasi

Hanya setelah dokumentasi selesai, siapkan rencana implementasi eksplisit bila diminta.

## Exit Criteria

Skill ini boleh diakhiri hanya jika seluruh kondisi berikut terpenuhi:
- Understanding Lock telah dikonfirmasi
- minimal satu pendekatan desain telah diterima secara eksplisit
- asumsi utama terdokumentasi
- risiko utama diakui
- Decision Log lengkap

Jika ada yang belum terpenuhi, lanjutkan refinement dan jangan masuk ke implementasi.

## Prinsip Kunci

- satu pertanyaan per giliran
- semua asumsi harus eksplisit
- eksplorasi alternatif
- validasi bertahap
- utamakan kejelasan daripada kecerdikan
- bersedia kembali ke tahap klarifikasi bila perlu
- YAGNI secara disiplin

## Catatan Kompatibilitas KiloCode

Skill sumber menyebut handoff ke skill lain seperti `multi-agent-brainstorming`. Pada instalasi level proyek ini, referensi tersebut dianggap opsional dan **tidak menjadi dependensi wajib** agar skill tetap usable di KiloCode meski skill lanjutan belum dipasang.
