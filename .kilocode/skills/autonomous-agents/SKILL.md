---
name: autonomous-agents
description: Gunakan saat merancang sistem agent AI otonom, termasuk loop agent, tool use, memori, strategi planning, orkestrasi multi-agent, observabilitas, dan guardrail keselamatan.
license: Complete terms in LICENSE.txt
metadata:
  category: ai-systems
  source:
    upstream: .tmp-antigravity-skills/skills/autonomous-agents
    type: community
  depends_on:
    - kebutuhan desain atau evaluasi agen otonom dengan batas domain dan reliabilitas yang jelas
---

# Autonomous Agents

Skill ini memandu perancangan agen AI otonom dengan fokus pada reliabilitas, guardrail, dan batas domain yang jelas. Inti pendekatannya adalah bahwa kemampuan agent saja tidak cukup; setiap langkah tambahan memperbesar peluang kegagalan, sehingga desain harus mengutamakan kontrol dan auditabilitas.

## Kapan digunakan

Gunakan skill ini saat:
- merancang agent loop seperti ReAct atau plan-execute
- membangun agen yang dapat memecah tujuan menjadi langkah-langkah kerja
- menambahkan refleksi, self-correction, atau re-planning
- mengevaluasi reliabilitas agent production-grade
- menentukan guardrail, observability, dan human-in-the-loop untuk agent

## Tujuan utama

- mengutamakan reliabilitas di atas otonomi mentah
- membatasi domain agent agar kegagalan tidak melebar
- memastikan setiap aksi agent dapat diaudit dan dikendalikan
- memilih pola agent yang sesuai kompleksitas tugas

## Prinsip inti

- reliabilitas lebih penting daripada otonomi penuh
- setiap langkah tambahan mengompound peluang error
- agent domain-spesifik biasanya lebih berhasil daripada agent serba bisa
- output model adalah proposal, bukan kebenaran final
- keputusan kritis harus tetap melibatkan manusia
- kegagalan harus aman, dapat dipulihkan, dan tidak diam-diam merusak sistem

## Alur kerja inti

### 1. Batasi domain dan objective agent

Sebelum membangun agent, definisikan:
- tujuan yang boleh dikerjakan
- jenis tool yang boleh dipakai
- batas data dan sistem yang boleh diakses
- kondisi kapan agent harus berhenti atau eskalasi

Agent yang terlalu umum cenderung sulit dikendalikan dan sulit dievaluasi.

### 2. Pilih pola loop yang sesuai

Pola umum:
- ReAct untuk reasoning dan tool use bergantian
- plan-execute untuk tugas multi-langkah yang butuh visibilitas rencana
- reflection untuk evaluasi hasil dan koreksi terbatas

Pilih pola sesederhana mungkin yang masih memenuhi kebutuhan. Kompleksitas loop tambahan harus dibenarkan oleh manfaat nyata.

### 3. Kelola compounding error secara sadar

Saat agent menjalankan banyak langkah:
- batasi jumlah iterasi
- validasi hasil antar langkah penting
- gunakan checkpoint atau approval pada titik berisiko
- siapkan re-plan hanya bila ada sinyal kuat bahwa rencana lama tidak valid

Jangan mengasumsikan akurasi tinggi per langkah otomatis berarti hasil akhir akan andal.

### 4. Tambahkan guardrail sebelum memperluas kemampuan

Guardrail minimal biasanya mencakup:
- pembatasan tool dan scope akses
- validasi input dan output
- approval untuk aksi sensitif
- logging lengkap
- rollback atau recovery path

Kemampuan baru sebaiknya ditambahkan setelah guardrail untuk kemampuan lama sudah terbukti stabil.

### 5. Siapkan observability dan audit trail

Catat secara eksplisit:
- tujuan awal
- rencana yang dibuat
- langkah yang dijalankan
- tool yang dipakai
- hasil observasi
- error, retry, dan alasan berhenti

Tanpa observability, agent sulit di-debug dan sulit dipercaya di produksi.

### 6. Pertahankan human-in-the-loop untuk keputusan kritis

Manusia tetap diperlukan untuk:
- approval aksi destruktif
- perubahan scope besar
- keputusan bisnis atau keamanan penting
- validasi hasil akhir yang berdampak tinggi

Otonomi penuh tanpa checkpoint manusia jarang layak untuk area kritis.

## Checklist implementasi

1. Definisikan domain, tujuan, dan batas akses agent.
2. Pilih pola loop paling sederhana yang cukup.
3. Batasi iterasi dan siapkan validasi antar langkah.
4. Tambahkan guardrail sebelum memperluas kemampuan.
5. Catat audit trail dan observability yang memadai.
6. Sisakan human-in-the-loop pada keputusan kritis.

## Anti-pattern penting

- membangun agent serba bisa tanpa batas domain
- menambah banyak langkah tanpa kontrol compounding error
- menganggap output model selalu benar
- tidak ada approval untuk aksi sensitif
- gagal menyediakan logging, rollback, atau recovery

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/autonomous-agents` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
