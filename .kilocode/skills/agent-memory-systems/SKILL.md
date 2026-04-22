---
name: agent-memory-systems
description: >-
  Gunakan saat merancang memori agent agar semantic, episodic, procedural,
  retrieval, chunking, vector store, dan lifecycle memori dipilih sesuai use case
  dan kualitas recall yang dibutuhkan.
license: CC-BY-4.0
metadata:
  category: ai-architecture
  source:
    repository: 'https://github.com/sickn33/antigravity-awesome-skills'
    path: skills/agent-memory-systems
    license_path: LICENSE-CONTENT
  original_metadata:
    risk: safe
    source: 'vibeship-spawner-skills (Apache 2.0)'
    date_added: '2026-02-27'
---

# Agent Memory Systems

Skill ini memandu perancangan sistem memori untuk agent AI. Fokus utamanya bukan sekadar menyimpan informasi, tetapi memastikan informasi yang tepat dapat ditemukan kembali pada saat yang tepat. Skill ini mencakup memori jangka pendek, memori jangka panjang, tipe memori kognitif, retrieval, chunking, decay, dan pemilihan vector store.

## Kapan digunakan

Gunakan saat:
- merancang arsitektur memori untuk agent atau copilot
- menentukan kapan memakai semantic, episodic, atau procedural memory
- memilih vector store atau strategi retrieval untuk memori jangka panjang
- mengevaluasi kualitas recall, chunking, dan lifecycle memori
- membangun personalisasi user atau pembelajaran dari interaksi sebelumnya

## Jangan gunakan saat

Jangan gunakan saat:
- kebutuhan hanya prompt stateless sederhana
- masalah utama sebenarnya ada pada tool calling atau orchestration, bukan memori
- belum ada use case retrieval yang jelas sehingga desain memori masih spekulatif

## Prinsip inti

- kualitas memori ditentukan oleh retrieval, bukan jumlah data yang disimpan
- chunking harus dioptimalkan untuk pencarian ulang, bukan sekadar penyimpanan
- gunakan tipe memori yang sesuai dengan jenis informasi
- tidak semua memori harus disimpan selamanya
- uji akurasi retrieval sebelum produksi
- pembentukan memori di background sering lebih stabil daripada selalu real-time

## Tipe memori utama

### 1. Short-term atau working memory
Digunakan untuk konteks aktif dalam jendela percakapan atau eksekusi saat ini.

Cocok untuk:
- state percakapan saat ini
- langkah workflow yang sedang berjalan
- konteks sementara yang tidak perlu dipersistenkan lama

### 2. Semantic memory
Menyimpan fakta dan pengetahuan yang relatif stabil.

Contoh:
- preferensi user
- fakta domain
- profil akun
- konfigurasi bisnis yang sering dipakai

### 3. Episodic memory
Menyimpan pengalaman atau kejadian masa lalu.

Contoh:
- ringkasan percakapan sebelumnya
- hasil task terdahulu
- insiden, keputusan, atau outcome yang pernah terjadi

### 4. Procedural memory
Menyimpan cara melakukan sesuatu.

Contoh:
- workflow yang terbukti berhasil
- langkah troubleshooting
- pola penyelesaian task tertentu
- few-shot examples atau recipe operasional

## Kerangka berpikir yang direkomendasikan

Gunakan pemetaan sederhana berikut:
- fakta stabil → semantic memory
- kejadian dan outcome → episodic memory
- cara kerja dan langkah penyelesaian → procedural memory
- konteks aktif saat ini → working memory

## Alur desain memori

### 1. Tentukan apa yang benar-benar perlu diingat

Jangan simpan semua hal. Klasifikasikan:
- apa yang perlu diingat lintas sesi
- apa yang hanya relevan untuk sesi saat ini
- apa yang harus dilupakan setelah waktu tertentu

### 2. Tentukan unit penyimpanan

Pilih bentuk data yang sesuai:
- profil terstruktur untuk semantic memory
- event atau summary bertimestamp untuk episodic memory
- langkah kerja atau contoh untuk procedural memory

### 3. Rancang strategi chunking

Pertimbangkan:
- ukuran chunk
- overlap
- metadata penting
- apakah chunk mewakili satu ide, satu event, atau satu prosedur

Chunk yang terlalu besar menurunkan presisi retrieval. Chunk yang terlalu kecil sering kehilangan konteks.

### 4. Pilih strategi retrieval

Pertimbangkan kombinasi:
- semantic search berbasis embedding
- metadata filtering
- hybrid search
- recency weighting
- reranking

Tujuannya adalah menemukan memori yang paling relevan, bukan sekadar yang paling mirip secara tekstual.

### 5. Tentukan lifecycle memori

Definisikan:
- kapan memori dibuat
- kapan diperbarui
- kapan diringkas
- kapan dihapus atau diarsipkan

Tidak semua memori layak dipertahankan permanen.

### 6. Uji kualitas retrieval

Sebelum produksi, validasi:
- apakah memori yang benar muncul untuk query penting
- apakah hasil retrieval terlalu bising
- apakah metadata membantu penyaringan
- apakah memori lama yang tidak relevan mendominasi hasil

## Pemilihan vector store

Gunakan pertimbangan berikut:

### Pinecone
Cocok untuk skala enterprise dan kebutuhan managed service besar.

### Qdrant
Cocok bila filtering metadata kompleks sangat penting.

### Weaviate
Cocok untuk hybrid search dan kebutuhan relasi yang lebih kaya.

### ChromaDB
Cocok untuk prototyping atau aplikasi kecil hingga menengah.

### pgvector
Cocok bila sistem sudah memakai PostgreSQL dan ingin setup lebih sederhana.

## Pemilihan embedding model

Pertimbangkan trade-off berikut:
- kualitas retrieval
- biaya per token
- dimensi vector
- latency
- kebutuhan deployment lokal vs managed

Gunakan model embedding yang cukup baik untuk domain Anda, lalu uji retrieval nyata. Jangan memilih hanya berdasarkan benchmark umum.

## Pola implementasi yang direkomendasikan

### Profil user sebagai semantic memory
Simpan preferensi, role, dan fakta stabil dalam bentuk terstruktur.

### Ringkasan interaksi sebagai episodic memory
Simpan outcome, insight, dan timestamp dari interaksi penting.

### Playbook penyelesaian sebagai procedural memory
Simpan langkah-langkah yang terbukti berhasil untuk task berulang.

### Context assembly saat runtime
Saat menerima query baru, gabungkan:
- profil user yang relevan
- pengalaman serupa dari masa lalu
- prosedur yang relevan
- konteks aktif sesi saat ini

## Checklist cepat

- use case memori jelas
- tipe memori dipetakan dengan benar
- strategi chunking ditentukan
- metadata penting didefinisikan
- vector store dipilih sesuai skala dan kebutuhan filter
- retrieval diuji dengan query nyata
- lifecycle memori dirancang, termasuk decay atau archival
- context assembly saat runtime tidak terlalu bising

## Anti-pattern

Hindari:
- menyimpan semua percakapan mentah tanpa strategi retrieval
- mencampur fakta, event, dan prosedur tanpa klasifikasi
- menganggap vector store otomatis menyelesaikan masalah memori
- tidak menguji retrieval dengan query nyata
- membiarkan memori tumbuh tanpa decay, summarization, atau pruning
- memasukkan terlalu banyak memori ke context hingga menurunkan kualitas jawaban

## Catatan kompatibilitas KiloCode

Skill upstream memuat contoh implementasi panjang lintas framework dan daftar tooling yang luas. Pada adaptasi KiloCode ini, konten dinormalisasi menjadi panduan arsitektur memori agent yang mandiri, ringkas, dan dapat diterapkan tanpa ketergantungan pada framework tertentu.