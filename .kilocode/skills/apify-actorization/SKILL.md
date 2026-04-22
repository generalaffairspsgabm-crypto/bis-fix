---
name: apify-actorization
description: Gunakan saat mengonversi software yang sudah ada menjadi Apify Actor reusable, termasuk inisialisasi struktur Actor, integrasi SDK, schema input-output, dan deployment.
license: Complete terms in LICENSE.txt
metadata:
  category: automation
  source:
    upstream: .tmp-antigravity-skills/skills/apify-actorization
    type: community
  depends_on:
    - Apify CLI
    - proyek yang sudah ada untuk diubah menjadi Actor
    - pemahaman dasar JavaScript, TypeScript, Python, atau wrapper CLI
---

# Apify Actorization

Skill ini memandu proses mengubah software yang sudah ada menjadi Apify Actor yang reusable. Fokusnya adalah membungkus entry point lama ke lifecycle Actor, mendefinisikan kontrak input-output, dan memastikan proyek siap dijalankan lokal maupun di platform Apify.

## Kapan digunakan

Gunakan skill ini saat perlu:
- mengonversi proyek yang sudah ada agar berjalan di platform Apify
- menambahkan integrasi Apify SDK ke aplikasi atau script lama
- membungkus CLI tool menjadi Actor
- memigrasikan proyek Crawlee atau scraper lain ke format Actor Apify

## Tujuan utama

- mempertahankan logika inti proyek sambil menambahkan kontrak Actor yang jelas
- membuat input dan output dapat dikonsumsi platform Apify
- memastikan proyek bisa diuji dengan `apify run`
- menyiapkan deployment yang konsisten ke cloud Apify

## Prasyarat

Verifikasi:
- `apify --help` berjalan
- `apify info` menunjukkan autentikasi aktif
- token disimpan aman melalui environment variable atau login interaktif

## Alur kerja cepat

1. analisis proyek yang akan di-actorize
2. jalankan `apify init` di root proyek
3. bungkus entry point dengan lifecycle Actor sesuai bahasa
4. definisikan `.actor/input_schema.json`
5. definisikan `.actor/output_schema.json` bila perlu
6. lengkapi `.actor/actor.json`
7. uji lokal dengan `apify run`
8. deploy dengan `apify push`

## Checklist actorization

- [ ] Analisis bahasa, entry point, input, dan output proyek
- [ ] Jalankan `apify init`
- [ ] Terapkan integrasi SDK sesuai bahasa
- [ ] Konfigurasi `.actor/input_schema.json`
- [ ] Konfigurasi `.actor/output_schema.json` bila relevan
- [ ] Perbarui `.actor/actor.json`
- [ ] Uji lokal dengan `apify run`
- [ ] Deploy dengan `apify push`

## Langkah 1: analisis proyek

Sebelum mengubah kode, identifikasi:
- bahasa utama proyek
- file entry point yang memulai eksekusi
- sumber input: argumen CLI, env var, file config, atau request
- bentuk output: file, stdout, API response, dataset
- kebutuhan state persisten antar run

Tujuannya adalah memetakan bagaimana kontrak Actor akan menggantikan atau membungkus antarmuka lama.

## Langkah 2: inisialisasi struktur Actor

Jalankan:

```bash
apify init
```

Ini biasanya menambahkan:
- `.actor/actor.json`
- `.actor/input_schema.json`
- `Dockerfile` bila belum ada

## Langkah 3: integrasi lifecycle Actor

### JavaScript atau TypeScript

Gunakan pola lifecycle Actor seperti:
- `await Actor.init()` sebelum logika utama
- `await Actor.exit()` saat selesai
- baca input melalui `Actor.getInput()`
- kirim hasil melalui `Actor.pushData()` atau key-value store

### Python

Gunakan konteks Actor async, misalnya:
- `async with Actor:`
- baca input melalui API Python SDK
- kirim hasil ke dataset atau key-value store

### Bahasa lain atau CLI wrapper

Jika proyek bukan JS/TS/Python, buat wrapper yang:
- mengambil input Actor
- menerjemahkannya ke format yang dipahami tool lama
- menjalankan tool inti secara aman
- mengubah output menjadi dataset atau artefak yang terstruktur

## Langkah 4 sampai 6: schema dan metadata

### Input schema

Definisikan semua input yang dibutuhkan pengguna di `.actor/input_schema.json`.

Pastikan:
- field wajib ditandai jelas
- default value masuk akal
- deskripsi cukup jelas untuk dipakai di console
- tipe data sesuai perilaku runtime

### Output schema

Gunakan `.actor/output_schema.json` bila output perlu didokumentasikan atau ditampilkan secara konsisten.

### Actor metadata

Lengkapi `.actor/actor.json` dengan:
- nama Actor
- deskripsi
- runtime yang benar
- metadata lain yang dibutuhkan
- `generatedBy` bila proyek memerlukannya

## Pengujian lokal

Gunakan:

```bash
apify run --input '{"startUrl": "https://example.com", "maxItems": 10}'
```

Atau gunakan file input:

```bash
apify run --input-file ./test-input.json
```

### Aturan penting

- selalu gunakan `apify run`, bukan `npm start` atau `python main.py`
- periksa hasil di folder `storage/`
- pahami bahwa storage lokal tidak otomatis tersinkron ke Apify Console

## Deployment

Gunakan:

```bash
apify push
```

Ini mengunggah proyek dan memicu build Actor di platform Apify.

## Monetisasi opsional

Setelah Actor stabil, monetisasi bisa dipertimbangkan. Model yang umum adalah pay-per-event, misalnya per hasil scrape, per halaman, atau per API call. Namun monetisasi sebaiknya dilakukan setelah kontrak input-output dan reliabilitas Actor benar-benar matang.

## Checklist pra-deploy

- [ ] `.actor/actor.json` ada dan valid
- [ ] `.actor/input_schema.json` lengkap dan valid
- [ ] `.actor/output_schema.json` lengkap bila dipakai
- [ ] `Dockerfile` tersedia dan buildable
- [ ] lifecycle Actor membungkus logika utama
- [ ] input dibaca dari API Actor, bukan argumen lama mentah
- [ ] output dikirim ke dataset atau store yang tepat
- [ ] `apify run` sukses dengan input uji
- [ ] metadata `generatedBy` diisi bila relevan

## Anti-pattern penting

- memindahkan proyek ke Apify tanpa memetakan input-output lama
- tetap mengandalkan antarmuka CLI lama tanpa wrapper yang jelas
- menguji dengan command runtime non-Apify
- tidak memvalidasi schema sebelum deploy
- menganggap hasil lokal otomatis muncul di console cloud

## Referensi eksternal yang dinormalisasi

Skill upstream merujuk ke beberapa dokumen referensi terpisah untuk JS/TS, Python, CLI wrapper, dan schema. Pada versi KiloCode ini, prinsip-prinsip utamanya sudah diringkas langsung agar skill tetap mandiri tanpa ketergantungan dokumen tambahan.

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/apify-actorization` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
