---
name: slack-automation
description: Gunakan saat perlu mengotomasi Slack melalui Rube MCP untuk messaging, pencarian pesan, channel management, DM, reaction, thread, dan penjadwalan pesan.
license: Complete terms in LICENSE.txt
metadata:
  category: automation
  source:
    upstream: .tmp-antigravity-skills/skills/slack-automation
    type: community
  depends_on:
    - Rube MCP
    - koneksi Slack aktif di Rube
---

# Slack Automation

Skill ini memandu otomasi Slack melalui toolkit Slack di Rube MCP.

## Kapan digunakan

Gunakan skill ini saat perlu:
- mengirim pesan ke channel atau DM
- mencari pesan dan membaca thread
- melihat daftar channel, user, atau info workspace
- menambahkan atau menghapus reaction
- menjadwalkan pesan untuk dikirim nanti

## Prasyarat

- Pastikan `RUBE_SEARCH_TOOLS` tersedia.
- Pastikan koneksi `slack` aktif melalui `RUBE_MANAGE_CONNECTIONS`.
- Selalu mulai dengan `RUBE_SEARCH_TOOLS` untuk mengambil skema tool terbaru.

## Alur kerja inti

### 1. Kirim pesan ke channel atau DM

Urutan kerja:
1. `SLACK_FIND_CHANNELS` untuk resolve nama channel ke ID.
2. `SLACK_LIST_ALL_CHANNELS` bila hasil pencarian kosong atau ambigu.
3. `SLACK_FIND_USERS` untuk resolve user.
4. `SLACK_OPEN_DM` bila perlu DM.
5. `SLACK_SEND_MESSAGE` untuk mengirim pesan.
6. `SLACK_UPDATES_A_SLACK_MESSAGE` bila perlu edit pesan.

Parameter penting:
- `channel`
- `markdown_text`
- `text`
- `thread_ts`
- `blocks`

Praktik yang direkomendasikan:
- Prioritaskan `markdown_text` untuk formatting.
- Simpan `channel` dan `message.ts` dari respons kirim pesan untuk edit atau reply berikutnya.

Pitfall utama:
- `SLACK_FIND_CHANNELS` memerlukan `query`.
- Reply akan menjadi pesan top-level bila `thread_ts` tidak diisi.
- Payload blocks yang tidak valid akan gagal.

### 2. Cari pesan dan percakapan

Urutan kerja:
1. `SLACK_FIND_CHANNELS` bila ingin membatasi pencarian ke channel tertentu.
2. `SLACK_FIND_USERS` bila ingin filter berdasarkan pengirim.
3. `SLACK_SEARCH_MESSAGES`.
4. `SLACK_FETCH_MESSAGE_THREAD_FROM_A_CONVERSATION` untuk membaca thread lengkap.

Parameter penting:
- `query`
- `count`
- `sort`
- `sort_dir`

Modifier query yang berguna:
- `in:#channel`
- `from:@user`
- `before:YYYY-MM-DD`
- `after:YYYY-MM-DD`
- `has:link`
- `has:file`

Pitfall utama:
- `ok=true` tidak berarti ada hasil.
- Teks hasil pencarian bisa terpotong atau kosong; cek attachment bila perlu.
- Thread panjang mungkin perlu pagination tambahan.

### 3. Kelola channel dan user

Urutan kerja:
1. `SLACK_FETCH_TEAM_INFO`
2. `SLACK_LIST_ALL_CHANNELS`
3. `SLACK_LIST_CONVERSATIONS`
4. `SLACK_LIST_ALL_USERS`
5. `SLACK_RETRIEVE_CONVERSATION_INFORMATION`
6. `SLACK_LIST_USER_GROUPS_FOR_TEAM_WITH_OPTIONS`

Parameter penting:
- `cursor`
- `limit`
- `types`

Catatan:
- `SLACK_LIST_ALL_CHANNELS` biasanya hanya channel publik.
- Gunakan `SLACK_LIST_CONVERSATIONS` untuk private channel dan DM.
- Pagination memakai `response_metadata.next_cursor`.

### 4. Reaction dan thread

Urutan kerja:
1. `SLACK_SEARCH_MESSAGES` atau `SLACK_FETCH_CONVERSATION_HISTORY` untuk menemukan pesan target.
2. `SLACK_ADD_REACTION_TO_AN_ITEM`.
3. `SLACK_FETCH_ITEM_REACTIONS` bila perlu melihat reaction.
4. `SLACK_REMOVE_REACTION_FROM_ITEM` bila perlu menghapus reaction.
5. `SLACK_SEND_MESSAGE` dengan `thread_ts` untuk reply thread.
6. `SLACK_FETCH_MESSAGE_THREAD_FROM_A_CONVERSATION` untuk membaca seluruh thread.

Parameter penting:
- `channel`
- `timestamp` atau `ts`
- `name`
- `thread_ts`

Pitfall utama:
- Reaction memerlukan pasangan channel ID dan timestamp yang tepat.
- Nama emoji ditulis tanpa titik dua.
- History channel biasa tidak otomatis memuat reply thread.

### 5. Jadwalkan pesan

Urutan kerja:
1. `SLACK_FIND_CHANNELS` untuk resolve channel.
2. `SLACK_SCHEDULE_MESSAGE` dengan `post_at`.

Parameter penting:
- `channel`
- `post_at` dalam Unix timestamp
- `text` atau `blocks`

Pitfall utama:
- Penjadwalan dibatasi hingga sekitar 120 hari ke depan.
- `post_at` harus Unix timestamp, bukan ISO 8601.

## Pola kerja yang direkomendasikan

### Resolusi ID

- Channel name ke channel ID: `SLACK_FIND_CHANNELS`
- User name atau email ke user ID: `SLACK_FIND_USERS`
- DM channel: `SLACK_OPEN_DM`

### Formatting pesan

- Gunakan `markdown_text` untuk pesan terformat.
- Mention user dengan format `<@USER_ID>`.
- Gunakan `\n` untuk line break.

### Pagination

- Ikuti `response_metadata.next_cursor` sampai kosong.
- Tetapkan `limit` eksplisit untuk workspace besar.
- Lakukan deduplikasi berdasarkan `id` bila perlu.

## Pitfall penting

- Channel privat bisa tidak muncul bila bot belum diundang.
- Banyak endpoint list dapat terkena 429; hormati `Retry-After`.
- Respons bisa nested cukup dalam; parsing harus defensif.
- Pesan yang baru dikirim mungkin belum langsung muncul di search.
- Scope OAuth yang kurang dapat menyebabkan 403.

## Checklist eksekusi

1. Panggil `RUBE_SEARCH_TOOLS`.
2. Pastikan koneksi `slack` aktif.
3. Resolve channel atau user ke ID.
4. Jalankan operasi inti.
5. Simpan `channel` dan `ts` untuk operasi lanjutan.
6. Verifikasi hasil dengan membaca history, thread, atau reaction terkait.

## Referensi tool cepat

- `SLACK_FIND_CHANNELS`
- `SLACK_LIST_ALL_CHANNELS`
- `SLACK_LIST_CONVERSATIONS`
- `SLACK_SEND_MESSAGE`
- `SLACK_UPDATES_A_SLACK_MESSAGE`
- `SLACK_SEARCH_MESSAGES`
- `SLACK_FETCH_MESSAGE_THREAD_FROM_A_CONVERSATION`
- `SLACK_ADD_REACTION_TO_AN_ITEM`
- `SLACK_FETCH_ITEM_REACTIONS`
- `SLACK_REMOVE_REACTION_FROM_ITEM`
- `SLACK_FIND_USERS`
- `SLACK_LIST_ALL_USERS`
- `SLACK_OPEN_DM`
- `SLACK_SCHEDULE_MESSAGE`
- `SLACK_RETRIEVE_CONVERSATION_INFORMATION`
- `SLACK_FETCH_CONVERSATION_HISTORY`
- `SLACK_FETCH_TEAM_INFO`
- `SLACK_LIST_USER_GROUPS_FOR_TEAM_WITH_OPTIONS`

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/slack-automation` agar mandiri dan konsisten untuk format KiloCode.
