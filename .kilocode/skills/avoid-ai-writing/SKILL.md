---
name: avoid-ai-writing
description: Gunakan saat perlu mengaudit dan menulis ulang teks agar terdengar lebih manusiawi dengan menghapus pola khas tulisan AI, frasa klise, struktur generik, dan pilihan kata yang terasa sintetis.
license: Complete terms in LICENSE.txt
metadata:
  category: writing-quality
  source:
    upstream: .tmp-antigravity-skills/skills/avoid-ai-writing
    type: community
  depends_on:
    - draf teks atau konten yang ingin diaudit
---

# Avoid AI Writing

Skill ini membantu mendeteksi dan memperbaiki pola tulisan yang membuat teks terasa seperti hasil AI. Fokusnya adalah audit gaya bahasa dan rewrite agar hasil akhir lebih natural, spesifik, dan enak dibaca manusia.

## Kapan digunakan

Gunakan skill ini saat perlu:
- menghapus kesan tulisan AI dari artikel, dokumentasi, atau copy
- membersihkan draf yang terlalu generik sebelum dipublikasikan
- mengaudit teks untuk menemukan frasa klise dan struktur formulaik
- membuat hasil tulisan terdengar lebih manusiawi dan kontekstual

## Apa yang dicari

Kategori pola yang biasanya perlu dibersihkan meliputi:
- kata atau frasa bombastis tanpa makna konkret
- transisi generik yang terlalu sering dipakai
- hedging berlebihan
- intensifier kosong
- struktur kalimat yang terlalu formulaik
- daftar bullet yang terasa mekanis
- heading atau format yang terlalu seragam
- kesimpulan generik yang tidak menambah nilai
- artefak chatbot atau disclaimer yang tidak perlu
- sinonim yang diputar-putar agar tampak bervariasi padahal tidak natural

## Tujuan rewrite

Hasil akhir sebaiknya:
- lebih langsung
- lebih konkret
- lebih spesifik konteks
- lebih hemat kata
- lebih terdengar seperti penulis manusia yang paham topik

## Alur kerja inti

### 1. Audit teks mentah
Tandai bagian yang terasa sintetis, misalnya:
- frasa seperti `landscape`, `leverage`, `robust`, `seamless`, `cutting-edge`
- pembuka yang terlalu besar tetapi kosong makna
- kalimat yang terdengar seperti template pemasaran umum

### 2. Kelompokkan masalah
Pisahkan temuan ke beberapa jenis:
- pilihan kata
- struktur kalimat
- format
- tone
- filler atau inflasi signifikansi

### 3. Tulis ulang secara substantif
Jangan hanya mengganti kata satu per satu. Perbaiki juga:
- urutan ide
- tingkat spesifisitas
- ritme kalimat
- hubungan sebab-akibat

### 4. Audit ulang hasil rewrite
Setelah revisi, baca ulang untuk memastikan pola AI masih tidak tersisa dalam bentuk lain.

## Heuristik rewrite yang berguna

- ganti kata abstrak dengan kata kerja konkret
- hapus pembuka yang tidak menambah informasi
- pecah kalimat panjang menjadi dua bila perlu
- gunakan contoh nyata atau detail operasional
- pilih kata umum yang tepat daripada jargon megah
- kurangi frasa transisi yang terlalu formal bila tidak dibutuhkan

## Contoh pola yang sering dibersihkan

### Kata berlebihan
- `leverage` -> gunakan padanan yang lebih langsung seperti `gunakan` bila konteks cocok
- `robust` -> pilih kata yang lebih spesifik seperti `andal`, `kuat`, atau `lengkap` sesuai konteks
- `seamless` -> jelaskan pengalaman nyatanya, bukan sekadar label

### Struktur generik
- pembuka seperti `di era yang berkembang pesat saat ini`
- kesimpulan seperti `pada akhirnya, hal ini menegaskan bahwa...`
- daftar tiga poin yang terasa dibuat-buat hanya demi ritme

## Output yang direkomendasikan

Saat memakai skill ini, hasil ideal terdiri dari empat bagian:
- daftar masalah yang ditemukan
- versi rewrite
- ringkasan perubahan utama
- audit pass kedua atas hasil rewrite

## Praktik terbaik

- pertahankan makna asli, ubah hanya gaya yang perlu
- sesuaikan tone dengan audiens, bukan sekadar membuatnya informal
- prioritaskan kejelasan daripada variasi sinonim
- gunakan detail nyata untuk menggantikan abstraksi kosong

## Anti-pattern

- mengganti semua kata formal menjadi slang tanpa konteks
- menghapus struktur sampai makna asli hilang
- menganggap semua kata populer pasti salah
- melakukan rewrite kosmetik tanpa memperbaiki substansi

## Batasan

Skill ini mengaudit prosa, bukan kode. Skill ini juga tidak memverifikasi fakta atau menambahkan sitasi nyata secara otomatis.

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/avoid-ai-writing` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
