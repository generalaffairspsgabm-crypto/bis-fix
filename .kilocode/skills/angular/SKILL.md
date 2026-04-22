---
name: angular
description: Gunakan saat membangun atau memodernisasi aplikasi Angular modern dengan Signals, Standalone Components, Zoneless, SSR/Hydration, dan pola reaktif terbaru.
license: Complete terms in LICENSE.txt
metadata:
  category: frontend
  source:
    upstream: .tmp-antigravity-skills/skills/angular
    type: community
  depends_on:
    - proyek Angular modern atau kebutuhan migrasi ke pola Angular terbaru
---

# Angular

Skill ini memandu pengembangan Angular modern dengan fokus pada pola yang relevan untuk Angular generasi terbaru: Signals, Standalone Components, aplikasi tanpa ketergantungan berat pada zone.js, SSR/Hydration, dan optimasi performa.

## Kapan digunakan

Gunakan skill ini saat:
- membangun aplikasi Angular baru
- memigrasikan komponen berbasis `NgModule` ke Standalone Components
- menerapkan state lokal berbasis Signals
- mengaktifkan SSR, prerendering, atau hydration
- mengurangi overhead change detection dan mengevaluasi pendekatan zoneless
- merapikan arsitektur Angular agar lebih modern dan mudah dipelihara

## Jangan gunakan skill ini saat

- migrasi dari AngularJS 1.x; gunakan skill yang khusus migrasi AngularJS bila tersedia
- aplikasi legacy terkunci pada versi Angular lama dan tidak realistis dimodernisasi sekarang
- masalah utamanya bukan Angular, melainkan TypeScript umum atau desain frontend lintas framework

## Tujuan utama

- memilih pola Angular modern yang sesuai konteks proyek
- menghindari migrasi besar-besaran tanpa strategi bertahap
- menjaga kompatibilitas selama transisi dari pola lama ke pola baru
- memastikan implementasi tetap teruji, typed, dan efisien

## Alur kerja inti

### 1. Audit versi dan struktur proyek

Sebelum mengubah kode, identifikasi:
- versi Angular yang dipakai
- apakah proyek masih bergantung pada `NgModule`
- apakah `zone.js` masih menjadi fondasi utama change detection
- apakah aplikasi memakai SSR, prerendering, atau hanya SPA
- pola state yang dipakai: local state, RxJS, store global, atau campuran

Fokuskan keputusan pada kompatibilitas nyata proyek, bukan sekadar mengikuti tren.

### 2. Gunakan Signals untuk state lokal dan turunan sederhana

Signals cocok untuk:
- state lokal komponen
- nilai turunan atau computed state
- efek samping UI yang sederhana dan terkontrol

Gunakan RxJS tetap untuk:
- HTTP stream
- event stream kompleks
- orkestrasi async yang kaya operator
- integrasi library yang memang berbasis Observable

Prinsip praktis:
- pilih Signals untuk state sinkron dan dekat dengan UI
- pilih RxJS untuk alur async dan stream yang kompleks
- jangan memaksa semua hal menjadi Signals bila Observable lebih natural

### 3. Prioritaskan Standalone Components

Untuk kode baru:
- gunakan komponen standalone sebagai default
- impor dependency langsung di komponen atau route yang membutuhkan
- gunakan lazy loading berbasis route atau `loadComponent()` bila sesuai

Untuk migrasi:
- lakukan bertahap per fitur atau area
- hindari refactor besar sekaligus tanpa kebutuhan bisnis yang jelas
- pertahankan boundary yang stabil selama transisi

### 4. Evaluasi pendekatan zoneless secara hati-hati

Aplikasi zoneless berguna saat ingin:
- mengurangi overhead change detection
- membuat alur reaktivitas lebih eksplisit
- memanfaatkan Signals secara lebih konsisten

Namun sebelum menerapkan:
- audit library pihak ketiga yang mungkin masih mengandalkan perilaku berbasis zone
- verifikasi event UI, async update, dan integrasi eksternal tetap berjalan benar
- lakukan rollout bertahap, bukan perubahan menyeluruh tanpa pengujian

### 5. Terapkan SSR, prerendering, dan hydration sesuai kebutuhan

Gunakan:
- prerendering untuk halaman statis atau semi-statis
- SSR untuk halaman yang butuh render awal cepat, SEO, atau personalisasi ringan
- hydration hanya pada area yang memang perlu interaktivitas penuh

Periksa secara eksplisit:
- akses API browser seperti `window`, `document`, atau `localStorage`
- perbedaan perilaku server dan client
- kebutuhan fallback loading dan error state

### 6. Optimalkan performa secara terukur

Prioritas optimasi:
- lazy loading route dan fitur
- minimalkan dependency berat di jalur render awal
- gunakan computed state daripada kalkulasi berulang di template
- hindari subscription yang tidak perlu atau tidak dibersihkan
- audit ukuran bundle dan biaya hydration

Jangan mengklaim performa membaik tanpa bukti build, profiling, atau pengukuran nyata.

## Checklist implementasi

1. Pastikan versi Angular dan batas kompatibilitas proyek dipahami.
2. Tentukan area yang cocok memakai Signals dan area yang tetap memakai RxJS.
3. Gunakan Standalone Components untuk kode baru.
4. Rencanakan migrasi bertahap bila proyek masih berbasis `NgModule`.
5. Validasi SSR/hydration terhadap akses API browser.
6. Jalankan build, test, dan verifikasi perilaku UI setelah perubahan.

## Anti-pattern penting

- memigrasikan seluruh aplikasi sekaligus tanpa strategi rollback
- mengganti semua Observable menjadi Signals tanpa alasan teknis
- mengaktifkan zoneless tanpa audit dependency
- memakai SSR pada area yang tidak memberi manfaat nyata
- menganggap Angular modern otomatis lebih cepat tanpa pengukuran

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/angular` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
