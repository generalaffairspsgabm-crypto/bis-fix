---
name: angular-best-practices
description: >-
  Gunakan saat menulis, mereview, atau merefactor aplikasi Angular agar performa,
  ukuran bundle, pola state, rendering, dan SSR/hydration tetap efisien serta
  maintainable.
license: CC-BY-4.0
metadata:
  category: frontend
  source:
    repository: 'https://github.com/sickn33/antigravity-awesome-skills'
    path: skills/angular-best-practices
    license_path: LICENSE-CONTENT
  original_metadata:
    risk: safe
    source: self
    date_added: '2026-02-27'
---

# Angular Best Practices

Skill ini merangkum praktik prioritas tinggi untuk membangun aplikasi Angular yang **cepat**, **hemat bundle**, dan **mudah dipelihara**.

Gunakan saat:
- menulis komponen atau halaman Angular baru
- mereview performa aplikasi Angular
- merefactor pola data fetching, state, atau rendering
- mengoptimalkan SSR, hydration, dan bundle size
- menertibkan praktik tim pada proyek Angular modern

## Prioritas utama

Saat skill ini aktif, evaluasi fokus pada area berikut:
1. change detection
2. async operations dan waterfall
3. bundle optimization
4. rendering performance
5. SSR dan hydration
6. template simplification
7. state management
8. memory management

## 1. Change detection

Utamakan pola yang meminimalkan re-render tidak perlu:
- gunakan `OnPush` untuk komponen yang layak
- prioritaskan `signal()` dan `computed()` untuk state turunan
- hindari mutable property yang memicu update tidak presisi
- pertimbangkan zoneless change detection untuk proyek baru bila ekosistem mendukung

Heuristik praktis:
- jika komponen mostly menerima input dan menampilkan output, `OnPush` hampir selalu kandidat baik
- jika derived data dihitung berulang, pindahkan ke `computed()`
- jangan letakkan logika mahal langsung di template

## 2. Async operations dan waterfall

Hindari alur fetch berantai yang sebenarnya bisa diparalelkan.

Prinsip:
- jalankan request independen secara paralel
- gunakan operator RxJS yang sesuai seperti `switchMap`, `forkJoin`, atau komposisi stream yang jelas
- hindari nested subscription
- untuk SSR, jangan menunggu client bootstrap untuk data yang kritis bila bisa diprefetch di server atau resolver

Waterfall yang tidak perlu sering menjadi penyebab utama UI terasa lambat meski backend cukup cepat.

## 3. Bundle optimization

Kurangi beban initial load:
- lazy load route dan feature besar
- gunakan dynamic import untuk library berat
- tunda komponen mahal dengan `@defer` saat relevan
- hindari barrel import yang merusak tree shaking bila terbukti memperbesar bundle
- evaluasi dependency yang besar atau berlebihan

Tujuannya bukan sekadar mengecilkan angka bundle, tetapi mempercepat jalur render awal yang penting.

## 4. Rendering performance

Optimalkan daftar dan komponen yang sering berubah:
- gunakan `track` atau strategi `trackBy` yang stabil
- pakai virtual scrolling untuk list besar
- hindari method call mahal di template
- gunakan pure pipe atau `computed()` untuk data turunan yang sering dipakai
- defer atau pecah komponen yang berat secara rendering

Jika sebuah list sering berubah tetapi semua item ikut rerender, curigai identitas item atau struktur template.

## 5. SSR dan hydration

Untuk aplikasi Angular yang memakai SSR:
- prioritaskan konten kritis di atas fold
- gunakan hydration secara sadar, termasuk incremental hydration bila cocok
- hindari mismatch antara server output dan client state
- manfaatkan `TransferState` atau mekanisme sejenis agar data tidak di-fetch ulang tanpa alasan
- tunda widget non-kritis sampai ada sinyal interaksi atau viewport

SSR yang buruk justru bisa menambah kompleksitas tanpa menaikkan perceived performance.

## 6. Template simplification

Template Angular harus tetap deklaratif dan mudah dibaca:
- manfaatkan control flow syntax modern bila stack mendukung
- hindari expression kompleks, sorting, filtering, atau transformasi berat langsung di template
- pindahkan logika presentasi ke component class, signal, selector, atau pipe yang tepat

Template idealnya menjelaskan apa yang dirender, bukan menjadi tempat logika bisnis berat.

## 7. State management

Kelola state sedekat mungkin dengan domain penggunaannya:
- gunakan feature-scoped state bila state tidak perlu global
- expose selector atau signal yang sempit agar perubahan tidak memicu rerender luas
- jangan menaruh seluruh state aplikasi ke satu store global tanpa alasan kuat
- bedakan state server, UI state lokal, dan derived state

State yang terlalu sentralistik sering membuat aplikasi sulit diskalakan dan sulit dioptimalkan.

## 8. Memory management

Kurangi kebocoran resource dan subscription:
- gunakan mekanisme seperti `takeUntilDestroyed` saat relevan
- prefer pola berbasis signal atau async pipe dibanding subscription manual bila memungkinkan
- pastikan listener, timer, atau side effect dibersihkan dengan benar

Masalah memory sering tidak terlihat pada awal pengembangan tetapi muncul pada halaman kompleks atau sesi lama.

## Checklist review cepat

Sebelum menganggap implementasi Angular sehat, cek:
- apakah komponen penting menggunakan change detection yang tepat?
- apakah ada nested subscription atau request waterfall yang bisa dihilangkan?
- apakah route besar dan dependency berat sudah di-lazy-load?
- apakah list besar menggunakan identitas item yang stabil?
- apakah template berisi logika mahal yang seharusnya dipindah?
- apakah SSR/hydration menghindari fetch ulang dan mismatch?
- apakah cleanup subscription dan side effect aman?

## Anti-pattern

Hindari:
- default change detection di seluruh aplikasi tanpa alasan
- method berat dipanggil terus-menerus dari template
- global store yang menampung semua hal
- eager loading untuk seluruh fitur besar
- komponen SSR yang masih menunggu fetch penting hanya di client
- subscription manual berlapis tanpa cleanup yang jelas

## Catatan Kompatibilitas KiloCode

Skill sumber sangat panjang dan berisi banyak contoh kode detail. Pada konversi KiloCode ini, materi dipadatkan ke panduan review dan implementasi yang lebih praktis, dengan fokus pada keputusan performa Angular modern tanpa membawa seluruh contoh mentah upstream.