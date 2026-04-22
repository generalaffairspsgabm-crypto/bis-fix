---
name: agent-tool-builder
description: Gunakan saat merancang, mengevaluasi, atau mengimplementasikan tool untuk AI agent agar schema, deskripsi parameter, validasi, error handling, dan integrasi MCP/function calling akurat serta mudah dipakai model.
license: Complete terms in LICENSE.txt
metadata:
  category: development
  source:
    upstream: .tmp-antigravity-skills/skills/agent-tool-builder
    type: community
  depends_on:
    - pemahaman dasar JSON Schema atau kontrak input-output tool
    - akses ke framework agent atau runtime tool yang dipakai
---

# Agent Tool Builder

Skill ini memandu perancangan tool untuk AI agent dengan fokus pada kualitas schema, kejelasan deskripsi, validasi input, dan perilaku error yang dapat dipahami model. Tujuannya adalah membuat tool yang lebih mudah dipilih, dipanggil, dan dipulihkan saat gagal.

## Kapan digunakan

Gunakan skill ini saat perlu:
- mendesain tool baru untuk agent berbasis function calling atau MCP
- memperbaiki tool yang sering salah dipanggil model
- meninjau schema input-output agar lebih ketat dan jelas
- menambahkan validasi, fallback, atau error handling pada tool agent
- mengurangi kebingungan model akibat terlalu banyak tool atau deskripsi yang lemah

## Prinsip inti

- kualitas deskripsi sering lebih penting daripada detail implementasi internal
- schema harus membatasi input ke bentuk yang benar-benar valid
- setiap parameter perlu menjelaskan format, contoh, dan batasannya
- kegagalan harus eksplisit, bukan diam-diam menghasilkan output ambigu
- hasil tool sebaiknya mudah dibaca model dan downstream workflow
- jumlah tool perlu dijaga tetap ramping agar pemilihan tool tidak membingungkan

## Alur kerja inti

### 1. Definisikan tujuan tool secara sempit

Sebelum menulis schema, tetapkan:
- masalah spesifik yang diselesaikan tool
- kapan tool boleh dipakai
- kapan tool tidak boleh dipakai
- input minimum yang benar-benar dibutuhkan
- bentuk output yang paling berguna untuk model

Hindari tool serbaguna yang mencampur banyak aksi berbeda tanpa batas yang jelas.

### 2. Tulis deskripsi tool yang operasional

Deskripsi tool harus menjawab:
- apa yang dilakukan tool
- kapan model harus memilih tool ini
- apa yang tidak dicakup tool
- format hasil yang dikembalikan
- batasan penting atau prasyarat

Contoh pola deskripsi yang baik:

```json
{
  "name": "get_stock_price",
  "description": "Mengambil harga saham terkini untuk ticker perusahaan publik di bursa utama seperti NYSE atau NASDAQ. Gunakan saat pengguna meminta harga saham saat ini atau sangat baru. Jangan gunakan untuk data historis, profil perusahaan, atau prediksi harga.",
  "input_schema": {
    "type": "object",
    "properties": {
      "ticker": {
        "type": "string",
        "description": "Kode ticker saham, misalnya AAPL untuk Apple Inc."
      }
    },
    "required": ["ticker"],
    "additionalProperties": false
  }
}
```

### 3. Perjelas setiap parameter

Untuk setiap parameter, jelaskan:
- arti parameter
- format yang diharapkan
- contoh nilai valid
- batasan atau edge case

Contoh:

```json
{
  "location": {
    "type": "string",
    "description": "Kota dan negara bagian/negara. Format: 'City, State' untuk AS seperti 'San Francisco, CA' atau 'City, Country' untuk internasional seperti 'Tokyo, Japan'. Jangan gunakan ZIP code atau koordinat."
  },
  "unit": {
    "type": "string",
    "enum": ["celsius", "fahrenheit"],
    "description": "Satuan suhu. Gunakan 'fahrenheit' untuk konteks AS dan 'celsius' untuk konteks lain bila pengguna tidak menentukan."
  }
}
```

### 4. Gunakan constraint schema sebanyak mungkin

Prioritaskan:
- `enum` untuk pilihan terbatas
- `required` untuk input wajib
- `additionalProperties: false` untuk mode ketat
- batas panjang string, rentang angka, atau pola regex bila relevan

Contoh:

```json
{
  "type": "object",
  "properties": {
    "priority": {
      "type": "string",
      "enum": ["low", "medium", "high", "critical"],
      "description": "Tingkat prioritas tugas."
    },
    "action": {
      "type": "string",
      "enum": ["create", "read", "update", "delete"],
      "description": "Operasi CRUD yang akan dijalankan."
    }
  },
  "required": ["action"],
  "additionalProperties": false
}
```

### 5. Tambahkan contoh input bila tool kompleks

Untuk tool dengan objek bertingkat, format tanggal, atau kombinasi parameter sensitif, sertakan contoh input yang representatif.

Contoh:

```json
{
  "name": "create_calendar_event",
  "description": "Membuat event kalender dengan attendee dan durasi opsional.",
  "input_schema": {
    "type": "object",
    "properties": {
      "title": {"type": "string", "description": "Judul event"},
      "start_time": {
        "type": "string",
        "description": "Datetime ISO 8601, misalnya 2024-03-15T14:00:00Z"
      },
      "duration_minutes": {"type": "integer", "description": "Durasi event dalam menit"}
    },
    "required": ["title", "start_time", "duration_minutes"],
    "additionalProperties": false
  },
  "input_examples": [
    {
      "title": "Team Standup",
      "start_time": "2024-03-15T09:00:00Z",
      "duration_minutes": 30
    }
  ]
}
```

### 6. Rancang output yang mudah dipakai model

Utamakan output yang:
- ringkas namun informatif
- konsisten antar kondisi sukses dan gagal
- menyertakan field penting untuk langkah berikutnya
- tidak memaksa model menebak arti data

Bila memungkinkan, gunakan struktur yang stabil atau string yang jelas. Hindari payload besar yang tidak relevan.

### 7. Terapkan error handling eksplisit

Setiap tool perlu menangani:
- input tidak valid
- resource tidak ditemukan
- timeout atau kegagalan jaringan
- kegagalan otorisasi
- kondisi parsial atau ambigu

Prinsip penting:
- jangan silent fail
- jelaskan penyebab error
- jelaskan apakah aman untuk retry
- beri petunjuk perbaikan bila memungkinkan

Contoh pola respons error:

```json
{
  "ok": false,
  "error_code": "INVALID_LOCATION_FORMAT",
  "message": "Parameter location harus memakai format 'City, Country'.",
  "retryable": false
}
```

## Integrasi umum

### JSON Schema

Gunakan sebagai format dasar definisi input tool. Pastikan schema cukup ketat untuk mencegah input liar, tetapi tidak terlalu rumit hingga sulit dipakai model.

### MCP

Gunakan saat membangun tool reusable lintas agent atau lintas platform. Dokumentasikan kontrak input-output dan perilaku error secara eksplisit agar interoperabilitas tetap tinggi.

### Framework agent

Saat memakai SDK seperti Anthropic, OpenAI, Vercel AI SDK, atau framework orkestrasi lain:
- sesuaikan schema dengan kemampuan strict mode yang tersedia
- uji pemanggilan tool lewat model, bukan hanya unit test biasa
- verifikasi bahwa deskripsi tool benar-benar memandu pemilihan tool

## Checklist review tool

1. Apakah tujuan tool cukup sempit dan jelas?
2. Apakah deskripsi menjelaskan kapan tool dipakai dan tidak dipakai?
3. Apakah semua parameter punya deskripsi format dan contoh?
4. Apakah `enum`, `required`, dan constraint lain sudah dimanfaatkan?
5. Apakah output mudah dipahami model?
6. Apakah semua mode gagal menghasilkan error eksplisit?
7. Apakah tool sudah diuji melalui agent/LLM, bukan hanya test teknis?
8. Apakah jumlah tool keseluruhan masih masuk akal untuk dipilih model?

## Anti-pattern penting

- deskripsi tool terlalu pendek seperti "gets data"
- parameter tanpa penjelasan format
- satu tool menangani terlalu banyak aksi berbeda
- output mentah besar tanpa struktur atau ringkasan
- silent failure atau error generik tanpa konteks
- terlalu banyak tool dengan fungsi tumpang tindih
- hanya menguji implementasi tanpa menguji perilaku pemilihan tool oleh model

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/agent-tool-builder` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
