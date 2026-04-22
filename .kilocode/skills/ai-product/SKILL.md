---
name: ai-product
description: Gunakan saat merancang produk berbasis AI agar keputusan tentang UX AI, prompt, RAG, validasi output, latency, biaya, fallback, dan kesiapan produksi dibuat secara sadar, bukan sekadar mengejar demo.
license: Complete terms in LICENSE.txt
metadata:
  category: product
  source:
    upstream: .tmp-antigravity-skills/skills/ai-product
    type: community
  depends_on:
    - kejelasan use case produk dan journey pengguna
    - akses ke metrik produk, biaya, dan perilaku model
---

# AI Product

Skill ini memandu perancangan produk berbasis AI agar pengalaman pengguna, kualitas model, biaya, dan kesiapan produksi dipikirkan sebagai satu sistem. Fokusnya adalah membangun produk AI yang tahan dipakai, bukan hanya demo yang terlihat impresif.

## Kapan digunakan

Gunakan skill ini saat perlu:
- merancang fitur produk berbasis LLM
- menentukan apakah use case lebih cocok memakai prompt, RAG, workflow, atau human review
- mendesain UX untuk output AI yang probabilistik
- mengendalikan biaya, latency, dan fallback pada fitur AI
- menyiapkan eksperimen dan evaluasi untuk iterasi produk AI

## Prinsip inti

- model bersifat probabilistik, bukan deterministik
- prompt adalah bagian dari produk dan harus diperlakukan seperti kode
- untuk banyak use case, RAG lebih praktis daripada fine-tuning
- latency adalah bagian dari pengalaman pengguna
- biaya adalah fitur produk, bukan urusan belakang layar saja
- output AI tidak boleh dipercaya mentah tanpa validasi

## Alur kerja inti

### 1. Definisikan masalah produk dengan jelas

Tentukan:
- pekerjaan pengguna yang ingin dibantu AI
- keputusan apa yang diotomasi vs tetap dikendalikan manusia
- bentuk output yang benar-benar berguna bagi pengguna
- risiko jika model salah atau halusinasi

Pertanyaan kunci:
- apakah pengguna butuh jawaban, draft, klasifikasi, ekstraksi, atau aksi otomatis?
- apakah kesalahan kecil masih dapat diterima?
- apakah pengguna perlu melihat sumber atau tingkat keyakinan?

### 2. Pilih pola solusi AI yang tepat

Pertimbangkan opsi berikut:
- prompt-only untuk tugas sederhana dan konteks kecil
- structured output untuk hasil yang dipakai sistem lain
- RAG untuk knowledge yang sering berubah
- workflow multi-step untuk tugas kompleks
- human-in-the-loop untuk keputusan berisiko tinggi

Prinsip praktis:
- mulai dari solusi paling sederhana yang bisa divalidasi
- naikkan kompleksitas hanya bila ada bukti kebutuhan

### 3. Rancang UX yang jujur terhadap sifat AI

Karena output AI bisa bervariasi, desain UX harus:
- menunjukkan progres bila latency terasa
- memberi ruang koreksi atau retry
- menampilkan sumber atau alasan bila relevan
- membedakan hasil pasti vs hasil prediktif
- menyediakan fallback saat model gagal

Contoh praktik baik:
- streaming response untuk mengurangi rasa menunggu
- indikator status seperti "sedang menganalisis dokumen"
- tombol regenerate atau edit hasil
- confidence atau citation bila keputusan perlu dipercaya

### 4. Perlakukan prompt sebagai artefak produk

Prompt harus:
- disimpan dalam version control
- diberi versi yang jelas
- diuji dengan regression suite
- diubah melalui proses yang dapat ditelusuri

Contoh pola:

```typescript
export const CATEGORIZE_TICKET_V2 = {
  version: '2.0',
  system: 'Anda adalah pengklasifikasi tiket support...',
  test_cases: [
    { input: 'Login rusak', expected: { category: 'bug' } },
    { input: 'Mau dark mode', expected: { category: 'feature' } }
  ]
};
```

### 5. Validasi output sebelum dipakai sistem

Jika output AI akan dipakai programatik:
- gunakan schema validation
- gunakan structured output atau function calling
- siapkan retry atau fallback bila parsing gagal
- jangan langsung menyimpan hasil model ke database tanpa pemeriksaan

Contoh pola validasi:

```typescript
import { z } from 'zod';

const schema = z.object({
  category: z.enum(['bug', 'feature', 'question']),
  priority: z.number().min(1).max(5),
  summary: z.string().max(200)
});
```

### 6. Rancang latency dan biaya sejak awal

Perhatikan:
- model besar meningkatkan biaya dan waktu respons
- embedding dan retrieval juga punya biaya
- prompt panjang memperbesar token usage
- caching dapat mengurangi biaya signifikan

Strategi umum:
- gunakan model kecil untuk tugas sederhana
- cache embedding dan respons deterministik
- stream output untuk use case user-facing
- precompute bila ada pekerjaan yang bisa dilakukan di belakang layar

### 7. Gunakan RAG bila knowledge sering berubah

RAG cocok saat:
- pengetahuan berasal dari dokumen internal
- konten sering diperbarui
- pengguna perlu jawaban berbasis sumber
- fine-tuning terlalu mahal atau sulit dipelihara

Pola umum:
1. lakukan semantic search
2. gabungkan dengan keyword search bila perlu
3. rerank hasil
4. masukkan konteks terbaik ke prompt

### 8. Siapkan fallback dan degradasi yang elegan

Untuk fitur AI di jalur penting, tentukan:
- apa yang terjadi saat API model gagal
- apa yang terjadi saat output tidak valid
- kapan sistem harus fallback ke rule-based logic
- kapan hasil harus masuk antrean human review

Contoh pola:
- circuit breaker untuk kegagalan berulang
- cached response untuk pertanyaan umum
- mode manual bila confidence rendah

## Pola implementasi penting

### Structured output dengan validasi

Gunakan saat hasil AI akan dipakai oleh sistem lain.

### Streaming dengan progress

Gunakan untuk chat, drafting, atau generation yang sensitif terhadap latency.

### Prompt versioning dan testing

Gunakan untuk semua prompt produksi agar perubahan perilaku dapat dilacak.

### Caching operasi mahal

Gunakan untuk embedding dan respons yang sering berulang.

### Hybrid search untuk RAG

Gunakan saat semantic search saja belum cukup relevan.

## Anti-pattern penting

- memperlakukan output AI sebagai fakta pasti
- menyimpan prompt inline tanpa versi dan test
- memakai fine-tuning terlalu dini padahal RAG cukup
- membiarkan pengguna menunggu lama tanpa feedback progres
- memakai model mahal untuk semua request
- tidak menyiapkan fallback saat model gagal
- memasukkan input pengguna mentah ke prompt tanpa sanitasi atau guardrail

## Checklist review produk AI

1. Apakah masalah pengguna yang diselesaikan benar-benar jelas?
2. Apakah pola solusi AI yang dipilih paling sederhana yang memadai?
3. Apakah UX mengakui bahwa AI bisa salah atau lambat?
4. Apakah prompt dikelola seperti artefak produk?
5. Apakah output divalidasi sebelum dipakai sistem?
6. Apakah biaya dan latency dipantau?
7. Apakah ada fallback saat model gagal atau confidence rendah?
8. Apakah eksperimen dan evaluasi produk sudah direncanakan?

## Referensi skill terkait

Skill ini melengkapi:
- `analytics-product`
- `advanced-evaluation`
- `ai-agent-development`
- `agent-tool-builder`
- `analytics-tracking`

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/ai-product` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
