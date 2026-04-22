---
name: agent-framework-azure-ai-py
description: >-
  Gunakan saat membangun agent persisten di Azure AI Foundry memakai Microsoft
  Agent Framework Python SDK, termasuk thread percakapan, tool function,
  hosted tool, streaming, dan output terstruktur.
license: CC-BY-4.0
metadata:
  category: ai-engineering
  source:
    repository: 'https://github.com/sickn33/antigravity-awesome-skills'
    path: skills/agent-framework-azure-ai-py
    license_path: LICENSE-CONTENT
  original_metadata:
    risk: unknown
    source: community
    date_added: '2026-02-27'
---

# Agent Framework Azure AI Python

Skill ini memandu pembangunan agent persisten di Azure AI Foundry menggunakan Microsoft Agent Framework untuk Python. Fokusnya adalah pola implementasi inti: autentikasi, pembuatan agent, penggunaan tool, thread percakapan, streaming, dan output terstruktur.

## Kapan digunakan

Gunakan saat:
- membangun agent Python yang berjalan di Azure AI Foundry
- membutuhkan percakapan persisten dengan thread atau conversation ID
- ingin menambahkan function tool, hosted tool, atau format output terstruktur
- perlu contoh implementasi async yang siap dijadikan baseline proyek

## Jangan gunakan saat

Jangan gunakan saat:
- stack utama bukan Python
- kebutuhan hanya prompt sederhana tanpa lifecycle agent persisten
- belum ada akses ke Azure AI project endpoint atau kredensial Azure yang valid

## Prasyarat

Pastikan tersedia:
- Python environment yang sesuai
- paket `agent-framework` atau `agent-framework-azure-ai`
- akses ke Azure AI Foundry project
- kredensial Azure untuk development atau production

## Variabel lingkungan penting

Siapkan variabel berikut sesuai lingkungan:
- `AZURE_AI_PROJECT_ENDPOINT`
- `AZURE_AI_MODEL_DEPLOYMENT_NAME`
- `BING_CONNECTION_ID` bila memakai web search hosted tool

## Prinsip inti

- gunakan autentikasi yang sesuai konteks: CLI untuk development, default credential untuk production
- mulai dari agent minimal, lalu tambahkan tool dan persistence secara bertahap
- simpan conversation ID bila percakapan perlu dilanjutkan
- gunakan output terstruktur untuk kontrak respons yang stabil
- validasi dependency dan deployment name sebelum debugging perilaku agent

## Arsitektur ringkas

Alur umum:
- user query masuk ke provider Azure AI Agents
- provider membuat atau memanggil agent persisten
- agent menjalankan instruksi dan tool
- thread menyimpan konteks percakapan lintas turn

Komponen utama:
- `AzureAIAgentsProvider`
- agent instance
- optional tools: function, hosted code, hosted web search, hosted file search
- thread percakapan

## Alur kerja

### 1. Instalasi paket

Gunakan salah satu:
- `pip install agent-framework --pre`
- `pip install agent-framework-azure-ai --pre`

Pilih paket penuh bila ingin akses fitur framework yang lebih luas.

### 2. Siapkan autentikasi

Pola umum:
- development: `AzureCliCredential`
- production: `DefaultAzureCredential`

Pastikan principal yang dipakai memang memiliki akses ke project Azure AI terkait.

### 3. Buat agent minimal

Mulai dari agent sederhana dengan:
- nama agent
- instructions yang jelas
- model deployment yang sudah tersedia

Contoh pola implementasi:

```python
import asyncio
from agent_framework.azure import AzureAIAgentsProvider
from azure.identity.aio import AzureCliCredential

async def main():
    async with (
        AzureCliCredential() as credential,
        AzureAIAgentsProvider(credential=credential) as provider,
    ):
        agent = await provider.create_agent(
            name="MyAgent",
            instructions="You are a helpful assistant.",
        )

        result = await agent.run("Hello!")
        print(result.text)

asyncio.run(main())
```

### 4. Tambahkan function tools

Gunakan function Python biasa untuk kemampuan deterministik seperti:
- lookup data internal
- kalkulasi sederhana
- wrapper ke service lain

Pedoman:
- beri docstring yang jelas
- gunakan type annotation
- jelaskan parameter dengan baik agar tool calling lebih stabil

### 5. Tambahkan hosted tools bila perlu

Hosted tools cocok saat agent perlu:
- menjalankan kode
- mencari web
- mencari file

Gunakan hanya bila benar-benar diperlukan karena menambah kompleksitas operasional dan observability.

### 6. Gunakan streaming untuk UX interaktif

Jika aplikasi membutuhkan respons bertahap, gunakan `run_stream()` agar token atau chunk dapat dikirim sambil proses berjalan.

### 7. Gunakan thread untuk persistence

Jika percakapan harus berlanjut lintas turn:
- buat thread baru
- kirim turn pertama dengan thread tersebut
- gunakan thread yang sama untuk turn berikutnya
- simpan `conversation_id` agar sesi bisa dilanjutkan

### 8. Gunakan output terstruktur untuk kontrak respons

Jika downstream system membutuhkan format stabil, definisikan model Pydantic dan gunakan sebagai `response_format`.

Ini berguna untuk:
- integrasi API
- workflow otomatis
- validasi schema
- mengurangi parsing bebas yang rapuh

## Pola implementasi yang direkomendasikan

### Agent dasar
Cocok untuk proof of concept dan validasi koneksi Azure.

### Agent + function tools
Cocok saat logika bisnis utama masih berada di kode aplikasi sendiri.

### Agent + hosted tools
Cocok saat perlu kemampuan tambahan seperti code interpreter atau web search.

### Agent + thread persistence
Cocok untuk chatbot, copilot, atau workflow multi-turn.

### Agent + structured output
Cocok untuk sistem yang membutuhkan respons machine-readable.

## Checklist cepat

- paket Python yang dibutuhkan terpasang
- endpoint project Azure AI valid
- deployment model tersedia
- credential berhasil autentikasi
- agent minimal bisa dijalankan
- tool hanya ditambahkan bila perlu
- thread digunakan untuk percakapan multi-turn
- schema output dipakai bila integrasi membutuhkan kontrak stabil

## Anti-pattern

Hindari:
- langsung membangun agent kompleks sebelum agent minimal berhasil
- mencampur terlalu banyak tool tanpa observability yang cukup
- tidak menyimpan conversation ID saat persistence dibutuhkan
- mengandalkan output bebas saat downstream membutuhkan schema ketat
- memakai credential development untuk deployment production

## Catatan kompatibilitas KiloCode

Skill upstream berisi contoh kode panjang dan referensi paket spesifik. Pada adaptasi KiloCode ini, konten dinormalisasi menjadi panduan implementasi mandiri berbahasa Indonesia dengan contoh inti yang cukup untuk memulai tanpa bergantung pada file eksternal lain.