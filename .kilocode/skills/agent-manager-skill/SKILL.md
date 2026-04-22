---
name: agent-manager-skill
description: Gunakan saat perlu menjalankan, memantau, menjadwalkan, dan memberi tugas ke banyak agen CLI lokal secara paralel melalui sesi terminal terpisah.
license: Complete terms in LICENSE.txt
metadata:
  category: orchestration
  source:
    upstream: .tmp-antigravity-skills/skills/agent-manager-skill
    type: community
  depends_on:
    - lingkungan lokal yang mendukung banyak sesi terminal atau tmux
    - definisi agen dan skrip manajemen agen yang sudah tersedia
---

# Agent Manager Skill

Skill ini membantu mengelola banyak agen CLI lokal yang berjalan paralel. Fokusnya adalah start, stop, monitoring, assignment tugas, dan penjadwalan kerja berulang agar beberapa agen dapat dioperasikan secara terkoordinasi dari mesin lokal.

## Kapan digunakan

Gunakan skill ini saat perlu:
- menjalankan banyak agen CLI lokal secara paralel
- memisahkan agen ke sesi terminal berbeda agar tidak saling mengganggu
- memulai, menghentikan, atau memonitor agen tertentu
- mengirim tugas ke agen tertentu dan meninjau outputnya
- menjadwalkan pekerjaan agen secara periodik

## Jangan gunakan saat

- hanya ada satu agen sederhana tanpa kebutuhan orkestrasi
- lingkungan tidak mendukung terminal multiplexer atau mekanisme sesi terpisah
- tugas utamanya adalah mendesain agen, bukan mengelola operasionalnya

## Tujuan utama

- menjaga banyak agen lokal tetap terorganisasi
- memudahkan assignment tugas ke agen yang tepat
- menyediakan observabilitas dasar melalui log dan monitoring
- memungkinkan otomasi kerja agen yang berulang

## Prasyarat

Sebelum memakai skill ini, pastikan:
- ada runtime Python yang sesuai
- ada terminal multiplexer atau mekanisme serupa untuk sesi terpisah
- definisi agen tersedia di direktori konfigurasi agen
- ada skrip manajemen agen yang dapat menjalankan operasi doctor, list, start, monitor, dan assign

## Alur kerja inti

### 1. Validasi lingkungan

Periksa:
- dependensi dasar tersedia
- struktur direktori agen valid
- skrip manajemen dapat dijalankan
- sesi terminal dapat dibuat dan dipantau

### 2. Inventaris agen

Catat:
- daftar agen yang tersedia
- peran tiap agen
- status berjalan atau berhenti
- lokasi log atau output masing-masing agen

### 3. Operasikan agen

Operasi umum yang perlu didukung:
- start agen tertentu
- stop agen tertentu
- monitor output agen secara real-time
- assign instruksi kerja ke agen tertentu
- cek kesehatan sistem sebelum menjalankan batch besar

### 4. Jadwalkan pekerjaan berulang

Jika perlu otomasi periodik:
- tentukan frekuensi eksekusi
- pastikan tugas idempoten atau aman diulang
- simpan log hasil eksekusi
- siapkan mekanisme alert atau inspeksi bila agen gagal

## Praktik yang disarankan

- beri identitas unik pada setiap agen
- pisahkan log per agen agar troubleshooting mudah
- gunakan assignment yang eksplisit dan terstruktur
- hindari menjalankan terlalu banyak agen tanpa observabilitas
- dokumentasikan peran agen agar pembagian kerja konsisten

## Checklist operasional

- [ ] lingkungan lokal siap untuk multi-agent CLI
- [ ] daftar agen dan perannya jelas
- [ ] agen dapat di-start dan dimonitor secara terpisah
- [ ] assignment tugas dapat dilacak ke agen tertentu
- [ ] log atau output tiap agen tersedia untuk audit
- [ ] pekerjaan terjadwal aman dijalankan berulang

## Anti-pattern penting

- menjalankan banyak agen tanpa pemisahan sesi atau log
- memberi tugas tanpa identitas agen yang jelas
- menjadwalkan pekerjaan berulang tanpa guardrail kegagalan
- menganggap agen berjalan sehat tanpa pemeriksaan eksplisit

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/agent-manager-skill` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
