---
name: appdeploy
description: Gunakan saat ingin mendeploy aplikasi web ke AppDeploy, termasuk memperoleh instruksi deployment, memilih template app, mengirim file, memeriksa status build, dan mengelola versi aplikasi.
license: Complete terms in LICENSE.txt
metadata:
  category: deployment-platform
  source:
    upstream: .tmp-antigravity-skills/skills/appdeploy
    type: community
  depends_on:
    - kredensial AppDeploy yang valid
    - izin eksplisit pengguna untuk deployment publik atau penghapusan aplikasi
---

# AppDeploy

Skill ini merangkum alur deployment aplikasi web ke AppDeploy melalui HTTP API. Fokusnya adalah deployment aplikasi frontend-only atau frontend+backend hingga memperoleh URL publik dan memantau status hasil deploy.

## Kapan digunakan

Gunakan skill ini saat perlu:
- mempublikasikan website atau web app ke URL publik
- melakukan deployment awal aplikasi baru
- memperbarui aplikasi yang sudah pernah dideploy
- memeriksa status build atau error deployment
- melihat daftar aplikasi yang dimiliki pengguna
- rollback atau menerapkan versi aplikasi tertentu

## Prasyarat

- tersedia API key AppDeploy yang valid
- kredensial disimpan aman, misalnya dalam file konfigurasi lokal khusus
- pengguna sudah menyetujui deployment publik atau penghapusan aplikasi

## Prinsip keamanan

- jangan bocorkan API key ke log, commit, atau output publik
- perlakukan penghapusan aplikasi sebagai aksi irreversibel
- konfirmasi eksplisit sebelum delete atau perubahan versi yang berisiko
- jangan menghapus file inti template tanpa memahami constraint platform

## Alur kerja inti

### 1. Ambil instruksi deployment
Sebelum menyiapkan file atau payload deploy, ambil aturan dan constraint deployment dari platform. Ini penting agar struktur file, template, dan batasan platform dipatuhi sejak awal.

### 2. Pilih tipe aplikasi
Tentukan apakah aplikasi termasuk:
- `frontend-only`
- `frontend+backend`

Keputusan ini memengaruhi template, struktur file, dan ekspektasi runtime.

### 3. Pilih template frontend
Untuk aplikasi baru, pilih template yang paling sesuai, misalnya:
- `html-static` untuk situs sederhana
- `react-vite` untuk SPA, dashboard, atau game ringan
- `nextjs-static` untuk situs multi-halaman berbasis static generation

### 4. Siapkan payload file
Untuk aplikasi baru:
- kirim file kustom yang diperlukan
- sertakan perubahan terhadap file template bila ada

Untuk update aplikasi existing:
- kirim hanya file yang berubah
- gunakan diff atau daftar perubahan yang minimal
- gunakan `deletePaths` hanya bila benar-benar perlu dan diizinkan

### 5. Jalankan deployment
Saat deploy, sertakan metadata yang jelas seperti:
- nama aplikasi
- deskripsi singkat
- model agen yang digunakan
- intent deployment, misalnya deploy awal, bugfix, atau retry setelah gagal

### 6. Pantau status
Setelah deploy dimulai, cek status hingga terminal state tercapai, misalnya:
- `ready`
- `failed`
- `deleted`

Jika gagal, gunakan log dan snapshot QA untuk mengidentifikasi akar masalah.

### 7. Kelola versi
Untuk aplikasi existing, daftar versi dapat dipakai untuk:
- melihat riwayat deploy
- rollback ke versi sebelumnya
- membandingkan perubahan antar rilis

## Operasi penting

### Deployment awal
Gunakan saat aplikasi belum punya `app_id`. Pastikan template dan tipe aplikasi sudah dipilih dengan benar.

### Update aplikasi
Gunakan saat `app_id` sudah ada. Kirim perubahan seminimal mungkin agar risiko regresi lebih kecil.

### Pemeriksaan status
Gunakan setelah deploy atau saat pengguna melaporkan aplikasi error. Fokus pada:
- status build
- error frontend
- error backend
- log runtime

### Penghapusan aplikasi
Lakukan hanya atas permintaan eksplisit pengguna. Jelaskan bahwa aksi ini permanen.

### Rollback versi
Gunakan saat versi terbaru bermasalah dan versi lama yang stabil perlu diterapkan kembali.

## Praktik terbaik

- selalu mulai dari instruksi deployment resmi platform
- pilih template yang paling dekat dengan kebutuhan aplikasi
- kirim perubahan sekecil mungkin pada update
- simpan intent deployment agar histori mudah dipahami
- cek status setelah deploy, jangan mengasumsikan sukses tanpa verifikasi

## Anti-pattern

- deploy tanpa membaca constraint platform
- memilih template yang tidak cocok dengan arsitektur aplikasi
- mengirim seluruh proyek saat hanya sedikit file berubah
- menghapus path penting tanpa konfirmasi
- menyatakan aplikasi live tanpa memeriksa status akhir

## Output yang sebaiknya diberikan

Saat membantu pengguna, hasil ideal mencakup:
- tipe aplikasi dan template yang dipilih
- apakah deployment baru atau update
- identitas aplikasi atau `app_id` bila tersedia
- status deployment terakhir
- ringkasan error atau URL publik bila sukses

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/appdeploy` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
