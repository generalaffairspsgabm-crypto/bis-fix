---
name: auri-core
description: Gunakan saat merancang produk asisten suara Auri, termasuk visi produk, persona suara, arsitektur Alexa + Claude + AWS, model bisnis, roadmap, dan positioning pasar.
license: Complete terms in LICENSE.txt
metadata:
  category: ai-product
  source:
    upstream: .tmp-antigravity-skills/skills/auri-core
    type: community
  depends_on:
    - konteks produk voice assistant
    - kebutuhan strategi produk, arsitektur, atau go-to-market
---

# Auri Core

Skill ini merangkum fondasi produk Auri sebagai asisten suara cerdas berbasis Alexa, Claude, dan AWS. Fokusnya bukan hanya implementasi teknis, tetapi juga persona, proposisi nilai, model bisnis, dan roadmap produk.

## Kapan digunakan

Gunakan skill ini saat perlu:
- mendefinisikan visi produk Auri atau voice assistant serupa
- merancang persona suara dan gaya interaksi
- menyusun arsitektur produk Alexa + LLM + AWS
- memetakan paket harga dan unit economics awal
- menyusun roadmap peluncuran bertahap
- menilai positioning pasar dan diferensiasi produk

## Inti produk

Auri diposisikan sebagai asisten suara yang:
- berbicara natural dalam bahasa Indonesia atau konteks lokal yang relevan
- mampu melakukan percakapan multi-turn
- memiliki memori kontekstual
- memanfaatkan Alexa sebagai antarmuka perangkat
- memakai Claude sebagai mesin penalaran utama
- menyimpan state dan observabilitas di AWS

## Persona produk

Karakter yang perlu dijaga:
- hangat
- cerdas
- langsung
- empatik
- dapat dipercaya
- proaktif tetapi tidak invasif

Prinsip bahasa:
- gunakan bahasa natural, bukan robotik
- akui ketidakpastian bila memang ada
- tawarkan alternatif, bukan sekadar penolakan kaku
- jaga konsistensi persona di semua touchpoint

## Proposisi nilai

Nilai utama Auri dibanding voice assistant tradisional:
- percakapan lebih kontekstual
- penalaran lebih dalam
- personalisasi lebih kuat
- integrasi perangkat Alexa tetap dipertahankan
- memori dan preferensi pengguna dapat dikelola lintas sesi

## Arsitektur produk tingkat tinggi

Alur umum:

```text
Perangkat Echo / Alexa
-> Alexa Skill / ASK SDK
-> AWS Lambda
-> Claude API
-> DynamoDB / Polly / CloudWatch / Secrets Manager
```

Komponen penting:
- Alexa sebagai antarmuka suara
- Lambda sebagai orkestrator backend
- Claude sebagai mesin respons
- DynamoDB untuk memori pengguna
- Polly untuk kualitas suara bila diperlukan
- CloudWatch untuk log dan observabilitas

## Area desain teknis

### Memori pengguna
Simpan hanya konteks yang berguna, misalnya:
- preferensi
- profil dasar
- ringkasan percakapan penting
- statistik penggunaan

Hindari menyimpan seluruh percakapan mentah tanpa strategi retensi.

### Interaction model
Pastikan tersedia:
- invocation name yang mudah diucapkan
- intent percakapan umum
- intent penghentian dan bantuan
- fallback yang baik

### Respons suara
Optimalkan untuk audio:
- singkat
- jelas
- mudah diikuti
- dapat dipecah menjadi follow-up bila topik kompleks

## Model bisnis

Contoh struktur paket yang relevan:
- Free untuk eksperimen awal
- Pro untuk pengguna individual
- Business untuk keluarga atau tim kecil
- Enterprise untuk kebutuhan organisasi besar

Saat mengevaluasi paket, pertimbangkan:
- batas penggunaan
- retensi memori
- fitur personalisasi
- SLA dan integrasi enterprise

## Metrik produk

Metrik yang layak dipantau:
- aktivasi pengguna baru
- pertanyaan per pengguna aktif
- retensi mingguan atau bulanan
- durasi sesi percakapan
- tingkat keberhasilan intent
- biaya inferensi per pengguna
- rasio konversi Free ke Pro

## Roadmap bertahap

Pendekatan yang sehat:
1. validasi MVP dan use case inti
2. tambah memori dan personalisasi
3. perluas integrasi smart home atau layanan eksternal
4. bangun fitur bisnis, dashboard, dan enterprise readiness

## Risiko utama

- latensi suara terlalu tinggi
- biaya inferensi tidak terkendali
- memori terlalu banyak atau terlalu sedikit
- persona tidak konsisten
- jawaban LLM terlalu panjang untuk medium audio
- privasi pengguna tidak dikelola dengan baik

## Praktik terbaik

- desain produk dari sudut pengalaman suara, bukan hanya chat yang dibacakan
- prioritaskan use case yang sering dan bernilai tinggi
- ringkas konteks sebelum dikirim ke model
- ukur biaya dan kualitas sejak awal
- jaga keseimbangan antara personalisasi dan privasi

## Anti-pattern

- menyalin UX chatbot teks langsung ke voice assistant
- menyimpan semua histori tanpa strategi ringkasan
- membuat persona terlalu teatrikal hingga mengganggu utilitas
- mengabaikan fallback dan error recovery
- meluncurkan pricing tanpa memahami biaya backend

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/auri-core` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
