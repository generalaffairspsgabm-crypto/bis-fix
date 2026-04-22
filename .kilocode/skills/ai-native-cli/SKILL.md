---
name: ai-native-cli
description: Gunakan saat merancang, membangun, atau mengaudit CLI agar aman dan mudah dipakai agent AI, dengan kontrak JSON yang stabil, error terstruktur, guardrail input, exit code yang konsisten, dan self-description yang dapat ditemukan otomatis.
license: Complete terms in LICENSE.txt
metadata:
  category: developer-tools
  source:
    upstream: .tmp-antigravity-skills/skills/ai-native-cli
    type: external-spec
  depends_on:
    - akses ke kode atau spesifikasi CLI yang sedang dirancang atau diaudit
---

# AI Native CLI

Skill ini merangkum spesifikasi CLI yang ramah agent. Tujuannya adalah membuat command-line tool berperilaku seperti API yang stabil: output default dapat diparse mesin, error konsisten, tidak interaktif secara diam-diam, dan aman terhadap input berbahaya atau penggunaan agent yang keliru.

## Kapan digunakan

Gunakan skill ini saat perlu:
- membangun CLI baru yang akan dipanggil agent AI atau pipeline otomatis
- meretrofit CLI lama agar lebih aman dan dapat diparse mesin
- mengaudit kualitas kontrak CLI untuk automation
- mendefinisikan standar output, error, dan guardrail pada tool internal

## Tujuan utama

- menjadikan CLI sebagai antarmuka yang stabil untuk agent
- memastikan output default berbentuk JSON yang konsisten
- memisahkan data, log, dan error dengan disiplin yang jelas
- mencegah prompt interaktif, path traversal, kebocoran secret, dan input berbahaya
- menyediakan self-description agar agent dapat menemukan kemampuan tool tanpa trial and error

## Filosofi inti

1. **Agent-first**: mode default adalah mode mesin, bukan mode manusia.
2. **Agent dianggap tidak tepercaya**: validasi input setara endpoint publik.
3. **Fail-closed**: jika validasi atau guardrail gagal, tolak eksekusi.
4. **Verifiable**: aturan harus bisa diuji secara otomatis.

## Kontrak dasar CLI ramah agent

### 1. Output default harus JSON

Tanpa flag tambahan, command harus mengembalikan JSON valid ke `stdout`.

Contoh perilaku yang diharapkan:

```bash
mycli list
mycli list --agent
mycli list --human
```

Aturan:
- default tanpa flag = JSON
- `--agent` = paksa mode JSON bila ada override konfigurasi
- `--human` = format ramah manusia seperti tabel, warna, atau progress bar

### 2. `stdout` hanya untuk data

Pisahkan kanal output:
- `stdout` hanya untuk payload data
- `stderr` untuk log, warning, progress, dan error

Ini penting agar agent dapat melakukan piping dan parsing tanpa noise.

### 3. Error harus terstruktur

Saat gagal, keluarkan error JSON yang konsisten ke `stderr`, misalnya:

```json
{
  "error": true,
  "code": "MISSING_REQUIRED",
  "message": "Parameter --file wajib diisi",
  "suggestion": "Tambahkan --file path/to/input.json"
}
```

Aturan penting:
- selalu ada `code` yang machine-readable
- selalu ada `message` yang mudah dipahami manusia
- idealnya ada `suggestion` yang dapat ditindaklanjuti
- jangan pernah masuk mode interaktif saat terjadi error

### 4. Exit code harus dapat diprediksi

Minimal gunakan kontrak berikut:
- `0` = sukses
- `2` = kesalahan parameter atau penggunaan
- non-zero lain = kegagalan runtime

Bila perlu, perluas dengan kode khusus seperti auth, permission, not-found, atau conflict, tetapi dokumentasikan secara stabil.

## Tiga level kematangan

### Level 1: Agent-Friendly

Fokus pada kontrak eksekusi dasar.

Checklist minimum:
- output default JSON valid
- skema output stabil dalam versi yang sama
- error terstruktur ke `stderr`
- parameter salah keluar dengan exit code `2`
- tidak ada prompt interaktif saat parameter kurang
- operasi destruktif butuh konfirmasi eksplisit seperti `--yes`
- tolak path traversal, karakter kontrol, dan input shell berbahaya

### Level 2: Agent-Ready

Fokus pada discoverability dan UX mesin yang lebih baik.

Tambahkan:
- `--help` yang dapat diparse mesin
- deklarasi parameter lengkap: tipe, wajib/opsional, default, enum bila ada
- penamaan flag konsisten dengan `--long-name`
- reserved flags yang seragam
- tidak ada state implisit yang membingungkan agent
- autentikasi non-interaktif

### Level 3: Agent-Native

Fokus pada identitas tool dan integrasi ekosistem agent.

Tambahkan:
- direktori `agent/` di root proyek
- `agent/brief.md` untuk identitas singkat tool
- `agent/rules/` untuk aturan penggunaan
- `agent/skills/` untuk kemampuan lanjutan
- respons yang dapat menyertakan konteks aturan, skill, dan mekanisme feedback
- sistem issue atau writeback agar agent bisa melaporkan masalah

## Struktur direktori yang direkomendasikan

```text
agent/
  brief.md
  rules/
    trigger.md
    workflow.md
    writeback.md
  skills/
    getting-started.md
```

Makna tiap bagian:
- `brief.md`: siapa tool ini dan apa yang bisa dilakukan
- `rules/trigger.md`: kapan agent sebaiknya memakai tool
- `rules/workflow.md`: alur penggunaan langkah demi langkah
- `rules/writeback.md`: cara menulis feedback atau issue
- `skills/`: kemampuan tambahan yang bisa dipanggil on-demand

## Reserved flags yang sebaiknya distandardkan

| Flag | Fungsi |
|---|---|
| `--agent` | paksa output JSON |
| `--human` | output ramah manusia |
| `--brief` | identitas singkat tool |
| `--help` | self-description lengkap |
| `--version` | versi semver |
| `--yes` | konfirmasi operasi destruktif |
| `--dry-run` | simulasi tanpa eksekusi |
| `--quiet` | kurangi noise di `stderr` |
| `--fields` | filter field output untuk hemat token |

## Aturan desain input

- gunakan flag panjang yang eksplisit, hindari ambiguitas positional argument
- semua parameter harus punya tipe yang jelas
- tandai parameter wajib dan opsional
- tolak unknown flags dengan exit code `2`
- jangan meminta input tambahan secara interaktif jika parameter kurang
- sediakan mode non-interaktif untuk autentikasi dan konfigurasi

## Guardrail keamanan yang penting

### Validasi input

Terapkan validasi seperti pada API publik:
- tolak path traversal seperti `../../`
- tolak karakter kontrol
- tolak shell metacharacters seperti `;`, `|`, `&&`, `$()` bila tidak memang dibutuhkan
- tolak path sensitif seperti `.env`, `.key`, `.pem` bila command tidak seharusnya menyentuhnya
- deteksi pola API key atau token pada argumen dan hentikan eksekusi bila berisiko bocor

### Operasi destruktif

Untuk delete, destroy, overwrite, atau mutasi besar:
- wajibkan `--yes`
- sediakan `--dry-run`
- tampilkan target yang akan diubah secara eksplisit
- jangan lakukan auto-update atau auto-fix tanpa persetujuan yang jelas

### Fail-closed

Jika mekanisme validasi sendiri error:
- jangan lanjutkan eksekusi
- kembalikan error terstruktur
- anggap kondisi tidak aman sampai terbukti aman

## Self-description untuk agent

CLI yang baik tidak memaksa agent menebak kemampuan tool. Minimal sediakan:

### `--brief`

Ringkasan satu paragraf tentang identitas tool.

### `--help`

Idealnya dapat diparse mesin dan memuat:
- daftar command
- deskripsi tiap command
- parameter dan tipenya
- aturan penggunaan penting
- daftar skill atau kemampuan tambahan bila ada

### Respons command

Untuk tool yang sangat agent-native, pertimbangkan menyertakan metadata seperti:
- `rules[]`
- `skills[]`
- `issue`

Namun jangan menambah metadata berlebihan jika itu justru membebani payload utama.

## Checklist audit cepat

1. Apakah `mycli command` tanpa flag menghasilkan JSON valid?
2. Apakah `stdout` bebas dari log dan progress?
3. Apakah semua error punya `code`, `message`, dan idealnya `suggestion`?
4. Apakah parameter salah selalu keluar dengan exit code `2`?
5. Apakah operasi destruktif memerlukan `--yes`?
6. Apakah unknown flags ditolak?
7. Apakah CLI bebas prompt interaktif tak terduga?
8. Apakah `--help` cukup jelas untuk dipakai agent tanpa trial and error?
9. Apakah ada guardrail terhadap secret, path traversal, dan shell injection?
10. Apakah kontrak output dan exit code terdokumentasi dan stabil?

## Anti-pattern penting

- output default berupa tabel atau teks bebas yang sulit diparse
- mencampur log dengan data di `stdout`
- error hanya berupa string polos tanpa kode
- fallback ke prompt interaktif saat parameter kurang
- exit code `0` walau sebenarnya gagal
- operasi destruktif tanpa `--yes` atau preview
- flag dan nama command tidak konsisten antar subcommand
- perubahan skema JSON tanpa versioning atau dokumentasi

## Hasil yang diharapkan

CLI yang mengikuti skill ini akan:
- lebih mudah dipakai agent dan pipeline otomatis
- lebih aman terhadap misuse
- lebih mudah diuji secara otomatis
- lebih mudah didokumentasikan dan diintegrasikan ke ekosistem agent

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/ai-native-cli` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.