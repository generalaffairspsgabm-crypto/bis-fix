---
name: agent-memory-mcp
description: Gunakan saat perlu menyediakan memori persisten yang dapat dicari untuk agen AI melalui server MCP, sehingga pola, keputusan, dan pengetahuan proyek dapat disimpan dan dipanggil ulang.
license: Complete terms in LICENSE.txt
metadata:
  category: memory
  source:
    upstream: .tmp-antigravity-skills/skills/agent-memory-mcp
    type: community
  depends_on:
    - server MCP atau layanan memori yang dapat dijalankan di lingkungan kerja
    - skema penyimpanan untuk key, type, content, dan tags
---

# Agent Memory MCP

Skill ini membantu membangun dan mengoperasikan sistem memori hibrida untuk agen AI. Tujuannya adalah menyediakan penyimpanan pengetahuan jangka panjang yang persisten, dapat dicari, dan dapat ditulis ulang oleh agen melalui antarmuka MCP.

## Kapan digunakan

Gunakan skill ini saat perlu:
- menyimpan keputusan arsitektur, pola, dan pengetahuan proyek secara persisten
- memungkinkan agen membaca ulang konteks penting lintas sesi
- menyediakan pencarian memori berdasarkan query, tipe, atau tag
- menghubungkan dokumentasi proyek dengan memory bank yang dapat diakses agen
- memantau penggunaan memori dan kualitas basis pengetahuan

## Jangan gunakan saat

- kebutuhan hanya memori percakapan jangka pendek
- tidak ada mekanisme penyimpanan persisten atau server MCP yang tersedia
- data yang akan disimpan bersifat sangat sensitif tanpa kontrol akses yang memadai

## Tujuan utama

- menjaga pengetahuan proyek tetap tersedia lintas sesi
- mengurangi kehilangan konteks pada workflow agen yang panjang
- membuat keputusan dan pola penting mudah ditemukan kembali
- menyediakan antarmuka baca, tulis, dan pencarian yang konsisten

## Konsep inti

Sistem memori minimal sebaiknya mendukung:
- **search** untuk menemukan memori relevan
- **write** untuk menyimpan pengetahuan baru
- **read** untuk mengambil detail memori tertentu
- **stats** untuk melihat penggunaan dan kesehatan basis memori

## Struktur memori yang disarankan

Setiap entri memori idealnya memiliki:
- `key`: identitas unik
- `type`: kategori seperti `decision`, `pattern`, `note`, atau `reference`
- `content`: isi utama memori
- `tags`: label untuk pencarian dan pengelompokan
- metadata tambahan seperti waktu pembuatan, sumber, atau proyek terkait bila tersedia

## Alur kerja inti

### 1. Tentukan domain pengetahuan

Identifikasi apa yang layak disimpan, misalnya:
- keputusan arsitektur
- pola implementasi berulang
- constraint proyek
- hasil evaluasi penting
- catatan operasional yang perlu dipanggil ulang

### 2. Definisikan skema memori

Pastikan ada aturan untuk:
- penamaan key yang konsisten
- klasifikasi type yang terbatas dan jelas
- penggunaan tag yang tidak liar
- format content yang mudah dibaca ulang oleh agen

### 3. Jalankan layanan memori

Siapkan layanan yang mampu:
- menerima operasi baca dan tulis
- menyimpan data secara persisten
- melayani pencarian yang cukup cepat
- membatasi akses sesuai kebutuhan keamanan

### 4. Integrasikan ke workflow agen

Gunakan memori untuk:
- mencari konteks sebelum menjawab atau bertindak
- menyimpan keputusan baru setelah pekerjaan penting selesai
- membaca ulang desain atau constraint sebelum implementasi
- mengaudit pengetahuan yang sudah usang atau bertentangan

### 5. Pantau kualitas memori

Tinjau secara berkala:
- duplikasi entri
- tag yang tidak konsisten
- memori usang
- entri tanpa konteks yang cukup
- pertumbuhan volume dan pola penggunaan

## Praktik yang disarankan

- simpan keputusan penting segera setelah dipastikan
- gunakan tag yang ringkas dan konsisten
- pisahkan fakta, keputusan, dan hipotesis
- hindari menyimpan secret mentah di memory bank
- buat key yang stabil agar mudah dirujuk ulang

## Checklist kualitas

- [ ] ada skema memori yang jelas untuk key, type, content, dan tags
- [ ] operasi search, write, read, dan stats terdefinisi
- [ ] memori persisten dapat diakses lintas sesi
- [ ] data sensitif tidak disimpan sembarangan
- [ ] ada proses audit untuk memori usang atau duplikat

## Anti-pattern penting

- menyimpan semua hal tanpa kurasi sehingga pencarian menjadi bising
- memakai key dan tag yang tidak konsisten
- mencampur keputusan final dengan ide mentah tanpa penanda
- menyimpan secret atau data sensitif tanpa kontrol akses
- tidak pernah membersihkan memori yang sudah usang

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/agent-memory-mcp` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
