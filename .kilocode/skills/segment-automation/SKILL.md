---
name: segment-automation
description: Gunakan saat perlu mengotomasi Segment melalui Rube MCP untuk mengirim track event, identify user, group, page view, alias, dan batch operasi customer data platform.
license: Complete terms in LICENSE.txt
metadata:
  category: automation
  source:
    upstream: .tmp-antigravity-skills/skills/segment-automation
    type: community
  depends_on:
    - Rube MCP
    - koneksi Segment aktif di Rube
---

# Segment Automation

Skill ini memandu otomasi Segment melalui toolkit Segment di Rube MCP.

## Kapan digunakan

Gunakan skill ini saat perlu:
- mengirim event tracking ke Segment
- mengidentifikasi user dan memperbarui traits
- mengasosiasikan user ke group atau organisasi
- mencatat page view dari sisi server atau workflow backend
- melakukan alias antara anonymous user dan identified user
- mengirim banyak message sekaligus melalui batch

## Prasyarat

- Pastikan `RUBE_SEARCH_TOOLS` tersedia.
- Pastikan koneksi `segment` aktif melalui `RUBE_MANAGE_CONNECTIONS`.
- Selalu mulai dengan `RUBE_SEARCH_TOOLS` untuk mengambil skema tool terbaru.

## Alur kerja inti

### 1. Track event

Gunakan `SEGMENT_TRACK` untuk mengirim event tunggal.

Parameter penting:
- `userId` atau `anonymousId`
- `event`
- `properties`
- `timestamp` dalam format ISO 8601
- `context`

Pitfall utama:
- Minimal salah satu dari `userId` atau `anonymousId` wajib ada.
- Nama event harus konsisten lintas sumber.
- Respons sukses berarti event diterima, bukan pasti sudah terkirim ke semua destination.

### 2. Identify user

Gunakan `SEGMENT_IDENTIFY` untuk menetapkan traits user.

Parameter penting:
- `userId` atau `anonymousId`
- `traits`
- `timestamp`
- `context`

Catatan penting:
- Traits digabung dengan traits lama, bukan mengganti seluruh profil.
- Untuk menghapus trait, set nilainya ke `null`.
- Untuk user baru, identify sebaiknya dilakukan sebelum track event lanjutan.

### 3. Batch operations

Gunakan `SEGMENT_BATCH` untuk mengirim banyak message sekaligus.

Parameter penting:
- `batch`: array message dengan `type` seperti `track`, `identify`, `group`, `page`, atau `alias`.

Pitfall utama:
- Setiap message harus valid secara mandiri.
- Satu message gagal tidak otomatis menggagalkan message lain.
- Batch lebih efisien daripada banyak request tunggal.

### 4. Group user

Gunakan `SEGMENT_GROUP` untuk menghubungkan user dengan organisasi atau akun.

Parameter penting:
- `userId` atau `anonymousId`
- `groupId`
- `traits`
- `timestamp`

Catatan:
- `groupId` wajib ada.
- Group traits memperbarui profil group, bukan profil user.
- User dapat tergabung ke lebih dari satu group.

### 5. Track page view

Gunakan `SEGMENT_PAGE` untuk mencatat page view.

Parameter penting:
- `userId` atau `anonymousId`
- `name`
- `category`
- `properties` seperti `url`, `title`, `referrer`, `path`, `search`

Catatan:
- `name` dan `category` opsional tetapi sangat membantu kualitas analitik.
- Cocok untuk tracking server-side atau workflow non-browser.

### 6. Alias user dan kelola source

Gunakan saat perlu menggabungkan identitas anonymous dan identified user.

Urutan kerja:
1. `SEGMENT_ALIAS` untuk menghubungkan `previousId` ke `userId`.
2. `SEGMENT_LIST_SCHEMA_SETTINGS_IN_SOURCE` bila perlu melihat konfigurasi schema source.
3. `SEGMENT_UPDATE_SOURCE` bila perlu memperbarui konfigurasi source.

Pitfall utama:
- Alias bersifat satu arah dan praktis tidak dapat dibatalkan.
- `previousId` adalah ID lama atau anonymous, `userId` adalah ID baru yang teridentifikasi.
- Tidak semua destination mendukung alias.

## Pola kerja yang direkomendasikan

### Lifecycle user standar

1. User anonim membuka halaman: `SEGMENT_PAGE` dengan `anonymousId`.
2. User berinteraksi: `SEGMENT_TRACK` dengan `anonymousId`.
3. User signup atau login: `SEGMENT_ALIAS`, lalu `SEGMENT_IDENTIFY`.
4. User melakukan aksi lanjutan: `SEGMENT_TRACK` dengan `userId`.
5. User bergabung ke organisasi: `SEGMENT_GROUP`.

### Konvensi penamaan

- Event: format `Object Action`, misalnya `Order Completed`.
- Properties: gunakan `snake_case`.
- Traits: gunakan `snake_case`.

## Pitfall penting

- Selalu sertakan `userId` atau `anonymousId` pada setiap call.
- Gunakan alias hanya sekali saat transisi identitas.
- Hindari mengirim PII sensitif kecuali destination sudah dikonfigurasi dengan benar.
- Timestamp harus ISO 8601 dengan timezone.
- Batch response perlu diperiksa untuk error per message.

## Checklist eksekusi

1. Panggil `RUBE_SEARCH_TOOLS`.
2. Pastikan koneksi `segment` aktif.
3. Tentukan jenis message yang dibutuhkan.
4. Validasi identifier user atau group.
5. Jalankan operasi inti atau batch.
6. Verifikasi penerimaan data sesuai kebutuhan workflow.

## Referensi tool cepat

- `SEGMENT_TRACK`
- `SEGMENT_IDENTIFY`
- `SEGMENT_BATCH`
- `SEGMENT_GROUP`
- `SEGMENT_PAGE`
- `SEGMENT_ALIAS`
- `SEGMENT_LIST_SCHEMA_SETTINGS_IN_SOURCE`
- `SEGMENT_UPDATE_SOURCE`

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/segment-automation` agar mandiri dan konsisten untuk format KiloCode.
