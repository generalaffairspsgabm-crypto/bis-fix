---
name: android-ui-verification
description: Gunakan saat melakukan verifikasi UI Android atau React Native di emulator melalui ADB untuk inspeksi elemen, interaksi otomatis, screenshot, dan diagnosis perilaku antarmuka.
license: Complete terms in LICENSE.txt
metadata:
  category: testing
  source:
    upstream: .tmp-antigravity-skills/skills/android_ui_verification
    type: community
  depends_on:
    - Android Emulator berjalan
    - `adb` tersedia di PATH
    - aplikasi dapat dijalankan dalam mode debug atau testable build
---

# Android UI Verification

Skill ini memandu verifikasi UI end-to-end pada emulator Android menggunakan ADB. Cocok untuk pengujian visual, interaksi otomatis, dan diagnosis masalah layout atau flow aplikasi.

## Kapan digunakan

Gunakan skill ini saat perlu:
- memverifikasi perubahan UI pada aplikasi Android atau React Native
- menguji flow interaksi tanpa mengetuk manual di emulator
- mengambil screenshot bukti untuk PR atau acceptance
- mendiagnosis layout issue, tap target, atau state UI yang tidak sesuai

## Prasyarat

- emulator Android aktif dan dapat diakses lewat `adb devices`
- aplikasi sudah terpasang dan bisa dibuka
- `adb` tersedia di environment
- bila perlu analisis log, build debug tersedia

## Alur kerja inti

### 1. Kalibrasi perangkat

Sebelum tap berbasis koordinat, cek resolusi layar:

```bash
adb shell wm size
```

Tujuan:
- memastikan koordinat tap sesuai ukuran aktual
- menghindari salah klik akibat asumsi resolusi yang keliru

### 2. Inspeksi UI

Dump hierarki UI untuk menemukan elemen target:

```bash
adb shell uiautomator dump /sdcard/view.xml
adb pull /sdcard/view.xml ./artifacts/view.xml
```

Cari atribut seperti:
- `text`
- `content-desc`
- `resource-id`
- `bounds`

Gunakan `bounds` untuk menghitung titik tengah tap.

### 3. Interaksi otomatis

Perintah dasar yang umum:
- tap: `adb shell input tap <x> <y>`
- swipe: `adb shell input swipe <x1> <y1> <x2> <y2> <duration_ms>`
- input teks: `adb shell input text "pesan"`
- key event: `adb shell input keyevent <code>`

Contoh key event umum:
- `66` untuk Enter
- `4` untuk Back
- `3` untuk Home

### 4. Verifikasi hasil

#### Verifikasi visual

Ambil screenshot setelah interaksi:

```bash
adb shell screencap -p /sdcard/screen.png
adb pull /sdcard/screen.png ./artifacts/test_result.png
```

#### Verifikasi analitis

Periksa log aplikasi bila perlu:

```bash
adb logcat -d
```

Bila aplikasi React Native, filter log yang relevan untuk JS atau tag aplikasi.

## Praktik terbaik

- selalu beri jeda singkat setelah animasi atau navigasi
- gunakan titik tengah elemen untuk tap yang lebih stabil
- verifikasi state sebelum interaksi berikutnya
- simpan artefak seperti XML dump dan screenshot secara konsisten
- gunakan marker log yang mudah dicari bila sedang debug flow tertentu

## Strategi diagnosis

### Jika tap tidak bekerja

Periksa:
- koordinat salah
- elemen tertutup overlay
- layar berubah skala
- elemen belum muncul saat tap dilakukan

### Jika elemen tidak ditemukan di dump

Periksa:
- aplikasi belum selesai render
- elemen berada di luar viewport dan perlu scroll
- teks berbeda dari asumsi
- elemen custom tidak terekspos seperti yang diharapkan

### Jika hasil visual tidak sesuai

Bandingkan:
- screenshot sebelum dan sesudah aksi
- dump UI antar state
- log error atau warning yang muncul setelah interaksi

## Anti-pattern penting

- blind tapping tanpa inspeksi UI lebih dulu
- tidak mengecek resolusi layar sebelum memakai koordinat tetap
- tidak menunggu animasi atau transisi selesai
- menganggap input teks ADB selalu mendukung semua karakter spesial
- tidak menyimpan artefak verifikasi

## Checklist eksekusi

1. Pastikan emulator dan aplikasi aktif.
2. Cek resolusi layar dengan `adb shell wm size`.
3. Dump UI untuk menemukan elemen target.
4. Hitung koordinat interaksi dari `bounds`.
5. Jalankan tap, swipe, input, atau key event.
6. Ambil screenshot hasil.
7. Periksa log bila ada perilaku aneh.
8. Simpan artefak verifikasi untuk bukti.

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/android_ui_verification` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
