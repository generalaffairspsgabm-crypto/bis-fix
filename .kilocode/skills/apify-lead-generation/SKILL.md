---
name: apify-lead-generation
description: Gunakan saat perlu mengumpulkan lead bisnis, kreator, atau kontak dari berbagai platform melalui Apify dengan pemilihan Actor, validasi input, dan output terstruktur.
license: Complete terms in LICENSE.txt
metadata:
  category: automation
  source:
    upstream: .tmp-antigravity-skills/skills/apify-lead-generation
    type: community
  depends_on:
    - akses ke token Apify atau koneksi Apify yang valid
    - kemampuan menjalankan Actor Apify atau workflow setara
---

# Apify Lead Generation

Skill ini membantu mengumpulkan lead dari platform seperti Google Maps, Instagram, TikTok, Facebook, Google Search, dan YouTube menggunakan Actor Apify yang sesuai. Fokusnya adalah memilih sumber lead yang tepat, menentukan output yang dibutuhkan, lalu menghasilkan data yang siap dipakai untuk outreach, enrichment, atau segmentasi.

## Kapan digunakan

Gunakan skill ini saat perlu:
- mencari prospek bisnis lokal, kreator, atau akun sosial berdasarkan niche tertentu
- mengekstrak data kontak atau sinyal outreach dari URL, profil, halaman, atau hasil pencarian
- memilih Actor Apify yang paling cocok untuk sumber lead tertentu
- menghasilkan output lead dalam bentuk ringkasan cepat, CSV, atau JSON

## Hasil yang diharapkan

- daftar lead yang relevan dengan use case pengguna
- pemetaan Actor Apify yang sesuai dengan sumber data
- input run yang jelas dan dapat diaudit
- ringkasan kualitas lead, segmentasi awal, dan langkah lanjutan

## Prasyarat operasional

Sebelum eksekusi, pastikan tersedia:
- token Apify atau koneksi Apify yang valid
- akses untuk menjalankan Actor Apify yang dipilih
- definisi target lead yang cukup jelas: niche, lokasi, platform, dan jumlah hasil
- format output yang diinginkan: jawaban cepat, CSV, atau JSON

Jika detail target belum jelas, minta klarifikasi minimum berikut:
- jenis lead yang dicari
- platform prioritas
- lokasi atau bahasa target
- jumlah hasil yang diinginkan
- field penting seperti email, nomor telepon, URL, follower, kategori, atau alamat

## Alur kerja inti

### 1. Tentukan sumber lead dan Actor

Pilih Actor berdasarkan kebutuhan pengguna:

| Kebutuhan | Actor Apify yang cocok | Cocok untuk |
|---|---|---|
| Bisnis lokal | `compass/crawler-google-places` | restoran, gym, toko, layanan lokal |
| Enrichment kontak dari URL | `vdrmota/contact-info-scraper` | email, telepon, situs |
| Profil Instagram | `apify/instagram-profile-scraper` | kreator, influencer, brand |
| Postingan atau komentar Instagram | `apify/instagram-scraper` | sinyal engagement dan niche |
| Pencarian Instagram | `apify/instagram-search-scraper` | discovery user, hashtag, place |
| Video atau hashtag TikTok | `clockworks/tiktok-scraper` | creator discovery dan tren |
| Profil TikTok | `clockworks/tiktok-profile-scraper` | outreach kreator |
| Followers atau following TikTok | `clockworks/tiktok-followers-scraper` | segmentasi audiens |
| Halaman Facebook | `apify/facebook-pages-scraper` | bisnis dan organisasi |
| Kontak halaman Facebook | `apify/facebook-page-contact-information` | email, telepon, alamat |
| Grup Facebook | `apify/facebook-groups-scraper` | sinyal intent komunitas |
| Event Facebook | `apify/facebook-events-scraper` | networking dan partnership |
| Google Search | `apify/google-search-scraper` | discovery lead umum |
| Channel YouTube | `streamers/youtube-scraper` | partnership kreator |
| Email dari Google Maps | `poidata/google-maps-email-extractor` | ekstraksi email langsung |

Jika beberapa Actor mungkin cocok, prioritaskan:
1. Actor yang paling langsung menghasilkan field yang dibutuhkan
2. Actor dengan cakupan data paling relevan terhadap niche pengguna
3. Actor yang paling sederhana inputnya untuk batch awal

### 2. Validasi skema input sebelum run

Sebelum menjalankan Actor:
- baca dokumentasi atau skema input Actor
- identifikasi field wajib dan field opsional penting
- cocokkan dengan kebutuhan pengguna
- hindari menjalankan Actor dengan input generik yang terlalu luas

Checklist validasi:
- query atau keyword sudah spesifik
- lokasi atau geografi sudah ditentukan bila relevan
- limit hasil realistis
- field output penting dapat dihasilkan oleh Actor tersebut
- risiko duplikasi atau noise sudah dipertimbangkan

## 3. Tentukan format output

Gunakan salah satu pola berikut:

### Jawaban cepat
Pakai bila pengguna hanya butuh beberapa lead terbaik di chat.

Sajikan:
- 5 sampai 10 lead teratas
- alasan lead dianggap relevan
- field inti seperti nama, URL, kategori, lokasi, dan kontak bila ada

### CSV
Pakai bila pengguna ingin file siap sortir, filter, atau impor ke spreadsheet/CRM.

Field yang umum diprioritaskan:
- nama lead
- platform
- URL
- kategori atau niche
- lokasi
- email
- nomor telepon
- follower atau engagement bila tersedia
- catatan kualitas lead

### JSON
Pakai bila pengguna ingin struktur data lengkap untuk pipeline lanjutan.

Pastikan:
- struktur konsisten
- field mentah tetap dipertahankan bila berguna
- metadata run dicatat bila tersedia

## 4. Jalankan pengumpulan lead secara bertahap

Strategi eksekusi yang disarankan:
- mulai dari sampel kecil untuk memvalidasi kualitas hasil
- cek apakah field penting benar-benar muncul
- baru tingkatkan limit atau cakupan pencarian
- bila hasil terlalu noisy, persempit keyword, lokasi, atau tipe sumber

Untuk batch besar, gunakan pendekatan berikut:
1. run eksplorasi kecil
2. evaluasi kualitas hasil
3. revisi input
4. run produksi
5. ekspor hasil akhir

## 5. Ringkas hasil dan rekomendasi

Setelah run selesai, laporkan:
- jumlah lead yang ditemukan
- platform dan Actor yang digunakan
- format output yang dihasilkan
- field utama yang tersedia
- indikasi kualitas lead: tinggi, sedang, rendah
- langkah lanjutan yang disarankan

Contoh langkah lanjutan:
- deduplikasi lintas platform
- enrichment email atau domain
- scoring berdasarkan niche dan lokasi
- segmentasi untuk outreach berbeda
- validasi manual pada lead prioritas tinggi

## Template ringkasan hasil

Gunakan format seperti ini:

```markdown
## Ringkasan Lead
- Actor: `compass/crawler-google-places`
- Target: gym di Jakarta Selatan
- Jumlah hasil: 120
- Format output: CSV
- Field utama: nama, alamat, rating, situs, telepon

## Kualitas awal
- 35 lead prioritas tinggi memiliki situs aktif
- 18 lead memiliki nomor telepon yang jelas
- beberapa hasil duplikat perlu dibersihkan

## Langkah berikutnya
- deduplikasi berdasarkan nama + alamat
- enrichment email dari domain situs
- segmentasi berdasarkan rating dan lokasi
```

## Praktik baik

- mulai dari target yang sempit sebelum memperluas cakupan
- prioritaskan kualitas lead dibanding volume mentah
- simpan parameter run agar dapat direplikasi
- jelaskan keterbatasan data publik pada tiap platform
- jangan menjanjikan field kontak bila Actor tidak mendukungnya

## Batasan dan kehati-hatian

- kualitas data sangat bergantung pada platform sumber dan Actor yang dipilih
- beberapa Actor menghasilkan data publik tanpa email atau telepon langsung
- hasil dapat mengandung duplikasi, akun tidak aktif, atau noise
- validasi manual tetap diperlukan untuk lead bernilai tinggi
- patuhi kebijakan penggunaan data, privasi, dan aturan platform yang berlaku

## Penanganan masalah umum

- token Apify tidak tersedia: minta pengguna menyiapkan kredensial atau koneksi yang valid
- Actor tidak ditemukan: verifikasi ID Actor dan ketersediaannya
- hasil terlalu sedikit: perluas keyword, lokasi, atau limit
- hasil terlalu noisy: persempit query dan tambah filter
- field kontak kosong: gunakan Actor enrichment tambahan atau ubah sumber data
- run timeout: kecilkan input atau pecah menjadi beberapa batch

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/apify-lead-generation` agar mandiri, berbahasa Indonesia, dan tidak bergantung pada referensi eksternal yang tidak tersedia di workspace.
