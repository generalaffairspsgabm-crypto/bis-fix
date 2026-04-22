---
name: ai-engineering-toolkit
description: Gunakan saat perlu workflow rekayasa AI yang terstruktur untuk evaluasi prompt, perencanaan context budget, desain RAG, audit keamanan agent, pembangunan eval harness, dan coaching product sense sebelum implementasi.
license: Complete terms in LICENSE.txt
metadata:
  category: ai-engineering
  source:
    upstream: .tmp-antigravity-skills/skills/ai-engineering-toolkit
    type: community
  depends_on:
    - akses ke prompt, arsitektur, atau artefak sistem AI yang sedang dianalisis
    - izin eksplisit untuk audit keamanan ofensif dalam lingkungan terotorisasi
---

# AI Engineering Toolkit

Skill ini menyatukan enam workflow rekayasa AI yang berulang dan dapat distandardisasi. Fokusnya bukan sekadar meminta bantuan model, tetapi memaksa proses evaluasi, scoring, keputusan desain, dan audit dilakukan secara konsisten.

## Kapan digunakan

Gunakan skill ini saat perlu:
- mengevaluasi atau memperbaiki system prompt sebelum produksi
- merencanakan pembagian token dalam context window
- mendesain pipeline RAG secara sadar, bukan sekadar boilerplate
- mengaudit keamanan agent AI sebelum peluncuran
- membangun kerangka evaluasi untuk aplikasi LLM
- menilai kelayakan produk AI sebelum menulis kode

## Enam workflow inti

### 1. Prompt Evaluator
Nilai prompt pada delapan dimensi:
- kejelasan
- spesifisitas
- kelengkapan
- keringkasan
- struktur
- grounding
- keamanan
- robustness

Gunakan skala konsisten, identifikasi tiga dimensi terlemah, lalu usulkan rewrite yang terarah.

### 2. Context Budget Planner
Petakan distribusi token ke zona konteks utama:
- system
- few-shot
- input pengguna
- retrieval
- output

Tujuannya adalah mencegah zona penting, terutama output atau retrieval, tercekik tanpa disadari.

### 3. RAG Pipeline Architect
Gunakan decision tree untuk memilih:
- format dokumen
- strategi parsing
- chunking
- embedding
- retrieval
- metrik evaluasi

Cakup opsi seperti naive RAG, advanced RAG, dan modular RAG sesuai kebutuhan sistem.

### 4. Agent Safety Guard
Workflow audit keamanan untuk agent AI. Ini termasuk kategori sensitif karena dapat menghasilkan payload uji adversarial.

Gunakan hanya untuk:
- asesmen keamanan terotorisasi
- validasi defensif
- lingkungan sandbox atau edukasi yang terkendali

Kategori audit yang relevan:
- direct prompt injection
- indirect prompt injection melalui dokumen RAG
- ekstraksi informasi sensitif
- penyalahgunaan tool
- goal hijacking

### 5. Eval Harness Builder
Rancang sistem evaluasi yang dapat diulang untuk aplikasi LLM, termasuk:
- rubric penilaian
- LLM-as-judge
- mitigasi bias penilaian
- template pipeline evaluasi untuk CI atau quality gate

### 6. Product Sense Coach
Gunakan percakapan terstruktur untuk menjawab apakah sebuah produk AI layak dibangun. Fokus pada:
- motivasi pengguna
- peluang pasar
- jalur solusi
- skenario penggunaan
- kompetisi

## Alur kerja yang direkomendasikan

Urutan umum yang efektif:
1. product sense bila problem framing belum matang
2. desain RAG bila sistem berbasis knowledge retrieval
3. context budget planning
4. evaluasi prompt
5. audit keamanan agent
6. pembangunan eval harness

## Prompt Evaluator secara praktis

### Rubrik minimum
Untuk tiap dimensi, nilai:
- 1 sampai 3: lemah
- 4 sampai 6: cukup
- 7 sampai 8: baik
- 9 sampai 10: sangat kuat

### Output yang diharapkan
- skor total atau profil skor
- tiga kelemahan utama
- alasan singkat per dimensi lemah
- versi prompt yang diperbaiki
- evaluasi ulang setelah rewrite

## Context Budget Planner secara praktis

### Pertanyaan kunci
- apakah system prompt terlalu panjang?
- apakah contoh few-shot benar-benar perlu?
- apakah retrieval memakan ruang berlebihan?
- apakah output budget cukup untuk jawaban lengkap?
- apakah ada bagian yang bisa dikompresi atau dipindah ke tool?

### Hasil yang diharapkan
- pembagian token saat ini
- pembagian token yang direkomendasikan
- strategi kompresi per zona
- risiko truncation atau kehilangan konteks

## RAG Pipeline Architect secara praktis

### Keputusan utama
- dokumen terstruktur atau tidak terstruktur
- chunk fixed, recursive, atau semantic
- retrieval vector, keyword, atau hybrid
- reranking perlu atau tidak
- evaluasi memakai faithfulness, relevancy, context precision, atau metrik lain

### Anti-pattern
- chunking dipilih tanpa melihat bentuk dokumen
- retrieval vector dipakai padahal keyword lebih cocok
- tidak ada evaluasi faithfulness
- menganggap RAG selesai hanya karena embedding sudah dibuat

## Agent Safety Guard secara praktis

### Guardrail wajib
- hanya jalankan bila pengguna punya otorisasi eksplisit
- lakukan di sandbox bila memungkinkan
- jangan gunakan payload untuk menyerang sistem nyata tanpa izin
- minta konfirmasi sebelum fase uji yang sensitif

### Fokus audit
- apakah prompt sistem bisa diekstrak?
- apakah dokumen retrieval bisa menyisipkan instruksi jahat?
- apakah tool menerima input berbahaya?
- apakah agent bisa dibajak dari tujuan awal?
- apakah rahasia seperti API key dapat bocor?

## Eval Harness Builder secara praktis

### Komponen minimum
- tujuan evaluasi
- dataset atau test set
- rubric penilaian
- metrik utama dan guardrail
- prosedur sampling
- mitigasi bias judge
- ambang lulus atau regresi

### Bias yang perlu diwaspadai
- position bias
- verbosity bias
- self-enhancement bias
- rubric drift

## Product Sense Coach secara praktis

### Lima fase percakapan
- gali motivasi pengguna
- ukur peluang pasar
- cari jalur solusi paling masuk akal
- desain skenario penggunaan
- bandingkan dengan kompetitor atau alternatif

### Hasil yang diharapkan
- problem statement yang lebih tajam
- hipotesis nilai produk
- risiko utama
- keputusan lanjut, pivot, atau hentikan

## Catatan keamanan

Sebagian workflow bersifat analitis dan aman. Namun bagian audit keamanan agent bersifat ofensif-terbatas karena dapat menghasilkan payload uji. Perlakukan bagian itu sebagai aktivitas keamanan terotorisasi, bukan penggunaan umum.

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/ai-engineering-toolkit` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
