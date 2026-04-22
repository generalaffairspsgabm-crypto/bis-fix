---
name: autonomous-agent-patterns
description: Gunakan saat merancang pola agen coding otonom, termasuk loop agent, tool calling, approval flow, browser automation, dan human-in-the-loop yang aman.
license: Complete terms in LICENSE.txt
metadata:
  category: ai-systems
  source:
    upstream: .tmp-antigravity-skills/skills/autonomous-agent-patterns
    type: community
  depends_on:
    - kebutuhan desain agen otonom dengan tool use dan kontrol eksekusi yang jelas
---

# Autonomous Agent Patterns

Skill ini memandu desain pola agen coding otonom, terutama untuk loop agent, tool/function calling, sistem approval, browser automation, dan human-in-the-loop. Fokusnya adalah arsitektur yang dapat diaudit, dapat dikendalikan, dan tidak memberi otonomi berlebihan tanpa guardrail.

## Kapan digunakan

Gunakan skill ini saat:
- membangun agen AI yang dapat merencanakan dan mengeksekusi tool
- merancang API tool atau function calling untuk agent
- membuat sistem approval sebelum aksi sensitif dijalankan
- menambahkan browser automation ke workflow agent
- mendesain interaksi manusia sebagai checkpoint penting

## Tujuan utama

- membangun loop agent yang jelas: pikir, putuskan, bertindak, observasi
- mendesain tool contract yang mudah dipakai model dan aman dieksekusi
- membatasi aksi sensitif melalui approval atau guardrail
- menjaga seluruh tindakan agent dapat diaudit dan dijelaskan

## Prinsip inti

- otonomi harus dibatasi oleh kontrak tool dan kebijakan eksekusi
- tool schema harus jelas, ketat, dan mudah divalidasi
- aksi berisiko tinggi perlu approval eksplisit
- hasil observasi harus kembali ke loop sebagai konteks yang dapat ditelusuri
- browser automation dan command execution harus diperlakukan sebagai kemampuan sensitif

## Alur kerja inti

### 1. Definisikan loop agent secara eksplisit

Loop dasar yang sehat biasanya terdiri dari:
- memahami tujuan
- memilih langkah berikutnya
- memanggil tool bila perlu
- mengamati hasil
- memutuskan apakah lanjut, re-plan, atau berhenti

Batasi jumlah iterasi dan definisikan kondisi berhenti agar agent tidak berputar tanpa arah.

### 2. Rancang tool contract yang ketat

Untuk setiap tool, tentukan:
- nama dan tujuan tool
- parameter yang valid
- field wajib dan opsional
- bentuk hasil sukses dan gagal
- error yang dapat dipahami model
- batasan keamanan dan scope akses

Tool yang ambigu akan menghasilkan perilaku agent yang tidak stabil.

### 3. Kelompokkan tool berdasarkan tingkat risiko

Contoh kategori:
- baca konteks: relatif aman
- edit file: risiko sedang
- eksekusi command atau browser action: risiko tinggi
- operasi destruktif atau akses eksternal: risiko sangat tinggi

Gunakan kategori ini untuk menentukan apakah tool bisa auto-run atau harus menunggu approval manusia.

### 4. Tambahkan human-in-the-loop pada titik kritis

Checkpoint manusia cocok untuk:
- perubahan destruktif
- akses jaringan atau sistem sensitif
- eksekusi command yang berdampak luas
- keputusan yang mengubah scope tugas
- finalisasi hasil yang berisiko tinggi

Jangan menaruh manusia di setiap langkah kecil, tetapi jangan hilangkan manusia dari keputusan kritis.

### 5. Siapkan observability dan audit trail

Minimal catat:
- tujuan awal
- rencana atau reasoning ringkas yang relevan
- tool yang dipanggil
- parameter penting
- hasil tool
- approval yang diberikan atau ditolak
- alasan berhenti atau gagal

Tanpa audit trail, sulit men-debug atau memperbaiki perilaku agent.

### 6. Desain fallback dan recovery

Saat tool gagal atau hasil tidak jelas:
- agent harus bisa meminta klarifikasi atau memilih tool lain
- hindari retry buta tanpa perubahan strategi
- definisikan kapan harus berhenti dan menyerahkan ke manusia
- pastikan kegagalan tidak meninggalkan sistem dalam keadaan rusak

## Checklist implementasi

1. Definisikan loop agent dan kondisi berhenti.
2. Buat schema tool yang jelas dan tervalidasi.
3. Kelompokkan tool berdasarkan tingkat risiko.
4. Tambahkan approval flow untuk aksi sensitif.
5. Catat audit trail untuk setiap langkah penting.
6. Siapkan fallback, retry policy, dan recovery path.

## Anti-pattern penting

- memberi agent akses luas tanpa pembatasan tool
- schema tool ambigu atau terlalu longgar
- tidak ada batas iterasi atau kondisi berhenti
- mengeksekusi aksi sensitif tanpa approval
- tidak menyimpan jejak keputusan dan hasil tool

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/autonomous-agent-patterns` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
