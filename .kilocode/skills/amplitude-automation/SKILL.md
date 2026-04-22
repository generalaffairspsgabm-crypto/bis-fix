---
name: amplitude-automation
description: Gunakan saat perlu mengotomasi Amplitude melalui Rube MCP untuk mengirim event, mencari user, membaca aktivitas user, mengelola cohort, dan memperbarui user properties.
license: Complete terms in LICENSE.txt
metadata:
  category: automation
  source:
    upstream: .tmp-antigravity-skills/skills/amplitude-automation
    type: community
  depends_on:
    - Rube MCP
    - koneksi Amplitude aktif di Rube
---

# Amplitude Automation

Skill ini memandu otomasi Amplitude melalui toolkit Amplitude di Rube MCP.

## Kapan digunakan

Gunakan skill ini saat perlu:
- mengirim event analytics ke Amplitude
- mencari user berdasarkan identifier
- membaca riwayat aktivitas event user
- memperbarui user properties dengan operasi identify
- melihat cohort dan memperbarui membership cohort
- meninjau kategori event yang tersedia

## Prasyarat

- Pastikan `RUBE_SEARCH_TOOLS` tersedia.
- Pastikan koneksi `amplitude` aktif melalui `RUBE_MANAGE_CONNECTIONS`.
- Selalu panggil `RUBE_SEARCH_TOOLS` terlebih dahulu untuk mengambil skema tool terbaru.

## Alur kerja inti

### 1. Kirim event

Gunakan `AMPLITUDE_SEND_EVENTS` untuk mengirim satu atau banyak event.

Parameter penting per event:
- `event_type`: nama event, wajib.
- `user_id`: ID user aplikasi.
- `device_id`: ID perangkat bila tidak ada `user_id`.
- `event_properties`: properti event.
- `user_properties`: properti user yang ikut diset.
- `time`: timestamp dalam milidetik sejak epoch.

Aturan penting:
- Minimal salah satu dari `user_id` atau `device_id` harus ada.
- `time` harus 13 digit milidetik, bukan detik.
- Respons sukses berarti event diterima untuk diproses, bukan langsung tersedia untuk query.

### 2. Cari user dan baca aktivitasnya

Gunakan saat perlu melihat histori event user tertentu.

Urutan kerja:
1. `AMPLITUDE_FIND_USER` untuk mencari user berdasarkan `user_id`, email, atau identifier lain.
2. Ambil internal user ID Amplitude dari hasil pencarian.
3. `AMPLITUDE_GET_USER_ACTIVITY` menggunakan internal user ID tersebut.

Parameter penting:
- `user`: pada `FIND_USER`, isi dengan istilah pencarian.
- `user`: pada `GET_USER_ACTIVITY`, isi dengan internal user ID Amplitude.
- `offset`: pagination aktivitas.
- `limit`: jumlah event yang diambil.

Pitfall utama:
- `GET_USER_ACTIVITY` tidak memakai `user_id` aplikasi secara langsung.
- Selalu resolve dulu ke internal user ID Amplitude.
- Aktivitas biasanya dikembalikan dalam urutan terbaru ke terlama.

### 3. Identify user dan kelola user properties

Gunakan `AMPLITUDE_IDENTIFY` untuk memperbarui properti user.

Parameter penting:
- `user_id` atau `device_id`
- `user_properties`

Operasi properti yang umum:
- `$set`: set nilai dan menimpa nilai lama.
- `$setOnce`: set hanya jika belum ada.
- `$add`: menambah nilai numerik.
- `$append`: menambah item ke list.
- `$unset`: menghapus properti.

Contoh struktur:
```json
{
  "user_properties": {
    "$set": {"plan": "premium"},
    "$add": {"login_count": 1}
  }
}
```

Catatan:
- Perubahan properti bersifat eventual consistency.
- Minimal salah satu dari `user_id` atau `device_id` wajib ada.

### 4. Kelola cohort

Gunakan saat perlu melihat cohort atau memperbarui membership.

Urutan kerja:
1. `AMPLITUDE_LIST_COHORTS` untuk daftar cohort.
2. `AMPLITUDE_GET_COHORT` untuk detail cohort tertentu.
3. `AMPLITUDE_UPDATE_COHORT_MEMBERSHIP` untuk menambah atau menghapus anggota.
4. `AMPLITUDE_CHECK_COHORT_STATUS` untuk memeriksa status operasi async.

Parameter penting:
- `cohort_id`
- `memberships` dengan `add` dan/atau `remove`
- `request_id` dari respons update membership

Pitfall utama:
- Update membership cohort bersifat asynchronous.
- Simpan `request_id` lalu polling status sampai selesai atau gagal.
- Untuk perubahan besar, pecah menjadi beberapa batch.

### 5. Lihat kategori event

Gunakan `AMPLITUDE_GET_EVENT_CATEGORIES` untuk menemukan kategori event yang tersedia.

Manfaat:
- memvalidasi `event_type`
- memahami struktur event yang sudah dikonfigurasi di Amplitude

## Pola kerja yang direkomendasikan

### Resolusi ID user

Gunakan pola berikut:
1. `AMPLITUDE_FIND_USER` dengan identifier aplikasi.
2. Ambil internal user ID dari hasil.
3. Gunakan internal ID itu untuk `AMPLITUDE_GET_USER_ACTIVITY`.

### Resolusi cohort

Gunakan pola berikut:
1. `AMPLITUDE_LIST_COHORTS`.
2. Cari cohort berdasarkan nama.
3. Ambil `id` untuk operasi lanjutan.

### Operasi async

Untuk update membership cohort:
1. Jalankan `AMPLITUDE_UPDATE_COHORT_MEMBERSHIP`.
2. Simpan `request_id`.
3. Jalankan `AMPLITUDE_CHECK_COHORT_STATUS` sampai status selesai.

## Pitfall penting

- Timestamp event harus milidetik, bukan detik.
- Respons sukses ingestion tidak berarti data langsung bisa dibaca.
- Internal user ID Amplitude berbeda dari `user_id` aplikasi.
- Batch besar sebaiknya dipecah untuk menghindari limit throughput.
- Parsing respons perlu defensif karena data bisa berada di bawah key `data`.

## Checklist eksekusi

1. Panggil `RUBE_SEARCH_TOOLS`.
2. Pastikan koneksi `amplitude` aktif.
3. Resolve identifier user atau cohort sebelum operasi spesifik.
4. Jalankan operasi inti.
5. Untuk operasi async, polling status sampai final.
6. Verifikasi hasil dengan pembacaan ulang data terkait.

## Referensi tool cepat

- `AMPLITUDE_SEND_EVENTS`
- `AMPLITUDE_FIND_USER`
- `AMPLITUDE_GET_USER_ACTIVITY`
- `AMPLITUDE_IDENTIFY`
- `AMPLITUDE_LIST_COHORTS`
- `AMPLITUDE_GET_COHORT`
- `AMPLITUDE_UPDATE_COHORT_MEMBERSHIP`
- `AMPLITUDE_CHECK_COHORT_STATUS`
- `AMPLITUDE_GET_EVENT_CATEGORIES`

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/amplitude-automation` agar mandiri dan konsisten untuk format KiloCode.
