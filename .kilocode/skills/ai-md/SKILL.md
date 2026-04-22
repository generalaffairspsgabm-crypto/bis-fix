---
name: ai-md
description: Gunakan saat perlu mengonversi `CLAUDE.md`, `AGENTS.md`, atau instruksi sistem LLM lain dari prosa manusia menjadi format terstruktur yang lebih ringkas, hemat token, dan lebih mudah dipatuhi model.
license: Complete terms in LICENSE.txt
metadata:
  category: prompt-engineering
  source:
    upstream: .tmp-antigravity-skills/skills/ai-md
    type: community
  depends_on:
    - dokumen instruksi sumber seperti `CLAUDE.md`, `AGENTS.md`, atau system prompt serupa
---

# AI MD

Skill ini memandu konversi instruksi panjang yang ditulis untuk manusia menjadi format instruksi yang lebih ramah model. Fokusnya adalah memecah aturan majemuk, memberi label fungsi yang eksplisit, dan menyusun ulang isi agar kepatuhan model meningkat tanpa menambah verbosity.

## Kapan digunakan

Gunakan skill ini saat perlu:
- merapikan `CLAUDE.md` atau `AGENTS.md` yang panjang tetapi sering diabaikan model
- mengurangi konsumsi token dari system prompt yang terlalu verbose
- memigrasikan aturan antar tool AI seperti Claude, Codex, Gemini, atau Grok
- meningkatkan kepatuhan model terhadap aturan yang sebenarnya sudah ada namun tertutup prosa panjang

## Tujuan utama

- mengubah instruksi natural language menjadi aturan atomik yang jelas
- mengurangi ambiguitas dengan label seperti `trigger:`, `action:`, dan `exception:`
- menghapus motivasi manusia atau penjelasan yang tidak perlu bagi model
- menyusun aturan berdasarkan prioritas dan domain perilaku

## Prinsip inti

- model lebih mudah mengikuti aturan yang dipisah per baris daripada aturan majemuk dalam satu kalimat
- label eksplisit mengurangi kebutuhan inferensi konteks
- aturan harus atomik; jika satu kalimat memuat beberapa kewajiban, pecah menjadi beberapa item
- urutan penting; aturan prioritas tinggi harus muncul lebih awal
- simpan fakta dan kontrak penting apa adanya, tetapi ringkas penjelasan naratif

## Mengapa pendekatan ini bekerja

### 1. Mengurangi pembagian perhatian

Jika banyak aturan digabung dalam satu baris, perhatian model tersebar. Saat setiap aturan berdiri sendiri, tiap aturan mendapat bobot perhatian yang lebih jelas.

### 2. Mengurangi inferensi

Label seperti `trigger:`, `action:`, `exception:`, `priority:`, dan `persist:` memberi struktur langsung. Model tidak perlu menebak fungsi tiap fragmen kalimat.

### 3. Membuat jangkar semantik

Sub-item berlabel memudahkan model mencocokkan input pengguna dengan aturan yang relevan. Ini membantu terutama pada aturan yang dipicu oleh konteks tertentu seperti `new-api:` atau `new-feature:`.

## Alur kerja konversi

### 1. Baca seperti compiler, bukan pembaca biasa

Untuk setiap kalimat pada dokumen sumber, klasifikasikan apakah itu:
- pemicu perilaku
- aksi yang wajib dilakukan
- larangan atau constraint
- metadata seperti prioritas, timing, persistensi, atau pengecualian
- penjelasan manusia yang bisa dihapus

Pertanyaan bantu:
1. Apa yang memicu aturan ini?
2. Apa aksi yang diwajibkan?
3. Apa yang dilarang?
4. Adakah pengecualian?
5. Adakah alasan manusiawi yang tidak perlu dibawa ke prompt akhir?

### 2. Pecah aturan majemuk menjadi aturan atomik

Gunakan uji sederhana:
- jika dua bagian kalimat bisa dihubungkan dengan kata “dan”, kemungkinan besar itu dua aturan berbeda
- jika ada pemisah seperti `|`, tanda kurung, atau daftar inline, evaluasi apakah masing-masing bagian harus berdiri sendiri

Contoh transformasi:

```text
Sebelum:
Jangan menebak | kalau ragu cek data | jangan tanya user kalau bisa verifikasi sendiri

Sesudah:
EVIDENCE:
  core: no-guess
  action: saat-ragu -> cek-data
  self-serve: verifikasi-sendiri-sebelum-bertanya
```

### 3. Beri label fungsi yang eksplisit

Gunakan kosakata label yang konsisten. Label yang umum dipakai:

| Label | Fungsi |
|---|---|
| `trigger:` | kondisi yang mengaktifkan aturan |
| `action:` | tindakan yang wajib dilakukan |
| `exception:` | kondisi pengecualian |
| `not-triggered:` | contoh negatif agar tidak over-trigger |
| `format:` | batasan format output |
| `priority:` | prioritas saat aturan konflik |
| `yields-to:` | aturan lain yang lebih tinggi |
| `persist:` | apakah aturan berlaku lintas giliran percakapan |
| `timing:` | kapan aturan diterapkan |
| `violation:` | konsekuensi atau penanda pelanggaran |
| `banned:` | kata atau aksi terlarang |
| `policy:` | heuristik keputusan |

Pilih label yang tetap jelas walau dibaca tanpa konteks paragraf asal.

### 4. Susun arsitektur instruksi

Kelompokkan aturan berdasarkan domain perilaku. Struktur yang direkomendasikan:

- `GATES` untuk pemeriksaan wajib sebelum bertindak
- `RULES` untuk perilaku umum
- `RHYTHM` untuk pola kerja atau urutan langkah
- `OUTPUT` untuk format jawaban
- `REF` untuk referensi yang hanya dibuka saat perlu
- `LEARN` untuk aturan evolusi atau pembelajaran sistem

Aturan yang paling kritis ditempatkan lebih awal.

## Teknik konversi praktis

### Hapus penjelasan manusia yang tidak operasional

Buang bagian seperti:
- alasan emosional mengapa aturan dibuat
- cerita latar belakang
- motivasi seperti “agar tidak membingungkan” jika tidak mengubah perilaku model

Pertahankan hanya yang memengaruhi eksekusi.

### Ubah pengecualian menjadi field eksplisit

Daripada menulis pengecualian di tengah kalimat, pindahkan ke `exception:`.

### Ubah aturan format menjadi kontrak output

Jika dokumen sumber meminta format tertentu, tulis sebagai aturan format yang eksplisit, misalnya:
- `format: bullet-singkat`
- `format: tabel-jika-membandingkan`
- `format: sertakan-bukti(line#/data/source)`

### Pertahankan fakta dan koneksi penting apa adanya

String koneksi, nama command, path, atau kontrak teknis tidak boleh diringkas sampai mengubah makna.

## Checklist review hasil konversi

1. Apakah semua aturan majemuk sudah dipecah menjadi unit atomik?
2. Apakah setiap aturan penting punya fungsi yang jelas seperti pemicu, aksi, atau pengecualian?
3. Apakah penjelasan manusia yang tidak operasional sudah dihapus?
4. Apakah aturan prioritas tinggi muncul lebih awal?
5. Apakah format akhir lebih ringkas daripada dokumen sumber tanpa kehilangan kontrak penting?
6. Apakah istilah, command, path, dan fakta teknis tetap akurat?

## Anti-pattern penting

- mempertahankan paragraf panjang yang mencampur trigger, action, dan exception sekaligus
- menaruh banyak aturan dalam satu baris hanya demi terlihat singkat
- memakai label yang ambigu atau berubah-ubah antar bagian
- menghapus detail teknis penting seperti command, path, atau kontrak output
- menyisakan motivasi manusia yang tidak membantu model bertindak

## Hasil yang diharapkan

Output akhir seharusnya:
- lebih pendek dari dokumen sumber
- lebih mudah dipindai model
- lebih mudah dipelihara karena aturan terstruktur
- lebih mudah dipindahkan ke tool AI lain tanpa banyak penyesuaian

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/ai-md` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.

## Catatan batasan

Skill ini adalah metodologi penataan instruksi, bukan jaminan absolut kepatuhan model. Tetap lakukan uji perilaku pada model target setelah konversi.