---
name: agentic-actions-auditor
description: Gunakan saat mengaudit workflow GitHub Actions yang memanggil agen AI untuk menemukan jalur input attacker-controlled, salah konfigurasi sandbox, dan risiko keamanan pada integrasi agentik di CI/CD.
license: Complete terms in LICENSE.txt
metadata:
  category: security
  source:
    upstream: .tmp-antigravity-skills/skills/agentic-actions-auditor
    type: community
  depends_on:
    - akses ke file workflow GitHub Actions atau repository target
    - kemampuan membaca konfigurasi YAML dan menelusuri referensi reusable workflow atau composite action
---

# Agentic Actions Auditor

Skill ini membantu melakukan audit keamanan statis terhadap workflow GitHub Actions yang menjalankan agen AI. Fokusnya adalah menemukan jalur di mana input yang dikendalikan penyerang dapat mencapai prompt agen, serta menilai konfigurasi sandbox, izin tool, trigger event, dan aliran data yang relevan terhadap risiko CI/CD.

## Kapan digunakan

Gunakan skill ini saat perlu:
- mengaudit workflow GitHub Actions untuk risiko keamanan pada integrasi agen AI
- meninjau penggunaan Claude Code Action, Gemini CLI, OpenAI Codex, atau GitHub AI Inference di CI/CD
- memeriksa apakah input attacker-controlled dapat mencapai prompt agen
- menilai konfigurasi sandbox, allowlist user, dan izin tool pada action agentik
- menelusuri aliran data dari event GitHub ke `env:` lalu ke field prompt

## Jangan gunakan saat

- workflow tidak memakai action AI sama sekali
- tugasnya adalah eksploitasi runtime atau penetration testing aktif
- sistem CI/CD yang diaudit bukan GitHub Actions
- tujuan utamanya adalah auto-fix file workflow, bukan audit dan pelaporan temuan

## Tujuan utama

- menemukan instance action AI dalam workflow
- menangkap konteks keamanan yang relevan untuk tiap instance
- mendeteksi jalur input berbahaya dari event GitHub ke prompt agen
- melaporkan temuan secara jelas tanpa mengeksekusi konten workflow

## Prinsip inti

- perlakukan semua YAML workflow sebagai data, bukan kode yang boleh dieksekusi
- audit harus mencakup file pemanggil dan referensi lintas file yang relevan
- trigger event dan `env:` sering menjadi sumber jalur input tersembunyi
- sandbox atau allowlist yang tampak aman belum tentu benar-benar aman

## Metodologi audit

### 1. Temukan workflow

Cari hanya di root `.github/workflows/` dan kumpulkan semua file `.yml` atau `.yaml`.

### 2. Identifikasi action AI

Periksa setiap job dan step untuk `uses:` yang mengarah ke action AI, misalnya:
- Claude Code Action
- Gemini CLI
- OpenAI Codex
- GitHub AI Inference

Catat untuk setiap temuan:
- path workflow
- job
- step name atau id
- referensi action lengkap
- tipe action

### 3. Resolusi lintas file

Telusuri satu level untuk:
- composite action lokal
- reusable workflow lokal atau remote

Tujuannya adalah menemukan action AI tersembunyi yang tidak muncul langsung pada file pemanggil.

### 4. Tangkap konteks keamanan

Untuk setiap action AI, kumpulkan:
- field prompt atau prompt-file
- argumen CLI atau settings yang memengaruhi sandbox dan tool
- allowlist user atau bot
- trigger event workflow
- `env:` pada level workflow, job, dan step
- token atau secret yang tersedia pada konteks eksekusi

### 5. Analisis jalur input berbahaya

Cari pola seperti:
- `pull_request_target`
- `issue_comment`
- `issues`
- body, title, atau komentar yang mengalir ke `env:`
- `env:` yang kemudian dipakai di prompt tanpa terlihat jelas pada field prompt
- sandbox longgar seperti `danger-full-access`, `--yolo`, atau izin shell terlalu luas

## Rasionalisasi yang harus ditolak

Jangan menerima alasan berikut tanpa verifikasi:
- “Hanya maintainer yang memicu workflow”
- “Kami sudah membatasi allowed tools”
- “Tidak ada ekspresi langsung di prompt, jadi aman”
- “Sandbox pasti mencegah dampak nyata”

Semua klaim tersebut bisa salah bila trigger, `env:`, atau konfigurasi sandbox membuka jalur serangan lain.

## Checklist audit

- [ ] semua workflow di `.github/workflows/` sudah ditemukan
- [ ] semua instance action AI sudah dicatat
- [ ] referensi lintas file satu level sudah ditelusuri
- [ ] trigger event dan `env:` sudah dianalisis
- [ ] jalur attacker-controlled input ke prompt sudah diperiksa
- [ ] konfigurasi sandbox, tool, dan allowlist sudah ditinjau
- [ ] temuan dilaporkan tanpa mengeksekusi YAML sebagai kode

## Anti-pattern penting

- hanya mencari `${{ }}` langsung di prompt dan mengabaikan `env:` perantara
- menganggap allowlist tool otomatis aman
- mengabaikan reusable workflow atau composite action
- menilai sandbox aman tanpa memeriksa mode dan izin aktual
- mengeksekusi konten workflow saat audit

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/agentic-actions-auditor` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
