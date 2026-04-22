---
name: ai-wrapper-product
description: Gunakan saat membangun produk yang membungkus API AI seperti OpenAI atau Anthropic menjadi solusi fokus yang benar-benar menyelesaikan masalah pengguna, dengan perhatian pada UX, biaya, kualitas output, dan diferensiasi bisnis.
license: Complete terms in LICENSE.txt
metadata:
  category: product
  source:
    upstream: .tmp-antigravity-skills/skills/ai-wrapper-product
    type: community
  depends_on:
    - akses ke requirement produk, model AI, dan batasan biaya atau monetisasi
---

# AI Wrapper Product

Skill ini memandu pembangunan produk yang memakai model AI sebagai mesin inti, bukan sekadar “chatbot generik dengan kulit baru”. Fokusnya adalah membungkus API AI menjadi alat yang spesifik, bernilai, dan layak dibayar pengguna.

## Kapan digunakan

Gunakan skill ini saat perlu:
- merancang produk berbasis API AI seperti OpenAI, Anthropic, atau model serupa
- membangun fitur AI yang menyelesaikan pekerjaan spesifik pengguna
- menyeimbangkan kualitas output, biaya inferensi, dan pengalaman pengguna
- memikirkan diferensiasi bisnis untuk produk AI wrapper

## Tujuan utama

- mengubah kemampuan model umum menjadi solusi yang fokus pada use case nyata
- merancang alur input, prompt, validasi, dan output yang siap produksi
- mengendalikan biaya token dan penggunaan model
- memastikan kualitas hasil cukup konsisten untuk dipakai pengguna berulang kali
- membangun pembeda bisnis yang lebih kuat daripada sekadar akses ke model

## Prinsip inti

- AI adalah mesin, bukan produk itu sendiri
- prompt engineering dalam konteks ini adalah bagian dari desain produk
- kualitas output harus divalidasi, bukan diasumsikan
- biaya inferensi harus dipantau sejak awal, bukan setelah produk tumbuh
- produk AI yang baik menyelesaikan pekerjaan spesifik dengan UX yang jelas

## Arsitektur dasar produk AI wrapper

Pola umum yang direkomendasikan:

```text
Input pengguna
-> validasi dan sanitasi
-> template prompt + konteks
-> panggilan API model
-> parsing + validasi output
-> respons yang ramah pengguna
```

Setiap lapisan punya tanggung jawab:
- **validasi input**: mencegah input kosong, terlalu panjang, atau tidak sesuai kontrak
- **prompt + konteks**: mengarahkan model ke format dan tujuan yang tepat
- **API model**: memilih model sesuai trade-off biaya, kecepatan, dan kualitas
- **validasi output**: memastikan hasil dapat dipakai aplikasi
- **respons akhir**: menyajikan hasil dalam bentuk yang berguna bagi pengguna

## Desain produk AI yang fokus

### 1. Mulai dari pekerjaan pengguna

Jangan mulai dari “apa yang bisa dilakukan model”. Mulailah dari:
- masalah spesifik apa yang ingin diselesaikan?
- siapa pengguna utamanya?
- apa output yang mereka anggap selesai dan bernilai?
- apa risiko jika output salah atau tidak konsisten?

Contoh framing yang baik:
- penulis email penjualan yang mengikuti brand voice
- peringkas dokumen legal internal dengan format tetap
- generator deskripsi produk e-commerce dengan guardrail katalog

Contoh framing yang lemah:
- “ChatGPT tapi untuk bisnis”
- “AI assistant serbaguna” tanpa workflow yang jelas

### 2. Definisikan kontrak input dan output

Produk AI wrapper harus punya kontrak yang jelas.

Input perlu didefinisikan seperti:
- field wajib
- batas panjang
- pilihan tone, format, atau tujuan
- konteks tambahan yang boleh atau wajib disertakan

Output perlu didefinisikan seperti:
- struktur JSON atau field yang konsisten
- batas panjang hasil
- fallback jika model gagal mengikuti format
- aturan validasi sebelum hasil ditampilkan ke pengguna

## Prompt engineering untuk produk

Prompt produksi berbeda dari prompt eksperimen. Ia harus:
- konsisten
- dapat diuji
- mudah diubah tanpa merusak perilaku lain
- mendukung validasi output

### Pola template prompt

Pisahkan:
- **system prompt** untuk peran, batasan, dan format global
- **user prompt** untuk data spesifik permintaan
- **context block** untuk brand voice, kebijakan, atau contoh

Praktik yang disarankan:
- gunakan template yang terstruktur
- hindari prompt yang terlalu bebas dan sulit dipelihara
- sertakan contoh bila kualitas sangat bergantung pada gaya
- paksa format output bila aplikasi membutuhkannya

### Kontrol output

Jika aplikasi membutuhkan struktur tertentu:
- minta JSON atau format eksplisit
- validasi hasil setelah model merespons
- siapkan fallback parser bila model menyisipkan teks tambahan
- lakukan retry terbatas bila output tidak valid

## Pemilihan model

Pilih model berdasarkan trade-off nyata, bukan reputasi semata.

Pertimbangan utama:
- **biaya**: apakah unit economics masih sehat?
- **kecepatan**: apakah latency sesuai ekspektasi UX?
- **kualitas**: apakah cukup untuk use case target?
- **reliabilitas format**: apakah model patuh pada struktur output?
- **skalabilitas**: apakah cocok untuk volume tinggi?

Heuristik praktis:
- gunakan model murah/cepat untuk tugas volume tinggi dan kompleksitas rendah
- gunakan model lebih kuat untuk tugas bernilai tinggi atau kompleks
- pertimbangkan fallback model untuk menjaga availability

## Manajemen biaya

Biaya AI harus diperlakukan sebagai bagian dari desain produk.

### Yang perlu dilacak

- token input
- token output
- biaya per request
- biaya per pengguna
- biaya per fitur atau workflow
- model yang dipakai per request

### Strategi penghematan

- gunakan model lebih murah bila kualitas masih cukup
- batasi output token
- cache query atau hasil yang sering berulang
- ringkas konteks sebelum dikirim ke model
- batch request bila pola penggunaan memungkinkan
- gunakan fallback bertingkat: murah dulu, mahal bila perlu

### Usage limits

Terapkan guardrail bisnis seperti:
- kuota harian atau bulanan
- batas request per menit
- batas token per pengguna
- pembatasan fitur premium vs gratis

## Kualitas dan reliabilitas output

### Teknik kontrol kualitas

- contoh dalam prompt untuk mengarahkan gaya
- spesifikasi format output yang ketat
- validasi hasil sebelum ditampilkan
- retry logic terbatas untuk kegagalan format
- fallback model atau fallback non-AI bila perlu
- moderation atau filtering untuk output sensitif

### Pertanyaan audit kualitas

1. Apakah output cukup konsisten untuk dipakai tanpa edit besar?
2. Apakah format hasil dapat diparse aplikasi?
3. Apakah ada mekanisme saat model gagal mengikuti instruksi?
4. Apakah pengguna tahu kapan hasil perlu ditinjau manual?
5. Apakah ada evaluasi kualitas berbasis contoh nyata?

## UX produk AI

Produk AI wrapper yang baik tidak memaksa pengguna menjadi prompt engineer.

Prinsip UX:
- minta input yang relevan, bukan prompt bebas yang terlalu luas
- sediakan preset, template, atau pilihan mode
- tampilkan progress dan status bila latency terasa
- jelaskan batasan hasil secara jujur
- buat iterasi hasil mudah dilakukan

Contoh UX yang baik:
- form terstruktur dengan tujuan, audiens, tone, dan panjang
- tombol “buat ulang dengan tone lebih formal”
- opsi “ringkas”, “perluas”, atau “ubah gaya”

## Diferensiasi bisnis

Agar tidak menjadi wrapper generik, bangun pembeda seperti:
- workflow yang sangat spesifik untuk domain tertentu
- integrasi data atau sistem internal yang tidak dimiliki pesaing
- evaluasi kualitas yang lebih baik
- UX yang mengurangi beban prompting pengguna
- distribusi, komunitas, atau channel yang kuat
- dataset, template, atau guardrail domain yang sulit ditiru cepat

## Checklist implementasi

1. Apakah use case cukup spesifik dan bernilai?
2. Apakah kontrak input/output sudah jelas?
3. Apakah prompt dipisah menjadi template yang maintainable?
4. Apakah output divalidasi sebelum dipakai?
5. Apakah biaya per request dan per pengguna dilacak?
6. Apakah ada rate limit dan usage limit?
7. Apakah model dipilih berdasarkan trade-off nyata?
8. Apakah UX membantu pengguna mencapai hasil tanpa prompt rumit?
9. Apakah ada pembeda bisnis selain sekadar akses ke model?

## Anti-pattern penting

- membangun “chatbot umum” tanpa workflow spesifik
- tidak memvalidasi output model
- mengabaikan biaya sampai produk mulai dipakai banyak orang
- memakai model mahal untuk semua request tanpa segmentasi
- membiarkan pengguna menulis prompt bebas untuk semua hal
- tidak punya fallback saat model gagal atau mahal
- menganggap prompt engineering selesai sekali tulis

## Hasil yang diharapkan

Dengan mengikuti skill ini, produk AI wrapper akan:
- lebih fokus pada pekerjaan pengguna yang nyata
- lebih stabil secara kualitas output
- lebih sehat secara unit economics
- lebih defensible dibanding wrapper generik

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/ai-wrapper-product` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.