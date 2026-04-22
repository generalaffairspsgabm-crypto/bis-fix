---
name: apify-ecommerce
description: Gunakan saat perlu mengekstrak data produk, harga, review, stok, dan seller dari marketplace atau situs e-commerce melalui Apify.
license: Complete terms in LICENSE.txt
metadata:
  category: automation
  source:
    upstream: .tmp-antigravity-skills/skills/apify-ecommerce
    type: community
  depends_on:
    - APIFY_TOKEN yang valid
    - target produk, keyword, atau marketplace yang jelas
    - akses ke Actor Apify e-commerce yang relevan
---

# Apify E-commerce

Skill ini memandu ekstraksi data e-commerce menggunakan Apify untuk kebutuhan pricing intelligence, review analysis, seller discovery, dan benchmark produk. Fokusnya adalah memilih workflow yang tepat, menyiapkan input yang sesuai, lalu merangkum hasil agar bisa dipakai untuk keputusan bisnis.

## Kapan digunakan

Gunakan skill ini saat perlu:
- memantau harga produk atau perubahan stok
- membandingkan produk kompetitor di marketplace
- menganalisis review pelanggan untuk kualitas atau sentimen
- menemukan seller atau reseller untuk produk tertentu
- mengekspor data produk, review, atau seller ke format terstruktur

## Tujuan utama

- memilih workflow e-commerce yang sesuai dengan kebutuhan
- mengumpulkan data produk, review, atau seller secara konsisten
- merangkum insight seperti rentang harga, isu kualitas, atau pola distribusi seller

## Prasyarat

- `APIFY_TOKEN` tersedia secara aman
- target produk, URL, keyword, atau marketplace sudah jelas
- Actor Apify e-commerce yang relevan tersedia

Versi upstream bergantung pada path skill eksternal dan script runner tertentu. Pada versi KiloCode ini, alur dinormalisasi agar tetap mandiri: gunakan mekanisme Apify yang tersedia untuk membaca schema Actor, menjalankan Actor, dan mengekspor hasil.

## Pemilihan workflow

| Kebutuhan | Workflow | Cocok untuk |
|---|---|---|
| Harga dan produk | Produk & pricing | monitoring harga, MAP compliance, benchmark |
| Review pelanggan | Review | sentimen, isu kualitas, pola keluhan |
| Seller intelligence | Seller | reseller discovery, vendor mapping |

## Alur kerja inti

1. pilih workflow berdasarkan kebutuhan
2. siapkan input produk, keyword, atau seller target
3. tentukan format output
4. jalankan Actor
5. rangkum hasil dan insight utama

---

## Workflow 1: Produk dan pricing

Gunakan untuk:
- memantau harga kompetitor
- membandingkan fitur dan positioning produk
- mendeteksi potensi pelanggaran MAP
- melihat ketersediaan stok atau variasi seller

### Bentuk input umum

- URL produk langsung
- URL listing atau kategori
- keyword pencarian lintas marketplace

### Contoh input URL produk

```json
{
  "detailsUrls": [
    {"url": "https://www.amazon.com/dp/B09V3KXJPB"},
    {"url": "https://www.walmart.com/ip/123456789"}
  ],
  "additionalProperties": true
}
```

### Contoh input keyword

```json
{
  "keyword": "Samsung Galaxy S24",
  "marketplaces": ["www.amazon.com", "www.walmart.com"],
  "additionalProperties": true,
  "maxProductResults": 50
}
```

### Field output yang umum

- nama produk
- URL produk
- harga saat ini
- mata uang
- brand
- gambar produk
- informasi seller atau stok tambahan bila tersedia

### Insight yang biasanya dicari

- rentang harga per marketplace
- brand dominan pada keyword tertentu
- seller dengan harga paling agresif
- variasi stok atau listing yang tidak konsisten

---

## Workflow 2: Review pelanggan

Gunakan untuk:
- analisis sentimen awal
- identifikasi isu kualitas berulang
- benchmark persepsi pelanggan antar produk
- menemukan pola defect atau complaint

### Bentuk input umum

- URL produk untuk review listing
- keyword review lintas marketplace

### Contoh input review produk

```json
{
  "reviewListingUrls": [
    {"url": "https://www.amazon.com/dp/B09V3KXJPB"}
  ],
  "sortReview": "Most recent",
  "additionalReviewProperties": true,
  "maxReviewResults": 500
}
```

### Tips analisis review

- gunakan sampel cukup besar untuk pola yang lebih stabil
- cari kata kunci berulang seperti rusak, defect, returned, quality, atau shipping
- jangan bergantung penuh pada satu mode sorting bila marketplace tidak konsisten
- bandingkan review produk sendiri dengan kompetitor untuk konteks

---

## Workflow 3: Seller intelligence

Gunakan untuk:
- menemukan seller lintas toko
- mendeteksi reseller tidak resmi
- memetakan vendor atau distribusi produk

### Contoh input seller discovery

```json
{
  "googleShoppingSearchKeyword": "Nike Air Max 90",
  "scrapeSellersFromGoogleShopping": true,
  "countryCode": "us",
  "maxGoogleShoppingSellersPerProduct": 20,
  "maxGoogleShoppingResults": 100
}
```

### Insight yang biasanya dicari

- seller mana yang paling sering muncul
- variasi harga antar seller
- indikasi reseller tidak resmi
- distribusi seller per negara atau marketplace

## Format output

### Ringkasan cepat

Cocok untuk validasi awal atau insight singkat.

### CSV

Cocok untuk spreadsheet, pricing tracker, dan audit manual.

### JSON

Cocok untuk pipeline analitik atau integrasi sistem lain.

## Cara merangkum hasil

Laporkan minimal:
- jumlah produk, review, atau seller yang dianalisis
- marketplace dan Actor yang digunakan
- metrik utama yang ditemukan
- insight bisnis utama
- rekomendasi tindak lanjut

Contoh insight yang berguna:
- harga kompetitor turun signifikan pada marketplace tertentu
- review negatif paling sering terkait kualitas material atau pengiriman
- seller tertentu konsisten menjual di bawah harga minimum yang diharapkan
- keyword tertentu didominasi brand tertentu dengan positioning harga jelas

## Error handling

- token tidak tersedia: siapkan `APIFY_TOKEN` secara aman
- Actor tidak ditemukan: verifikasi Actor ID
- run gagal: cek input wajib dan marketplace yang didukung
- timeout: kecilkan jumlah hasil atau scope marketplace
- data terlalu beragam: pisahkan analisis per marketplace atau per workflow

## Checklist eksekusi

1. Pilih workflow e-commerce yang sesuai.
2. Siapkan input produk, review, atau seller.
3. Tentukan format output.
4. Jalankan Actor.
5. Ringkas insight pricing, review, atau seller.

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/apify-ecommerce` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
