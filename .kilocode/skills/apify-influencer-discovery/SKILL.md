---
name: apify-influencer-discovery
description: Gunakan saat perlu menemukan dan mengevaluasi influencer atau creator lintas platform melalui Apify untuk shortlist partnership, authenticity check, dan analisis performa awal.
license: Complete terms in LICENSE.txt
metadata:
  category: automation
  source:
    upstream: .tmp-antigravity-skills/skills/apify-influencer-discovery
    type: community
  depends_on:
    - APIFY_TOKEN yang valid
    - niche, keyword, hashtag, atau daftar akun target
    - akses ke Actor Apify yang relevan
---

# Apify Influencer Discovery

Skill ini memandu pencarian dan evaluasi influencer menggunakan Apify Actors di Instagram, Facebook, YouTube, dan TikTok. Fokusnya adalah menemukan kandidat creator yang relevan, memeriksa sinyal autentisitas dan engagement, lalu menyusun shortlist yang lebih siap dipakai untuk outreach atau kampanye.

## Kapan digunakan

Gunakan skill ini saat perlu:
- menemukan creator atau influencer untuk partnership
- mengevaluasi niche fit, engagement, dan sinyal audiens
- memantau akun yang sering menandai brand atau topik tertentu
- membuat shortlist kandidat influencer berbasis data

## Tujuan utama

- memilih Actor yang paling sesuai untuk discovery influencer
- mengumpulkan metrik profil dan performa konten awal
- merangkum kandidat yang paling relevan untuk tindak lanjut

## Prasyarat

- `APIFY_TOKEN` tersedia secara aman
- niche, keyword, hashtag, brand mention, atau daftar akun target sudah jelas
- Actor Apify yang relevan tersedia

Versi upstream bergantung pada `mcpc`, `.env`, dan script runner eksternal. Pada versi KiloCode ini, alur dinormalisasi agar tetap mandiri: gunakan mekanisme Apify yang tersedia untuk membaca schema Actor, menjalankan Actor, dan mengekspor hasil.

## Alur kerja inti

1. tentukan sumber discovery influencer
2. pilih Actor berdasarkan platform dan sinyal yang ingin dicari
3. siapkan input minimal
4. tentukan format output
5. jalankan ekstraksi
6. rangkum shortlist dan insight kandidat

## Pemilihan Actor berdasarkan kebutuhan

| Kebutuhan | Actor ID contoh | Kegunaan utama |
|---|---|---|
| Profil influencer Instagram | `apify/instagram-profile-scraper` | bio, follower, metrik profil |
| Discovery via hashtag | `apify/instagram-hashtag-scraper` | creator pada hashtag tertentu |
| Analisis reel | `apify/instagram-reel-scraper` | performa reel |
| Discovery by niche | `apify/instagram-search-scraper` | pencarian keyword atau niche |
| Brand mention | `apify/instagram-tagged-scraper` | akun yang menandai brand |
| Data Instagram komprehensif | `apify/instagram-scraper` | profil, post, komentar |
| Discovery API-based | `apify/instagram-api-scraper` | ekstraksi cepat berbasis API |
| Analisis komentar | `apify/export-instagram-comments-posts` | sentimen dan kualitas engagement |
| Konten Facebook | `apify/facebook-posts-scraper` | performa konten |
| Micro-influencer di grup | `apify/facebook-groups-scraper` | discovery komunitas niche |
| Halaman berpengaruh | `apify/facebook-search-scraper` | pencarian page atau akun |
| Creator YouTube | `streamers/youtube-channel-scraper` | metrik channel |
| Influencer TikTok | `clockworks/tiktok-scraper` | data TikTok komprehensif |
| TikTok gratis | `clockworks/free-tiktok-scraper` | opsi discovery ringan |
| Live streamer TikTok | `clockworks/tiktok-live-scraper` | creator live |

## Menyiapkan input

Saat menyiapkan input:
- gunakan niche, hashtag, keyword, atau daftar akun yang spesifik
- mulai dari sampel kecil untuk validasi kualitas hasil
- pisahkan discovery kandidat baru dari evaluasi kandidat yang sudah dikenal
- dokumentasikan kriteria shortlist seperti follower range, engagement, atau niche fit

## Format output

### Ringkasan cepat

Cocok untuk shortlist awal beberapa kandidat.

### CSV

Cocok untuk scoring manual, outreach planning, dan review tim.

### JSON

Cocok untuk pipeline scoring atau integrasi CRM dan tooling lain.

## Cara merangkum hasil

Laporkan minimal:
- jumlah influencer atau creator yang ditemukan
- platform dan Actor yang digunakan
- metrik utama yang tersedia seperti follower, engagement, atau performa konten
- kandidat paling relevan beserta alasan
- risiko atau catatan autentisitas awal
- rekomendasi tindak lanjut

Contoh insight yang berguna:
- creator dengan follower menengah tetapi engagement tinggi lebih cocok untuk niche tertentu
- akun dengan follower besar namun komentar generik berulang perlu dicek autentisitasnya
- hashtag tertentu menghasilkan banyak micro-influencer yang lebih relevan daripada akun besar
- creator yang sering menandai brand kompetitor bisa menjadi kandidat outreach atau monitoring

## Error handling

- token tidak tersedia: siapkan `APIFY_TOKEN` secara aman
- Actor tidak ditemukan: verifikasi Actor ID
- run gagal: cek input wajib dan batas platform
- timeout: kecilkan scope pencarian atau jumlah hasil
- hasil terlalu luas: sempitkan niche, hashtag, atau kriteria akun

## Checklist eksekusi

1. Tentukan sumber discovery influencer.
2. Pilih Actor yang sesuai.
3. Siapkan input dan kriteria shortlist.
4. Tentukan format output.
5. Jalankan ekstraksi.
6. Ringkas kandidat terbaik dan rekomendasi tindak lanjut.

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/apify-influencer-discovery` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
