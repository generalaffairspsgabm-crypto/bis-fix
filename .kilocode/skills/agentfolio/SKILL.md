---
name: agentfolio
description: Gunakan saat ingin menemukan, membandingkan, dan meneliti agen AI otonom, framework, atau tool agentik yang sudah ada sebelum membangun solusi sendiri.
license: Complete terms in LICENSE.txt
metadata:
  category: research
  source:
    upstream: .tmp-antigravity-skills/skills/agentfolio
    type: community
  depends_on:
    - akses ke direktori atau sumber informasi ekosistem agen seperti AgentFolio
    - tujuan riset yang jelas, misalnya discovery vendor, benchmark, atau inspirasi produk
---

# AgentFolio

Skill ini membantu melakukan discovery dan riset terhadap agen AI otonom, framework, dan tool agentik yang sudah ada. Fokusnya adalah memahami lanskap solusi yang tersedia agar keputusan build vs buy, benchmarking, dan positioning produk tidak dilakukan dalam ruang hampa.

## Kapan digunakan

Gunakan skill ini saat perlu:
- menemukan agen atau framework yang sudah ada sebelum membangun sendiri
- membandingkan beberapa vendor atau produk agentik
- mengumpulkan benchmark, pola UX, atau inspirasi fitur
- memetakan lanskap pasar agen berdasarkan use case tertentu
- mencari celah pasar atau diferensiasi untuk skill baru

## Jangan gunakan saat

- tugas utamanya adalah implementasi teknis langsung tanpa kebutuhan riset pasar
- tidak ada pertanyaan discovery atau evaluasi yang jelas
- sumber informasi eksternal tidak tersedia dan tidak bisa diverifikasi

## Tujuan utama

- menghindari pembangunan solusi yang sebenarnya sudah tersedia
- memahami capability, deployment model, dan target user dari solusi yang ada
- mengumpulkan pola desain dan safety yang layak ditiru atau dihindari
- membantu keputusan integrasi vendor vs membangun sendiri

## Alur kerja inti

### 1. Definisikan intent riset

Mulai dari masalah yang ingin dipecahkan, misalnya:
- agen coding otonom
- agen customer support
- agen riset atau analisis
- agen observabilitas atau keamanan

### 2. Cari kandidat relevan

Untuk setiap kandidat, kumpulkan minimal:
- proposisi nilai utama
- use case yang ditargetkan
- bentuk input dan output
- model otonomi: one-shot, multi-step, tool-using, human-in-the-loop
- model deployment: SaaS, self-hosted, browser, IDE, API, dan sebagainya

### 3. Bandingkan kandidat

Bangun tabel perbandingan dengan kolom seperti:
- capability utama
- integrasi yang didukung
- target pengguna
- pricing atau lisensi
- trust, safety, dan batas otonomi

### 4. Sintesis insight

Gunakan hasil riset untuk:
- memutuskan build vs buy
- mengambil inspirasi UX dan guardrail
- menemukan gap pasar
- menerjemahkan temuan menjadi requirement produk atau skill baru

## Pertanyaan evaluasi yang disarankan

Saat menilai kandidat, tanyakan:
- outcome apa yang benar-benar diotomasi?
- seberapa otonom sistemnya?
- integrasi apa yang tersedia?
- siapa pengguna idealnya?
- bagaimana batas keamanan dan kontrol manusia diterapkan?
- apa kelemahan atau blind spot yang terlihat?

## Checklist riset agen

- [ ] masalah atau use case riset sudah didefinisikan
- [ ] kandidat relevan sudah dikumpulkan
- [ ] capability, deployment, dan model otonomi sudah dibandingkan
- [ ] pricing atau constraint adopsi sudah dicatat bila relevan
- [ ] insight build vs buy atau gap pasar sudah dirangkum

## Anti-pattern penting

- membangun agen baru tanpa memeriksa solusi yang sudah ada
- membandingkan vendor hanya dari marketing copy
- tidak mencatat batas keamanan atau model otonomi
- mencampur inspirasi produk dengan requirement final tanpa sintesis yang jelas

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/agentfolio` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
