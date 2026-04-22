---
name: supabase-automation
description: Gunakan saat perlu mengotomasi Supabase melalui Rube MCP untuk query database, inspeksi skema, SQL execution, project administration, storage bucket, edge function, dan health check layanan.
license: Complete terms in LICENSE.txt
metadata:
  category: automation
  source:
    upstream: .tmp-antigravity-skills/skills/supabase-automation
    type: community
  depends_on:
    - Rube MCP
    - koneksi Supabase aktif di Rube
---

# Supabase Automation

Skill ini memandu otomasi Supabase melalui toolkit Supabase di Rube MCP.

## Kapan digunakan

Gunakan skill ini saat perlu:
- membaca data tabel atau view
- memeriksa skema tabel, relasi, dan index
- menjalankan SQL PostgreSQL untuk operasi kompleks
- melihat organisasi, project, konfigurasi, atau health layanan
- melihat edge function dan storage bucket
- menghasilkan tipe TypeScript dari skema database

## Prasyarat

- Pastikan `RUBE_SEARCH_TOOLS` tersedia.
- Pastikan koneksi `supabase` aktif melalui `RUBE_MANAGE_CONNECTIONS`.
- Selalu mulai dengan `RUBE_SEARCH_TOOLS` untuk mengambil skema tool terbaru.

## Alur kerja inti

### 1. Query dan kelola tabel database

Urutan kerja:
1. `SUPABASE_LIST_ALL_PROJECTS` untuk menemukan `project_ref`.
2. `SUPABASE_LIST_TABLES` untuk melihat tabel dan view.
3. `SUPABASE_GET_TABLE_SCHEMAS` untuk memeriksa kolom, constraint, dan relasi.
4. `SUPABASE_SELECT_FROM_TABLE` untuk query read-only.
5. `SUPABASE_BETA_RUN_SQL_QUERY` untuk SQL kompleks atau operasi tulis.

Parameter penting pada `SUPABASE_SELECT_FROM_TABLE`:
- `project_ref`
- `table`
- `select`
- `filters`
- `order`
- `limit`
- `offset`

Operator filter umum:
- `eq`, `neq`
- `gt`, `gte`, `lt`, `lte`
- `like`, `ilike`
- `is`
- `in`
- `cs`, `cd`
- `fts`, `plfts`, `phfts`, `wfts`

Parameter penting pada `SUPABASE_BETA_RUN_SQL_QUERY`:
- `ref`
- `query`
- `read_only`

Pitfall utama:
- `project_ref` harus berupa 20 huruf kecil.
- `SELECT_FROM_TABLE` hanya untuk baca; gunakan SQL untuk insert, update, delete.
- Array PostgreSQL harus memakai sintaks PostgreSQL, bukan JSON array.
- Identifier case-sensitive harus diapit tanda kutip ganda.

### 2. Kelola project dan organisasi

Urutan kerja:
1. `SUPABASE_LIST_ALL_ORGANIZATIONS`
2. `SUPABASE_GETS_INFORMATION_ABOUT_THE_ORGANIZATION`
3. `SUPABASE_LIST_MEMBERS_OF_AN_ORGANIZATION`
4. `SUPABASE_LIST_ALL_PROJECTS`
5. `SUPABASE_GETS_PROJECT_S_POSTGRES_CONFIG`
6. `SUPABASE_GETS_PROJECT_S_AUTH_CONFIG`
7. `SUPABASE_GET_PROJECT_API_KEYS`
8. `SUPABASE_GETS_PROJECT_S_SERVICE_HEALTH_STATUS`

Parameter penting:
- `ref`
- `slug`
- `services`

Pitfall utama:
- Beberapa tool organisasi memakai `slug`, bukan `id`.
- API key yang dikembalikan bersifat sensitif; jangan tampilkan penuh.
- Health check memerlukan array `services` yang tidak kosong.

### 3. Inspeksi skema database

Urutan kerja:
1. `SUPABASE_LIST_ALL_PROJECTS`
2. `SUPABASE_LIST_TABLES`
3. `SUPABASE_GET_TABLE_SCHEMAS`
4. `SUPABASE_GENERATE_TYPE_SCRIPT_TYPES`

Parameter penting:
- `schemas`
- `include_views`
- `include_metadata`
- `table_names`
- `include_relationships`
- `include_indexes`
- `included_schemas`

Catatan:
- `GET_TABLE_SCHEMAS` biasanya maksimal 20 tabel per request.
- Nama tabel tanpa prefix schema diasumsikan `public`.
- `row_count` atau `size_bytes` yang `null` berarti tidak diketahui, bukan nol.

### 4. Kelola edge function

Urutan kerja:
1. `SUPABASE_LIST_ALL_PROJECTS`
2. `SUPABASE_LIST_ALL_FUNCTIONS`
3. `SUPABASE_RETRIEVE_A_FUNCTION`

Catatan:
- Tool ini umumnya untuk inspeksi metadata, bukan deploy function.
- Timestamp function bisa berupa epoch milidetik.

### 5. Kelola storage bucket

Urutan kerja:
1. `SUPABASE_LIST_ALL_PROJECTS`
2. `SUPABASE_LISTS_ALL_BUCKETS`

Catatan:
- Tool bucket biasanya hanya mengembalikan daftar bucket, bukan isi file.
- Operasi file lanjutan mungkin memerlukan API storage terpisah.

## Pola kerja yang direkomendasikan

### Resolusi ID

- Project reference: `SUPABASE_LIST_ALL_PROJECTS`
- Organization slug: `SUPABASE_LIST_ALL_ORGANIZATIONS`
- Table names: `SUPABASE_LIST_TABLES`
- Detail kolom dan relasi: `SUPABASE_GET_TABLE_SCHEMAS`

### SQL best practices

- Selalu inspeksi skema sebelum menulis SQL.
- Gunakan `read_only: true` untuk query SELECT.
- Kutip identifier case-sensitive dengan `"`.
- Gunakan sintaks array PostgreSQL seperti `ARRAY['a', 'b']`.
- Pecah DDL kompleks menjadi beberapa query kecil.

### Pagination

- `SUPABASE_SELECT_FROM_TABLE` memakai `offset` dan `limit`.
- Naikkan `offset` bertahap sampai hasil kurang dari `limit`.

## Pitfall penting

- `project_ref` harus cocok pola 20 huruf kecil.
- `LIST_MEMBERS_OF_AN_ORGANIZATION` memakai `slug`, bukan `id`.
- `BETA_RUN_SQL_QUERY` memiliki batas waktu sekitar 60 detik.
- Error `42P01` sering berarti nama tabel atau schema salah atau kurang quoting.
- Error `42883` sering berarti memanggil fungsi yang tidak tersedia.
- API key dan konfigurasi tertentu bersifat sensitif; mask atau truncation wajib.

## Checklist eksekusi

1. Panggil `RUBE_SEARCH_TOOLS`.
2. Pastikan koneksi `supabase` aktif.
3. Resolve project dan tabel target.
4. Inspeksi skema sebelum query tulis.
5. Jalankan operasi inti.
6. Verifikasi hasil dengan query ulang atau inspeksi metadata terkait.

## Referensi tool cepat

- `SUPABASE_LIST_ALL_ORGANIZATIONS`
- `SUPABASE_GETS_INFORMATION_ABOUT_THE_ORGANIZATION`
- `SUPABASE_LIST_MEMBERS_OF_AN_ORGANIZATION`
- `SUPABASE_LIST_ALL_PROJECTS`
- `SUPABASE_GETS_PROJECT_S_POSTGRES_CONFIG`
- `SUPABASE_GETS_PROJECT_S_AUTH_CONFIG`
- `SUPABASE_GET_PROJECT_API_KEYS`
- `SUPABASE_GETS_PROJECT_S_SERVICE_HEALTH_STATUS`
- `SUPABASE_LIST_TABLES`
- `SUPABASE_GET_TABLE_SCHEMAS`
- `SUPABASE_SELECT_FROM_TABLE`
- `SUPABASE_BETA_RUN_SQL_QUERY`
- `SUPABASE_GENERATE_TYPE_SCRIPT_TYPES`
- `SUPABASE_LIST_ALL_FUNCTIONS`
- `SUPABASE_RETRIEVE_A_FUNCTION`
- `SUPABASE_LISTS_ALL_BUCKETS`

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/supabase-automation` agar mandiri dan konsisten untuk format KiloCode.
