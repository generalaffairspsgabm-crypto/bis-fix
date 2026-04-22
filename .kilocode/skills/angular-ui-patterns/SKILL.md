---
name: angular-ui-patterns
description: Gunakan saat membangun UI Angular modern untuk loading state, error handling, async rendering, dan data display agar antarmuka terasa responsif, jelas, dan tahan terhadap kegagalan.
license: Complete terms in LICENSE.txt
metadata:
  category: frontend
  source:
    upstream: .tmp-antigravity-skills/skills/angular-ui-patterns
    type: community
  depends_on:
    - proyek Angular modern
    - pemahaman template control flow Angular seperti `@if`, `@for`, dan `@defer`
    - komponen UI untuk spinner, skeleton, empty state, dan error state
---

# Angular UI Patterns

Skill ini merangkum pola UI Angular modern untuk menangani loading, error, empty state, async action, dan progressive rendering secara konsisten.

## Kapan digunakan

Gunakan skill ini saat perlu:
- membangun komponen Angular yang memuat data async
- merancang loading state dan skeleton
- menampilkan error secara jelas ke user
- mengelola empty state dan partial data
- memakai `@if`, `@for`, dan `@defer` secara efektif

## Prinsip inti

- jangan tampilkan UI usang seolah-olah masih valid
- selalu tampilkan error yang relevan ke user
- loading indicator hanya muncul saat memang dibutuhkan
- partial data lebih baik daripada layar kosong bila masih aman dipakai
- non-critical content bisa ditunda dengan progressive disclosure

## Pola loading state

### Aturan emas

Tampilkan loading indicator **hanya ketika belum ada data yang bisa ditampilkan**.

Urutan keputusan yang direkomendasikan:
1. jika ada error → tampilkan error state
2. jika sedang loading dan belum ada data → tampilkan skeleton atau spinner
3. jika tidak ada data dan tidak loading → tampilkan empty state
4. jika ada data → tampilkan data

### Skeleton vs spinner

Gunakan **skeleton** saat:
- bentuk konten sudah diketahui
- daftar, kartu, atau layout halaman sedang dimuat
- ingin menjaga stabilitas layout

Gunakan **spinner** saat:
- bentuk hasil belum jelas
- aksi kecil sedang berlangsung, misalnya submit tombol
- operasi inline atau modal sedang diproses

## Control flow template

### `@if` dan `@else`

Gunakan untuk memisahkan state utama:
- success
- loading
- error
- unauthenticated
- empty

Praktik baik:
- buat cabang state eksplisit
- hindari nested condition yang terlalu dalam
- ekstrak komponen state bila template mulai sulit dibaca

### `@for` dengan `track`

Selalu gunakan `track` untuk list yang punya identifier stabil.

Manfaat:
- rendering lebih efisien
- DOM churn lebih rendah
- interaksi list lebih stabil

### `@defer`

Gunakan untuk konten non-kritis seperti:
- komentar
- panel analitik sekunder
- rekomendasi tambahan
- widget berat di bawah fold

Pastikan setiap `@defer` punya:
- placeholder
- loading state bila perlu
- error state bila fetch bisa gagal

## Error handling

### Hierarki error

Gunakan level error sesuai dampaknya:
- inline error → validasi field atau error kecil
- toast → error recoverable setelah aksi user
- banner → error tingkat halaman namun sebagian konten masih bisa dipakai
- full error state → kegagalan besar yang menghalangi tugas utama

### Aturan penting

- jangan pernah menelan error secara diam-diam
- log error untuk diagnosis
- tampilkan pesan yang bisa dipahami user
- sediakan retry bila aksi aman untuk diulang

## Empty state

Empty state yang baik harus menjawab:
- apa yang sedang kosong
- kenapa bisa kosong bila relevan
- apa tindakan berikutnya yang bisa dilakukan user

Komponen empty state idealnya punya:
- judul singkat
- deskripsi ringkas
- ikon atau ilustrasi ringan
- CTA yang relevan

## Button dan async action state

Untuk tombol aksi async:
- disable tombol saat request berjalan
- tampilkan indikator loading kecil
- ubah label tombol bila perlu
- cegah double submit

Contoh kasus:
- save profile
- create item
- submit payment
- resend invitation

## Optimistic UI

Gunakan optimistic update bila:
- aksi user sederhana dan sering
- rollback mudah dilakukan
- manfaat respons instan lebih besar daripada risiko inkonsistensi singkat

Namun tetap:
- simpan mekanisme rollback
- tampilkan error bila sinkronisasi gagal
- jangan gunakan optimistic update untuk aksi berisiko tinggi tanpa guardrail

## Anti-pattern penting

- menampilkan spinner padahal data lama masih bisa dipakai
- menyembunyikan error dari user
- tidak membedakan empty state dan loading state
- membiarkan tombol aktif selama request async
- memakai `@defer` tanpa placeholder atau fallback
- list besar tanpa `track`

## Checklist implementasi

1. Petakan state utama: loading, success, empty, error.
2. Tentukan kapan memakai skeleton dan kapan spinner.
3. Pastikan error selalu terlihat dan dapat ditindaklanjuti.
4. Tambahkan empty state yang informatif.
5. Disable trigger selama operasi async.
6. Gunakan `track` pada list.
7. Gunakan `@defer` hanya untuk konten non-kritis.
8. Uji transisi antar state agar tidak membingungkan user.

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/angular-ui-patterns` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
