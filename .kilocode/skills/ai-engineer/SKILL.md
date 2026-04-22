---
name: ai-engineer
description: Gunakan saat membangun fitur LLM production-grade, sistem RAG lanjutan, pencarian vektor, agent AI, multimodal workflow, serta guardrail, observability, dan optimasi biaya agar solusi AI siap dipakai di lingkungan nyata.
license: Complete terms in LICENSE.txt
metadata:
  category: development
  source:
    upstream: .tmp-antigravity-skills/skills/ai-engineer
    type: community
  depends_on:
    - kejelasan use case AI dan data source yang tersedia
    - akses ke model, vector store, atau platform deployment yang relevan
    - kemampuan observability dan evaluasi untuk sistem AI
---

# AI Engineer

Skill ini memandu pembangunan sistem AI production-grade berbasis LLM, RAG, agent, dan multimodal workflow. Fokusnya bukan sekadar membuat demo bekerja, tetapi memastikan arsitektur, reliabilitas, biaya, keamanan, dan observability dipikirkan sejak awal.

## Kapan digunakan

Gunakan skill ini saat perlu:
- membangun atau meningkatkan fitur berbasis LLM
- merancang sistem RAG untuk knowledge base atau pencarian semantik
- mengimplementasikan agent AI dengan tool dan memori
- memilih model, embedding, dan vector database untuk use case nyata
- menambahkan monitoring, safety, dan cost control pada sistem AI
- membangun pipeline multimodal untuk teks, gambar, audio, atau dokumen

## Jangan gunakan sebagai default bila

- tugas hanya perubahan UI kecil tanpa komponen AI
- masalah murni machine learning tradisional tanpa LLM atau retrieval
- belum ada akses ke data, model, atau target deployment sehingga desain masih spekulatif total

## Prinsip inti

- prioritaskan reliabilitas produksi dibanding demo cepat
- desain alur data dan evaluasi sebelum memilih model mahal
- validasi output model sebelum dipakai secara programatik
- ukur biaya, latensi, dan kualitas sebagai metrik kelas satu
- tambahkan guardrail untuk prompt injection, PII, dan misuse
- siapkan fallback saat model, retrieval, atau tool gagal

## Alur kerja inti

### 1. Klarifikasi use case dan batasan

Tentukan:
- outcome bisnis atau produk yang diinginkan
- jenis input dan output
- kebutuhan akurasi, latensi, dan biaya
- data source yang tersedia
- batasan keamanan, privasi, dan compliance

Pertanyaan kunci:
- apakah masalah ini butuh generation, retrieval, classification, extraction, atau agentic action?
- apakah jawaban harus dapat ditelusuri ke sumber?
- apakah sistem berada di jalur kritis bisnis?

### 2. Rancang arsitektur AI

Petakan komponen utama:
- model inference
- retrieval atau vector search
- prompt layer
- tool integration
- memory atau state
- observability dan evaluation
- fallback dan circuit breaker

Contoh pola umum:

```text
User request -> preprocessing -> retrieval -> prompt assembly -> model -> validation -> response
```

Untuk agentic workflow:

```text
User request -> planner/router -> agent core -> tools/retrieval -> validator -> response
```

### 3. Pilih model dan strategi inferensi

Pertimbangkan:
- model frontier vs model kecil untuk cost-performance tradeoff
- hosted API vs self-hosted inference
- kebutuhan structured output, tool use, atau multimodal input
- kebutuhan streaming response
- strategi routing antar model untuk tugas berbeda

Prinsip praktis:
- gunakan model kecil untuk tugas sederhana bila cukup
- gunakan model besar hanya untuk reasoning atau kualitas yang memang membutuhkan
- cache hasil deterministik bila memungkinkan

### 4. Bangun RAG atau retrieval pipeline bila perlu

Untuk use case knowledge-intensive, rancang:
- strategi chunking
- embedding model
- vector database
- hybrid search bila perlu
- reranking
- context compression

Komponen yang sering relevan:
- semantic chunking atau recursive chunking
- BM25 + vector search untuk hybrid retrieval
- reranker untuk meningkatkan relevansi top-k
- metadata filtering untuk membatasi scope pencarian

Checklist retrieval:
- apakah chunk cukup kecil untuk relevansi namun cukup besar untuk konteks?
- apakah sumber dapat ditelusuri kembali?
- apakah retrieval diuji pada query nyata, bukan hanya contoh ideal?

### 5. Terapkan validasi output

Jangan percaya output model mentah. Gunakan:
- schema validation
- structured output atau function calling
- retry dengan guardrail bila parsing gagal
- fallback ke human review atau rule-based path untuk kasus kritis

Contoh pola:

```typescript
import { z } from 'zod';

const ResponseSchema = z.object({
  answer: z.string(),
  confidence: z.number().min(0).max(1),
  sources: z.array(z.string()).optional(),
});
```

Gunakan validasi sebelum menyimpan hasil ke database atau memicu aksi lanjutan.

### 6. Tambahkan observability dan evaluasi

Pantau minimal:
- latency per request
- token usage dan biaya
- retrieval hit quality
- error rate
- fallback rate
- kualitas jawaban atau task success rate

Siapkan:
- logging terstruktur
- tracing untuk langkah retrieval dan tool call
- dataset evaluasi regresi
- eksperimen A/B untuk prompt atau model routing

### 7. Terapkan safety dan governance

Periksa:
- prompt injection pada input pengguna atau dokumen retrieval
- PII leakage
- moderation atau content filtering
- batas akses tool dan data source
- audit trail untuk aksi penting

Prinsip:
- jangan kirim data sensitif ke model eksternal tanpa persetujuan dan kontrol yang tepat
- pisahkan data publik, internal, dan sensitif dalam pipeline

## Area kompetensi utama

### Integrasi LLM

Skill ini relevan untuk:
- pemilihan model hosted atau open-source
- structured outputs dan function calling
- multi-model routing
- caching dan optimasi biaya inferensi

### Sistem RAG lanjutan

Gunakan untuk:
- hybrid retrieval
- reranking
- query decomposition
- GraphRAG atau pola retrieval lanjutan bila memang dibutuhkan
- optimasi konteks agar token tetap efisien

### Agent dan orkestrasi

Gunakan untuk:
- agent dengan tool use
- workflow stateful
- memory jangka pendek dan panjang
- evaluasi perilaku agent

### Vector search dan embeddings

Gunakan untuk:
- pemilihan embedding model
- strategi indexing
- similarity metric
- tuning vector database dan caching

### Multimodal AI

Gunakan untuk:
- vision understanding
- speech-to-text atau text-to-speech
- document AI dan OCR
- pipeline yang menggabungkan teks, gambar, audio, atau video

## Pola implementasi penting

### Structured output dengan validasi

Gunakan saat output model akan dipakai programatik.

### Streaming response

Gunakan untuk pengalaman pengguna yang sensitif terhadap latency.

### Caching operasi mahal

Cache embedding, retrieval tertentu, atau respons deterministik untuk menekan biaya.

### Circuit breaker dan fallback

Siapkan jalur degradasi saat API model gagal, timeout, atau menghasilkan output buruk.

### Hybrid search untuk RAG

Gabungkan semantic search dan keyword search bila relevansi murni vector belum cukup.

## Anti-pattern penting

- memakai output model langsung tanpa validasi
- memasukkan input pengguna mentah ke prompt tanpa sanitasi atau guardrail
- memakai model terbesar untuk semua tugas
- membangun RAG tanpa evaluasi retrieval
- tidak menyiapkan fallback saat model gagal
- tidak mengukur biaya per request
- menganggap demo sukses berarti siap produksi

## Checklist review

1. Apakah use case dan metrik sukses sudah jelas?
2. Apakah arsitektur AI sesuai kebutuhan, bukan overengineered?
3. Apakah output model divalidasi sebelum dipakai?
4. Apakah retrieval pipeline diuji dengan query nyata?
5. Apakah biaya, latency, dan kualitas dipantau?
6. Apakah ada guardrail untuk injection, PII, dan misuse?
7. Apakah ada fallback saat model atau tool gagal?
8. Apakah rollout dan evaluasi regresi sudah direncanakan?

## Referensi skill terkait

Skill ini melengkapi beberapa skill proyek lain:
- `agent-tool-builder`
- `agent-memory-systems`
- `agent-evaluation`
- `advanced-evaluation`
- `analytics-tracking`
- `application-performance-performance-optimization`

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/ai-engineer` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
