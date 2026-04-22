---
name: sendgrid-automation
description: Gunakan saat perlu mengotomasi SendGrid melalui Rube MCP untuk kampanye email, kontak dan list marketing, sender identity, suppression, serta analitik pengiriman email.
license: Complete terms in LICENSE.txt
metadata:
  category: automation
  source:
    upstream: .tmp-antigravity-skills/skills/sendgrid-automation
    type: community
  depends_on:
    - Rube MCP
    - koneksi SendGrid aktif di Rube
---

# SendGrid Automation

Skill ini memandu otomasi SendGrid melalui toolkit SendGrid di Rube MCP.

## Kapan digunakan

Gunakan skill ini saat perlu:
- membuat dan mengirim kampanye marketing email
- mengelola contact list dan kontak marketing
- menyiapkan atau memeriksa sender identity
- melihat statistik pengiriman, open, click, bounce, dan activity
- memeriksa suppression group untuk kepatuhan unsubscribe

## Prasyarat

- Pastikan `RUBE_SEARCH_TOOLS` tersedia.
- Pastikan koneksi `sendgrid` aktif melalui `RUBE_MANAGE_CONNECTIONS`.
- Selalu mulai dengan `RUBE_SEARCH_TOOLS` untuk mengambil skema tool terbaru.

## Alur kerja inti

### 1. Buat dan kirim kampanye marketing

Gunakan saat perlu membuat Single Send.

Urutan kerja:
1. `SENDGRID_RETRIEVE_ALL_LISTS` untuk melihat list target.
2. `SENDGRID_CREATE_A_LIST` bila list belum ada.
3. `SENDGRID_ADD_OR_UPDATE_A_CONTACT` untuk menambahkan kontak ke list.
4. `SENDGRID_GET_ALL_SENDER_IDENTITIES` untuk memilih sender terverifikasi.
5. `SENDGRID_CREATE_SINGLE_SEND` untuk membuat kampanye.

Parameter penting pada `SENDGRID_CREATE_SINGLE_SEND`:
- `name`
- `email__config__subject`
- `email__config__html__content`
- `email__config__plain__content`
- `email__config__sender__id`
- `send__to__list__ids`
- `send__to__segment__ids`
- `send__to__all`
- `email__config__suppression__group__id` atau `email__config__custom__unsubscribe__url`

Pitfall utama:
- `send_at` saat create tidak otomatis menjadwalkan pengiriman.
- Untuk compliance, wajib ada suppression group atau custom unsubscribe URL.
- Sender harus sudah diverifikasi.
- Banyak parameter nested memakai notasi double underscore.

### 2. Kelola kontak dan list

Gunakan saat perlu membuat list, upsert kontak, mencari kontak, atau menghapus kontak dari list.

Urutan kerja:
1. `SENDGRID_RETRIEVE_ALL_LISTS`
2. `SENDGRID_CREATE_A_LIST`
3. `SENDGRID_GET_A_LIST_BY_ID`
4. `SENDGRID_ADD_OR_UPDATE_A_CONTACT`
5. `SENDGRID_GET_CONTACTS_BY_EMAILS`
6. `SENDGRID_GET_CONTACTS_BY_IDENTIFIERS`
7. `SENDGRID_GET_LIST_CONTACT_COUNT`
8. `SENDGRID_REMOVE_CONTACTS_FROM_A_LIST`
9. `SENDGRID_REMOVE_LIST_AND_OPTIONAL_CONTACTS`
10. `SENDGRID_IMPORT_CONTACTS`

Parameter penting:
- `contacts`
- `list_ids`
- `emails`
- `identifier_type`
- `identifiers`

Pitfall utama:
- Upsert kontak bersifat asynchronous dan biasanya mengembalikan `job_id`.
- Tunggu beberapa detik lalu verifikasi hasil.
- List ID marketing berbentuk UUID, bukan integer.
- Nama list harus unik.
- Penghapusan list bersifat irreversible.

### 3. Kelola sender identity

Gunakan saat perlu melihat atau membuat sender baru.

Urutan kerja:
1. `SENDGRID_GET_ALL_SENDER_IDENTITIES`
2. `SENDGRID_CREATE_A_SENDER_IDENTITY`
3. `SENDGRID_VIEW_A_SENDER_IDENTITY`
4. `SENDGRID_UPDATE_A_SENDER_IDENTITY`
5. `SENDGRID_CREATE_VERIFIED_SENDER_REQUEST`
6. `SENDGRID_AUTHENTICATE_A_DOMAIN`

Parameter penting:
- `from__email`
- `from__name`
- `reply__to__email`
- `nickname`
- `address`, `city`, `country`

Catatan:
- Sender baru harus diverifikasi sebelum dipakai.
- Hindari domain dengan DMARC ketat seperti domain email publik untuk alamat pengirim.

### 4. Lihat statistik dan activity email

Gunakan saat perlu audit performa pengiriman.

Urutan kerja:
1. `SENDGRID_RETRIEVE_GLOBAL_EMAIL_STATISTICS`
2. `SENDGRID_GET_ALL_CATEGORIES`
3. `SENDGRID_RETRIEVE_EMAIL_STATISTICS_FOR_CATEGORIES`
4. `SENDGRID_FILTER_ALL_MESSAGES`
5. `SENDGRID_FILTER_MESSAGES_BY_MESSAGE_ID`
6. `SENDGRID_REQUEST_CSV`
7. `SENDGRID_DOWNLOAD_CSV`

Parameter penting:
- `start_date`
- `end_date`
- `aggregated_by`
- `query`
- `limit`

Pitfall utama:
- Activity feed penuh dapat memerlukan add-on berbayar.
- Statistik global sering nested di struktur respons, bukan flat.
- Export CSV dibatasi frekuensi dan masa berlaku link.

### 5. Kelola suppression

Gunakan saat perlu memeriksa status unsubscribe atau suppression group.

Urutan kerja:
1. `SENDGRID_GET_SUPPRESSION_GROUPS`
2. `SENDGRID_RETRIEVE_ALL_SUPPRESSION_GROUPS_FOR_AN_EMAIL_ADDRESS`

Catatan:
- Kontak yang tersuppress tetap tidak dapat dikirimi walau ada di list.
- Jumlah penerima aktual kampanye bisa lebih kecil dari jumlah list karena suppression.

## Pola kerja yang direkomendasikan

### Resolusi ID

Selalu resolve nama ke ID sebelum operasi:
- list name ke list ID melalui `SENDGRID_RETRIEVE_ALL_LISTS`
- sender name ke sender ID melalui `SENDGRID_GET_ALL_SENDER_IDENTITIES`
- contact email ke contact ID melalui `SENDGRID_GET_CONTACTS_BY_EMAILS`

### Operasi async

Untuk upsert atau import kontak:
1. Jalankan operasi.
2. Simpan `job_id` bila tersedia.
3. Tunggu 10-30 detik.
4. Verifikasi dengan pencarian kontak atau hitung isi list.

## Pitfall penting

- Marketing list ID berbentuk UUID.
- Sender identity ID sering berupa integer.
- Dynamic template ID biasanya diawali `d-`.
- Banyak endpoint lama dan endpoint Marketing API hidup berdampingan; prioritaskan endpoint Marketing API.
- Hormati `Retry-After` saat menerima 429.

## Checklist eksekusi

1. Panggil `RUBE_SEARCH_TOOLS`.
2. Pastikan koneksi `sendgrid` aktif.
3. Resolve list, sender, atau contact ke ID yang benar.
4. Jalankan operasi inti.
5. Untuk operasi async, tunggu lalu verifikasi.
6. Pastikan compliance unsubscribe terpenuhi sebelum pengiriman kampanye.

## Referensi tool cepat

- `SENDGRID_RETRIEVE_ALL_LISTS`
- `SENDGRID_CREATE_A_LIST`
- `SENDGRID_GET_A_LIST_BY_ID`
- `SENDGRID_GET_LIST_CONTACT_COUNT`
- `SENDGRID_ADD_OR_UPDATE_A_CONTACT`
- `SENDGRID_GET_CONTACTS_BY_EMAILS`
- `SENDGRID_GET_CONTACTS_BY_IDENTIFIERS`
- `SENDGRID_REMOVE_CONTACTS_FROM_A_LIST`
- `SENDGRID_REMOVE_LIST_AND_OPTIONAL_CONTACTS`
- `SENDGRID_IMPORT_CONTACTS`
- `SENDGRID_CREATE_SINGLE_SEND`
- `SENDGRID_GET_ALL_SENDER_IDENTITIES`
- `SENDGRID_CREATE_A_SENDER_IDENTITY`
- `SENDGRID_CREATE_VERIFIED_SENDER_REQUEST`
- `SENDGRID_AUTHENTICATE_A_DOMAIN`
- `SENDGRID_RETRIEVE_GLOBAL_EMAIL_STATISTICS`
- `SENDGRID_RETRIEVE_EMAIL_STATISTICS_FOR_CATEGORIES`
- `SENDGRID_FILTER_ALL_MESSAGES`
- `SENDGRID_FILTER_MESSAGES_BY_MESSAGE_ID`
- `SENDGRID_REQUEST_CSV`
- `SENDGRID_DOWNLOAD_CSV`
- `SENDGRID_GET_SUPPRESSION_GROUPS`

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/sendgrid-automation` agar mandiri dan konsisten untuk format KiloCode.
