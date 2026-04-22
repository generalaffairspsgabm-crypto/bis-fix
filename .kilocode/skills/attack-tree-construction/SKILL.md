---
name: attack-tree-construction
description: Gunakan saat memetakan skenario serangan secara defensif melalui attack tree untuk memahami jalur ancaman, gap mitigasi, dan prioritas kontrol keamanan.
license: Complete terms in LICENSE.txt
metadata:
  category: security
  source:
    upstream: .tmp-antigravity-skills/skills/attack-tree-construction
    type: community
  depends_on:
    - otorisasi eksplisit untuk threat modeling atau asesmen keamanan defensif
---

# Attack Tree Construction

Skill ini memandu penyusunan attack tree untuk memvisualisasikan jalur ancaman secara sistematis. Fokusnya adalah threat modeling defensif, komunikasi risiko, dan prioritisasi mitigasi, bukan pemberian instruksi eksploitasi operasional.

## Batas penggunaan

Gunakan hanya untuk:
- asesmen keamanan yang sah dan berotorisasi
- threat modeling defensif
- validasi desain kontrol keamanan
- komunikasi risiko kepada stakeholder internal yang berwenang

Jangan gunakan untuk:
- membantu eksploitasi sistem nyata tanpa otorisasi
- menyusun langkah serangan operasional yang dapat disalahgunakan
- permintaan yang tidak memiliki scope, aset, atau otorisasi yang jelas

## Kapan digunakan

Gunakan skill ini saat:
- ingin memetakan berbagai jalur menuju tujuan penyerang tertentu
- perlu mengidentifikasi cabang risiko dengan dampak tinggi
- ingin menemukan gap mitigasi pada arsitektur atau proses
- perlu menjelaskan risiko keamanan secara visual dan terstruktur
- sedang menyiapkan prioritas investasi kontrol atau scope pengujian defensif

## Tujuan utama

- mendefinisikan tujuan penyerang sebagai root node yang jelas
- memecah jalur ancaman menjadi sub-tujuan dengan struktur AND/OR
- menilai cabang berdasarkan biaya, skill, waktu, dan detectability
- memetakan mitigasi pada cabang yang paling penting

## Prinsip inti

- mulai dari aset dan tujuan penyerang yang spesifik
- gunakan struktur pohon yang eksplisit, bukan daftar ancaman acak
- fokus pada jalur yang realistis dalam konteks sistem
- kaitkan setiap cabang dengan kontrol yang ada atau yang belum ada
- hindari detail eksploitasi yang tidak perlu untuk tujuan defensif

## Alur kerja inti

### 1. Konfirmasi scope dan aset

Sebelum membuat pohon, pastikan jelas:
- sistem atau komponen yang dimodelkan
- aset yang dilindungi
- aktor yang relevan
- asumsi trust boundary
- tujuan penyerang yang menjadi root node

Tanpa scope yang jelas, attack tree mudah menjadi terlalu abstrak atau menyesatkan.

### 2. Tentukan root node sebagai tujuan penyerang

Contoh root node defensif:
- memperoleh akses tidak sah ke data pelanggan
- mengganggu ketersediaan layanan pembayaran
- mengeksekusi perubahan konfigurasi tanpa otorisasi

Root node harus berupa hasil akhir yang ingin dicapai penyerang, bukan teknik.

### 3. Pecah menjadi sub-goal dengan struktur AND/OR

Untuk setiap cabang:
- gunakan OR bila ada beberapa jalur alternatif
- gunakan AND bila beberapa kondisi harus terpenuhi bersama
- pecah sampai level leaf yang cukup konkret untuk dianalisis

Jaga keseimbangan: cukup detail untuk berguna, tetapi tidak berubah menjadi playbook eksploitasi.

### 4. Anotasi leaf node dengan faktor risiko

Untuk setiap leaf, nilai secara kualitatif atau semi-kuantitatif:
- biaya bagi penyerang
- tingkat skill yang dibutuhkan
- waktu atau effort
- peluang deteksi
- prasyarat akses atau kondisi lingkungan

Ini membantu memprioritaskan cabang yang paling realistis dan berbahaya.

### 5. Petakan mitigasi dan gap kontrol

Untuk tiap cabang penting, catat:
- kontrol yang sudah ada
- kontrol yang lemah atau tidak lengkap
- peluang deteksi
- opsi mitigasi tambahan

Prioritaskan cabang dengan kombinasi dampak tinggi dan hambatan rendah.

### 6. Ringkas hasil untuk stakeholder

Output yang baik biasanya mencakup:
- tujuan penyerang utama
- cabang risiko prioritas
- asumsi penting
- kontrol yang sudah efektif
- gap mitigasi yang perlu ditindaklanjuti

## Checklist implementasi

1. Pastikan ada otorisasi dan scope defensif yang jelas.
2. Definisikan aset dan root goal penyerang.
3. Susun cabang AND/OR secara sistematis.
4. Nilai leaf node berdasarkan biaya, skill, waktu, dan detectability.
5. Petakan mitigasi pada cabang prioritas.
6. Sajikan hasil dalam bentuk yang aman dan dapat ditindaklanjuti.

## Anti-pattern penting

- memulai tanpa otorisasi atau scope yang jelas
- memakai teknik sebagai root node alih-alih tujuan penyerang
- membuat pohon terlalu dangkal sehingga tidak berguna
- membuat pohon terlalu detail hingga menjadi panduan eksploitasi
- tidak menghubungkan cabang ancaman dengan mitigasi nyata

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/attack-tree-construction` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
