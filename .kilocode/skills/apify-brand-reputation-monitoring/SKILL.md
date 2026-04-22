---
name: apify-brand-reputation-monitoring
description: Gunakan saat perlu memantau review, rating, dan brand mention lintas platform menggunakan Apify untuk analisis reputasi dan sentimen awal.
license: Complete terms in LICENSE.txt
metadata:
  category: automation
  source:
    upstream: .tmp-antigravity-skills/skills/apify-brand-reputation-monitoring
    type: community
  depends_on:
    - APIFY_TOKEN yang valid
    - akses ke Actor Apify untuk review atau mention monitoring
    - target brand, bisnis, atau keyword yang jelas
---

# Apify Brand Reputation Monitoring

Skill ini memandu pemantauan reputasi brand menggunakan Apify Actors untuk mengumpulkan review, rating, komentar, dan mention dari berbagai platform. Fokusnya adalah memilih sumber data yang tepat, menjalankan ekstraksi secara terstruktur, lalu merangkum sinyal reputasi yang paling penting.

## Kapan digunakan

Gunakan skill ini saat perlu:
- memantau review dan rating bisnis di platform publik
- melacak mention brand di media sosial
- mengumpulkan komentar untuk analisis sentimen awal
- membandingkan persepsi brand antar platform

## Tujuan utama

- memilih Actor yang paling sesuai dengan sumber reputasi yang ingin dipantau
- menghasilkan data review atau mention yang dapat diekspor
- merangkum sinyal reputasi seperti volume, rating, tema keluhan, dan peluang perbaikan

## Prasyarat

- `APIFY_TOKEN` tersedia secara aman
- target brand, lokasi, halaman, hashtag, atau keyword sudah jelas
- Actor Apify yang relevan tersedia dan dapat dijalankan

Versi upstream bergantung pada `mcpc`, `.env`, dan script runner eksternal. Pada versi KiloCode ini, alur dinormalisasi agar tetap mandiri: gunakan mekanisme Apify yang tersedia untuk membaca schema Actor, menjalankan Actor, dan mengekspor hasil.

## Alur kerja inti

1. tentukan sumber reputasi yang ingin dipantau
2. pilih Actor berdasarkan platform dan tipe data
3. siapkan input minimal yang valid
4. tentukan format output
5. jalankan Actor
6. rangkum sinyal reputasi utama

## Pemilihan Actor berdasarkan sumber data

| Kebutuhan | Actor ID contoh | Kegunaan utama |
|---|---|---|
| Review Google Maps | `compass/crawler-google-places` | review bisnis dan rating |
| Export review Google Maps | `compass/Google-Maps-Reviews-Scraper` | scraping review terfokus |
| Data hotel Booking.com | `voyager/booking-scraper` | skor dan data listing |
| Review Booking.com | `voyager/booking-reviews-scraper` | review hotel detail |
| Review TripAdvisor | `maxcopell/tripadvisor-reviews` | review restoran atau atraksi |
| Review Facebook | `apify/facebook-reviews-scraper` | review halaman |
| Komentar Facebook | `apify/facebook-comments-scraper` | monitoring komentar |
| Metrik halaman Facebook | `apify/facebook-pages-scraper` | overview rating dan page data |
| Reaksi Facebook | `apify/facebook-likes-scraper` | analisis tipe reaksi |
| Komentar Instagram | `apify/instagram-comment-scraper` | sentimen komentar |
| Hashtag Instagram | `apify/instagram-hashtag-scraper` | monitoring hashtag brand |
| Search Instagram | `apify/instagram-search-scraper` | discovery mention |
| Tagged post Instagram | `apify/instagram-tagged-scraper` | tracking tag brand |
| Komentar YouTube | `streamers/youtube-comments-scraper` | sentimen komentar video |
| Komentar TikTok | `clockworks/tiktok-comments-scraper` | sentimen komentar TikTok |

## Menyiapkan input

Saat menyiapkan input:
- gunakan URL halaman, nama bisnis, keyword, hashtag, atau lokasi yang spesifik
- batasi jumlah hasil awal untuk validasi cepat
- dokumentasikan periode waktu bila platform mendukung filter waktu
- pisahkan monitoring review dari monitoring mention bila tujuan analisis berbeda

## Format output

### Ringkasan cepat

Cocok untuk melihat beberapa review atau mention teratas tanpa menyimpan file besar.

### CSV

Cocok untuk analisis spreadsheet, tagging manual, atau dashboard sederhana.

### JSON

Cocok untuk pipeline analitik, NLP, atau pemrosesan lanjutan.

## Cara merangkum hasil

Laporkan minimal:
- jumlah review atau mention yang ditemukan
- platform dan Actor yang digunakan
- rating rata-rata atau distribusi sentimen awal bila tersedia
- tema positif yang sering muncul
- tema negatif atau keluhan berulang
- rekomendasi tindak lanjut

Contoh insight yang berguna:
- rating tinggi tetapi komentar negatif meningkat pada topik layanan tertentu
- mention brand meningkat setelah kampanye tertentu
- keluhan paling sering terkait pengiriman, kualitas, atau respons customer service
- platform tertentu menunjukkan persepsi brand yang jauh lebih negatif dibanding platform lain

## Error handling

- token tidak tersedia: siapkan `APIFY_TOKEN` secara aman
- Actor tidak ditemukan: verifikasi Actor ID
- run gagal: cek field input wajib dan batas platform
- timeout: kecilkan scope atau jumlah hasil
- hasil terlalu noisy: sempitkan keyword, lokasi, atau sumber data

## Checklist eksekusi

1. Tentukan sumber reputasi yang ingin dipantau.
2. Pilih Actor yang sesuai.
3. Siapkan input minimal dan valid.
4. Tentukan format output.
5. Jalankan Actor.
6. Ringkas sinyal reputasi dan rekomendasi tindak lanjut.

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/apify-brand-reputation-monitoring` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
