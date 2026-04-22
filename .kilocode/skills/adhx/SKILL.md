---
name: adhx
description: >-
  Gunakan saat perlu mengambil isi posting X/Twitter sebagai JSON terstruktur agar
  analisis, ringkasan, ekstraksi engagement, dan pembacaan artikel panjang dapat
  dilakukan tanpa scraping browser.
license: CC-BY-4.0
metadata:
  category: data-access
  source:
    repository: 'https://github.com/sickn33/antigravity-awesome-skills'
    path: skills/adhx
    license_path: LICENSE-CONTENT
  original_metadata:
    risk: safe
    source: community
    date_added: '2026-03-25'
---

# ADHX

Skill ini memandu penggunaan API ADHX untuk membaca posting X atau Twitter sebagai data JSON yang bersih dan ramah LLM. Cocok untuk ringkasan, analisis isi, ekstraksi metrik engagement, atau membaca artikel panjang tanpa perlu scraping halaman web.

## Kapan digunakan

Gunakan saat:
- user memberikan tautan X/Twitter dan meminta ringkasan atau analisis
- perlu mengambil author, timestamp, likes, retweets, replies, atau views dari sebuah post
- perlu membaca artikel panjang X Article dalam bentuk konten terstruktur
- ingin menghindari scraping browser yang rapuh

## Jangan gunakan saat

Jangan gunakan saat:
- sumber konten bukan X/Twitter
- user membutuhkan data real-time yang tidak tersedia dari endpoint ADHX
- API ADHX gagal atau post tidak tersedia, sehingga perlu fallback lain yang sah

## Prinsip inti

- parse URL lebih dulu untuk mendapatkan username dan status ID
- gunakan endpoint API langsung, bukan scraping halaman
- baca field `article` bila post berupa artikel panjang
- gunakan field `engagement` untuk pertanyaan metrik
- jika respons kosong atau error, laporkan keterbatasannya secara jujur

## Endpoint API

Gunakan pola berikut:

```text
https://adhx.com/api/share/tweet/{username}/{statusId}
```

## Format URL yang didukung

Ekstrak `username` dan `statusId` dari salah satu pola berikut:
- `https://x.com/{user}/status/{id}`
- `https://twitter.com/{user}/status/{id}`
- `https://adhx.com/{user}/status/{id}`

## Alur kerja

### 1. Parse URL

Ambil dua komponen penting:
- `username`
- `statusId`

Contoh:
- URL: `https://x.com/dgt10011/status/2020167690560647464`
- username: `dgt10011`
- statusId: `2020167690560647464`

### 2. Ambil JSON dari ADHX

Gunakan request sederhana seperti:

```bash
curl -s "https://adhx.com/api/share/tweet/{username}/{statusId}"
```

### 3. Jawab berdasarkan struktur respons

Gunakan field yang relevan:
- `text` untuk tweet biasa
- `article.title`, `article.previewText`, dan `article.content` untuk artikel panjang
- `author` untuk identitas penulis
- `engagement` untuk likes, retweets, replies, dan views
- `createdAt` untuk waktu publikasi

## Bentuk respons yang umum

Respons biasanya memuat struktur seperti:
- `id`
- `url`
- `text`
- `author.name`
- `author.username`
- `author.avatarUrl`
- `createdAt`
- `engagement.replies`
- `engagement.retweets`
- `engagement.likes`
- `engagement.views`
- `article.title`
- `article.previewText`
- `article.coverImageUrl`
- `article.content`

Tidak semua field selalu ada. Parse secara defensif.

## Pola penggunaan umum

### Ringkas posting
- parse URL
- ambil JSON
- gunakan `text` atau `article.content`
- hasilkan ringkasan sesuai kebutuhan user

### Ambil metrik engagement
- parse URL
- ambil JSON
- baca `engagement.likes`, `engagement.retweets`, `engagement.replies`, atau `engagement.views`

### Analisis artikel panjang
- parse URL
- ambil JSON
- jika field `article` ada, prioritaskan `article.content`
- gunakan `article.title` dan `previewText` sebagai konteks tambahan

## Checklist cepat

- URL valid dan mengandung username serta status ID
- endpoint ADHX dibentuk dengan benar
- respons JSON berhasil diambil
- field yang dipakai sesuai pertanyaan user
- fallback dijelaskan bila respons kosong atau gagal

## Anti-pattern

Hindari:
- scraping langsung dari halaman X bila ADHX cukup
- menjawab hanya dari URL tanpa mengambil data
- mengabaikan field `article` saat post adalah artikel panjang
- mengasumsikan semua field selalu tersedia

## Catatan kompatibilitas KiloCode

Instruksi instalasi plugin dan referensi repositori eksternal pada skill upstream tidak diwajibkan dalam adaptasi ini. Fokus KiloCode adalah playbook penggunaan endpoint ADHX secara mandiri dan langsung.