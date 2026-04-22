---
name: architecture
description: >-
  Gunakan saat membuat keputusan arsitektur penting agar requirement, constraint,
  opsi, trade-off, pola yang dipilih, dan dokumentasi keputusan seperti ADR dapat
  dianalisis secara sistematis sebelum implementasi besar dimulai.
license: CC-BY-4.0
metadata:
  category: architecture
  source:
    repository: 'https://github.com/sickn33/antigravity-awesome-skills'
    path: skills/architecture
    license_path: LICENSE-CONTENT
  original_metadata:
    risk: safe
    source: community
    date_added: '2026-02-27'
---

# Architecture

Skill ini menyediakan kerangka pengambilan keputusan arsitektur. Fokus utamanya adalah memahami requirement dan constraint, membandingkan opsi yang realistis, menolak kompleksitas yang belum perlu, lalu menangkap keputusan yang material ke dalam bentuk yang dapat ditelusuri seperti ADR.

## Kapan digunakan

Gunakan saat:
- menyusun arsitektur untuk sistem atau fitur besar
- membandingkan beberapa opsi desain yang masing-masing punya trade-off signifikan
- menentukan pattern arsitektur yang tepat berdasarkan kebutuhan nyata
- mendokumentasikan keputusan arsitektural agar tim memahami alasan dan konsekuensinya
- menilai apakah solusi yang dirancang terlalu kompleks untuk konteks saat ini

## Prinsip inti

- requirement harus memimpin arsitektur, bukan preferensi teknologi
- selalu cari alternatif yang lebih sederhana sebelum memilih pola kompleks
- dokumentasikan alasan keputusan, bukan hanya hasil akhirnya
- hubungkan setiap trade-off dengan constraint nyata: scale, tim, waktu, biaya, dan risiko
- tunda kompleksitas sampai ada bukti bahwa kompleksitas itu memang dibutuhkan

## Alur kerja

### 1. Temukan konteks keputusan

Kumpulkan konteks minimum sebelum mengusulkan desain:
- skala user, data, dan traffic
- ukuran tim dan tingkat pengalaman
- horizon waktu: prototype, MVP, atau produk jangka panjang
- karakter domain: CRUD sederhana, business rules kompleks, real-time, compliance
- constraint: budget, legacy integration, stack preference, dan batas operasional

Sebagai heuristik awal:
- **MVP**: user sedikit, tim kecil, deadline cepat, bias ke arsitektur sederhana
- **SaaS bertumbuh**: kebutuhan modular meningkat, tetapi belum tentu perlu distributed system penuh
- **Enterprise skala besar**: boundary, governance, dan operability menjadi lebih dominan

### 2. Definisikan problem arsitektural yang sebenarnya

Untuk tiap keputusan besar, jawab:
- masalah spesifik apa yang sedang diselesaikan
- apa yang akan gagal atau mahal jika dibiarkan seperti sekarang
- apa definisi sukses dari keputusan ini
- constraint mana yang paling membatasi ruang solusi

Jangan memilih pattern sebelum problem statement cukup tajam.

### 3. Bandingkan opsi dan trade-off

Untuk setiap komponen atau keputusan material, dokumentasikan:
- opsi yang dipertimbangkan
- keuntungan dan biaya tiap opsi
- tingkat kompleksitas
- kondisi kapan opsi tersebut valid
- trade-off yang diterima jika opsi dipilih

Gunakan struktur evaluasi seperti:
- **Context**: masalah dan constraint
- **Options considered**: minimal 2 opsi realistis bila memang ada alternatif bermakna
- **Decision**: opsi yang dipilih
- **Rationale**: alasan terikat ke requirement
- **Trade-offs accepted**: apa yang dikorbankan dan mengapa masih masuk akal
- **Consequences**: dampak positif, negatif, dan mitigasi
- **Revisit trigger**: kondisi kapan keputusan perlu ditinjau ulang

### 4. Pilih pattern secara disiplin

Sebelum memilih pattern apa pun, ajukan tiga pertanyaan:
1. masalah spesifik apa yang diselesaikan pattern ini
2. adakah alternatif yang lebih sederhana
3. bisakah kompleksitas ini ditunda sampai benar-benar diperlukan

Panduan seleksi umum:
- **Data access sederhana** → akses ORM langsung sering cukup
- **Data access kompleks dan perlu abstraction/testing kuat** → repository pattern atau unit of work bisa layak
- **Business rules kompleks** → pertimbangkan DDD, tapi sesuaikan kedalaman dengan kapasitas tim
- **Kebutuhan scale independen per domain** → modular monolith dulu; microservices hanya jika boundary jelas dan kompleksitasnya terbayar
- **Kebutuhan real-time tinggi** → event-driven valid jika tim siap menghadapi eventual consistency dan operability tambahan

### 5. Dokumentasikan keputusan sebagai ADR bila material

Jika keputusan berdampak pada struktur sistem, cara deploy, data ownership, atau dependency besar, tulis ADR ringkas. ADR minimal harus memuat:
- judul keputusan
- status
- context
- decision
- rationale
- trade-offs
- consequences

Simpan secara konsisten, misalnya di folder dokumentasi arsitektur proyek.

## Red flag umum

Waspadai anti-pattern berikut:
- microservices terlalu dini tanpa kebutuhan scale independen yang nyata
- clean atau hexagonal architecture yang over-abstract untuk CRUD sederhana
- CQRS atau event sourcing tanpa kebutuhan audit, temporal model, atau beban baca/tulis yang memang berbeda
- repository pattern dipasang hanya karena kebiasaan, bukan karena kebutuhan abstraction
- keputusan arsitektur besar tanpa mitigasi operasional

## Checklist sebelum final

Pastikan:
- requirement dan constraint dipahami jelas
- alternatif sederhana sudah dipertimbangkan
- alasan keputusan tertaut ke konteks nyata
- trade-off ditulis secara jujur
- konsekuensi dan revisit trigger terdokumentasi
- keputusan besar sudah punya ADR atau bentuk dokumentasi setara

## Catatan kompatibilitas KiloCode

Skill upstream menyebar workflow ke beberapa file referensi. Pada adaptasi KiloCode ini, materi discovery konteks, analisis trade-off, dan panduan seleksi pattern diringkas langsung ke dalam `SKILL.md` agar skill tetap mandiri dan usable tanpa bergantung pada referensi eksternal.