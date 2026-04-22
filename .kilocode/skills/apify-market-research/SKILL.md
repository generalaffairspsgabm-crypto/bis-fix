---
name: apify-market-research
description: Gunakan saat perlu melakukan riset pasar berbasis data publik lintas Google Maps, Facebook, Instagram, Booking, atau TripAdvisor melalui Apify untuk memetakan peluang, harga, kepadatan pasar, dan perilaku konsumen.
license: Complete terms in LICENSE.txt
metadata:
  category: research
  source:
    upstream: .tmp-antigravity-skills/skills/apify-market-research
    type: community
  depends_on:
    - akses ke token Apify atau koneksi Apify yang valid
    - kemampuan menjalankan Actor Apify atau workflow setara
---

# Apify Market Research

Skill ini membantu melakukan riset pasar menggunakan Actor Apify untuk mengumpulkan data dari berbagai platform publik. Fokusnya adalah memilih sumber data yang tepat, menjalankan pengambilan data secara terarah, lalu menyintesis insight pasar seperti kepadatan kompetitor, peluang geografis, harga, permintaan, dan sinyal perilaku konsumen.

## Kapan digunakan

Gunakan skill ini saat perlu:
- mengukur ukuran pasar atau kepadatan kompetitor di wilayah tertentu
- membandingkan harga, positioning, atau penawaran di marketplace dan platform sosial
- memahami minat regional, tren kategori, atau kebutuhan konsumen
- mengumpulkan data pasar terstruktur untuk validasi ide, ekspansi lokasi, atau strategi produk

## Hasil yang diharapkan

- dataset pasar yang relevan dengan pertanyaan riset
- pemetaan Actor Apify yang sesuai dengan sumber data
- ringkasan insight utama, peluang, dan risiko
- rekomendasi langkah validasi atau analisis lanjutan

## Prasyarat operasional

Sebelum eksekusi, pastikan tersedia:
- token Apify atau koneksi Apify yang valid
- akses untuk menjalankan Actor Apify yang dipilih
- pertanyaan riset yang cukup spesifik
- definisi wilayah, kategori, atau segmen yang ingin dianalisis
- format output yang diinginkan: jawaban cepat, CSV, atau JSON

Jika brief masih kabur, klarifikasi minimum berikut:
- pasar atau kategori apa yang diteliti
- wilayah atau negara target
- tujuan riset: sizing, pricing, demand, kompetitor, atau perilaku konsumen
- jumlah hasil atau cakupan data yang diinginkan
- metrik utama yang ingin dibandingkan

## Alur kerja inti

### 1. Identifikasi tipe riset pasar

Pilih Actor berdasarkan kebutuhan riset:

| Kebutuhan riset | Actor Apify yang cocok | Cocok untuk |
|---|---|---|
| Kepadatan pasar lokal | `compass/crawler-google-places` | analisis lokasi dan kompetitor lokal |
| Analisis geospasial | `compass/google-maps-extractor` | pemetaan bisnis dan sebaran |
| Minat regional | `apify/google-trends-scraper` | tren pencarian dan demand |
| Harga dan permintaan | `apify/facebook-marketplace-scraper` | pricing dan listing pasar |
| Pasar event | `apify/facebook-events-scraper` | event, komunitas, dan demand |
| Kebutuhan konsumen | `apify/facebook-groups-scraper` | diskusi komunitas dan pain point |
| Lanskap bisnis | `apify/facebook-pages-scraper` | halaman bisnis dan positioning |
| Data kontak bisnis | `apify/facebook-page-contact-information` | kontak dan kepadatan bisnis |
| Insight visual budaya | `apify/facebook-photos-scraper` | pola visual dan konteks pasar |
| Targeting niche | `apify/instagram-hashtag-scraper` | riset niche dan komunitas |
| Statistik hashtag | `apify/instagram-hashtag-stats` | sizing dan aktivitas niche |
| Aktivitas pasar | `apify/instagram-reel-scraper` | intensitas konten dan engagement |
| Intelijen pasar umum | `apify/instagram-scraper` | data Instagram yang lebih luas |
| Riset peluncuran produk | `apify/instagram-api-scraper` | akses API dan data terstruktur |
| Pasar hospitality | `voyager/booking-scraper` | hotel, harga, dan ketersediaan |
| Insight wisata dan review | `maxcopell/tripadvisor-reviews` | ulasan dan sentimen pelanggan |

Jika ada beberapa opsi, pilih sumber yang paling dekat dengan pertanyaan bisnis pengguna.

### 2. Validasi skema input dan hipotesis riset

Sebelum menjalankan Actor:
- pastikan input sesuai dengan pertanyaan riset
- tentukan apakah butuh data listing, review, hashtag, event, atau tren
- batasi cakupan agar hasil tetap relevan
- definisikan hipotesis awal yang ingin diuji

Contoh hipotesis:
- wilayah A memiliki kepadatan kompetitor lebih rendah daripada wilayah B
- kategori tertentu menunjukkan harga rata-rata lebih tinggi di kota besar
- hashtag niche tertentu menunjukkan pertumbuhan aktivitas yang meningkat
- review pelanggan mengindikasikan unmet need yang konsisten

Checklist validasi:
- kata kunci atau kategori sudah spesifik
- wilayah target jelas
- limit hasil realistis
- metrik pembanding sudah ditentukan
- sumber data cocok dengan hipotesis yang diuji

### 3. Tentukan format output

### Jawaban cepat
Pakai bila pengguna hanya butuh insight awal di chat.

Sajikan:
- temuan utama
- contoh data representatif
- indikasi peluang atau risiko

### CSV
Pakai bila pengguna ingin analisis lanjutan di spreadsheet atau BI tool.

Field yang umum diprioritaskan:
- nama entitas
- platform sumber
- lokasi
- kategori
- harga atau rating bila tersedia
- volume review atau engagement
- URL sumber
- catatan insight awal

### JSON
Pakai bila pengguna ingin struktur data lengkap untuk pipeline analitik.

Pastikan:
- field mentah tetap tersedia
- struktur konsisten
- metadata run dapat ditelusuri

## 4. Jalankan riset secara bertahap

Strategi yang disarankan:
- mulai dari sampel kecil untuk memvalidasi kualitas data
- cek apakah metrik yang dibutuhkan benar-benar tersedia
- revisi query atau filter bila hasil terlalu luas atau terlalu sempit
- lanjutkan ke batch produksi setelah kualitas data memadai

Untuk riset yang lebih kuat, gunakan pola:
1. eksplorasi awal
2. validasi kualitas data
3. pengumpulan batch utama
4. pembersihan dan deduplikasi
5. sintesis insight

## 5. Sintesis insight pasar

Setelah data terkumpul, rangkum:
- jumlah hasil dan sumber data
- pola harga, kepadatan, atau aktivitas
- wilayah atau segmen yang tampak menjanjikan
- sinyal risiko seperti kompetisi tinggi atau sentimen negatif
- rekomendasi validasi lanjutan

Contoh insight yang berguna:
- area dengan kompetitor sedikit namun demand terlihat aktif
- rentang harga dominan dan outlier premium
- kategori dengan engagement tinggi tetapi supply rendah
- keluhan pelanggan yang berulang pada review
- peluang diferensiasi berdasarkan fitur, lokasi, atau positioning

## Template ringkasan hasil

```markdown
## Ringkasan Riset Pasar
- Actor: `compass/crawler-google-places`
- Fokus: coffee shop specialty di Bandung
- Jumlah hasil: 180
- Format output: CSV
- Metrik utama: rating, jumlah review, lokasi, kategori

## Insight utama
- kepadatan tertinggi berada di pusat kota
- area pinggiran tertentu menunjukkan kompetisi lebih rendah
- beberapa pemain dengan review tinggi belum memiliki positioning premium yang kuat

## Risiko
- data lokasi tertentu masih tipis
- perlu validasi manual untuk beberapa listing duplikat

## Langkah berikutnya
- bandingkan harga menu melalui sumber tambahan
- analisis review untuk unmet need
- pilih 2 sampai 3 area untuk validasi lapangan
```

## Praktik baik

- mulai dari pertanyaan bisnis yang jelas, bukan sekadar mengumpulkan data sebanyak mungkin
- gunakan lebih dari satu sumber bila perlu triangulasi insight
- pisahkan data mentah dari interpretasi
- jelaskan keterbatasan data publik dan bias platform
- simpan parameter run agar riset dapat diulang

## Batasan dan kehati-hatian

- data publik tidak selalu mewakili keseluruhan pasar
- beberapa platform lebih kuat untuk sinyal awareness daripada transaksi nyata
- hasil dapat bias terhadap bisnis yang aktif secara digital
- review dan engagement perlu dibaca dalam konteks lokal
- validasi manual tetap penting sebelum keputusan bisnis besar

## Penanganan masalah umum

- token Apify tidak tersedia: minta pengguna menyiapkan kredensial atau koneksi yang valid
- Actor tidak ditemukan: verifikasi ID Actor
- hasil terlalu luas: persempit kategori, lokasi, atau keyword
- hasil terlalu sedikit: perluas cakupan atau gunakan sumber tambahan
- field harga atau rating tidak tersedia: pilih Actor lain yang lebih sesuai
- run timeout: pecah input menjadi beberapa batch

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/apify-market-research` agar mandiri, berbahasa Indonesia, dan tidak bergantung pada referensi eksternal yang tidak tersedia di workspace.
