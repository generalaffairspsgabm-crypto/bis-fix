---
name: activecampaign-automation
description: >-
  Gunakan saat mengotomasi operasi ActiveCampaign seperti kontak, tag,
  subscription list, enrollment automation, dan task CRM dengan alur parameter,
  ID, dan validasi yang konsisten.
license: CC-BY-4.0
metadata:
  category: marketing-automation
  source:
    repository: 'https://github.com/sickn33/antigravity-awesome-skills'
    path: skills/activecampaign-automation
    license_path: LICENSE-CONTENT
  original_metadata:
    risk: critical
    source: community
    date_added: '2026-02-27'
---

# ActiveCampaign Automation

Skill ini memandu otomasi operasi ActiveCampaign untuk CRM dan marketing automation. Fokusnya adalah workflow inti seperti membuat atau mencari kontak, mengelola tag, subscription list, enrollment ke automation, dan pembuatan task follow-up.

## Kapan digunakan

Gunakan saat:
- mengotomasi pembuatan atau pencarian kontak ActiveCampaign
- menambah atau menghapus tag pada kontak
- subscribe atau unsubscribe kontak dari list tertentu
- memasukkan kontak ke automation yang sudah ada
- membuat task follow-up yang terkait dengan kontak

## Jangan gunakan saat

Jangan gunakan saat:
- belum ada koneksi atau akses sah ke akun ActiveCampaign
- user meminta membuat automation baru dari nol melalui API padahal workflow hanya mendukung enrollment
- list ID, automation ID, atau task type ID belum diketahui dan tidak bisa diresolusikan

## Prinsip inti

- cari kontak lebih dulu sebelum operasi lanjutan bila identitas kontak belum pasti
- bedakan dengan ketat antara email, contact ID, list ID, automation ID, dan task type ID
- perhatikan kapitalisasi parameter action karena beberapa operasi sensitif terhadap nilai exact
- parse respons secara defensif karena struktur data bisa bervariasi
- hormati rate limit dan gunakan backoff bila terjadi throttling

## Entitas penting

- contact: biasanya diidentifikasi dengan email atau contact ID
- tag: dapat ditambah atau dihapus dari kontak
- list subscription: relasi kontak dengan mailing list
- automation enrollment: memasukkan kontak ke automation yang sudah aktif
- contact task: task CRM yang terkait dengan kontak tertentu

## Alur kerja inti

### 1. Cari atau buat kontak

Gunakan saat perlu memastikan kontak sudah ada.

Informasi penting:
- `email` biasanya menjadi identifier utama
- pencarian juga bisa memakai `id` atau `phone`
- membuat kontak dengan email yang sudah ada dapat berperilaku seperti update tergantung implementasi integrasi

Perhatikan:
- email adalah field minimum yang paling penting
- pencarian berdasarkan phone bisa menghasilkan partial match
- jika hasil pencarian lebih dari satu, cocokkan kembali dengan email untuk akurasi

### 2. Kelola tag kontak

Gunakan setelah kontak teridentifikasi.

Parameter penting:
- `action`: `Add` atau `Remove`
- `tags`: string dipisah koma atau array string
- `contact_id` atau `contact_email`

Perhatikan:
- nilai action untuk tag memakai huruf kapital awal: `Add` atau `Remove`
- menambah tag yang belum ada bisa membuat tag baru secara otomatis
- menghapus tag yang tidak ada biasanya tidak menghasilkan error berarti

### 3. Kelola subscription list

Gunakan untuk subscribe atau unsubscribe kontak dari list.

Parameter penting:
- `action`: `subscribe` atau `unsubscribe`
- `list_id`: ID list dalam bentuk string numerik
- `email` atau `contact_id`

Perhatikan:
- action untuk subscription memakai huruf kecil semua
- `list_id` adalah ID numerik, bukan nama list
- unsubscribe biasanya mengubah status relasi, bukan selalu menghapus record relasi

### 4. Tambahkan kontak ke automation

Gunakan untuk enrollment ke automation yang sudah ada.

Parameter penting:
- `contact_email`
- `automation_id`

Perhatikan:
- kontak harus sudah ada lebih dulu
- automation harus sudah dibuat dan aktif
- skill ini hanya mencakup enrollment, bukan pembuatan automation baru

### 5. Buat task kontak

Gunakan untuk follow-up CRM.

Parameter penting:
- `relid`: contact ID numerik
- `duedate`: format ISO 8601 dengan timezone
- `dealTasktype`: ID tipe task
- `title`
- `note`
- `assignee`
- `edate`
- `status`

Perhatikan:
- `duedate` harus valid dan lengkap dengan timezone
- `edate` harus lebih lambat dari `duedate`
- `relid` adalah contact ID, bukan email
- `assignee` biasanya berupa user ID, bukan nama tampilan

## Pola workflow yang direkomendasikan

### Lookup lalu aksi
1. cari kontak dengan email
2. ambil contact ID bila ditemukan
3. jalankan operasi lanjutan memakai ID bila memungkinkan

### Bulk tagging
1. siapkan daftar kontak target
2. gunakan email atau contact ID yang sudah tervalidasi
3. jalankan tagging bertahap dengan jeda yang wajar
4. catat hasil sukses dan gagal

### Enrollment automation
1. verifikasi kontak ada
2. verifikasi automation ID benar
3. enroll kontak
4. catat hasil untuk audit atau retry

## Validasi yang wajib diperhatikan

- kapitalisasi action benar sesuai jenis operasi
- semua ID dikirim sebagai string bila integrasi mengharuskannya
- email cocok dengan kontak yang dimaksud
- due date dan end date valid
- automation dan list benar-benar ada
- respons diparse defensif karena nesting bisa berbeda

## Checklist cepat

- koneksi ActiveCampaign aktif
- kontak target teridentifikasi dengan benar
- action sesuai operasi dan kapitalisasi benar
- list ID atau automation ID valid
- task date memakai ISO 8601 dengan timezone
- rate limit dipertimbangkan untuk operasi batch
- hasil operasi dicatat untuk retry atau audit

## Anti-pattern

Hindari:
- mencampur email dan contact ID tanpa aturan prioritas yang jelas
- memakai nama list sebagai pengganti list ID
- menganggap automation bisa dibuat lewat workflow ini
- mengirim action dengan kapitalisasi salah
- menjalankan batch besar tanpa backoff atau pencatatan hasil
- mengasumsikan struktur respons selalu identik

## Catatan kompatibilitas KiloCode

Skill upstream bergantung pada Rube MCP dan nama tool spesifik pihak ketiga. Pada adaptasi KiloCode ini, dependensi eksternal tersebut dinormalisasi menjadi playbook workflow ActiveCampaign yang mandiri agar tetap berguna meski nama tool integrasi berbeda.