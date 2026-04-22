---
name: ai-ml
description: Gunakan saat merancang workflow AI/ML end-to-end yang mencakup aplikasi LLM, RAG, agent AI, pipeline machine learning, observabilitas, dan keamanan agar implementasi berjalan terstruktur dari desain hingga operasi.
license: Complete terms in LICENSE.txt
metadata:
  category: workflow
  source:
    upstream: .tmp-antigravity-skills/skills/ai-ml
    type: community
  depends_on:
    - kebutuhan proyek AI/ML yang melibatkan beberapa fase implementasi
---

# AI ML Workflow

Skill ini adalah workflow bundle untuk pekerjaan AI/ML yang luas. Tujuannya bukan menggantikan skill spesifik, tetapi memberi kerangka fase kerja agar proyek AI tidak langsung lompat ke coding tanpa desain, evaluasi, observabilitas, dan guardrail yang memadai.

## Kapan digunakan

Gunakan skill ini saat perlu:
- membangun aplikasi berbasis LLM
- mengimplementasikan sistem RAG
- merancang atau mengembangkan agent AI
- membangun pipeline machine learning
- menambahkan fitur AI ke produk yang sudah ada
- menata observabilitas dan keamanan untuk sistem AI

## Tujuan utama

- memecah proyek AI/ML menjadi fase yang jelas
- memastikan keputusan model, data, evaluasi, dan operasi dibuat secara sadar
- mengurangi risiko proyek AI yang hanya berhenti di demo
- membantu memilih skill spesifik yang perlu dipanggil pada tiap fase

## Prinsip inti

- desain use case dan metrik harus datang sebelum implementasi teknis
- integrasi model tanpa evaluasi dan observabilitas akan sulit diproduksikan
- RAG, agent, dan ML pipeline punya kebutuhan arsitektur yang berbeda
- keamanan dan biaya harus dipikirkan sejak awal, bukan di akhir

## Fase workflow

### Fase 1: Desain aplikasi AI

Fokus fase ini:
- definisikan use case AI yang benar-benar bernilai
- pilih model atau kelas model yang sesuai
- rancang arsitektur sistem tingkat tinggi
- petakan aliran data dan titik keputusan penting
- tetapkan metrik sukses

Pertanyaan kunci:
- masalah apa yang diselesaikan AI?
- apakah AI benar-benar diperlukan?
- bagaimana kualitas, latency, dan biaya akan diukur?
- apa fallback jika model gagal?

Skill terkait yang biasanya relevan:
- `ai-product`
- `ai-engineer`
- `ai-agents-architect`

### Fase 2: Integrasi LLM

Fokus fase ini:
- pilih provider dan model
- siapkan akses API dan konfigurasi dasar
- rancang prompt template
- atur parameter model
- tambahkan streaming bila UX membutuhkannya
- tangani error dan fallback

Checklist inti:
- autentikasi aman
- retry dan timeout jelas
- prompt dapat dipelihara
- output tervalidasi
- biaya inferensi dapat dilacak

### Fase 3: Implementasi RAG

Fokus fase ini:
- rancang pipeline data
- pilih model embedding
- pilih vector database atau retrieval layer
- tentukan strategi chunking
- atur retrieval dan reranking
- tambahkan caching bila perlu

Pertanyaan kunci:
- dokumen apa yang menjadi sumber kebenaran?
- bagaimana chunking memengaruhi recall dan precision?
- kapan perlu hybrid search?
- bagaimana mencegah jawaban yang tidak didukung sumber?

### Fase 4: Pengembangan agent AI

Fokus fase ini:
- pilih arsitektur agent
- definisikan peran agent bila multi-agent
- integrasikan tool
- rancang memori
- atur orkestrasi dan handoff
- tentukan kapan human-in-the-loop diperlukan

Checklist inti:
- batas iterasi dan biaya
- kontrak tool jelas
- observabilitas tersedia
- recovery dan fallback dirancang

### Fase 5: Pengembangan pipeline ML

Fokus fase ini:
- rancang pipeline data dan training
- siapkan preprocessing
- implementasikan training dan evaluasi
- kelola model registry
- siapkan deployment model

Pertanyaan kunci:
- bagaimana data dikurasi dan divalidasi?
- bagaimana eksperimen dilacak?
- bagaimana model dipromosikan ke produksi?

### Fase 6: Observabilitas AI

Fokus fase ini:
- tracing request dan chain
- logging input/output penting
- evaluasi kualitas model
- monitoring performa dan latency
- pelacakan biaya
- alerting untuk regresi atau kegagalan

Yang perlu diamati:
- kualitas jawaban
- tingkat kegagalan
- latency
- biaya per request
- drift perilaku model

### Fase 7: Keamanan AI

Fokus fase ini:
- validasi input
- filtering output
- rate limiting
- kontrol akses
- monitoring abuse
- audit logging

Risiko yang perlu dipikirkan:
- prompt injection
- data leakage
- akses tidak sah ke tool atau data
- output berbahaya atau tidak sesuai kebijakan

## Checklist lintas fase

### Integrasi LLM

- [ ] API key dan secret aman
- [ ] rate limiting dikonfigurasi
- [ ] error handling tersedia
- [ ] streaming diaktifkan bila perlu
- [ ] penggunaan token dilacak

### Sistem RAG

- [ ] pipeline data berjalan
- [ ] embedding sesuai use case
- [ ] retrieval tervalidasi
- [ ] chunking diuji
- [ ] sumber jawaban dapat ditelusuri

### Agent AI

- [ ] tool registry jelas
- [ ] batas iterasi dan biaya ada
- [ ] memori tidak menumpuk noise
- [ ] observabilitas tersedia
- [ ] fallback atau eskalasi dirancang

### Pipeline ML

- [ ] data preprocessing terdokumentasi
- [ ] evaluasi model konsisten
- [ ] eksperimen dapat direproduksi
- [ ] deployment punya rollback plan

### Operasi dan keamanan

- [ ] tracing dan logging aktif
- [ ] biaya dipantau
- [ ] abuse monitoring tersedia
- [ ] audit trail tersedia
- [ ] guardrail keamanan diuji

## Cara memakai workflow ini

1. Tentukan fase proyek saat ini.
2. Identifikasi keputusan yang belum dibekukan.
3. Pilih skill spesifik yang paling relevan untuk fase tersebut.
4. Kerjakan fase secara berurutan, tetapi izinkan iterasi balik bila ada temuan baru.
5. Jangan menyatakan sistem siap produksi sebelum observabilitas, evaluasi, dan keamanan disentuh.

## Anti-pattern penting

- langsung coding tanpa definisi use case dan metrik
- membangun RAG tanpa strategi chunking dan evaluasi retrieval
- membangun agent tanpa batas iterasi atau observabilitas
- menganggap demo berhasil berarti siap produksi
- menunda keamanan dan biaya sampai akhir proyek

## Hasil yang diharapkan

Dengan mengikuti workflow ini, proyek AI/ML akan:
- lebih terstruktur dari desain sampai operasi
- lebih mudah diprioritaskan per fase
- lebih kecil risikonya untuk gagal di produksi
- lebih siap berkembang dari eksperimen ke sistem nyata

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/ai-ml` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.