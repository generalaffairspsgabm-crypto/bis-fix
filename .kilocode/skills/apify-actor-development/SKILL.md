---
name: apify-actor-development
description: Gunakan saat membuat, memodifikasi, atau men-debug proyek Apify Actor, termasuk bootstrap proyek, skema input-output, pengujian lokal, dan deployment yang aman.
license: Complete terms in LICENSE.txt
metadata:
  category: automation
  source:
    upstream: .tmp-antigravity-skills/skills/apify-actor-development
    type: community
  depends_on:
    - Apify CLI
    - akun Apify dan token dengan izin minimum
    - proyek JavaScript, TypeScript, atau Python untuk Actor
---

# Apify Actor Development

Skill ini memandu pengembangan Apify Actor dari nol maupun saat memodifikasi Actor yang sudah ada. Fokusnya adalah setup yang aman, pemilihan template yang tepat, implementasi runtime Actor, konfigurasi schema, pengujian lokal, dan deployment ke platform Apify.

## Kapan digunakan

Gunakan skill ini saat perlu:
- membuat proyek Apify Actor baru
- memodifikasi atau men-debug Actor yang sudah ada
- memilih template Actor berdasarkan bahasa pemrograman
- menata input, output, dataset, dan metadata Actor
- menyiapkan workflow lokal hingga deployment ke Apify

## Tujuan utama

- memastikan Actor punya kontrak input-output yang jelas
- menjaga setup CLI dan autentikasi tetap aman
- memakai command lokal yang benar untuk runtime Apify
- menghasilkan Actor yang mudah diuji, dipelihara, dan dipublikasikan

## Prasyarat wajib

Sebelum mulai, verifikasi:
- `apify` CLI tersedia melalui `apify --help`
- autentikasi aktif melalui `apify info`
- token tidak pernah ditulis ke source code atau shell history

### Instalasi CLI yang aman

Gunakan package manager resmi, misalnya:

```bash
npm install -g apify-cli
```

Hindari instalasi dengan pola pipe script jarak jauh ke shell.

### Autentikasi yang aman

Prioritaskan:
- environment variable `APIFY_TOKEN`
- atau login interaktif dengan `apify login`

Hindari mengirim token sebagai argumen command karena bisa terekam di history atau process listing.

## Aturan penting sebelum implementasi

Jika proyek memiliki `.actor/actor.json`, isi properti `generatedBy` pada bagian metadata dengan tool dan model yang digunakan. Ini membantu pelacakan kualitas integrasi Actor.

## Pemilihan template

Tentukan bahasa lebih dulu, lalu pilih template yang sesuai:
- JavaScript: `apify create <actor-name> -t project_empty`
- TypeScript: `apify create <actor-name> -t ts_empty`
- Python: `apify create <actor-name> -t python-empty`

Pilih template paling sederhana terlebih dahulu, lalu tambahkan dependency seperti Crawlee atau Playwright hanya bila memang dibutuhkan.

## Alur kerja inti

1. buat proyek Actor dengan template yang sesuai
2. install dependency dan commit lockfile atau pin versi dependency
3. implementasikan logika utama di entry point `src/main.*`
4. definisikan schema input-output dan dataset
5. lengkapi `.actor/actor.json`
6. tulis dokumentasi penggunaan
7. uji lokal dengan `apify run`
8. deploy dengan `apify push`

## Struktur proyek yang umum

```text
.actor/
├── actor.json
├── input_schema.json
└── output_schema.json
src/
└── main.js/ts/py
storage/
├── datasets/
├── key_value_stores/
└── request_queues/
Dockerfile
```

## Aturan implementasi

### Jalankan Actor secara lokal dengan command yang benar

Gunakan:

```bash
apify run
```

Jangan gunakan `npm start`, `npm run start`, `npx apify run`, atau command package manager lain untuk menggantikan runtime lokal Actor. `apify run` menyiapkan environment dan storage lokal yang sesuai dengan platform Apify.

### Input lokal

Untuk pengujian lokal, simpan input di:

```text
storage/key_value_stores/default/INPUT.json
```

File ini harus mengikuti kontrak `.actor/input_schema.json`.

### Storage lokal bukan console cloud

Pahami bahwa hasil `apify run` disimpan lokal di folder `storage/` dan tidak otomatis muncul di Apify Console. Untuk memverifikasi hasil di cloud, deploy dulu dengan `apify push` lalu jalankan Actor di platform.

## Keamanan

Perlakukan semua data hasil crawl sebagai input tidak tepercaya.

### Lakukan

- validasi dan type-check semua data eksternal sebelum diproses atau disimpan
- sanitasi HTML, URL, dan teks hasil scrape sebelum dipakai di query, template, atau shell command
- gunakan logger Apify agar data sensitif tersensor otomatis
- review package sebelum instalasi untuk menghindari typosquatting
- pin versi dependency dan simpan lockfile
- gunakan token dengan izin minimum

### Hindari

- menjalankan konten hasil scrape sebagai kode atau konfigurasi
- meneruskan raw scraped content ke `eval`, shell command, atau generator kode
- mencetak token atau kredensial ke log
- memakai `console.log()` atau `print()` bila logger Apify tersedia dan lebih aman
- menyimpan data sensitif tanpa izin eksplisit

## Best practice runtime

- gunakan validasi input sedini mungkin
- pilih `CheerioCrawler` untuk HTML statis karena lebih ringan
- gunakan `PlaywrightCrawler` hanya untuk situs yang benar-benar membutuhkan browser
- pakai router pattern untuk crawl kompleks
- atur concurrency realistis: HTTP lebih tinggi, browser lebih rendah
- implementasikan retry dengan exponential backoff
- definisikan default yang masuk akal di schema input
- bersihkan data sebelum `pushData`
- hormati robots.txt, ToS, dan rate limit

## Logging dan standby mode

- gunakan paket logging Apify agar kredensial tersensor
- implementasikan readiness probe hanya bila `usesStandbyMode` di `.actor/actor.json` bernilai `true`
- jangan menonaktifkan standby mode tanpa alasan yang jelas

## Command penting

```bash
apify run
apify login
apify push
apify help
```

## Checklist implementasi

1. Verifikasi CLI dan autentikasi.
2. Pilih template berdasarkan bahasa.
3. Isi `generatedBy` di `.actor/actor.json` bila relevan.
4. Implementasikan entry point Actor.
5. Lengkapi `.actor/input_schema.json`, `.actor/output_schema.json`, dan `.actor/dataset_schema.json` bila dipakai.
6. Uji lokal dengan `apify run`.
7. Periksa hasil di `storage/`.
8. Deploy dengan `apify push`.

## Referensi yang perlu diinternalisasi

Skill upstream merujuk ke beberapa file referensi terpisah. Untuk versi KiloCode ini, prinsip pentingnya sudah diringkas langsung di sini agar skill tetap mandiri tanpa bergantung pada dokumen eksternal tambahan.

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/apify-actor-development` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
