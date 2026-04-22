---
name: agentflow
description: Gunakan saat ingin mengorkestrasi pipeline pengembangan AI otonom berbasis papan Kanban, dengan dispatch worker, quality gate deterministik, review adversarial, pelacakan biaya, dan pemulihan workflow yang tahan crash.
license: Complete terms in LICENSE.txt
metadata:
  category: orchestration
  source:
    upstream: .tmp-antigravity-skills/skills/agentflow
    type: community
  depends_on:
    - papan Kanban atau alat manajemen proyek yang dipakai sebagai state machine workflow
    - worker agen yang dapat menjalankan tahap build, review, test, dan integrate
---

# AgentFlow

Skill ini membantu mengubah papan Kanban yang sudah ada menjadi pipeline pengembangan AI otonom. State workflow disimpan pada alat manajemen proyek, sehingga orkestrasi tidak bergantung pada daemon yang terus hidup dan lebih tahan terhadap crash atau restart sesi.

## Kapan digunakan

Gunakan skill ini saat perlu:
- mengorkestrasi banyak worker agen sepanjang siklus pengembangan
- menerapkan quality gate deterministik sebelum review AI
- memantau pipeline dari papan Kanban yang sama dengan tim
- menjalankan dispatch tugas otomatis dengan pelacakan biaya per task
- menjaga workflow tetap dapat dipulihkan setelah crash atau restart

## Jangan gunakan saat

- proyek terlalu kecil dan tidak membutuhkan pipeline bertahap
- tidak ada papan Kanban atau sistem status tugas yang dapat dipakai sebagai source of truth
- belum ada quality gate dasar seperti build, lint, dan test

## Tujuan utama

- menjadikan papan Kanban sebagai lapisan orkestrasi utama
- memisahkan tahap riset, build, review, test, dan integrasi secara eksplisit
- memastikan quality gate deterministik berjalan sebelum evaluasi probabilistik
- menyediakan observabilitas dan intervensi manusia yang mudah

## Konsep inti

### Papan Kanban sebagai state machine

Status tugas pada board adalah sumber kebenaran workflow. Perpindahan kartu mewakili transisi state, bukan sekadar visualisasi.

### Orkestrator stateless

Sweep periodik membaca state dari board, memutuskan aksi berikutnya, lalu keluar. Jika proses mati, sweep berikutnya dapat melanjutkan dari state yang sama.

### Deterministik sebelum probabilistik

Build, lint, dan test harus lulus sebelum review AI. Ini menekan biaya dan menangkap banyak masalah lebih awal.

### Review adversarial

Reviewer AI tidak boleh sekadar menyetujui. Ia harus aktif mencari kelemahan sebelum memberi lampu hijau.

## Tahap pipeline yang disarankan

Gunakan tahap seperti:
- Backlog
- Research
- Build
- Review
- Test
- Integrate
- Done

Setiap tahap harus punya kriteria masuk dan keluar yang jelas.

## Alur kerja inti

### 1. Tulis spesifikasi

Mulai dari spesifikasi atau requirement yang cukup jelas agar tugas dapat dipecah menjadi unit kerja atomik.

### 2. Pecah menjadi task atomik

Untuk setiap task, definisikan:
- outcome yang diharapkan
- dependency antar task
- file atau area sistem yang diperkirakan berubah
- quality gate yang harus dilalui

### 3. Jalankan worker paralel

Pisahkan worker berdasarkan slot atau peran, misalnya:
- builder
- reviewer
- tester
- integrator

### 4. Jalankan sweep orkestrasi periodik

Sweep bertugas:
- memilih task yang siap dikerjakan
- memprioritaskan task yang membuka dependency terbesar
- mendeteksi worker mati atau macet
- memindahkan task ke tahap berikutnya bila gate terpenuhi

### 5. Pantau dan intervensi

Manusia harus bisa:
- melihat status pipeline dari board
- memindahkan kartu ke status intervensi manual
- menghentikan pipeline secara graceful
- meninjau biaya dan retry count per task

## Quality gate yang disarankan

Contoh gate per tahap:
- **Build -> Review**: kompilasi, lint, dan test dasar lulus
- **Review -> Test**: reviewer adversarial menemukan dan menilai isu secara serius
- **Test -> Integrate**: coverage atau validasi tambahan terpenuhi
- **Integrate -> Done**: suite utama lulus setelah merge

## Guardrail biaya dan reliabilitas

Tetapkan:
- budget per task atau per tahap
- warning threshold dan hard stop
- retry limit sebelum eskalasi ke manusia
- auto-revert atau rollback bila integrasi gagal
- deteksi drift spesifikasi atau scope creep

## Checklist implementasi AgentFlow

- [ ] papan Kanban dipakai sebagai source of truth workflow
- [ ] tahap pipeline dan gate tiap tahap jelas
- [ ] worker memiliki peran dan slot yang terdefinisi
- [ ] sweep orkestrasi dapat berjalan periodik tanpa state lokal rapuh
- [ ] biaya, retry, dan health worker dapat dipantau
- [ ] ada mekanisme intervensi manusia dan rollback

## Anti-pattern penting

- memakai board hanya sebagai dashboard tanpa aturan transisi state
- melewati quality gate deterministik demi kecepatan semu
- menjalankan terlalu banyak worker tanpa paralelisme nyata
- tidak membatasi biaya per task
- tidak menyediakan jalur pemulihan saat worker mati atau integrasi gagal

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/agentflow` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
