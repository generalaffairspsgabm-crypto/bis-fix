---
name: agentmail
description: Gunakan saat agen AI membutuhkan infrastruktur email nyata untuk membuat akun, mengirim dan menerima email, mengelola webhook, serta memantau saldo karma melalui API AgentMail.
license: Complete terms in LICENSE.txt
metadata:
  category: communication
  source:
    upstream: .tmp-antigravity-skills/skills/agentmail
    type: community
  depends_on:
    - API key AgentMail yang valid
    - endpoint aplikasi atau workflow yang dapat menangani inbox, webhook, dan parsing email
---

# AgentMail

Skill ini membantu agen AI memakai alamat email nyata melalui API AgentMail. Fokusnya adalah provisioning akun email, pengiriman dan penerimaan pesan, pengelolaan webhook inbound, pengunduhan attachment, serta pemantauan sistem karma agar operasi email tetap terkendali.

## Kapan digunakan

Gunakan skill ini saat perlu:
- memberi agen AI inbox dan outbox nyata untuk signup atau verifikasi layanan
- mengirim email transaksional atau komunikasi otomatis dari agen
- membaca inbox untuk mengambil kode verifikasi, link konfirmasi, atau balasan pengguna
- mendaftarkan webhook inbound agar email masuk dapat memicu workflow otomatis
- memantau saldo karma sebelum operasi yang mengonsumsi kuota

## Jangan gunakan saat

- kebutuhan hanya simulasi email atau mock inbox
- tidak ada API key AgentMail yang valid
- workflow tidak siap menangani keamanan webhook atau parsing isi email

## Tujuan utama

- menyediakan identitas email nyata untuk agen AI
- memungkinkan otomasi signup, verifikasi, dan komunikasi berbasis email
- menjaga penggunaan email tetap aman melalui verifikasi webhook dan kontrol karma

## Konsep inti

### Akun email agen

Setiap agen dapat memiliki alamat email yang dikelola melalui API. Pembuatan akun mengonsumsi karma dan penghapusan akun dapat mengembalikan sebagian karma.

### Pesan masuk dan keluar

Agen dapat mengirim email, membaca daftar pesan, mengambil detail pesan lengkap, dan mengunduh attachment.

### Webhook inbound

Email masuk dapat diteruskan ke endpoint aplikasi. Endpoint harus memverifikasi signature dan timestamp untuk mencegah replay atau spoofing.

### Sistem karma

Operasi tertentu mengonsumsi atau menambah karma. Saat saldo habis, operasi seperti pembuatan akun atau pengiriman email dapat gagal.

## Alur kerja inti

### 1. Siapkan autentikasi

Gunakan API key AgentMail pada header otorisasi untuk semua request.

### 2. Provision akun email

Saat membuat akun, tentukan alamat yang jelas dan sesuai tujuan workflow. Catat `accountId` untuk operasi berikutnya.

### 3. Kirim dan baca email

Dukung operasi dasar berikut:
- kirim email dengan subject dan body
- baca daftar pesan pada inbox
- ambil detail pesan lengkap
- unduh attachment bila diperlukan

### 4. Tangani webhook inbound

Jika memakai webhook:
- daftarkan URL endpoint penerima
- verifikasi signature HMAC dan timestamp
- tolak request yang terlalu lama atau tidak valid
- log event inbound untuk audit

### 5. Pantau karma

Sebelum operasi yang mengonsumsi karma:
- cek saldo saat ini
- hindari batch besar bila saldo rendah
- hapus akun yang tidak lagi dipakai bila perlu refund karma

## Praktik yang disarankan

- gunakan alamat email yang spesifik per workflow atau agen
- polling inbox hanya bila webhook belum tersedia
- verifikasi semua webhook secara kriptografis
- cek saldo karma sebelum operasi massal
- simpan metadata pesan penting untuk audit dan retry

## Checklist penggunaan AgentMail

- [ ] API key valid tersedia
- [ ] akun email agen dibuat dengan tujuan yang jelas
- [ ] alur kirim dan baca email dapat dijalankan
- [ ] webhook diverifikasi dengan signature dan timestamp
- [ ] saldo karma dipantau sebelum operasi berbiaya
- [ ] attachment dan pesan penting dapat diambil ulang bila perlu

## Anti-pattern penting

- mengirim email tanpa memeriksa saldo karma
- menerima webhook tanpa verifikasi signature
- memakai satu inbox untuk terlalu banyak workflow tanpa pemisahan konteks
- menyimpan API key atau secret webhook secara tidak aman
- mengandalkan polling agresif padahal webhook tersedia

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/agentmail` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
