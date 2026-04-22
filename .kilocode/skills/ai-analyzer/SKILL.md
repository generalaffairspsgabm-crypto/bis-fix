---
name: ai-analyzer
description: Gunakan saat perlu menganalisis data kesehatan multi-sumber secara lokal untuk mendeteksi anomali, memetakan tren, memperkirakan risiko kesehatan, dan menyusun rekomendasi personal yang tetap bersifat non-diagnostik.
license: Complete terms in LICENSE.txt
metadata:
  category: health-analytics
  source:
    upstream: .tmp-antigravity-skills/skills/ai-analyzer
    type: community
  depends_on:
    - akses baca ke dataset kesehatan lokal
    - pemahaman bahwa hasil hanya untuk referensi, bukan diagnosis medis
---

# AI Analyzer

Skill ini memandu analisis kesehatan berbasis data lokal. Tujuannya adalah menggabungkan beberapa sumber data kesehatan, menemukan pola penting, memperkirakan risiko awal, dan menghasilkan ringkasan yang dapat ditindaklanjuti tanpa melampaui batas etika medis.

## Kapan digunakan

Gunakan skill ini saat perlu:
- menganalisis kondisi kesehatan dari beberapa dataset sekaligus
- mendeteksi anomali atau perubahan pola pada metrik kesehatan
- memperkirakan risiko awal seperti hipertensi, diabetes, atau gangguan tidur
- membuat laporan kesehatan berbasis data historis
- menjawab pertanyaan pengguna tentang tren kesehatan pribadi berdasarkan data yang tersedia

## Batasan penting

Skill ini tidak boleh dipakai untuk:
- memberikan diagnosis medis
- menentukan dosis obat
- memprediksi prognosis hidup atau mati
- menggantikan konsultasi dokter

Semua hasil harus diberi penanda jelas bahwa analisis hanya bersifat referensi.

## Sumber data yang umum dipakai

Contoh sumber data lokal yang dapat digabungkan:
- profil pengguna: usia, jenis kelamin, tinggi, berat, BMI
- indikator kesehatan dasar atau hasil lab
- data aktivitas atau kebugaran
- data tidur
- data nutrisi
- data kesehatan mental
- riwayat obat
- riwayat alergi

Jika sebagian data tidak tersedia, lanjutkan dengan sumber yang ada dan jelaskan keterbatasannya.

## Alur kerja inti

### 1. Validasi konfigurasi analisis
Periksa apakah fitur AI aktif, sumber data yang diizinkan tersedia, dan histori analisis sebelumnya dapat dibaca.

### 2. Muat profil dasar pengguna
Ambil atribut yang memengaruhi interpretasi hasil, misalnya:
- usia
- jenis kelamin
- tinggi dan berat
- BMI
- tingkat aktivitas

### 3. Muat dataset kesehatan
Baca semua file data yang relevan lalu catat:
- rentang waktu data
- kelengkapan data
- missing values
- format tanggal dan satuan

### 4. Normalisasi dan pra-pemrosesan
Lakukan:
- penyelarasan timestamp
- normalisasi satuan
- pembersihan nilai kosong atau outlier yang jelas salah input
- pemisahan data numerik, kategorikal, dan time series

### 5. Analisis multi-dimensi
Fokus utama:
- korelasi antar indikator, misalnya tidur terhadap mood atau aktivitas terhadap berat badan
- tren naik, turun, atau stabil dari waktu ke waktu
- deteksi anomali dan change point
- identifikasi faktor risiko yang berulang

### 6. Prediksi risiko awal
Gunakan kerangka berbasis guideline atau scoring yang relevan untuk memperkirakan risiko awal, misalnya:
- hipertensi
- diabetes tipe 2
- penyakit kardiovaskular
- kekurangan nutrisi
- gangguan tidur

Jika input tidak cukup untuk model tertentu, nyatakan bahwa estimasi tidak dapat dibuat secara andal.

### 7. Susun rekomendasi personal
Kelompokkan rekomendasi menjadi tiga tingkat:
- tingkat 1: saran umum berbasis kebiasaan sehat
- tingkat 2: saran yang lebih personal berdasarkan pola data pengguna
- tingkat 3: saran untuk konsultasi profesional bila ada sinyal risiko tinggi

Untuk tingkat 3, selalu sertakan disclaimer eksplisit.

### 8. Hasilkan laporan
Format keluaran dapat berupa:
- ringkasan teks singkat
- laporan komprehensif
- laporan risiko
- laporan tren
- laporan HTML interaktif bila pipeline lokal mendukung

### 9. Simpan histori analisis
Jika sistem memiliki histori lokal, simpan metadata analisis agar perbandingan antar periode dapat dilakukan.

## Teknik analisis yang relevan

### Korelasi
Gunakan pendekatan sesuai tipe data:
- Pearson untuk variabel kontinu
- Spearman untuk data ordinal atau hubungan monotonik

### Deteksi anomali
Metode yang dapat dipakai:
- Z-score
- IQR
- CUSUM untuk perubahan titik pada deret waktu

### Analisis tren
Metode yang umum:
- moving average
- regresi linear sederhana
- segmentasi periode sebelum dan sesudah perubahan besar

## Struktur output yang direkomendasikan

### Ringkasan eksekutif
- kondisi umum
- indikator paling menonjol
- risiko utama
- tindakan prioritas

### Temuan utama
- tren penting
- anomali yang terdeteksi
- korelasi yang layak diperhatikan

### Risiko awal
- jenis risiko
- tingkat keyakinan atau keterbatasan
- faktor yang paling berkontribusi

### Rekomendasi
- perubahan gaya hidup yang realistis
- area yang perlu dipantau lebih lanjut
- kapan perlu konsultasi profesional

## Guardrail etika dan privasi

- utamakan pemrosesan lokal
- jangan mengirim data kesehatan ke layanan eksternal tanpa izin eksplisit
- jangan menyatakan kepastian medis bila hanya ada sinyal statistik
- jelaskan keterbatasan data, model, dan asumsi
- bila risiko tinggi terdeteksi, arahkan pengguna untuk berkonsultasi dengan tenaga medis

## Anti-pattern

- menyimpulkan penyakit dari satu metrik tunggal
- mengabaikan missing data atau kualitas data buruk
- memberi saran obat atau terapi spesifik
- menyamarkan estimasi statistik sebagai diagnosis
- menghapus disclaimer pada rekomendasi sensitif

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/ai-analyzer` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
