---
name: verification-before-completion
description: >-
  Gunakan sebelum menyatakan pekerjaan selesai, berhasil, bersih, atau benar.
  Skill ini mewajibkan bukti verifikasi segar sebelum klaim completion.
license: CC-BY-4.0
metadata:
  category: quality
  source:
    repository: 'https://github.com/sickn33/antigravity-awesome-skills'
    path: skills/verification-before-completion
    license_path: LICENSE-CONTENT
  original_metadata:
    risk: unknown
    source: community
    date_added: '2026-02-27'
---

# Verification Before Completion

Menyatakan pekerjaan selesai tanpa verifikasi adalah klaim tanpa bukti. Skill ini memaksa prinsip **evidence before claims**.

## Iron Law

`NO COMPLETION CLAIMS WITHOUT FRESH VERIFICATION EVIDENCE`

Jika command verifikasi yang relevan belum dijalankan secara segar, jangan klaim bahwa hasilnya lolos atau selesai.

## Gate Function

Sebelum menyatakan status positif:
1. identifikasi command yang membuktikan klaim
2. jalankan command penuh yang relevan
3. baca output lengkap dan exit code
4. verifikasi apakah output benar-benar mendukung klaim
5. baru setelah itu sampaikan status dengan bukti

Melewati salah satu langkah berarti verifikasi belum sah.

## Contoh klaim dan bukti yang dibutuhkan

| Klaim | Bukti minimum |
|---|---|
| Tests pass | output test terbaru menunjukkan 0 failure |
| Linter clean | output linter terbaru tanpa error |
| Build succeeds | command build terbaru exit 0 |
| Bug fixed | reproduksi gejala asli tidak muncul lagi atau regression test lolos |
| Requirement selesai | checklist requirement ditinjau ulang satu per satu |

## Red Flags

Berhenti jika Anda akan mengatakan hal seperti:
- "harusnya sudah jalan"
- "sepertinya beres"
- "done" tanpa bukti
- ekspresi puas sebelum verifikasi
- percaya laporan agent lain tanpa cek independen
- hanya melakukan verifikasi parsial

## Pola yang benar

### Test
- jalankan test terkait
- baca hasil aktual
- baru nyatakan pass jika memang pass

### Build
- jalankan build aktual
- jangan menyimpulkan dari lint yang lolos

### Requirement
- baca lagi requirement atau plan
- buat checklist
- tandai tiap item berdasarkan bukti aktual

### Delegasi agent
- agent lain melapor sukses bukan berarti pekerjaan selesai
- tetap periksa diff, hasil, dan verifikasi independen

## Mengapa penting

Tanpa verifikasi segar:
- kepercayaan rusak
- undefined behavior bisa lolos
- requirement terlewat
- pekerjaan tampak selesai padahal belum

## Aturan dasar

Tidak ada shortcut untuk verifikasi:
- jalankan command
- baca output
- baru klaim hasilnya
