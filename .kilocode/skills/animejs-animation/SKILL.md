---
name: animejs-animation
description: Gunakan saat membuat animasi web kompleks dengan Anime.js, termasuk timeline bertahap, staggered motion, animasi SVG, dan optimasi performa untuk UI yang terasa premium.
license: Complete terms in LICENSE.txt
metadata:
  category: frontend-development
  source:
    upstream: .tmp-antigravity-skills/skills/animejs-animation
    type: community
  depends_on:
    - proyek web dengan JavaScript atau TypeScript
    - Anime.js dan pemahaman dasar DOM atau SVG
---

# Anime.js Animation

Skill ini memandu penggunaan Anime.js untuk membangun animasi web yang kompleks, halus, dan terasa premium. Fokusnya adalah orkestrasi timeline, staggered motion, easing yang kaya, serta disiplin performa agar animasi tetap responsif.

## Kapan digunakan

Gunakan skill ini saat perlu:
- membuat animasi landing page multi-tahap
- menampilkan grid, teks, atau kartu dengan staggered reveal
- menganimasikan SVG seperti path drawing atau morphing sederhana
- membangun elemen UI kinetik yang merespons input pengguna dengan halus
- mengganti transisi CSS biasa dengan koreografi motion yang lebih kaya

## Tujuan utama

- menghasilkan motion yang terasa disengaja, bukan generik
- mengorkestrasi beberapa elemen dengan ritme yang konsisten
- memakai easing yang lebih natural daripada `linear` atau `ease-in-out` standar
- menjaga animasi tetap efisien di main thread

## Prinsip inti

- gunakan `anime.timeline()` untuk koreografi multi-langkah
- prioritaskan properti yang murah dirender seperti `transform` dan `opacity`
- gunakan `anime.stagger()` untuk ritme organik pada banyak elemen
- pilih easing yang terasa hidup seperti `spring`, `elastic`, atau `cubicBezier` kustom
- overlap antar animasi dengan offset relatif agar transisi terasa menyatu

## Alur kerja inti

1. identifikasi target DOM atau SVG yang akan dianimasikan
2. tentukan properti, durasi, dan easing untuk tiap tahap
3. susun timeline utama dan offset antar langkah
4. uji ritme visual, keterbacaan, dan performa
5. tambahkan optimasi seperti `will-change` bila memang membantu

## Contoh implementasi timeline

```javascript
const tl = anime.timeline({
  easing: 'spring(1, 80, 10, 0)',
  duration: 1000,
});

tl.add({
  targets: '.hero-text',
  translateY: [50, 0],
  opacity: [0, 1],
  delay: anime.stagger(100),
}).add(
  {
    targets: '.hero-image',
    scale: [0.9, 1],
    opacity: [0, 1],
  },
  '-=800',
);
```

## Pola yang direkomendasikan

### Reveal bertahap untuk banyak elemen

Gunakan `anime.stagger()` saat menampilkan daftar, grid, atau huruf per huruf.

Contoh ide:
- kartu produk muncul berurutan dari bawah ke atas
- headline dipecah per kata lalu dimunculkan dengan delay kecil
- daftar statistik masuk dengan kombinasi opacity dan translate

### Timeline overlap

Gunakan offset relatif seperti `'-=200'` atau `'-=800'` agar satu animasi mulai sebelum animasi sebelumnya selesai total. Ini membuat motion terasa lebih sinematik dan tidak kaku.

### Animasi SVG

Anime.js cocok untuk:
- menggambar garis atau path secara progresif
- mengubah `strokeDashoffset`
- menggerakkan grup SVG dengan transform
- membuat ikon atau ilustrasi terasa hidup saat masuk ke viewport

## Aturan kualitas visual

- hindari transisi yang terasa template atau terlalu datar
- setiap animasi harus punya tujuan: mengarahkan perhatian, memberi hierarki, atau memperjelas interaksi
- jangan menambahkan motion hanya demi dekorasi bila mengganggu keterbacaan
- sesuaikan intensitas animasi dengan konteks produk; dashboard enterprise biasanya butuh motion lebih tenang daripada landing page promosi

## Aturan performa

### Lakukan

- animasikan `transform` dan `opacity` bila memungkinkan
- gunakan `will-change: transform, opacity` secara selektif pada elemen penting
- batasi jumlah elemen yang dianimasikan bersamaan bila perangkat target lemah
- uji di viewport dan device yang realistis

### Hindari

- animasi layout-heavy seperti `width`, `height`, `top`, atau `left` bila bisa diganti transform
- timeline terlalu panjang yang membuat halaman terasa lambat digunakan
- terlalu banyak easing berbeda dalam satu area UI tanpa alasan jelas
- animasi yang memblokir interaksi utama pengguna

## Checklist implementasi

1. Tentukan elemen target dan tujuan motion.
2. Pilih properti animasi yang murah dirender.
3. Gunakan easing yang sesuai karakter UI.
4. Susun timeline dengan overlap yang disengaja.
5. Tambahkan stagger untuk elemen berulang.
6. Audit performa dan kurangi beban bila perlu.
7. Pastikan hasil akhir terasa polished, bukan sekadar bergerak.

## Anti-pattern penting

- memakai `linear` untuk semua animasi penting
- membuat semua elemen bergerak dengan pola identik tanpa ritme
- menumpuk terlalu banyak efek sekaligus pada satu elemen
- mengabaikan performa demi efek visual sesaat
- membuat animasi yang lebih menarik perhatian daripada konten utama

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/animejs-animation` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
