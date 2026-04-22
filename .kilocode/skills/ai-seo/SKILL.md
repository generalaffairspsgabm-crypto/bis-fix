---
name: ai-seo
description: Gunakan saat mengoptimalkan konten agar lebih mudah ditemukan, diekstrak, dan dikutip oleh sistem AI seperti Google AI Overviews, ChatGPT, Perplexity, Claude, Gemini, dan Copilot.
license: Complete terms in LICENSE.txt
metadata:
  category: marketing
  source:
    upstream: .tmp-antigravity-skills/skills/ai-seo
    type: community
  depends_on:
    - akses ke konten, halaman, atau strategi distribusi yang ingin dioptimalkan
---

# AI SEO

Skill ini memandu optimasi konten untuk visibilitas di mesin jawaban berbasis AI. Fokusnya bukan hanya ranking SEO tradisional, tetapi kesiapan konten untuk dikutip, diringkas, dan dipilih sebagai sumber oleh sistem seperti AI Overviews, ChatGPT dengan search, Perplexity, Gemini, Claude, dan Copilot.

## Kapan digunakan

Gunakan skill ini saat perlu:
- meningkatkan peluang brand atau konten dikutip oleh sistem AI
- membahas AI SEO, AEO, GEO, LLM visibility, atau citation readiness
- mengaudit apakah konten sudah mudah diekstrak dan dipercaya oleh AI
- menyusun strategi konten yang tidak hanya mengejar ranking, tetapi juga keterkutipan

## Tujuan utama

- membuat konten lebih mudah diekstrak sebagai jawaban mandiri
- meningkatkan sinyal otoritas dan keterpercayaan konten
- memastikan brand hadir di tempat-tempat yang sering dijadikan sumber AI
- mengidentifikasi gap antara visibilitas tradisional dan visibilitas AI

## Prinsip inti

- SEO tradisional membantu ranking; AI SEO membantu konten dikutip
- sistem AI cenderung memilih potongan jawaban yang jelas, ringkas, dan berdiri sendiri
- struktur, otoritas, dan distribusi sama pentingnya
- statistik, sumber primer, dan atribusi ahli meningkatkan peluang sitasi
- konten yang sulit diekstrak sering kalah walau rankingnya bagus

## Cara kerja pencarian AI secara praktis

### Lanskap platform

| Platform | Pola umum pemilihan sumber |
|---|---|
| Google AI Overviews | sangat dipengaruhi ranking tradisional dan kualitas halaman |
| ChatGPT dengan search | dapat mengambil sumber lebih luas, tidak selalu hanya ranking teratas |
| Perplexity | sangat menekankan sumber yang jelas, otoritatif, dan mudah dikutip |
| Gemini | memanfaatkan indeks Google dan sinyal pengetahuan terstruktur |
| Copilot | bergantung pada Bing dan sumber otoritatif |
| Claude dengan web/search | bergantung pada hasil pencarian yang tersedia dan kualitas sumber |

### Perbedaan utama dari SEO tradisional

Dalam SEO tradisional, target utamanya adalah ranking. Dalam AI SEO, target utamanya adalah menjadi sumber yang:
- relevan terhadap pertanyaan
- mudah diekstrak sebagai jawaban
- cukup tepercaya untuk dikutip

Artinya, halaman yang tidak selalu ranking nomor satu masih bisa dikutip jika struktur dan otoritasnya kuat.

## Audit visibilitas AI

Sebelum optimasi, lakukan audit sederhana.

### 1. Uji query prioritas

Cek 10–20 query penting di beberapa platform AI. Gunakan tabel seperti ini:

| Query | Google AI Overview | ChatGPT | Perplexity | Brand Anda dikutip? | Kompetitor dikutip? |
|---|---|---|---|---|---|
| contoh query 1 | Ya/Tidak | Ya/Tidak | Ya/Tidak | Ya/Tidak | siapa |
| contoh query 2 | Ya/Tidak | Ya/Tidak | Ya/Tidak | Ya/Tidak | siapa |

Jenis query yang layak diuji:
- “apa itu [kategori produk]”
- “best [kategori] for [use case]”
- “[brand Anda] vs [kompetitor]”
- “how to [masalah yang diselesaikan produk]”
- “[kategori produk] pricing”

### 2. Analisis pola sitasi

Saat kompetitor dikutip tetapi Anda tidak, periksa:
- apakah struktur kontennya lebih mudah diekstrak?
- apakah mereka punya statistik, kutipan ahli, atau sumber primer?
- apakah kontennya lebih baru?
- apakah mereka punya schema markup yang lebih baik?
- apakah mereka hadir di sumber pihak ketiga yang sering dirujuk AI?

### 3. Audit extractability halaman

Untuk tiap halaman prioritas, cek:

| Pemeriksaan | Status |
|---|---|
| definisi atau jawaban langsung muncul di awal? | lulus/gagal |
| ada blok jawaban yang bisa berdiri sendiri? | lulus/gagal |
| ada statistik dengan sumber? | lulus/gagal |
| ada tabel perbandingan untuk query komparatif? | lulus/gagal |
| ada FAQ dengan bahasa natural? | lulus/gagal |
| heading mengikuti pola query pengguna? | lulus/gagal |
| ada atribusi penulis atau ahli? | lulus/gagal |
| konten baru diperbarui? | lulus/gagal |
| bot AI diizinkan di `robots.txt`? | lulus/gagal |

### 4. Audit akses crawler AI

Pastikan `robots.txt` tidak memblokir crawler yang relevan. Secara umum, periksa bot seperti:
- OpenAI: `GPTBot`, `ChatGPT-User`
- Perplexity: `PerplexityBot`
- Anthropic: `ClaudeBot`, `anthropic-ai`
- Google: `Google-Extended`
- Microsoft: `Bingbot`

Memblokir crawler tertentu bisa menjadi keputusan bisnis, tetapi konsekuensinya adalah peluang sitasi dari platform tersebut ikut turun.

## Strategi optimasi

### Pilar 1: Struktur — buat konten mudah diekstrak

AI mengekstrak passage, bukan seluruh halaman. Karena itu, setiap klaim penting sebaiknya bisa berdiri sendiri.

Pola blok konten yang efektif:
- blok definisi untuk query “apa itu X?”
- langkah bernomor untuk query “cara melakukan X”
- tabel perbandingan untuk query “X vs Y”
- blok pro/kontra untuk evaluasi
- FAQ untuk pertanyaan natural language
- blok statistik dengan sumber yang jelas

Aturan struktur praktis:
- mulai tiap bagian dengan jawaban langsung
- jaga passage inti tetap ringkas dan padat
- gunakan heading yang mencerminkan cara orang bertanya
- tabel lebih kuat daripada paragraf untuk perbandingan
- daftar bernomor lebih kuat daripada paragraf untuk proses
- satu paragraf sebaiknya membawa satu ide utama

### Pilar 2: Otoritas — buat konten layak dikutip

Sistem AI lebih suka sumber yang tampak dapat dipercaya.

Perkuat dengan:
- statistik spesifik beserta sumber primer
- kutipan ahli dengan nama, jabatan, dan organisasi
- atribusi penulis yang jelas
- tanggal pembaruan yang terlihat
- metodologi atau sumber data yang transparan
- detail konkret, bukan klaim generik

Praktik yang disarankan:
- gunakan angka spesifik, bukan kata samar seperti “banyak” atau “sering”
- sertakan tanggal pada statistik
- prioritaskan riset asli atau sumber primer
- tampilkan pengalaman langsung atau bukti praktik nyata bila relevan

### Pilar 3: Presence — hadir di tempat yang dilihat AI

AI tidak hanya mengutip situs resmi Anda. Ia juga dapat mengutip:
- review pihak ketiga
- forum komunitas
- dokumentasi publik
- artikel perbandingan
- direktori industri
- sumber referensi umum yang dianggap otoritatif

Karena itu, strategi AI SEO tidak cukup hanya memperbaiki halaman sendiri. Anda juga perlu memastikan brand hadir di ekosistem sumber yang sering dirujuk.

## Pola konten yang efektif

### Untuk query definisional

Gunakan pembuka yang langsung menjawab:
- definisi singkat
- siapa yang cocok memakai solusi tersebut
- kapan solusi itu relevan

### Untuk query komparatif

Gunakan tabel yang jelas:
- fitur
- harga
- kelebihan
- kekurangan
- use case terbaik

### Untuk query prosedural

Gunakan langkah bernomor:
1. langkah awal
2. langkah inti
3. validasi hasil
4. kesalahan umum yang perlu dihindari

### Untuk query evaluatif

Tambahkan:
- pro dan kontra
- kriteria pemilihan
- siapa yang cocok dan tidak cocok
- bukti atau benchmark bila ada

## Checklist optimasi halaman

1. Apakah jawaban utama muncul di awal bagian?
2. Apakah ada passage yang bisa berdiri sendiri tanpa konteks besar?
3. Apakah heading mengikuti bahasa query pengguna?
4. Apakah ada statistik, sumber, atau kutipan ahli?
5. Apakah ada tabel atau FAQ bila format itu lebih cocok?
6. Apakah penulis, tanggal update, dan sinyal kepercayaan terlihat?
7. Apakah `robots.txt` mengizinkan crawler AI yang relevan?
8. Apakah brand juga hadir di sumber pihak ketiga yang sering dirujuk?

## Anti-pattern penting

- keyword stuffing
- paragraf panjang tanpa jawaban langsung
- klaim tanpa sumber
- konten generik yang bisa ditulis siapa saja
- halaman komparatif tanpa tabel
- artikel lama tanpa tanggal pembaruan
- memblokir crawler AI tanpa memahami dampaknya pada sitasi

## Hasil yang diharapkan

Dengan mengikuti skill ini, konten akan:
- lebih mudah dipilih sebagai sumber jawaban AI
- lebih mudah diringkas tanpa kehilangan makna
- lebih kuat secara otoritas dan keterpercayaan
- lebih kompetitif terhadap brand yang sudah sering dikutip

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/ai-seo` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.