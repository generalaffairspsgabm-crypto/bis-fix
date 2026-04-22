---
name: apify-trend-analysis
description: Gunakan saat perlu menemukan, membandingkan, dan memantau tren lintas Google Trends, Instagram, Facebook, YouTube, dan TikTok melalui Apify untuk strategi konten, produk, atau kampanye.
license: Complete terms in LICENSE.txt
metadata:
  category: research
  source:
    upstream: .tmp-antigravity-skills/skills/apify-trend-analysis
    type: community
  depends_on:
    - akses ke token Apify atau koneksi Apify yang valid
    - kemampuan menjalankan Actor Apify atau workflow setara
---

# Apify Trend Analysis

Skill ini membantu menemukan dan memantau tren menggunakan Actor Apify dari berbagai platform publik. Fokusnya adalah memilih sumber tren yang tepat, mengumpulkan data secara terarah, lalu menyintesis insight yang dapat dipakai untuk strategi konten, kampanye, positioning produk, atau eksplorasi peluang baru.

## Kapan digunakan

Gunakan skill ini saat perlu:
- mencari tren pencarian, hashtag, topik, format konten, atau sinyal viral
- membandingkan tren lintas platform seperti Google, Instagram, YouTube, dan TikTok
- memantau perubahan minat audiens dari waktu ke waktu
- mengidentifikasi peluang konten, produk, atau kampanye berdasarkan data publik

## Hasil yang diharapkan

- daftar tren atau topik yang relevan dengan niche pengguna
- pemetaan Actor Apify yang sesuai dengan platform sumber
- insight tentang momentum, engagement, dan peluang konten
- rekomendasi langkah lanjutan untuk validasi atau eksekusi

## Prasyarat operasional

Sebelum eksekusi, pastikan tersedia:
- token Apify atau koneksi Apify yang valid
- akses untuk menjalankan Actor Apify yang dipilih
- niche, keyword, hashtag, atau kategori yang ingin dipantau
- platform prioritas dan wilayah target bila relevan
- format output yang diinginkan: jawaban cepat, CSV, atau JSON

Jika brief belum cukup jelas, klarifikasi minimum berikut:
- topik atau niche yang ingin dianalisis
- platform prioritas
- wilayah atau bahasa target
- horizon waktu yang relevan
- tujuan analisis: ide konten, kampanye, riset pasar, atau validasi produk

## Alur kerja inti

### 1. Identifikasi tipe tren dan Actor

Pilih Actor berdasarkan kebutuhan:

| Kebutuhan | Actor Apify yang cocok | Cocok untuk |
|---|---|---|
| Tren pencarian | `apify/google-trends-scraper` | minat pencarian dan demand |
| Pelacakan hashtag Instagram | `apify/instagram-hashtag-scraper` | konten dan komunitas hashtag |
| Metrik hashtag Instagram | `apify/instagram-hashtag-stats` | performa dan ukuran hashtag |
| Analisis posting visual | `apify/instagram-post-scraper` | pola konten dan engagement |
| Discovery tren Instagram | `apify/instagram-search-scraper` | pencarian user, place, hashtag |
| Pelacakan Instagram luas | `apify/instagram-scraper` | data Instagram yang lebih lengkap |
| Akses API Instagram | `apify/instagram-api-scraper` | data terstruktur tambahan |
| Tren komentar Instagram | `apify/export-instagram-comments-posts` | sinyal percakapan dan engagement |
| Tren produk | `apify/facebook-marketplace-scraper` | listing dan minat produk |
| Analisis visual Facebook | `apify/facebook-photos-scraper` | pola visual dan tema |
| Tren komunitas | `apify/facebook-groups-scraper` | diskusi grup dan kebutuhan audiens |
| YouTube Shorts | `streamers/youtube-shorts-scraper` | tren short-form video |
| YouTube berdasarkan hashtag | `streamers/youtube-video-scraper-by-hashtag` | video bertema tertentu |
| Hashtag TikTok | `clockworks/tiktok-hashtag-scraper` | tren hashtag TikTok |
| Sound TikTok | `clockworks/tiktok-sound-scraper` | tren audio |
| Iklan TikTok | `clockworks/tiktok-ads-scraper` | tren kreatif iklan |
| Discover TikTok | `clockworks/tiktok-discover-scraper` | topik discover |
| Explore TikTok | `clockworks/tiktok-explore-scraper` | konten eksplorasi |
| Tren viral TikTok | `clockworks/tiktok-trends-scraper` | konten yang sedang naik |

Jika pengguna ingin pandangan lintas platform, gunakan lebih dari satu sumber dan bandingkan pola yang konsisten.

### 2. Validasi skema input dan fokus analisis

Sebelum menjalankan Actor:
- pastikan keyword, hashtag, atau topik cukup spesifik
- tentukan apakah fokusnya discovery, monitoring, atau benchmarking
- batasi cakupan agar hasil tetap relevan
- definisikan metrik yang ingin diamati

Metrik yang umum dipakai:
- volume atau frekuensi kemunculan
- engagement atau interaksi
- pertumbuhan dari waktu ke waktu
- variasi format konten
- sinyal viral atau momentum

Checklist validasi:
- topik sudah jelas
- platform sudah dipilih
- wilayah atau bahasa sudah ditentukan bila perlu
- limit hasil realistis
- output yang diinginkan sesuai tujuan analisis

### 3. Tentukan format output

### Jawaban cepat
Pakai bila pengguna hanya butuh insight awal di chat.

Sajikan:
- tren utama yang muncul
- contoh keyword, hashtag, sound, atau konten representatif
- interpretasi singkat tentang peluangnya

### CSV
Pakai bila pengguna ingin analisis lanjutan di spreadsheet.

Field yang umum diprioritaskan:
- platform
- keyword atau hashtag
- URL sumber
- engagement atau metrik yang tersedia
- tanggal atau waktu publikasi bila ada
- kategori tren
- catatan insight awal

### JSON
Pakai bila pengguna ingin struktur data lengkap untuk pipeline analitik atau dashboard.

Pastikan:
- struktur konsisten
- field mentah tetap tersedia
- metadata run dapat ditelusuri

## 4. Jalankan analisis tren secara bertahap

Strategi yang disarankan:
- mulai dari sampel kecil untuk memvalidasi kualitas sinyal
- cek apakah hasil benar-benar relevan dengan niche pengguna
- revisi keyword, hashtag, atau filter bila hasil terlalu noisy
- lanjutkan ke batch utama setelah pola awal terlihat jelas

Pola kerja yang efektif:
1. eksplorasi awal
2. validasi kualitas sinyal
3. pengumpulan batch utama
4. pengelompokan tema tren
5. sintesis peluang

## 5. Sintesis insight dan peluang

Setelah data terkumpul, rangkum:
- tren utama yang muncul
- platform mana yang paling aktif
- format konten atau tema yang dominan
- sinyal momentum naik, stabil, atau menurun
- peluang konten, kampanye, atau produk yang bisa diuji

Contoh insight yang berguna:
- hashtag tertentu tumbuh cepat tetapi kompetisinya belum terlalu padat
- sound atau format video tertentu mulai muncul lintas akun niche
- topik yang ramai di TikTok belum banyak dibahas di YouTube Shorts
- tren pencarian Google mendukung sinyal sosial yang terlihat di Instagram

## Template ringkasan hasil

```markdown
## Ringkasan Analisis Tren
- Actor: `apify/google-trends-scraper`
- Fokus: meal prep sehat
- Wilayah: Indonesia
- Jumlah hasil: 75
- Format output: CSV

## Insight utama
- minat pencarian meningkat dalam 6 minggu terakhir
- hashtag terkait di Instagram menunjukkan engagement tinggi
- TikTok menampilkan format video resep singkat sebagai pola dominan

## Peluang
- buat konten edukasi singkat dengan hook hasil cepat
- uji keyword turunan yang lebih spesifik
- sinkronkan kampanye lintas TikTok dan Instagram

## Langkah berikutnya
- validasi 10 akun atau konten teratas
- kelompokkan tren berdasarkan intent audiens
- buat backlog ide konten dari tema yang berulang
```

## Praktik baik

- bedakan antara tren sesaat dan sinyal yang berulang
- triangulasikan insight dari lebih dari satu platform bila memungkinkan
- simpan parameter run agar monitoring dapat diulang
- jelaskan keterbatasan data publik dan bias algoritmik platform
- fokus pada insight yang dapat ditindaklanjuti, bukan hanya daftar topik

## Batasan dan kehati-hatian

- tren publik dapat berubah sangat cepat
- engagement tinggi tidak selalu berarti intent bisnis tinggi
- beberapa platform lebih cocok untuk awareness daripada validasi demand
- hasil dapat bias terhadap akun besar atau konten yang sudah viral
- validasi manual tetap penting sebelum keputusan kampanye besar

## Penanganan masalah umum

- token Apify tidak tersedia: minta pengguna menyiapkan kredensial atau koneksi yang valid
- Actor tidak ditemukan: verifikasi ID Actor
- hasil terlalu noisy: persempit keyword, hashtag, atau wilayah
- hasil terlalu sedikit: perluas cakupan atau gunakan platform tambahan
- metrik tidak lengkap: pilih Actor lain yang lebih sesuai
- run timeout: pecah input menjadi beberapa batch

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/apify-trend-analysis` agar mandiri, berbahasa Indonesia, dan tidak bergantung pada referensi eksternal yang tidak tersedia di workspace.
