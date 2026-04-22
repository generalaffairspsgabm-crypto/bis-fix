---
name: clean-code
description: >-
  Gunakan saat menulis, merefactor, atau mereview kode agar hasilnya tidak hanya
  berjalan, tetapi juga mudah dibaca, diuji, dan dipelihara.
license: CC-BY-4.0
metadata:
  category: quality
  source:
    repository: 'https://github.com/sickn33/antigravity-awesome-skills'
    path: skills/clean-code
    license_path: LICENSE-CONTENT
  original_metadata:
    risk: safe
    source: 'ClawForge (https://github.com/jackjin1997/ClawForge)'
    date_added: '2026-02-27'
---

# Clean Code

Skill ini membawa prinsip-prinsip clean code untuk membantu mengubah **kode yang sekadar bekerja** menjadi **kode yang mudah dibaca dan dikembangkan oleh orang lain**.

Gunakan saat:
- menulis kode baru
- mereview pull request
- merefactor kode legacy
- merapikan standar kualitas tim

## Filosofi inti

Tujuan clean code bukan membuat kode terlihat pintar, tetapi membuatnya:
- mudah dipahami
- aman diubah
- minim kejutan
- sederhana untuk diuji
- jelas niatnya

Prinsip utama: optimalkan keterbacaan dan maintainability tanpa menambah kompleksitas yang tidak perlu.

## 1. Penamaan yang bermakna

Gunakan nama yang menjelaskan niat.

Pedoman:
- pilih nama yang mengungkap tujuan, bukan sekadar tipe data
- hindari nama yang menyesatkan
- buat perbedaan nama yang benar-benar bermakna
- gunakan nama yang mudah diucapkan dan dicari
- nama class sebaiknya berupa noun
- nama method atau function sebaiknya berupa verb

Contoh arah berpikir:
- lebih baik `elapsedTimeInDays` daripada `d`
- lebih baik `isPasswordValid()` daripada `check()`

## 2. Function harus kecil dan fokus

Setiap function idealnya:
- pendek
- melakukan satu hal
- berada pada satu level abstraksi
- tidak menyembunyikan side effect
- tidak menerima terlalu banyak argumen

Heuristik:
- 0 argumen ideal
- 1–2 argumen masih wajar
- 3+ argumen perlu justifikasi kuat

Jika sebuah function terasa sulit diberi nama yang spesifik, sering kali ia melakukan terlalu banyak hal.

## 3. Komentar bukan penutup kode buruk

Utamakan membuat kode yang menjelaskan dirinya sendiri.

Gunakan komentar hanya saat benar-benar membantu, misalnya untuk:
- informasi legal
- penjelasan intent yang tidak bisa diekspresikan wajar di kode
- klarifikasi perilaku library eksternal
- TODO yang sah dan spesifik

Hindari komentar yang:
- redundan
- menyesatkan
- berisik
- menjelaskan hal yang seharusnya bisa diperjelas lewat penamaan atau ekstraksi function

Jika komentar dibutuhkan untuk menerangkan kode yang membingungkan, pertimbangkan apakah kodenya perlu ditulis ulang.

## 4. Formatting harus membantu membaca

Struktur file dan fungsi harus terasa seperti narasi top-down.

Pedoman:
- letakkan konsep tingkat tinggi lebih dulu, detail lebih bawah
- dekatkan hal-hal yang saling berkaitan
- deklarasikan variabel sedekat mungkin dengan penggunaannya
- gunakan indentation dan spasi untuk memperjelas struktur

Formatting yang baik mengurangi beban kognitif saat menelusuri alur program.

## 5. Object dan data structure

Prinsip penting:
- sembunyikan detail implementasi di balik abstraksi yang jelas
- hindari chaining yang memperlihatkan terlalu banyak struktur internal
- gunakan DTO atau struktur data polos hanya saat memang tepat

Perhatikan Law of Demeter: modul sebaiknya tidak terlalu tahu isi objek lain.

## 6. Error handling yang bersih

Penanganan error harus menjaga alur utama tetap jelas.

Pedoman:
- lebih baik exception daripada return code yang berantakan, jika sesuai bahasa dan framework
- rancang boundary error handling dengan sadar
- hindari `null` bila ada alternatif yang lebih aman
- jangan mengoper nilai yang berpotensi invalid tanpa kontrak yang jelas

Tujuannya adalah membuat jalur sukses mudah dibaca tanpa mengorbankan robustness.

## 7. Unit test adalah bagian kualitas desain

Kualitas kode tidak lepas dari kualitas test.

Gunakan prinsip:
- tulis test sebelum production code bila mengikuti TDD
- buat test yang cepat, independen, repeatable, self-validating, dan timely
- gunakan test untuk melindungi refactor, bukan hanya memeriksa happy path

Jika kode sulit diuji, itu sering menjadi sinyal desain yang kurang bersih.

## 8. Class harus kecil dan bertanggung jawab tunggal

Setiap class sebaiknya:
- punya satu alasan utama untuk berubah
- tidak menumpuk terlalu banyak perilaku
- terbaca sebagai narasi bertingkat dari atas ke bawah

Class besar yang memegang terlalu banyak tanggung jawab biasanya memicu coupling, sulit diuji, dan sulit direfactor.

## 9. Smell yang perlu diwaspadai

Waspadai tanda-tanda berikut:
- **rigidity**: sulit diubah
- **fragility**: perubahan kecil merusak area lain
- **immobility**: sulit dipakai ulang
- **viscosity**: lebih mudah melakukan cara yang salah daripada cara yang benar
- kompleksitas yang tidak perlu
- repetisi yang tidak perlu

Saat smell muncul, jangan langsung melakukan refactor besar. Prioritaskan perbaikan kecil yang paling meningkatkan kejelasan.

## Checklist implementasi

Saat menulis atau mereview kode, cek:
- apakah function ini cukup kecil?
- apakah function ini melakukan tepat satu hal?
- apakah semua nama intention-revealing?
- apakah komentar bisa dihilangkan dengan memperjelas kode?
- apakah jumlah argumen masih masuk akal?
- apakah ada test gagal lebih dulu atau minimal verifikasi yang cukup untuk mendukung perubahan?

## Cara memakai skill ini di KiloCode

Saat skill ini aktif:
- gunakan prinsip clean code sebagai lensa evaluasi
- usulkan perbaikan yang bertahap, bukan rewrite total tanpa alasan
- hormati konteks codebase yang ada
- seimbangkan kebersihan kode dengan YAGNI dan risiko perubahan

Clean code bukan alasan untuk memperbesar scope atau melakukan abstraksi berlebihan.

## Catatan Kompatibilitas KiloCode

Skill sumber berasal dari kontribusi eksternal dan sangat berfokus pada prinsip umum. Pada versi KiloCode ini, kontennya dinormalisasi ke bahasa Indonesia, dipadatkan menjadi panduan praktis, dan diselaraskan dengan workflow refactor/review agar usable sebagai skill proyek mandiri.
