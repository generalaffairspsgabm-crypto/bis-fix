---
name: apify-content-analytics
description: Gunakan saat perlu menganalisis performa konten, engagement, growth, dan ROI kampanye lintas Instagram, Facebook, YouTube, dan TikTok melalui Apify.
license: Complete terms in LICENSE.txt
metadata:
  category: automation
  source:
    upstream: .tmp-antigravity-skills/skills/apify-content-analytics
    type: community
  depends_on:
    - APIFY_TOKEN yang valid
    - target akun, konten, atau kampanye yang jelas
    - akses ke Actor Apify yang relevan
---

# Apify Content Analytics

Skill ini memandu analisis performa konten menggunakan Apify Actors untuk mengumpulkan metrik engagement, growth, dan sinyal performa dari berbagai platform sosial. Fokusnya adalah memilih Actor yang tepat, menyiapkan input yang konsisten, lalu merangkum konten mana yang paling efektif dan mengapa.

## Kapan digunakan

Gunakan skill ini saat perlu:
- mengukur performa post, reel, video, shorts, atau iklan
- membandingkan engagement antar format konten
- memantau growth dan efektivitas kampanye
- mengekspor data performa konten untuk analisis lanjutan

## Tujuan utama

- memilih sumber data performa konten yang paling relevan
- mengumpulkan metrik yang dapat dibandingkan antar konten
- merangkum insight tentang konten terbaik, pola engagement, dan peluang optimasi

## Prasyarat

- `APIFY_TOKEN` tersedia secara aman
- akun, URL, hashtag, atau daftar konten target sudah jelas
- Actor Apify yang relevan tersedia

Versi upstream bergantung pada `mcpc`, `.env`, dan script runner eksternal. Pada versi KiloCode ini, alur dinormalisasi agar tetap mandiri: gunakan mekanisme Apify yang tersedia untuk membaca schema Actor, menjalankan Actor, dan mengekspor hasil.

## Alur kerja inti

1. tentukan jenis analitik konten yang dibutuhkan
2. pilih Actor berdasarkan platform dan format konten
3. siapkan input minimal yang konsisten
4. tentukan format output
5. jalankan ekstraksi
6. rangkum insight performa konten

## Pemilihan Actor berdasarkan kebutuhan

| Kebutuhan | Actor ID contoh | Kegunaan utama |
|---|---|---|
| Metrik post Instagram | `apify/instagram-post-scraper` | performa post |
| Performa reel Instagram | `apify/instagram-reel-scraper` | analytics reel |
| Tracking growth follower | `apify/instagram-followers-count-scraper` | growth metrics |
| Engagement komentar Instagram | `apify/instagram-comment-scraper` | analisis komentar |
| Performa hashtag | `apify/instagram-hashtag-scraper` | branded hashtag |
| Mention tracking | `apify/instagram-tagged-scraper` | tag dan mention |
| Data Instagram komprehensif | `apify/instagram-scraper` | full analytics |
| Metrik post Facebook | `apify/facebook-posts-scraper` | performa post |
| Analisis reaksi Facebook | `apify/facebook-likes-scraper` | tipe engagement |
| Metrik reels Facebook | `apify/facebook-reels-scraper` | performa reels |
| Tracking iklan Facebook | `apify/facebook-ads-scraper` | analitik iklan |
| Analisis komentar Facebook | `apify/facebook-comments-scraper` | engagement komentar |
| Audit page Facebook | `apify/facebook-pages-scraper` | metrik halaman |
| Metrik video YouTube | `streamers/youtube-scraper` | performa video |
| Analytics YouTube Shorts | `streamers/youtube-shorts-scraper` | performa shorts |
| Metrik konten TikTok | `clockworks/tiktok-scraper` | analytics TikTok |

## Menyiapkan input

Saat menyiapkan input:
- gunakan daftar URL, akun, hashtag, atau keyword yang relevan
- samakan periode waktu atau jumlah konten bila ingin membandingkan performa
- mulai dari sampel kecil untuk validasi field output
- pisahkan analisis organik dan berbayar bila sumber datanya berbeda

## Format output

### Ringkasan cepat

Cocok untuk melihat beberapa insight utama tanpa file besar.

### CSV

Cocok untuk analisis spreadsheet, pivot, dan dashboard sederhana.

### JSON

Cocok untuk pipeline analitik, scoring, atau pemrosesan lanjutan.

## Cara merangkum hasil

Laporkan minimal:
- jumlah konten yang dianalisis
- platform dan Actor yang digunakan
- metrik utama seperti views, likes, comments, shares, atau growth
- konten dengan performa terbaik dan terburuk
- pola yang tampak konsisten
- rekomendasi optimasi berikutnya

Contoh insight yang berguna:
- reel berdurasi pendek menghasilkan engagement rate tertinggi
- konten edukatif punya save rate tinggi tetapi share rendah
- kampanye tertentu meningkatkan volume komentar namun tidak menaikkan follower growth
- format video tertentu unggul di satu platform tetapi lemah di platform lain

## Error handling

- token tidak tersedia: siapkan `APIFY_TOKEN` secara aman
- Actor tidak ditemukan: verifikasi Actor ID
- run gagal: cek input wajib dan batas platform
- timeout: kecilkan jumlah konten atau scope akun
- data sulit dibandingkan: normalisasi field dan periode analisis

## Checklist eksekusi

1. Tentukan jenis analitik konten.
2. Pilih Actor yang sesuai.
3. Siapkan input yang konsisten.
4. Tentukan format output.
5. Jalankan ekstraksi.
6. Ringkas insight performa dan rekomendasi optimasi.

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/apify-content-analytics` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
