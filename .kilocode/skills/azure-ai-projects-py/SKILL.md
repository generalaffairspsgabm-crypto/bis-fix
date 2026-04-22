---
name: azure-ai-projects-py
description: Gunakan saat membangun aplikasi AI di Azure AI Foundry memakai SDK Python `azure-ai-projects`, termasuk koneksi proyek, deployment model, agent, dataset, index, dan evaluasi.
license: Complete terms in LICENSE.txt
metadata:
  category: ai
  source:
    upstream: .tmp-antigravity-skills/skills/azure-ai-projects-py
    type: community
  depends_on:
    - akses ke Azure AI Foundry project dan kredensial Azure yang valid
    - lingkungan Python dengan paket `azure-ai-projects` dan `azure-identity`
---

# Azure AI Projects Python SDK

Skill ini membantu membangun aplikasi AI di Azure AI Foundry menggunakan SDK Python `azure-ai-projects`. Fokusnya adalah memahami pola client, autentikasi, operasi proyek, penggunaan deployment model, agent, thread, koneksi, dataset, index, dan evaluasi tanpa bergantung pada dokumentasi eksternal saat menjalankan tugas inti.

## Kapan digunakan

Gunakan skill ini saat perlu:
- menghubungkan aplikasi Python ke Azure AI Foundry project
- membuat atau mengelola agent melalui `AIProjectClient`
- memakai deployment model yang tersedia di project
- mengakses koneksi, dataset, index, atau evaluasi dari project
- membangun alur percakapan berbasis thread dan run
- menggabungkan tool seperti code interpreter, file search, function calling, atau MCP pada agent

## Tujuan utama

- menggunakan `azure-ai-projects` secara benar dan idiomatis
- membedakan operasi Foundry-native dari client OpenAI-compatible
- membangun alur agent dan thread yang jelas
- menjaga konfigurasi endpoint, deployment, dan kredensial tetap rapi

## Prasyarat operasional

Sebelum implementasi, pastikan tersedia:
- endpoint project Azure AI Foundry
- kredensial Azure yang valid, biasanya melalui `DefaultAzureCredential`
- nama deployment model yang akan dipakai
- lingkungan Python dengan dependensi yang sesuai

Variabel environment yang umum dibutuhkan:
- `AZURE_AI_PROJECT_ENDPOINT`
- `AZURE_AI_MODEL_DEPLOYMENT_NAME`

## Konsep inti

### 1. `AIProjectClient`

Ini adalah client utama untuk operasi native Azure AI Foundry, misalnya:
- agent
- koneksi proyek
- deployment model
- dataset
- index
- evaluasi
- operasi red team bila tersedia

Gunakan client ini saat ingin bekerja dengan resource proyek secara langsung.

### 2. OpenAI-compatible client

Dari project client, Anda bisa memperoleh client yang kompatibel dengan pola OpenAI. Ini berguna bila:
- ingin memakai API chat completion yang familier
- ingin menjalankan evaluasi atau pola integrasi yang mengikuti antarmuka OpenAI

Gunakan pendekatan ini bila kebutuhan lebih cocok dengan antarmuka completion/chat daripada operasi resource proyek.

## Instalasi dasar

Dependensi minimum:
- `azure-ai-projects`
- `azure-identity`

Tambahkan paket lain sesuai tool atau integrasi yang dipakai.

## Pola autentikasi

Pola umum:
- gunakan `DefaultAzureCredential`
- baca endpoint dari environment variable
- inisialisasi `AIProjectClient` sekali lalu injeksikan ke service yang membutuhkan

Prinsip penting:
- jangan hardcode endpoint atau secret
- gunakan identity yang sesuai dengan environment lokal atau cloud
- validasi akses ke project sebelum membangun fitur yang lebih tinggi

## Alur kerja inti

### 1. Inisialisasi client proyek

Langkah awal:
- baca endpoint project
- buat credential
- inisialisasi `AIProjectClient`
- verifikasi konektivitas dengan operasi ringan seperti listing deployment atau koneksi

### 2. Pilih model deployment

Sebelum membuat agent atau menjalankan completion:
- pastikan nama deployment model tersedia
- cocokkan deployment dengan use case, misalnya chat, reasoning, atau multimodal bila relevan
- jangan mengasumsikan semua deployment tersedia di setiap project

### 3. Buat agent bila perlu

Gunakan agent saat membutuhkan:
- instruksi sistem yang persisten
- tool bawaan seperti code interpreter atau file search
- thread dan run yang terkelola
- orkestrasi percakapan yang lebih terstruktur

Saat membuat agent, tentukan:
- model deployment
- nama agent
- instruksi inti
- tool yang diperlukan

### 4. Kelola thread dan message flow

Pola umum:
1. buat thread
2. tambahkan message user
3. buat dan proses run
4. baca message assistant dari thread

Gunakan pola ini untuk percakapan multi-turn yang perlu state terkelola.

### 5. Gunakan tool sesuai kebutuhan

Tool yang umum tersedia pada ekosistem ini meliputi:
- code interpreter
- file search
- Bing grounding
- Azure AI Search
- function calling
- OpenAPI tool
- MCP tool
- memory search
- SharePoint grounding

Pilih tool hanya bila benar-benar dibutuhkan oleh use case. Hindari menambahkan terlalu banyak tool tanpa alasan jelas.

### 6. Akses resource proyek lain

Selain agent, project client dapat dipakai untuk:
- listing koneksi
- membaca deployment model
- mengelola dataset
- mengelola index
- menjalankan evaluasi

Gunakan operasi ini untuk membangun aplikasi AI yang lebih lengkap, misalnya RAG, evaluasi kualitas, atau integrasi data proyek.

## Pola penggunaan yang direkomendasikan

### Pola A: aplikasi chat sederhana

Gunakan bila hanya perlu:
- koneksi ke project
- satu deployment model
- chat completion atau agent sederhana

### Pola B: agent dengan tools

Gunakan bila perlu:
- instruksi sistem yang stabil
- thread dan run
- tool seperti file search atau code interpreter

### Pola C: aplikasi AI berbasis data proyek

Gunakan bila perlu:
- dataset atau index
- koneksi ke layanan lain
- evaluasi kualitas output
- integrasi lintas resource dalam satu project

## Checklist implementasi

- apakah endpoint project sudah benar?
- apakah kredensial Azure dapat mengakses project?
- apakah deployment model yang dipilih tersedia?
- apakah perlu `AIProjectClient`, OpenAI-compatible client, atau keduanya?
- apakah agent benar-benar diperlukan atau cukup chat completion biasa?
- apakah tool yang dipasang memang relevan?
- apakah thread dan run dikelola dengan jelas?

## Praktik baik

- pisahkan konfigurasi endpoint dan deployment dari kode bisnis
- validasi koneksi proyek lebih awal
- gunakan agent hanya bila ada kebutuhan state, tool, atau orkestrasi
- log status run dan error penting untuk debugging
- batasi tool pada agent agar perilaku lebih terkontrol

## Anti-pattern

- hardcode endpoint atau nama deployment di banyak tempat
- mengasumsikan semua project memiliki deployment dan koneksi yang sama
- menambahkan semua tool sekaligus tanpa kebutuhan nyata
- mencampur operasi resource proyek dan logika aplikasi tanpa boundary yang jelas
- mengabaikan status run dan langsung mengasumsikan hasil selesai

## Batasan

- kemampuan aktual bergantung pada resource dan deployment yang tersedia di project Azure AI Foundry pengguna
- beberapa fitur mungkin memerlukan paket tambahan, koneksi tertentu, atau izin khusus
- pola evaluasi dan tool tertentu dapat berubah mengikuti versi SDK

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/azure-ai-projects-py` agar mandiri, berbahasa Indonesia, dan tidak bergantung pada referensi eksternal yang tidak tersedia di workspace.
