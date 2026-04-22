---
name: agent-orchestration-multi-agent-optimize
description: Gunakan saat mengoptimalkan sistem multi-agent melalui profiling terkoordinasi, distribusi beban kerja, kontrol biaya, dan perbaikan orkestrasi agar throughput, latensi, dan reliabilitas meningkat.
license: Complete terms in LICENSE.txt
metadata:
  category: optimization
  source:
    upstream: .tmp-antigravity-skills/skills/agent-orchestration-multi-agent-optimize
    type: community
  depends_on:
    - metrik performa sistem multi-agent yang dapat diukur
    - kemampuan mengubah strategi orkestrasi, pembagian kerja, atau budget model
---

# Agent Orchestration Multi Agent Optimize

Skill ini membantu meningkatkan performa sistem multi-agent secara menyeluruh. Fokusnya adalah menemukan bottleneck koordinasi, memperbaiki distribusi kerja, mengendalikan biaya model, dan menyeimbangkan kualitas dengan kecepatan.

## Kapan digunakan

Gunakan skill ini saat perlu:
- meningkatkan throughput, latensi, atau reliabilitas sistem multi-agent
- memprofilkan workflow multi-agent untuk menemukan bottleneck
- merancang strategi orkestrasi yang lebih efisien
- mengoptimalkan biaya token, penggunaan konteks, atau efisiensi tool

## Jangan gunakan saat

- hanya perlu menyetel prompt satu agen tunggal
- tidak ada metrik atau data evaluasi yang bisa dipakai
- tugas tidak berkaitan dengan orkestrasi multi-agent

## Tujuan utama

- menetapkan baseline performa sistem multi-agent
- menemukan bottleneck koordinasi dan komunikasi
- meningkatkan efisiensi pembagian kerja antar agen
- mengendalikan biaya tanpa merusak kualitas secara tidak sadar

## Prinsip inti

- ukur dulu sebelum mengoptimalkan
- kurangi overhead koordinasi yang tidak perlu
- pilih paralelisme hanya bila benar-benar memberi keuntungan
- kelola budget token dan model sebagai constraint nyata
- validasi setiap perubahan dengan pengujian yang dapat diulang

## Alur kerja inti

### 1. Tetapkan baseline dan target

Definisikan metrik seperti:
- throughput tugas per periode
- latensi end-to-end
- tingkat keberhasilan workflow
- biaya token atau biaya model
- jumlah handoff antar agen
- tingkat retry atau kegagalan koordinasi

### 2. Profilkan sistem

Periksa area berikut:
- bottleneck database atau penyimpanan konteks
- bottleneck aplikasi atau orkestrator
- bottleneck frontend atau antarmuka observabilitas bila ada
- overhead komunikasi antar agen
- antrean kerja yang tidak seimbang

### 3. Optimalkan konteks

Pertimbangkan:
- kompresi konteks yang relevan
- filtering informasi yang tidak penting
- pembatasan token per tahap
- caching hasil yang sering dipakai ulang
- pemilihan model berdasarkan kompleksitas tugas

### 4. Optimalkan koordinasi agen

Perbaiki:
- pembagian kerja agar tidak timpang
- jumlah handoff agar tidak berlebihan
- eksekusi paralel untuk tugas independen
- fallback saat satu agen gagal
- prioritas antrean berdasarkan dampak bisnis atau dependency

### 5. Kelola biaya dan kualitas

Tentukan guardrail untuk:
- budget token per workflow
- model mahal hanya untuk tahap bernilai tinggi
- batas degradasi kualitas yang masih dapat diterima
- penggunaan cache atau memoization untuk hasil stabil

### 6. Validasi dan rollout

Sebelum mengadopsi perubahan:
- bandingkan metrik sebelum dan sesudah
- uji skenario normal, edge case, dan failure case
- rollout bertahap
- siapkan rollback bila throughput atau kualitas memburuk

## Checklist optimasi multi-agent

- [ ] baseline performa dan target sudah jelas
- [ ] bottleneck utama sudah diidentifikasi
- [ ] strategi konteks dan token budget sudah ditinjau
- [ ] pembagian kerja antar agen lebih efisien
- [ ] guardrail biaya dan kualitas sudah ditetapkan
- [ ] perubahan tervalidasi dengan pengujian berulang

## Anti-pattern penting

- menambah agen baru tanpa mengurangi bottleneck utama
- paralelisme berlebihan yang justru menambah overhead koordinasi
- memakai model mahal untuk semua tahap tanpa seleksi
- mengoptimalkan biaya tanpa memantau penurunan kualitas
- mengubah orkestrasi besar-besaran tanpa baseline dan rollback

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/agent-orchestration-multi-agent-optimize` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
