---
name: agents-v2-py
description: Gunakan saat membangun hosted agent berbasis container di Azure AI Foundry memakai Azure AI Projects SDK Python, termasuk definisi image, resource, tools, dan environment variables.
license: Complete terms in LICENSE.txt
metadata:
  category: ai-platform
  source:
    upstream: .tmp-antigravity-skills/skills/agents-v2-py
    type: community
  depends_on:
    - Azure AI Projects SDK Python dan kredensial Azure yang valid
    - image container yang sudah tersedia di registry dan dapat di-pull oleh proyek Azure
---

# Agents V2 Python

Skill ini membantu membangun hosted agent berbasis container di Azure AI Foundry menggunakan Azure AI Projects SDK untuk Python. Fokusnya adalah mendefinisikan agent dari image container, mengatur resource, menambahkan tools, dan mengelola versi agent secara aman.

## Kapan digunakan

Gunakan skill ini saat perlu:
- membuat hosted agent berbasis image container di Azure AI Foundry
- mengelola versi agent yang berjalan pada environment hosting Azure
- mengonfigurasi CPU, memori, tools, dan environment variables agent
- menghubungkan agent dengan image di Azure Container Registry atau registry lain yang didukung

## Jangan gunakan saat

- hanya membutuhkan agen lokal tanpa hosting Azure
- image container belum tersedia atau belum dapat diakses oleh proyek Azure
- kebutuhan utamanya adalah agent berbasis prompt sederhana tanpa container khusus

## Tujuan utama

- membuat definisi hosted agent yang konsisten dan dapat di-versioning
- memastikan image, resource, dan tools agent dikonfigurasi dengan benar
- menjaga deployment agent tetap aman dan mudah dipelihara

## Prasyarat

Sebelum memakai skill ini, pastikan:
- SDK Python Azure AI Projects tersedia pada versi yang mendukung hosted agent
- autentikasi Azure menggunakan kredensial yang valid
- endpoint proyek Azure AI tersedia sebagai environment variable
- image container sudah dibangun dan di-push ke registry
- proyek Azure memiliki izin pull ke registry image

## Alur kerja inti

### 1. Siapkan autentikasi dan client

Gunakan kredensial default Azure dan inisialisasi client proyek dengan endpoint yang benar.

### 2. Validasi image dan hosting capability

Periksa:
- path image lengkap dan tag yang akan dipakai
- izin pull dari registry
- capability hosting yang dibutuhkan sudah aktif

### 3. Definisikan hosted agent

Saat membuat definisi agent, tentukan:
- protocol version yang didukung
- image container
- alokasi CPU dan memori
- tools yang tersedia untuk agent
- environment variables yang dibutuhkan container

### 4. Kelola versi agent

Setelah agent dibuat:
- catat nama dan versi yang dihasilkan
- daftar versi yang tersedia bila perlu audit
- hapus versi lama yang tidak lagi dipakai sesuai kebijakan lifecycle

## Konfigurasi penting

### Resource

Tentukan CPU dan memori sesuai kebutuhan workload. Hindari overprovisioning tanpa alasan yang jelas.

### Tools

Tambahkan hanya tool yang benar-benar diperlukan, misalnya:
- code interpreter
- file search
- MCP tool atau server eksternal

### Environment variables

Gunakan environment variable untuk konfigurasi runtime. Jangan hardcode secret di definisi agent.

## Checklist hosted agent Azure

- [ ] SDK dan autentikasi Azure siap digunakan
- [ ] endpoint proyek tersedia dan benar
- [ ] image container valid dan dapat di-pull
- [ ] CPU, memori, dan tools sudah ditentukan sesuai kebutuhan
- [ ] environment variables tidak membocorkan secret mentah
- [ ] versi agent dapat dilacak dan dikelola

## Anti-pattern penting

- hardcode secret di kode atau definisi agent
- memakai image tanpa kontrol versi yang jelas
- memberi resource terlalu kecil atau terlalu besar tanpa pengukuran
- menambahkan terlalu banyak tool tanpa kebutuhan nyata
- membuat versi agent baru tanpa strategi cleanup atau audit

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/agents-v2-py` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
