---
name: ai-studio-image
description: Gunakan saat menghasilkan gambar realistis bergaya humanized photo melalui Google AI Studio atau Gemini, dengan fokus pada pencahayaan natural, komposisi organik, dan detail visual yang mengurangi kesan gambar AI generik.
license: Complete terms in LICENSE.txt
metadata:
  category: multimodal
  source:
    upstream: .tmp-antigravity-skills/skills/ai-studio-image
    type: community
  depends_on:
    - akses ke Google AI Studio atau model gambar Gemini yang setara
---

# AI Studio Image

Skill ini memandu pembuatan gambar yang terasa seperti foto nyata, bukan visual AI yang terlalu steril. Fokus utamanya adalah menambahkan detail kecil yang biasanya muncul pada foto manusia: pencahayaan tidak sempurna, framing organik, tekstur realistis, dan konteks lingkungan yang masuk akal.

## Kapan digunakan

Gunakan skill ini saat perlu:
- menghasilkan gambar realistis untuk konten sosial, edukasi, atau branding
- membuat foto bergaya influencer, lifestyle, atau dokumentasi ringan
- mengubah prompt gambar agar hasilnya lebih natural dan kurang terasa sintetis
- merancang prompt untuk Google AI Studio atau model gambar Gemini

## Tujuan utama

- membuat prompt gambar yang menghasilkan foto terasa manusiawi
- menghindari estetika AI yang terlalu bersih, terlalu simetris, atau terlalu sempurna
- memilih mode visual dan rasio aspek sesuai konteks penggunaan
- menambahkan lapisan realism yang konsisten pada setiap generasi

## Prinsip inti

- foto realistis sering terlihat meyakinkan justru karena ketidaksempurnaannya
- pencahayaan ambient lebih natural daripada pencahayaan studio yang terlalu rapi
- framing sedikit off-center sering terasa lebih manusiawi
- tekstur kulit, noise sensor, dan depth of field kecil membantu mengurangi kesan sintetis
- konteks lingkungan harus konsisten dengan aktivitas dan waktu kejadian

## Mode utama

### Mode `influencer`

Gunakan untuk:
- konten media sosial
- lifestyle
- personal branding
- visual promosi yang tetap terasa natural

Karakteristik:
- menarik secara visual tetapi tidak terlalu dipoles
- warna hidup namun tidak berlebihan
- komposisi yang engaging
- ekspresi dan pose terasa spontan

### Mode `educational`

Gunakan untuk:
- materi kursus
- tutorial
- presentasi
- visual penjelasan atau demonstrasi

Karakteristik:
- lebih bersih dan profesional
- fokus pada kejelasan subjek
- elemen visual mendukung pemahaman
- tetap natural, tetapi lebih terarah daripada mode influencer

## Format gambar yang direkomendasikan

| Format | Rasio | Cocok untuk |
|---|---|---|
| `square` | 1:1 | feed Instagram, Facebook, thumbnail kotak |
| `portrait` | 3:4 | portrait post, Pinterest, editorial vertikal |
| `landscape` | 16:9 | banner, thumbnail video, hero image |
| `stories` | 9:16 | Stories, Reels, TikTok, Shorts |

Jika pengguna tidak menentukan format, pilih berdasarkan konteks distribusi.

## Workflow utama

### 1. Identifikasi tujuan visual

Tentukan:
- siapa subjeknya
- aktivitas apa yang sedang dilakukan
- konteks penggunaan gambar
- platform distribusi
- apakah nuansanya lebih lifestyle atau edukasional

### 2. Pilih mode dan format

Gunakan `influencer` untuk konten sosial dan `educational` untuk materi penjelasan. Pilih rasio aspek sesuai kanal publikasi.

### 3. Humanize prompt sebelum generasi

Jangan kirim prompt mentah pengguna langsung ke model. Tambahkan lapisan realism berikut.

#### Lapisan 1 — perangkat dan teknik

Tambahkan nuansa seperti:
- diambil dengan smartphone modern
- depth of field khas kamera ponsel
- tanpa flash keras
- sedikit noise sensor bila kondisi cahaya rendah

#### Lapisan 2 — pencahayaan natural

Tambahkan konteks seperti:
- cahaya jendela
- sinar matahari tidak langsung
- golden hour
- bayangan lembut dan organik
- refleksi alami pada permukaan sekitar

#### Lapisan 3 — ketidaksempurnaan manusiawi

Tambahkan detail seperti:
- framing sedikit tidak simetris
- fokus tidak sepenuhnya klinis
- latar belakang sedikit blur alami
- ketajaman tidak absolut
- elemen lingkungan yang terasa spontan

#### Lapisan 4 — autentisitas subjek

Tambahkan detail seperti:
- ekspresi wajah natural
- pose tidak terlalu formal
- tekstur kulit realistis
- proporsi tubuh masuk akal
- pakaian dan styling sesuai aktivitas sehari-hari

#### Lapisan 5 — konteks lingkungan

Pastikan:
- lokasi terasa nyata, bukan stock backdrop generik
- objek sekitar mendukung cerita visual
- pencahayaan konsisten dengan lokasi dan waktu
- aktivitas subjek cocok dengan lingkungan

## Template prompt dasar

Gunakan struktur seperti ini:

```text
[Subjek utama], [aktivitas], di [lingkungan nyata], foto realistis bergaya candid,
lighting natural dari [sumber cahaya], diambil dengan smartphone modern,
komposisi organik sedikit off-center, depth of field natural, tekstur kulit realistis,
sedikit noise sensor halus, ekspresi autentik, detail lingkungan sehari-hari,
warna natural, tidak terlihat seperti render AI.
```

## Penyesuaian iteratif

Jika hasil belum sesuai, arahkan revisi ke dimensi yang spesifik:
- **lebih natural**: kurangi kesan pose studio, tambah elemen candid
- **lebih terang**: ubah pencahayaan ke window light atau golden hour
- **lebih fokus edukasi**: sederhanakan latar dan perjelas objek utama
- **lebih lifestyle**: tambah konteks aktivitas dan suasana lingkungan
- **lebih autentik**: kurangi simetri, kurangi kulit terlalu halus, tambah detail kecil realistis

## Checklist kualitas hasil

1. Apakah gambar terasa seperti foto, bukan render?
2. Apakah pencahayaan konsisten dengan lokasi dan waktu?
3. Apakah ekspresi dan pose terlihat natural?
4. Apakah tekstur kulit dan material tidak terlalu sempurna?
5. Apakah framing terasa organik, bukan terlalu matematis?
6. Apakah lingkungan mendukung cerita visual?
7. Apakah format gambar sesuai kanal distribusi?

## Anti-pattern penting

- prompt terlalu pendek dan generik
- pencahayaan studio yang terlalu sempurna untuk konteks candid
- kulit terlalu halus atau plastik
- komposisi terlalu simetris
- latar belakang generik yang tidak mendukung cerita
- detail tubuh atau tangan yang tidak realistis dibiarkan tanpa iterasi

## Catatan implementasi

Skill upstream menyebut setup API key, dependensi, dan script lokal tertentu. Dalam versi KiloCode ini, referensi tersebut dinormalisasi agar skill tetap mandiri dan tidak bergantung pada path eksternal spesifik mesin asal. Terapkan prinsip prompt dan workflow ini pada tool generasi gambar yang tersedia di lingkungan kerja Anda.

## Hasil yang diharapkan

Dengan mengikuti skill ini, prompt gambar akan:
- menghasilkan visual yang lebih natural dan meyakinkan
- lebih cocok untuk konten sosial atau edukasi yang membutuhkan nuansa manusiawi
- mengurangi ciri khas gambar AI generik yang terlalu steril

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/ai-studio-image` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.