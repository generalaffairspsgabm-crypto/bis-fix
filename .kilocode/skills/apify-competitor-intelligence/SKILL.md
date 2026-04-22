---
name: apify-competitor-intelligence
description: Gunakan saat perlu menganalisis strategi, konten, pricing, review, dan positioning kompetitor lintas platform melalui Apify.
license: Complete terms in LICENSE.txt
metadata:
  category: automation
  source:
    upstream: .tmp-antigravity-skills/skills/apify-competitor-intelligence
    type: community
  depends_on:
    - APIFY_TOKEN yang valid
    - daftar kompetitor atau keyword pembanding
    - akses ke Actor Apify yang relevan
---

# Apify Competitor Intelligence

Skill ini memandu pengumpulan dan analisis data kompetitor menggunakan Apify Actors. Fokusnya adalah memilih sumber data yang tepat untuk membandingkan positioning, konten, review, pricing, audience signal, dan performa channel kompetitor.

## Kapan digunakan

Gunakan skill ini saat perlu:
- membandingkan kompetitor di Google Maps, marketplace, atau media sosial
- memantau strategi konten, iklan, atau engagement kompetitor
- mengumpulkan review dan sinyal persepsi pelanggan terhadap kompetitor
- membuat benchmark positioning atau performa channel

## Tujuan utama

- memilih Actor yang paling sesuai dengan jenis benchmark yang dibutuhkan
- mengumpulkan data kompetitor secara terstruktur
- merangkum insight kompetitif yang bisa dipakai untuk strategi produk, marketing, atau positioning

## Prasyarat

- `APIFY_TOKEN` tersedia secara aman
- daftar kompetitor, URL, halaman, atau keyword pembanding sudah jelas
- Actor Apify yang relevan tersedia

Versi upstream bergantung pada `mcpc`, `.env`, dan script runner eksternal. Pada versi KiloCode ini, alur dinormalisasi agar tetap mandiri: gunakan mekanisme Apify yang tersedia untuk membaca schema Actor, menjalankan Actor, dan mengekspor hasil.

## Alur kerja inti

1. tentukan jenis analisis kompetitor
2. pilih Actor berdasarkan platform dan sinyal yang ingin dibandingkan
3. siapkan input minimal untuk tiap kompetitor
4. tentukan format output
5. jalankan ekstraksi
6. rangkum insight kompetitif utama

## Pemilihan Actor berdasarkan kebutuhan

| Kebutuhan | Actor ID contoh | Kegunaan utama |
|---|---|---|
| Data bisnis kompetitor | `compass/crawler-google-places` | lokasi dan profil bisnis |
| Kontak kompetitor | `poidata/google-maps-email-extractor` | ekstraksi email |
| Benchmark fitur bisnis | `compass/google-maps-extractor` | data bisnis detail |
| Review kompetitor | `compass/Google-Maps-Reviews-Scraper` | perbandingan review |
| Benchmark hotel | `voyager/booking-scraper` | data listing hotel |
| Review hotel | `voyager/booking-reviews-scraper` | analisis review |
| Strategi iklan Facebook | `apify/facebook-ads-scraper` | creative dan iklan |
| Metrik halaman Facebook | `apify/facebook-pages-scraper` | performa page |
| Strategi konten Facebook | `apify/facebook-posts-scraper` | pola posting |
| Performa reels Facebook | `apify/facebook-reels-scraper` | analisis reels |
| Analisis audiens kompetitor | `apify/facebook-comments-scraper` | komentar dan sentimen |
| Profil Instagram | `apify/instagram-profile-scraper` | metrik profil |
| Konten Instagram | `apify/instagram-post-scraper` | tracking post |
| Engagement Instagram | `apify/instagram-comment-scraper` | komentar |
| Reel Instagram | `apify/instagram-reel-scraper` | performa reel |
| Growth Instagram | `apify/instagram-followers-count-scraper` | tracking follower |
| Data Instagram komprehensif | `apify/instagram-scraper` | analisis penuh |
| Video YouTube | `streamers/youtube-scraper` | metrik video |
| Komentar YouTube | `streamers/youtube-comments-scraper` | sentimen audiens |
| Channel YouTube | `streamers/youtube-channel-scraper` | metrik channel |
| TikTok kompetitor | `clockworks/tiktok-scraper` | data TikTok |
| Video TikTok | `clockworks/tiktok-video-scraper` | analisis video |
| Profil TikTok | `clockworks/tiktok-profile-scraper` | data profil |

## Menyiapkan input

Saat menyiapkan input:
- gunakan daftar kompetitor yang eksplisit, bukan keyword terlalu luas
- samakan scope perbandingan, misalnya periode waktu, jumlah post, atau wilayah
- mulai dari sampel kecil untuk validasi
- pisahkan analisis pricing, review, dan konten bila sinyalnya berbeda jauh

## Format output

### Ringkasan cepat

Cocok untuk benchmark awal atau shortlist insight utama.

### CSV

Cocok untuk tabel perbandingan dan analisis spreadsheet.

### JSON

Cocok untuk pipeline analitik atau scoring kompetitor otomatis.

## Cara merangkum hasil

Laporkan minimal:
- jumlah kompetitor yang dianalisis
- platform dan Actor yang digunakan
- metrik pembanding utama
- keunggulan dan kelemahan relatif tiap kompetitor
- peluang diferensiasi atau ancaman utama

Contoh insight yang berguna:
- kompetitor A unggul di volume konten tetapi engagement per post rendah
- kompetitor B punya rating lebih tinggi namun keluhan berulang pada area tertentu
- kompetitor C agresif di iklan tetapi positioning produknya sempit
- ada celah pasar pada niche atau format konten yang belum dimanfaatkan kompetitor

## Error handling

- token tidak tersedia: siapkan `APIFY_TOKEN` secara aman
- Actor tidak ditemukan: verifikasi Actor ID
- run gagal: cek input wajib dan batas platform
- timeout: kecilkan jumlah kompetitor atau hasil per kompetitor
- data sulit dibandingkan: samakan scope dan normalisasi field sebelum analisis

## Checklist eksekusi

1. Tentukan jenis benchmark kompetitor.
2. Pilih Actor yang sesuai.
3. Siapkan input yang konsisten antar kompetitor.
4. Tentukan format output.
5. Jalankan ekstraksi.
6. Ringkas insight kompetitif dan rekomendasi strategi.

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/apify-competitor-intelligence` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
