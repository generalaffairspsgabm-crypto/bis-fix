---
name: airtable-automation
description: Gunakan saat perlu mengotomasi Airtable melalui Rube MCP untuk membaca skema base, mencari record, membuat atau memperbarui data, mengelola field, dan meninjau komentar record.
license: Complete terms in LICENSE.txt
metadata:
  category: automation
  source:
    upstream: .tmp-antigravity-skills/skills/airtable-automation
    type: community
  depends_on:
    - Rube MCP
    - koneksi Airtable aktif di Rube
---

# Airtable Automation

Skill ini memandu otomasi Airtable melalui toolkit Airtable di Rube MCP.

## Kapan digunakan

Gunakan skill ini saat perlu:
- menemukan base, tabel, field, atau view yang tersedia
- membaca, memfilter, membuat, memperbarui, atau menghapus record
- memeriksa skema sebelum operasi tulis
- membuat field baru atau memperbarui metadata field
- membaca komentar pada record

## Prasyarat

- Pastikan Rube MCP tersedia dan `RUBE_SEARCH_TOOLS` dapat dipanggil.
- Pastikan koneksi Airtable aktif melalui `RUBE_MANAGE_CONNECTIONS` dengan toolkit `airtable`.
- Selalu mulai dengan `RUBE_SEARCH_TOOLS` untuk mengambil skema tool terbaru sebelum menjalankan workflow.

## Alur kerja inti

### 1. Kelola record

Gunakan saat perlu membuat, membaca, memperbarui, atau menghapus record.

Urutan kerja yang disarankan:
1. `AIRTABLE_LIST_BASES` untuk menemukan base.
2. `AIRTABLE_GET_BASE_SCHEMA` untuk memeriksa struktur tabel dan nama field.
3. `AIRTABLE_LIST_RECORDS` untuk melihat data yang ada atau memfilter target.
4. `AIRTABLE_CREATE_RECORD` atau `AIRTABLE_CREATE_RECORDS` untuk membuat data.
5. `AIRTABLE_UPDATE_RECORD` atau `AIRTABLE_UPDATE_MULTIPLE_RECORDS` untuk memperbarui data.
6. `AIRTABLE_DELETE_RECORD` atau `AIRTABLE_DELETE_MULTIPLE_RECORDS` untuk menghapus data.

Parameter penting:
- `baseId`: ID base, biasanya diawali `app`.
- `tableIdOrName`: ID tabel (`tbl...`) atau nama tabel.
- `fields`: objek pasangan nama field dan nilai.
- `recordId`: ID record (`rec...`) untuk update atau delete.
- `filterByFormula`: formula Airtable untuk filtering.
- `typecast`: aktifkan `true` bila perlu konversi tipe otomatis.

Hal yang perlu diwaspadai:
- Nama field peka huruf besar-kecil dan harus cocok persis dengan skema.
- Operasi batch create, update, dan delete umumnya dibatasi maksimal 10 record per request.
- `pageSize` maksimal 100 dan pagination memakai `offset`; jangan ubah filter atau sort di tengah paging.
- Error `UNKNOWN_FIELD_NAME` biasanya berarti nama field salah.
- Error `INVALID_MULTIPLE_CHOICE_OPTIONS` sering terbantu dengan `typecast=true`.

### 2. Cari dan filter record

Gunakan saat perlu menemukan record tertentu dengan formula Airtable.

Urutan kerja:
1. `AIRTABLE_GET_BASE_SCHEMA` untuk memastikan nama field dan tipenya.
2. `AIRTABLE_LIST_RECORDS` dengan `filterByFormula`.
3. `AIRTABLE_GET_RECORD` bila perlu detail penuh satu record.

Parameter penting:
- `filterByFormula`: contoh `{Status}='Done'`.
- `sort`: array konfigurasi sort.
- `fields`: daftar field yang ingin dikembalikan.
- `maxRecords`: batas total record lintas halaman.
- `offset`: cursor pagination dari respons sebelumnya.

Catatan formula:
- Bungkus nama field dengan `{}`.
- Bungkus string dengan tanda kutip tunggal.
- Contoh umum:
  - `{Status}='Done'`
  - `AND({Priority}>1, {Owner}='Ana')`
  - `FIND('test', {Name})>0`
  - `IS_BEFORE({Due Date}, TODAY())`

### 3. Kelola field dan skema

Gunakan saat perlu menambah field baru atau memperbarui metadata field.

Urutan kerja:
1. `AIRTABLE_GET_BASE_SCHEMA` untuk melihat kondisi saat ini.
2. `AIRTABLE_CREATE_FIELD` untuk membuat field baru.
3. `AIRTABLE_UPDATE_FIELD` untuk mengganti nama atau deskripsi field.
4. `AIRTABLE_UPDATE_TABLE` untuk memperbarui metadata tabel.

Parameter penting:
- `name`: nama field.
- `type`: tipe field seperti `singleLineText`, `number`, atau `singleSelect`.
- `options`: opsi spesifik tipe, misalnya pilihan select atau presisi angka.
- `description`: deskripsi field.

Batasan penting:
- `AIRTABLE_UPDATE_FIELD` umumnya hanya aman untuk nama dan deskripsi, bukan perubahan tipe.
- Untuk mengganti tipe field, buat field pengganti lalu migrasikan data.
- Field komputasi seperti formula, rollup, dan lookup biasanya tidak dapat dibuat lewat API ini.

### 4. Kelola komentar record

Gunakan saat perlu membaca komentar pada record.

Urutan kerja:
1. `AIRTABLE_LIST_COMMENTS` dengan `baseId`, `tableIdOrName`, dan `recordId`.

Catatan:
- `recordId` harus valid dan biasanya panjang 17 karakter dengan prefix `rec`.
- `pageSize` komentar maksimal 100.

## Pola kerja yang direkomendasikan

### Resolusi ID

Lakukan resolusi nama ke ID sebelum operasi tulis:
- base: `AIRTABLE_LIST_BASES`
- tabel dan field: `AIRTABLE_GET_BASE_SCHEMA`
- record target: `AIRTABLE_LIST_RECORDS` atau `AIRTABLE_GET_RECORD`

### Pagination

- Tetapkan `pageSize` sesuai kebutuhan, maksimal 100.
- Ambil `offset` dari respons.
- Kirim `offset` tanpa modifikasi pada request berikutnya.
- Pertahankan filter, sort, dan view tetap sama selama paging.

## Pitfall penting

- Base ID biasanya berbentuk `appXXXXXXXXXXXXXX`.
- Table ID biasanya berbentuk `tblXXXXXXXXXXXXXX`.
- Record ID biasanya berbentuk `recXXXXXXXXXXXXXX`.
- Field ID biasanya berbentuk `fldXXXXXXXXXXXXXX`.
- Rate limit Airtable sekitar 5 request per detik per base; hormati `Retry-After` bila menerima 429.

## Checklist eksekusi

1. Panggil `RUBE_SEARCH_TOOLS`.
2. Pastikan koneksi `airtable` aktif.
3. Ambil base dan skema sebelum menulis data.
4. Validasi nama field terhadap skema terbaru.
5. Jalankan operasi inti.
6. Verifikasi hasil dengan pembacaan ulang record atau skema terkait.

## Referensi tool cepat

- `AIRTABLE_LIST_BASES`
- `AIRTABLE_GET_BASE_SCHEMA`
- `AIRTABLE_LIST_RECORDS`
- `AIRTABLE_GET_RECORD`
- `AIRTABLE_CREATE_RECORD`
- `AIRTABLE_CREATE_RECORDS`
- `AIRTABLE_UPDATE_RECORD`
- `AIRTABLE_UPDATE_MULTIPLE_RECORDS`
- `AIRTABLE_DELETE_RECORD`
- `AIRTABLE_DELETE_MULTIPLE_RECORDS`
- `AIRTABLE_CREATE_FIELD`
- `AIRTABLE_UPDATE_FIELD`
- `AIRTABLE_UPDATE_TABLE`
- `AIRTABLE_LIST_COMMENTS`

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/airtable-automation` agar mandiri dan konsisten untuk format KiloCode.
