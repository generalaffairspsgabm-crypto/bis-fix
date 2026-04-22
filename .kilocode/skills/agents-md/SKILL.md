---
name: agents-md
description: Gunakan saat pengguna meminta membuat, memperbarui, mengaudit, atau merapikan `AGENTS.md` atau `CLAUDE.md` agar dokumentasi instruksi agent tetap ringkas, akurat, dan selaras dengan toolchain repo.
license: Complete terms in LICENSE.txt
metadata:
  category: documentation
  source:
    upstream: .tmp-antigravity-skills/skills/agents-md
    type: community
  depends_on:
    - akses baca ke struktur repo dan file konfigurasi proyek
---

# Agents MD

Skill ini memandu pembuatan dan pemeliharaan dokumentasi instruksi agent seperti `AGENTS.md` atau `CLAUDE.md`. Fokus utamanya adalah menjaga dokumen tetap singkat, bernilai tinggi, dan benar-benar mencerminkan konvensi repo yang nyata.

## Kapan digunakan

Gunakan skill ini saat perlu:
- membuat `AGENTS.md` dari nol
- memperbarui `CLAUDE.md` atau dokumen instruksi agent lain
- mengaudit dokumen agent yang terlalu panjang, duplikatif, atau usang
- merangkum aturan repo menjadi instruksi agent yang padat dan operasional

## Tujuan utama

- menjaga dokumen agent tetap ringkas dan mudah dipindai
- menghindari duplikasi aturan yang sudah hidup di config atau dokumentasi lain
- menuliskan hanya instruksi yang benar-benar membantu agent bekerja di repo ini
- memastikan isi dokumen berasal dari observasi repo, bukan asumsi generik

## Prinsip inti

- targetkan dokumen sangat singkat; idealnya di bawah 60 baris dan hindari melewati 100 baris
- gunakan heading dan bullet, bukan paragraf panjang
- referensikan sumber otoritatif yang sudah ada daripada menyalin ulang isinya
- prioritaskan perintah file-scoped yang cepat dibanding build penuh proyek
- jangan menyalin aturan linter atau formatter yang sudah ada di file konfigurasi
- jangan isi dokumen dengan pengantar, basa-basi, atau penjelasan yang tidak operasional

## Alur kerja inti

### 1. Audit repo sebelum menulis

Sebelum membuat atau mengubah dokumen agent, identifikasi:
- package manager dari lock file seperti `pnpm-lock.yaml`, `yarn.lock`, `package-lock.json`, `uv.lock`, atau `poetry.lock`
- konfigurasi lint/format seperti `.eslintrc`, `biome.json`, `ruff.toml`, `.prettierrc`
- command build, test, dan CI dari `package.json`, `Makefile`, atau pipeline CI
- indikator monorepo seperti `pnpm-workspace.yaml`, `nx.json`, Cargo workspace, atau beberapa manifest subproyek
- konvensi yang sudah terdokumentasi di `README.md`, `CONTRIBUTING.md`, atau folder `docs/`

Tujuannya adalah menulis instruksi yang benar-benar sesuai repo.

### 2. Tentukan isi minimum yang wajib

Minimal, pertimbangkan bagian berikut:
- package manager dan command inti
- commit attribution bila proyek membutuhkannya
- file-scoped commands untuk lint, typecheck, dan test
- konvensi proyek yang benar-benar penting dan tidak obvious

Tambahkan bagian opsional hanya bila memang membantu, misalnya:
- pola route API
- command CLI internal
- aturan penamaan file
- petunjuk struktur proyek atau area legacy yang perlu dihindari
- override monorepo per subdirektori

### 3. Tulis dalam format padat

Gunakan pola seperti:

```markdown
# Agent Instructions

## Package Manager
Use **pnpm**: `pnpm install`, `pnpm dev`

## File-Scoped Commands
| Task | Command |
|------|---------|
| Typecheck | `pnpm tsc --noEmit path/to/file.ts` |
| Lint | `pnpm eslint path/to/file.ts` |
| Test | `pnpm jest path/to/file.test.ts` |
```

Bila perlu menyebut aturan lain, arahkan ke file sumbernya, misalnya:
- lihat `CONTRIBUTING.md` untuk setup lengkap
- ikuti pola di `src/api/routes/`
- gunakan konvensi yang sudah didefinisikan di `biome.json`

### 4. Jaga agar tetap berbasis referensi

Dokumen agent bukan tempat menyalin seluruh kebijakan proyek. Simpan hanya:
- command yang paling sering dibutuhkan agent
- pola repo yang tidak langsung terlihat
- pointer ke file sumber yang lebih lengkap

Hapus atau hindari:
- penjelasan panjang tentang alasan aturan
- daftar plugin atau skill yang bisa ditemukan otomatis
- salinan aturan style dari config linter
- build penuh proyek bila ada alternatif file-scoped yang lebih murah

## Struktur yang direkomendasikan

### Package Manager
Tuliskan tool utama dan command inti saja.

Contoh:

```markdown
## Package Manager
Use **pnpm**: `pnpm install`, `pnpm dev`, `pnpm test`
```

### File-Scoped Commands
Utamakan command per file karena lebih cepat dan hemat.

Contoh:

```markdown
## File-Scoped Commands
| Task | Command |
|------|---------|
| Typecheck | `pnpm tsc --noEmit path/to/file.ts` |
| Lint | `pnpm eslint path/to/file.ts` |
| Test | `pnpm jest path/to/file.test.ts` |
```

### Commit Attribution
Jika proyek mensyaratkan attribution commit AI, tulis eksplisit.

Contoh:

```markdown
## Commit Attribution
AI commits MUST include:
Co-Authored-By: Nama Model <noreply@example.com>
```

### Key Conventions
Isi hanya pola proyek yang benar-benar penting, misalnya:
- lokasi route API yang benar
- folder yang dianggap legacy
- pola penamaan file atau test
- aturan override pada monorepo

## Anti-pattern penting

- pembuka seperti "Welcome to..." atau "This document explains..."
- paragraf panjang yang menjelaskan hal-hal obvious
- instruksi generik seperti "write clean code" atau "run tests"
- menyalin aturan lint/format dari config
- daftar skill atau plugin yang ditemukan otomatis oleh agent
- command proyek penuh saat command file-scoped tersedia
- dokumen terlalu panjang hingga sulit dipindai cepat

## Checklist review

1. Apakah isi dokumen benar-benar berasal dari repo?
2. Apakah ada duplikasi dengan config atau dokumentasi lain?
3. Apakah command yang dicantumkan adalah command kanonik?
4. Apakah ada alternatif file-scoped yang lebih baik daripada build penuh?
5. Apakah semua bagian yang tersisa benar-benar membantu agent?
6. Apakah panjang dokumen tetap ringkas dan mudah dipindai?

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/agents-md` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
