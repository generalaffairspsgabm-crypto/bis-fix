---
name: astropy
description: Gunakan saat bekerja dengan astronomi komputasional di Python, termasuk koordinat langit, satuan fisika, waktu presisi, FITS, tabel katalog, kosmologi, dan transformasi WCS.
license: BSD-3-Clause license
metadata:
  category: scientific-python
  source:
    upstream: .tmp-antigravity-skills/skills/astropy
    type: community
  depends_on:
    - lingkungan Python dengan paket astropy
    - data astronomi atau kebutuhan analisis ilmiah yang relevan
---

# Astropy

Skill ini merangkum penggunaan Astropy sebagai fondasi analisis astronomi di Python. Fokusnya adalah operasi ilmiah yang umum dalam astronomi observasional maupun komputasional.

## Kapan digunakan

Gunakan skill ini saat perlu:
- mengonversi koordinat langit antar frame
- bekerja dengan satuan fisika dan quantity
- membaca atau menulis file FITS
- melakukan perhitungan kosmologi
- menangani waktu presisi dengan berbagai skala waktu
- memproses tabel katalog astronomi
- mengubah koordinat piksel ke world coordinate system
- memakai konstanta astronomi dan utilitas ilmiah terkait

## Kapabilitas utama

### 1. Units dan quantities
Gunakan `astropy.units` untuk:
- menempelkan satuan pada nilai numerik
- mengonversi antar satuan
- menjaga konsistensi dimensi dalam perhitungan
- memakai equivalency khusus domain seperti spektral atau paralaks

Ini penting agar perhitungan ilmiah tidak salah karena campur satuan.

### 2. Sistem koordinat
Gunakan `astropy.coordinates` untuk:
- membuat objek `SkyCoord`
- berpindah antar frame seperti ICRS, Galactic, FK5, atau AltAz
- menghitung separation dan position angle
- melakukan pencocokan koordinat ke katalog
- menangani proper motion, radial velocity, dan koordinat 3D

### 3. Waktu presisi
Gunakan `astropy.time` untuk:
- membuat representasi waktu dalam format ISO, JD, MJD, Unix, dan lain-lain
- mengonversi antar skala waktu seperti UTC, TAI, TT, atau TDB
- melakukan aritmetika waktu
- menghitung sidereal time atau koreksi light travel time bila diperlukan

### 4. FITS
Gunakan `astropy.io.fits` untuk:
- membaca image atau table FITS
- mengakses header dan HDU
- memodifikasi metadata FITS
- membuat file FITS baru
- menangani file besar dengan pendekatan yang efisien

### 5. Tabel astronomi
Gunakan `astropy.table` untuk:
- membaca katalog dari FITS, CSV, HDF5, atau format lain
- memfilter, mengurutkan, join, dan group data
- bekerja dengan kolom yang memiliki unit
- menangani missing data dengan masking

### 6. Kosmologi
Gunakan `astropy.cosmology` untuk:
- memakai model kosmologi bawaan seperti Planck18
- menghitung luminosity distance, comoving distance, angular diameter distance
- menghitung age of universe, lookback time, atau Hubble parameter
- membuat model kosmologi kustom bila perlu

### 7. WCS
Gunakan `astropy.wcs` untuk:
- membaca WCS dari header FITS
- mengubah koordinat piksel menjadi koordinat dunia dan sebaliknya
- menghitung footprint citra
- memahami skala, proyeksi, dan referensi koordinat citra

## Alur kerja yang direkomendasikan

1. identifikasi tipe data astronomi yang dipakai
2. pastikan satuan dan frame koordinat eksplisit
3. baca data dengan modul Astropy yang sesuai
4. lakukan transformasi atau analisis ilmiah
5. simpan hasil dengan metadata yang tetap konsisten

## Contoh use case umum

### Transformasi koordinat
Saat perlu mengubah posisi objek dari ICRS ke Galactic atau AltAz untuk observasi dari lokasi tertentu.

### Analisis citra FITS
Saat perlu membaca data piksel, header, dan WCS dari citra teleskop.

### Pengolahan katalog
Saat perlu memuat katalog sumber, memfilter objek, lalu melakukan cross-match.

### Perhitungan kosmologi
Saat perlu menghitung jarak atau waktu kosmologis dari redshift.

## Praktik terbaik

- selalu gunakan quantity bersatuan untuk perhitungan fisika
- nyatakan frame koordinat secara eksplisit
- jangan mengasumsikan timezone atau skala waktu default tanpa verifikasi
- simpan metadata penting saat menulis ulang FITS
- validasi WCS sebelum menggunakannya untuk overlay atau astrometri

## Anti-pattern

- menghitung besaran fisika dengan angka tanpa satuan
- mencampur frame koordinat tanpa transformasi eksplisit
- mengabaikan header FITS saat memproses citra
- memakai waktu astronomi tanpa memahami skala waktunya
- menganggap semua tabel katalog memiliki schema yang sama

## Catatan implementasi

Skill ini bersifat konseptual dan operasional. Untuk implementasi nyata, gunakan modul Astropy yang paling spesifik terhadap tugas, lalu dokumentasikan asumsi ilmiah seperti frame, epoch, satuan, dan model kosmologi.

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/astropy` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
