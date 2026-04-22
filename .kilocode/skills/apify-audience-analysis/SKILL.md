---
name: apify-audience-analysis
description: Gunakan saat perlu menganalisis demografi, preferensi, pola perilaku, dan kualitas engagement audiens lintas Facebook, Instagram, YouTube, dan TikTok melalui Apify.
license: Complete terms in LICENSE.txt
metadata:
  category: automation
  source:
    upstream: .tmp-antigravity-skills/skills/apify-audience-analysis
    type: community
  depends_on:
    - APIFY_TOKEN yang valid
    - akses ke Actor Apify yang relevan
    - kebutuhan analisis audiens media sosial
---

# Apify Audience Analysis

Skill ini memandu analisis audiens menggunakan Apify Actors untuk mengekstrak data follower, komentar, engagement, dan sinyal perilaku dari berbagai platform sosial. Fokusnya adalah memilih Actor yang tepat, menyiapkan input, menjalankan ekstraksi, lalu merangkum insight yang dapat ditindaklanjuti.

## Kapan digunakan

Gunakan skill ini saat perlu:
- memahami demografi atau perilaku audiens di media sosial
- menganalisis pola engagement follower atau commenter
- memilih Actor Apify yang tepat untuk Facebook, Instagram, YouTube, atau TikTok
- menghasilkan data terstruktur sekaligus ringkasan insight audiens

## Tujuan utama

- memilih sumber data audiens yang paling relevan
- menjalankan ekstraksi dengan input yang jelas dan terukur
- menghasilkan output yang mudah dianalisis lebih lanjut
- merangkum insight utama seperti segmen audiens, pola interaksi, dan peluang tindak lanjut

## Prasyarat

- `APIFY_TOKEN` tersedia secara aman melalui environment variable
- akses ke Actor Apify yang relevan
- pemahaman platform target dan batasan datanya

Versi upstream bergantung pada `mcpc`, `.env`, dan script runner eksternal. Pada versi KiloCode ini, alurnya dinormalisasi agar tetap mandiri: gunakan tool atau workflow Apify yang tersedia di lingkungan kerja untuk membaca detail Actor, menjalankan Actor, dan mengekspor hasil.

## Alur kerja inti

1. tentukan jenis analisis audiens yang dibutuhkan
2. pilih Actor berdasarkan platform dan sinyal yang ingin diambil
3. baca schema input Actor dan siapkan parameter minimal
4. tentukan format output: ringkasan cepat, CSV, atau JSON
5. jalankan Actor
6. rangkum insight utama dari hasil ekstraksi

## Pemilihan Actor berdasarkan kebutuhan

| Kebutuhan | Actor ID contoh | Kegunaan utama |
|---|---|---|
| Demografi follower Facebook | `apify/facebook-followers-following-scraper` | daftar follower/following |
| Perilaku engagement Facebook | `apify/facebook-likes-scraper` | analisis likes dan reaksi |
| Audiens video Facebook | `apify/facebook-reels-scraper` | sinyal engagement Reels |
| Analisis komentar Facebook | `apify/facebook-comments-scraper` | pola komentar dan sentimen awal |
| Engagement konten Facebook | `apify/facebook-posts-scraper` | metrik post dan interaksi |
| Ukuran audiens Instagram | `apify/instagram-profile-scraper` | profil dan follower |
| Audiens berbasis lokasi Instagram | `apify/instagram-search-scraper` | pencarian berbasis keyword atau lokasi |
| Jaringan tag Instagram | `apify/instagram-tagged-scraper` | analisis akun yang menandai |
| Data Instagram komprehensif | `apify/instagram-scraper` | profil, post, komentar |
| Komentar YouTube | `streamers/youtube-comments-scraper` | feedback audiens video |
| Channel YouTube | `streamers/youtube-channel-scraper` | sinyal audiens channel |
| Follower TikTok | `clockworks/tiktok-followers-scraper` | daftar follower |
| Profil TikTok | `clockworks/tiktok-profile-scraper` | metrik profil |
| Komentar TikTok | `clockworks/tiktok-comments-scraper` | engagement komentar |

## Menyiapkan input

Saat menyiapkan input Actor:
- gunakan URL, username, hashtag, keyword, atau ID konten yang benar-benar relevan
- batasi jumlah hasil awal agar iterasi cepat
- dokumentasikan asumsi seperti periode waktu, bahasa, atau wilayah target
- hindari mengambil data berlebihan sebelum validasi awal berhasil

## Format output yang direkomendasikan

### Ringkasan cepat

Gunakan saat hanya perlu beberapa insight utama di chat atau laporan singkat.

### CSV

Gunakan saat hasil akan dianalisis di spreadsheet atau BI tool.

### JSON

Gunakan saat hasil akan diproses ulang oleh script, pipeline, atau analisis lanjutan.

## Cara merangkum hasil

Setelah Actor selesai, laporkan minimal:
- jumlah profil, follower, komentar, atau item yang dianalisis
- sumber platform dan Actor yang dipakai
- pola engagement utama
- indikasi segmen audiens dominan
- langkah lanjut yang disarankan

Contoh insight yang berguna:
- audiens paling aktif datang dari tipe konten tertentu
- komentar menunjukkan minat tinggi pada topik atau produk tertentu
- engagement tinggi tetapi follower growth rendah, menandakan loyalitas tanpa ekspansi
- ada peluang segmentasi berdasarkan niche, lokasi, atau format konten

## Error handling

- token tidak tersedia: siapkan `APIFY_TOKEN` secara aman
- Actor tidak ditemukan: verifikasi Actor ID
- run gagal: cek input wajib dan batas platform
- timeout: kecilkan scope input atau jumlah hasil
- output terlalu besar: ulangi dengan sampling lebih kecil atau filter lebih ketat

## Checklist eksekusi

1. Tentukan platform dan tujuan analisis audiens.
2. Pilih Actor yang paling sesuai.
3. Baca schema input dan siapkan parameter minimal.
4. Tentukan format output.
5. Jalankan Actor.
6. Ringkas insight audiens dan rekomendasi tindak lanjut.

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/apify-audience-analysis` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
