---
name: ai-agent-development
description: Gunakan saat membangun agent AI tunggal, sistem multi-agent, orkestrasi workflow agent, integrasi tool, memori agent, dan evaluasi end-to-end agar implementasi berjalan terstruktur dari desain hingga validasi.
license: Complete terms in LICENSE.txt
metadata:
  category: development
  source:
    upstream: .tmp-antigravity-skills/skills/ai-agent-development
    type: personal
  depends_on:
    - kejelasan use case agent dan outcome yang diharapkan
    - akses ke framework atau stack agent yang akan dipakai
    - kemampuan menguji perilaku agent secara iteratif
---

# AI Agent Development

Skill ini memandu pembangunan agent AI secara end-to-end, mulai dari desain tujuan agent, implementasi tool dan memori, hingga evaluasi perilaku. Fokusnya adalah menjaga proses pengembangan agent tetap terstruktur dan dapat diuji.

## Kapan digunakan

Gunakan skill ini saat perlu:
- membangun autonomous agent tunggal
- merancang sistem multi-agent dengan pembagian peran
- membuat orkestrasi workflow agent
- menambahkan tool integration ke agent
- merancang memori agent jangka pendek atau panjang
- mengevaluasi kualitas perilaku agent sebelum rollout

## Tujuan utama

- memecah pembangunan agent menjadi fase yang jelas
- memastikan desain, implementasi, dan evaluasi saling terhubung
- mengurangi risiko agent yang tampak bekerja di demo tetapi rapuh di produksi

## Alur kerja inti

### Fase 1: Desain agent

Tentukan fondasi agent sebelum menulis implementasi.

Langkah:
1. definisikan tujuan utama agent
2. tetapkan capability yang benar-benar dibutuhkan
3. identifikasi tool yang perlu diakses agent
4. rancang kebutuhan memori dan konteks
5. tetapkan metrik keberhasilan

Pertanyaan kunci:
- masalah apa yang diselesaikan agent?
- keputusan apa yang boleh diambil agent sendiri?
- kapan agent harus eskalasi ke manusia?
- apa indikator bahwa agent berhasil atau gagal?

### Fase 2: Implementasi agent tunggal

Bangun loop dasar agent terlebih dahulu.

Langkah:
1. pilih framework atau runtime agent
2. implementasikan reasoning loop atau state loop inti
3. sambungkan tool yang diperlukan
4. tambahkan memori minimum yang relevan
5. uji perilaku dasar pada skenario nyata

Fokus awal:
- satu agent yang stabil lebih berharga daripada banyak agent yang belum jelas boundary-nya
- mulai dari workflow sederhana sebelum menambah kompleksitas

### Fase 3: Sistem multi-agent

Gunakan hanya bila satu agent tidak cukup.

Langkah:
1. definisikan peran tiap agent
2. tentukan kontrak komunikasi antar agent
3. tetapkan siapa yang mengorkestrasi delegasi
4. implementasikan handoff tugas dan agregasi hasil
5. uji koordinasi dan konflik antar agent

Gunakan multi-agent bila memang ada alasan kuat, misalnya:
- domain kerja berbeda jelas
- perlu isolasi tanggung jawab
- perlu paralelisasi atau spesialisasi yang nyata

### Fase 4: Orkestrasi workflow

Rancang alur stateful bila proses agent memiliki cabang, retry, atau checkpoint.

Langkah:
1. petakan graph atau state machine workflow
2. definisikan state yang perlu dipersistenkan
3. tambahkan branch kondisional
4. tentukan aturan retry, timeout, dan fallback
5. uji workflow pada jalur sukses dan gagal

Perhatikan:
- state harus eksplisit
- transisi harus dapat dijelaskan
- kegagalan harus punya jalur pemulihan

### Fase 5: Integrasi tool

Tambahkan tool hanya bila benar-benar dibutuhkan untuk aksi nyata.

Langkah:
1. identifikasi aksi yang tidak bisa diselesaikan model tanpa tool
2. desain interface tool yang sempit dan jelas
3. implementasikan validasi input dan error handling
4. uji apakah agent memilih tool dengan benar
5. ukur dampak tool terhadap kualitas dan biaya

Prinsip:
- tool terlalu banyak akan membingungkan agent
- tool harus punya kontrak input-output yang jelas
- kegagalan tool harus mudah dipulihkan

### Fase 6: Sistem memori

Tambahkan memori sesuai kebutuhan, bukan sebagai default.

Langkah:
1. tentukan apa yang perlu diingat agent
2. pisahkan short-term, long-term, dan episodic memory bila perlu
3. definisikan kapan memori ditulis dan dibaca
4. batasi memori agar tidak menjadi sampah konteks
5. uji kualitas retrieval dan relevansi recall

Contoh kebutuhan memori:
- preferensi pengguna
- keputusan arsitektur sebelumnya
- status workflow yang belum selesai
- fakta domain yang sering dipakai ulang

### Fase 7: Evaluasi

Evaluasi agent secara sistematis sebelum menyatakan siap.

Langkah:
1. definisikan rubric atau acceptance criteria
2. buat skenario uji normal, edge case, dan failure case
3. ukur kualitas jawaban, aksi tool, dan stabilitas workflow
4. identifikasi pola kegagalan berulang
5. iterasikan prompt, tool, state, atau memori berdasarkan bukti

## Arsitektur konseptual

Pola umum yang sering dipakai:

```text
Input pengguna -> planner/router -> agent core -> tools -> memory -> response
```

Komponen dapat dipisah lebih lanjut menjadi:
- planner untuk dekomposisi tugas
- executor untuk aksi tool
- memory layer untuk recall konteks
- evaluator atau guardrail untuk validasi hasil

## Checklist kualitas

- [ ] tujuan agent jelas dan terukur
- [ ] capability agent dibatasi sesuai kebutuhan
- [ ] tool yang dipakai benar-benar diperlukan
- [ ] memori hanya menyimpan informasi bernilai
- [ ] workflow punya jalur gagal dan fallback
- [ ] evaluasi mencakup skenario nyata dan edge case
- [ ] perilaku agent dapat dijelaskan, bukan hanya terlihat bekerja sekali

## Anti-pattern penting

- langsung membangun multi-agent tanpa membuktikan kebutuhan
- menambahkan terlalu banyak tool sejak awal
- menyimpan semua hal ke memori tanpa strategi retrieval
- tidak mendefinisikan kapan agent harus eskalasi
- menguji hanya happy path demo
- tidak mengukur biaya, latensi, dan reliabilitas

## Referensi skill terkait

Skill ini selaras dengan beberapa skill proyek yang sudah ada:
- `agent-tool-builder` untuk desain tool agent
- `agent-memory-systems` untuk arsitektur memori
- `agent-evaluation` untuk evaluasi perilaku agent
- `architecture` atau `architecture-patterns` untuk keputusan desain sistem yang lebih luas

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/ai-agent-development` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
