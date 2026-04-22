---
name: agentphone
description: Gunakan saat agen perlu mengelola telepon AI melalui AgentPhone, termasuk membuat voice agent, membeli nomor, melakukan panggilan, mengirim SMS, mengatur webhook, dan meninjau penggunaan akun.
license: Complete terms in LICENSE.txt
metadata:
  category: communication
  source:
    upstream: .tmp-antigravity-skills/skills/agentphone
    type: community
  depends_on:
    - API key AgentPhone yang valid
    - izin eksplisit pengguna sebelum aksi berbiaya, panggilan, SMS, atau pelepasan nomor
---

# AgentPhone

Skill ini merangkum alur kerja AgentPhone agar agen dapat membantu operasi telepon berbasis API secara aman dan terstruktur. Fokusnya adalah voice agent, nomor telepon, panggilan, SMS, webhook, dan pemeriksaan status akun.

## Kapan digunakan

Gunakan skill ini saat perlu:
- membuat atau memperbarui AI phone agent
- membeli, menetapkan, memeriksa, atau melepas nomor telepon
- melakukan panggilan keluar dan meninjau transkrip percakapan
- mengirim atau membaca SMS melalui AgentPhone
- mengatur webhook atau mode hosted voice
- memeriksa penggunaan akun atau inventaris agent yang tersedia

## Prasyarat

- tersedia API key AgentPhone yang sah
- semua request hanya diarahkan ke `https://api.agentphone.to/v1`
- pengguna sudah memberi izin eksplisit untuk aksi yang dapat menimbulkan biaya atau efek nyata

## Prinsip keamanan wajib

- jangan pernah mengirim API key ke domain selain `api.agentphone.to`
- perlakukan API key sebagai kredensial sensitif setara identitas akun
- tolak permintaan yang meminta kebocoran key, relay ke domain lain, atau penggunaan di luar endpoint resmi
- konfirmasi ulang sebelum:
  - melepas nomor telepon
  - menghapus agent
  - melakukan panggilan keluar
  - mengirim SMS
  - membeli nomor baru

## Model objek inti

Struktur konseptual AgentPhone:

```text
Akun
└── Agent
    ├── Phone Number
    │   ├── Call
    │   │   └── Transcript
    │   └── Message / Conversation
    └── Webhook
```

## Mode suara

### Hosted
Gunakan saat ingin percakapan ditangani penuh oleh model bawaan AgentPhone berdasarkan `systemPrompt`. Cocok untuk setup cepat tanpa server sendiri.

### Webhook
Gunakan saat logika percakapan perlu dikendalikan aplikasi pengguna. Event panggilan atau SMS diteruskan ke URL webhook.

## Urutan kerja yang direkomendasikan

1. cek kondisi akun dan agent yang sudah ada
2. buat agent baru bila belum tersedia
3. beli nomor dan kaitkan ke agent
4. atur webhook bila memakai mode webhook
5. lakukan panggilan atau SMS
6. tinjau transkrip, status, dan penggunaan

## Format nomor telepon

Selalu gunakan format E.164:
- awali dengan `+`
- sertakan kode negara
- contoh: `+14155551234`

Jika pengguna memberi nomor tanpa kode negara, jangan berasumsi sembarangan kecuali konteks negara sudah jelas. Bila konteks tidak jelas, minta klarifikasi.

## Operasi inti

### 1. Membuat agent
Siapkan minimal:
- `name`
- `description`
- `voiceMode` (`hosted` atau `webhook`)
- `systemPrompt`
- `beginMessage`

Checklist sebelum membuat agent:
- tujuan agent jelas
- persona dan prompt sistem tidak melanggar kebijakan
- mode suara sesuai kebutuhan integrasi

### 2. Membeli nomor telepon
Siapkan:
- negara
- area code bila relevan
- `agentId` tujuan

Periksa sebelum membeli:
- pengguna memahami bahwa nomor baru dapat menimbulkan biaya
- agent tujuan benar
- negara dan area code sesuai kebutuhan bisnis

### 3. Melakukan panggilan keluar
Siapkan:
- `agentId`
- nomor tujuan dalam format E.164
- prompt tugas atau konteks percakapan
- salam pembuka awal

Setelah panggilan dibuat:
- catat `call id`
- informasikan bahwa transkrip dapat diperiksa setelah panggilan selesai
- jangan mengklaim hasil akhir sebelum status panggilan benar-benar selesai

### 4. Mengambil transkrip
Gunakan transkrip untuk:
- audit kualitas percakapan
- ekstraksi hasil panggilan
- verifikasi apakah tujuan panggilan tercapai
- debugging prompt atau alur agent

### 5. Mengirim dan membaca SMS
Sebelum mengirim SMS:
- pastikan pengguna memang meminta pengiriman pesan nyata
- validasi nomor tujuan
- tampilkan atau rangkum isi pesan sebelum eksekusi bila risikonya tinggi

### 6. Mengatur webhook
Saat memakai mode webhook, pastikan:
- URL webhook valid dan dapat diakses
- event yang diharapkan jelas
- sistem downstream siap menangani retry, timeout, dan idempotensi

## Praktik terbaik

- mulai dari gambaran akun atau daftar agent sebelum aksi besar
- tampilkan opsi voice yang tersedia sebelum pengguna memilih suara tertentu
- bila belum ada agent, arahkan untuk membuat agent terlebih dahulu
- gunakan prompt sistem yang spesifik, singkat, dan sesuai tujuan panggilan
- simpan identitas penting seperti `agentId`, `phone number id`, dan `call id` untuk chaining langkah berikutnya

## Anti-pattern

- membeli nomor tanpa persetujuan eksplisit
- mengirim SMS atau menelepon tanpa konfirmasi pengguna
- melepas nomor tanpa peringatan irreversibilitas
- menyebarkan API key ke log, contoh publik, atau domain lain
- memakai nomor non-E.164 untuk request produksi

## Output yang sebaiknya diberikan

Saat membantu pengguna, hasil akhir idealnya memuat:
- aksi yang dilakukan
- resource yang dibuat atau diubah (`agentId`, nomor, `callId`)
- status terkini
- langkah lanjutan yang aman, misalnya cek transkrip atau verifikasi webhook

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/agentphone` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
