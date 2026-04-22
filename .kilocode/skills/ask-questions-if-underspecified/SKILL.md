---
name: ask-questions-if-underspecified
description: >-
  Gunakan saat permintaan memiliki beberapa interpretasi masuk akal atau detail
  penting seperti objective, scope, acceptance criteria, constraint, environment,
  atau risiko belum cukup jelas sehingga implementasi berisiko salah arah.
license: CC-BY-4.0
metadata:
  category: planning
  source:
    repository: 'https://github.com/sickn33/antigravity-awesome-skills'
    path: skills/ask-questions-if-underspecified
    license_path: LICENSE-CONTENT
  original_metadata:
    risk: unknown
    source: community
---

# Ask Questions If Underspecified

Skill ini membantu menghentikan eksekusi prematur ketika requirement belum cukup jelas. Fokus utamanya adalah menanyakan pertanyaan klarifikasi minimum yang benar-benar diperlukan agar pekerjaan tidak salah arah, sambil tetap memanfaatkan discovery ringan bila jawabannya bisa diperoleh langsung dari repo.

## Kapan digunakan

Gunakan saat:
- ada beberapa interpretasi masuk akal terhadap hasil yang diminta
- definisi selesai, acceptance criteria, atau edge case belum jelas
- batas scope file, modul, user flow, atau area sistem belum tegas
- constraint kompatibilitas, dependency, performa, atau rollout belum diketahui
- risiko perubahan cukup tinggi jika asumsi dibuat terlalu cepat

## Jangan gunakan saat

Jangan gunakan saat:
- permintaan sudah jelas dan bounded
- jawaban bisa diperoleh lewat pembacaan repo atau konfigurasi yang cepat dan aman
- tugas sangat kecil, reversible, dan hampir tanpa risiko salah arah

## Prinsip utama

- tanyakan sesedikit mungkin, tetapi cukup untuk mencegah kerja yang salah
- dahulukan pertanyaan yang menghapus seluruh cabang keputusan
- bedakan pertanyaan wajib dari hal yang sekadar bagus untuk diketahui
- jangan mulai implementasi sampai ambiguity kritis ditutup atau asumsi disetujui eksplisit
- jika repo bisa menjawab, baca repo dulu daripada melempar pertanyaan yang tidak perlu

## Alur kerja

### 1. Nilai apakah permintaan memang underspecified

Anggap permintaan underspecified jika setelah discovery ringan masih belum jelas hal-hal berikut:
- objective: apa yang harus berubah dan apa yang harus tetap sama
- definisi selesai: acceptance criteria, contoh perilaku, dan edge case penting
- scope: file, komponen, sistem, atau pengguna yang termasuk dan tidak termasuk
- constraint: versi, dependency, style, performa, deadline, atau aturan proyek
- environment: runtime, OS, tooling, build system, dan test runner yang relevan
- safety dan reversibility: migrasi data, rollout, rollback, dan blast radius

Jika ada lebih dari satu interpretasi kuat, perlakukan sebagai ambiguity yang perlu diklarifikasi.

### 2. Lakukan discovery ringan yang aman bila memungkinkan

Sebelum bertanya, lakukan pembacaan rendah risiko yang tidak mengunci arah implementasi, misalnya:
- melihat struktur repo
- membaca file konfigurasi inti
- membaca pola implementasi yang sudah ada
- membaca dokumentasi atau test yang menjelaskan perilaku saat ini

Hindari discovery yang sudah termasuk tindakan implementasi, modifikasi, atau validasi yang bergantung pada asumsi besar.

### 3. Ajukan pertanyaan wajib terlebih dahulu

Buat 1–5 pertanyaan pada putaran pertama. Prioritaskan pertanyaan yang:
- menentukan solusi teknis secara signifikan
- menetapkan batas scope
- menjelaskan target kompatibilitas atau batasan kritis
- mendefinisikan output akhir yang dianggap selesai

Tulis pertanyaan secara ringkas dan mudah dipindai:
- gunakan nomor
- gunakan opsi pilihan bila cocok
- beri default yang wajar bila ada
- sediakan jalur jawaban cepat seperti `defaults` atau format `1a 2b 3a`
- sediakan opsi “tidak yakin, pakai default” jika membantu

### 4. Berhenti sebelum bertindak

Sampai jawaban wajib diterima:
- jangan mengedit file
- jangan menjalankan implementasi
- jangan membuat rencana detail yang sangat bergantung pada asumsi belum valid

Jika user ingin tetap lanjut tanpa menjawab:
- tulis asumsi sebagai daftar bernomor
- tandai bahwa asumsi tersebut memengaruhi hasil
- tunggu konfirmasi eksplisit sebelum implementasi

### 5. Konfirmasi interpretasi dan baru lanjutkan

Setelah jawaban diterima:
- rangkum requirement akhir dalam 1–3 kalimat
- sebutkan constraint penting
- sebutkan seperti apa kondisi “selesai”
- lanjutkan hanya setelah interpretasi tersebut konsisten

## Template pertanyaan

Gunakan pola seperti berikut:
- “Sebelum mulai, perlu konfirmasi 3 hal: (1) ..., (2) ..., (3) .... Jika tidak ada preferensi untuk (2), akan diasumsikan ....”
- “Pilih salah satu: A) ... B) ... C) ...”
- “Kondisi apa yang dianggap selesai? Contohnya: ...”
- “Apakah ada constraint wajib seperti versi, dependency, performa, atau style? Jika tidak, akan mengikuti default proyek.”

Contoh format jawaban cepat:

```text
1) Scope perubahan?
a) Perubahan minimal pada area yang ada
b) Sekalian refactor area terkait
c) Tidak yakin, pakai default a

2) Target kompatibilitas?
a) Ikuti default proyek
b) Tambah dukungan versi lama
c) Tidak yakin, pakai default a

Balas dengan: defaults
atau: 1a 2a
```

## Anti-pattern

Hindari:
- menanyakan hal yang bisa dijawab dari repo dalam beberapa pembacaan ringan
- mengajukan pertanyaan terbuka panjang jika opsi terstruktur bisa mempercepat
- langsung implementasi hanya karena “mungkin benar”
- membuat rencana rinci sebelum uncertainty kritis dibereskan
- mengumpulkan terlalu banyak pertanyaan kecil yang tidak memengaruhi arah kerja

## Catatan kompatibilitas KiloCode

Versi upstream berbicara umum tentang kapan harus bertanya. Pada adaptasi KiloCode ini, workflow dinormalisasi agar cocok dengan prinsip tool-first: discovery repo ringan didahulukan, lalu hanya ambiguity kritis yang ditanyakan secara eksplisit.