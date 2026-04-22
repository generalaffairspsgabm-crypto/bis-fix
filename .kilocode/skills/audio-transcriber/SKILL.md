---
name: audio-transcriber
description: Gunakan saat perlu mentranskripsi audio atau video menjadi teks terstruktur, ringkasan, notulen, atau subtitle dengan alur validasi file, metadata, engine transkripsi, dan output dokumentasi yang rapi.
license: Complete terms in LICENSE.txt
metadata:
  category: content
  source:
    upstream: .tmp-antigravity-skills/skills/audio-transcriber
    type: community
  depends_on:
    - file audio atau video yang dapat diakses dan tool transkripsi seperti Whisper atau Faster-Whisper bila tersedia
---

# Audio Transcriber

Skill ini memandu proses transkripsi audio atau video menjadi dokumentasi Markdown yang rapi, termasuk metadata file, ringkasan, notulen, dan opsi subtitle. Fokusnya adalah alur kerja yang dapat diulang, minim asumsi, dan tidak bergantung pada path atau konfigurasi yang di-hardcode.

## Kapan digunakan

Gunakan skill ini saat:
- pengguna ingin mentranskripsi audio atau video ke teks
- perlu membuat notulen rapat dari rekaman
- perlu ringkasan eksekutif dari percakapan panjang
- perlu subtitle atau caption seperti SRT atau VTT
- perlu identifikasi pembicara bila tool pendukung tersedia
- bekerja dengan format umum seperti MP3, WAV, M4A, OGG, FLAC, WEBM, atau MP4 audio/video

## Tujuan utama

- memvalidasi file dan metadata sebelum transkripsi
- memilih engine transkripsi yang tersedia secara lokal atau sesuai lingkungan
- menghasilkan output yang terstruktur dan mudah dipakai ulang
- menjaga proses tetap aman, eksplisit, dan dapat diverifikasi

## Prinsip inti

- validasi file lebih dulu sebelum memulai proses berat
- prioritaskan engine lokal yang tersedia daripada asumsi instalasi tertentu
- pisahkan metadata, transkrip mentah, ringkasan, dan action items
- jangan mengklaim akurasi speaker diarization bila tool pendukung tidak tersedia
- dokumentasikan keterbatasan bahasa, kualitas audio, dan noise secara jujur

## Alur kerja inti

### 1. Deteksi kemampuan transkripsi yang tersedia

Sebelum memproses file, identifikasi:
- apakah engine seperti Faster-Whisper atau Whisper tersedia
- apakah `ffmpeg` atau tool konversi audio tersedia
- apakah lingkungan mendukung pemrosesan lokal atau perlu fallback lain

Jika tidak ada engine yang tersedia, laporkan kebutuhan instalasi secara eksplisit. Jangan berpura-pura transkripsi bisa dilakukan tanpa tool nyata.

### 2. Validasi file input

Periksa:
- file benar-benar ada atau URL dapat diunduh
- format file didukung
- ukuran file dan durasi masuk akal untuk diproses
- kualitas audio cukup untuk transkripsi yang berguna

Jika format tidak didukung tetapi tool konversi tersedia, konversi ke format yang lebih aman seperti WAV mono 16 kHz bila memang diperlukan.

### 3. Ekstrak metadata penting

Minimal kumpulkan:
- nama file
- ukuran file
- durasi
- codec atau format audio utama
- tanggal pemrosesan
- bahasa yang terdeteksi atau diasumsikan
- engine dan model yang dipakai

Metadata ini penting agar hasil transkripsi dapat diaudit dan dibandingkan ulang.

### 4. Jalankan transkripsi dengan ekspektasi yang realistis

Saat mentranskripsi:
- pilih model sesuai kompromi akurasi dan kecepatan
- catat bila audio bising, banyak overlap speaker, atau kualitas rendah
- pisahkan hasil mentah dari hasil yang sudah diringkas
- bila diarization tidak tersedia, jangan menebak identitas pembicara secara berlebihan

### 5. Susun output dokumentasi yang berguna

Output ideal mencakup:
- metadata file
- ringkasan singkat
- transkrip penuh atau potongan penting
- topik utama yang dibahas
- keputusan atau action items
- daftar peserta bila dapat diidentifikasi dengan cukup yakin

Untuk kebutuhan subtitle, hasilkan format yang sesuai dan pastikan timestamp konsisten.

### 6. Laporkan keterbatasan secara eksplisit

Selalu nyatakan bila ada keterbatasan seperti:
- bahasa campuran
- speaker overlap
- noise tinggi
- bagian audio tidak jelas
- diarization tidak tersedia
- hasil ringkasan berasal dari interpretasi model, bukan fakta yang terjamin sempurna

## Checklist implementasi

1. Pastikan file input tersedia dan dapat dibaca.
2. Deteksi engine transkripsi dan tool konversi yang tersedia.
3. Validasi format, ukuran, dan durasi file.
4. Ekstrak metadata penting sebelum transkripsi.
5. Hasilkan transkrip dan dokumentasi turunan yang terstruktur.
6. Cantumkan keterbatasan kualitas hasil secara jujur.

## Anti-pattern penting

- memulai transkripsi tanpa memeriksa file dan tool yang tersedia
- mengklaim identitas speaker tanpa dukungan diarization yang memadai
- mencampur transkrip mentah dengan ringkasan tanpa penanda jelas
- menyembunyikan keterbatasan kualitas audio
- bergantung pada path, API key, atau konfigurasi yang di-hardcode dalam skill

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/audio-transcriber` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
