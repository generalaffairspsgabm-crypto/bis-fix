---
name: acceptance-orchestrator
description: >-
  Gunakan saat tugas coding harus didorong end-to-end dari intake issue,
  implementasi, review, deployment dev, hingga verifikasi acceptance criteria
  dengan bukti yang jelas dan eskalasi eksplisit bila terblokir.
license: CC-BY-4.0
metadata:
  category: orchestration
  source:
    repository: 'https://github.com/sickn33/antigravity-awesome-skills'
    path: skills/acceptance-orchestrator
    license_path: LICENSE-CONTENT
  original_metadata:
    risk: safe
    source: community
    date_added: '2026-03-12'
---

# Acceptance Orchestrator

Skill ini mengorkestrasi pekerjaan coding sebagai state machine yang berakhir hanya ketika acceptance criteria terbukti dengan evidence, atau ketika hambatan nyata memaksa eskalasi.

Prinsip utamanya: jangan mengoptimalkan sekadar “kode berubah”, tetapi “definition of done terbukti”.

## Kapan digunakan

Gunakan saat:
- tugas sudah memiliki issue, PRD, atau acceptance criteria yang cukup jelas
- pekerjaan perlu berjalan lintas implementasi, review, deployment, dan verifikasi akhir
- dibutuhkan status yang tegas: intake, executing, accepted, atau escalated
- ingin menghindari partial completion yang diam-diam dilaporkan sebagai selesai

## Input minimum

Sebelum orkestrasi dimulai, kumpulkan:
- issue id atau isi issue
- status issue saat ini
- acceptance criteria atau definition of done
- target environment, default `dev`

Jika acceptance criteria belum tersedia, hentikan progres dan anggap belum siap dijalankan end-to-end.

## Sub-skill yang relevan

Skill ini secara konseptual bergantung pada pola berikut:
- gate sebelum eksekusi dimulai
- delivery loop dengan verifikasi lokal
- verifikasi sebelum klaim selesai

Di lingkungan KiloCode, terapkan prinsip ini dengan workflow eksplisit walaupun nama sub-skill upstream tidak tersedia satu per satu.

## State machine

Gunakan state berikut saat mengelola pekerjaan:
- `intake`
- `issue-gated`
- `executing`
- `review-loop`
- `deploy-verify`
- `accepted`
- `escalated`

Jangan melompat ke `accepted` tanpa bukti untuk setiap acceptance criterion.

## Workflow wajib

### 1. Intake

Lakukan hal berikut:
- baca issue atau requirement sumber
- ekstrak tujuan utama
- ubah acceptance criteria menjadi checklist pass/fail yang eksplisit
- identifikasi dependency, secret, permission, dan environment yang mungkin memblokir

Jika requirement masih kabur, jangan pura-pura lanjut secara penuh. Tetapkan status tetap di `intake` atau eskalasi kebutuhan klarifikasi.

### 2. Issue gate

Sebelum implementasi:
- pastikan issue benar-benar siap dikerjakan
- pastikan scope eksekusi diizinkan
- hentikan pekerjaan jika issue masih draft atau acceptance gate belum jelas

Aturan keras:
- jangan implementasi saat issue belum ready
- jangan memperluas scope tanpa dasar requirement

### 3. Execute

Saat masuk `executing`:
- implementasikan perubahan sekecil mungkin yang memenuhi DoD
- verifikasi lokal lebih dulu
- catat bukti tiap iterasi penting
- pisahkan fakta terverifikasi dari asumsi

Fokuskan perubahan pada acceptance criteria, bukan opportunistic cleanup yang tidak dibutuhkan.

### 4. Review loop

Jika ada review feedback:
- kumpulkan komentar yang relevan
- kelompokkan berdasarkan perubahan yang bisa dikerjakan bersama
- proses semua feedback yang terlihat secara sistematis, bukan satu per satu secara acak
- verifikasi ulang setelah perbaikan

Bila instruksi review saling bertentangan dan tidak bisa dipenuhi bersamaan, pindah ke `escalated`.

### 5. Deploy dan runtime verification

Jika DoD bergantung pada perilaku runtime:
- deploy hanya ke `dev` secara default
- validasi memakai log, response API, UI nyata, atau bukti runtime lain
- jangan menyimpulkan sukses hanya dari keyakinan terhadap kode

Untuk lingkungan non-dev, perlukan persetujuan manusia bila berada di luar scope yang telah disetujui.

### 6. Completion gate

Sebelum mengklaim selesai:
- cocokkan setiap acceptance criterion dengan bukti terbaru
- tandai pass/fail secara eksplisit
- catat risiko terbuka yang masih ada
- tolak status selesai bila masih ada item tanpa evidence

## Stop condition

Pindah ke `accepted` hanya jika semua acceptance criteria memiliki bukti yang cocok.

Pindah ke `escalated` jika salah satu berikut terjadi:
- DoD masih gagal setelah dua putaran penuh yang masuk akal
- secret, permission, atau dependency eksternal memblokir progres
- tugas memerlukan aksi produksi atau operasi destruktif
- instruksi review bertentangan dan tidak dapat didamaikan

## Human gate

Selalu berhenti untuk persetujuan manusia pada kondisi berikut:
- deployment ke stage/prod di luar scope yang telah disetujui
- operasi git atau data yang destruktif
- perubahan biaya, billing, atau posture keamanan
- acceptance criteria belum diberikan user

## Format status yang disiplin

Saat melaporkan progres, selalu sertakan:
- `Status`: intake / executing / accepted / escalated
- `Acceptance Criteria`: checklist pass/fail
- `Evidence`: command, log, hasil test, hasil API, atau bukti runtime
- `Open Risks`: hal yang masih belum pasti
- `Need Human Input`: hanya bila benar-benar ada blocker

## Prinsip operasional

Pegang aturan ini:
- scope tidak boleh melebar diam-diam
- bukti lebih penting daripada narasi progres
- verifikasi terbaru lebih penting daripada hasil lama
- deployment dev bukan pengganti acceptance verification; itu hanya salah satu tahap
- status “done” tanpa evidence adalah status palsu

## Anti-pattern

Hindari:
- mulai coding hanya dari judul issue
- menutup tugas saat test lokal belum relevan dengan DoD
- menganggap PR merge sebagai bukti acceptance
- menyembunyikan blocker di balik laporan progres yang optimistis
- menyebut “hampir selesai” sebagai selesai

## Catatan Kompatibilitas KiloCode

Skill sumber merujuk beberapa sub-skill dan workflow eksternal. Pada versi KiloCode ini, dependensi tersebut dinormalisasi menjadi prinsip orkestrasi mandiri sehingga tetap usable tanpa paket upstream lain.
