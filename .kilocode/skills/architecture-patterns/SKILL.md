---
name: architecture-patterns
description: >-
  Gunakan saat merancang atau merefactor arsitektur backend dengan pattern seperti
  clean architecture, hexagonal architecture, DDD, modular monolith, atau
  microservices agar boundary, dependency rule, dan tingkat kompleksitas tetap
  sesuai kebutuhan nyata sistem.
license: CC-BY-4.0
metadata:
  category: architecture
  source:
    repository: 'https://github.com/sickn33/antigravity-awesome-skills'
    path: skills/architecture-patterns
    license_path: LICENSE-CONTENT
  original_metadata:
    risk: none
    source: community
    date_added: '2026-02-27'
---

# Architecture Patterns

Skill ini membantu memilih dan menerapkan pattern arsitektur backend yang tepat. Fokusnya bukan menghafal pattern populer, tetapi memastikan pattern yang dipilih memang sepadan dengan kompleksitas domain, kebutuhan testability, scale, dan batas operasional tim.

## Kapan digunakan

Gunakan saat:
- mendesain backend baru dari awal
- merefactor monolith agar lebih modular dan mudah diuji
- menetapkan standar arsitektur backend untuk tim
- memigrasikan kode yang terlalu tightly coupled
- mengadopsi DDD atau clean boundary antar lapisan
- merencanakan pemecahan service atau domain decomposition

## Jangan gunakan saat

Jangan gunakan saat:
- perubahan hanya refactor kecil dan lokal
- masalah utama berada di UI/frontend tanpa dampak arsitektur backend
- yang dibutuhkan hanya detail implementasi tanpa keputusan pattern

## Prinsip pemilihan pattern

- pilih pattern berdasarkan problem, bukan prestige
- semakin sederhana domain dan flow data, semakin kecil kebutuhan abstraction
- kompleksitas operasional harus ikut dihitung, bukan hanya keindahan desain kode
- boundary modul lebih penting daripada jumlah layer
- desain harus tetap bisa diuji, dijelaskan, dan dioperasikan oleh tim yang ada

## Alur kerja

### 1. Pahami domain dan constraint

Sebelum memilih pattern, petakan:
- domain utama dan subdomain
- boundary tanggung jawab modul
- beban bisnis: CRUD sederhana vs business rules kompleks
- kebutuhan testability dan mockability
- kebutuhan scale independen
- kebutuhan real-time, asinkron, atau integrasi eksternal
- kemampuan tim dalam memelihara abstraction tambahan

### 2. Pilih pattern sesuai bentuk masalah

#### Clean Architecture

Cocok saat:
- business logic perlu independen dari framework
- testability inti sangat penting
- ada beberapa interface luar seperti database, API eksternal, queue, atau UI

Panduan penerapan:
- tempatkan dependency mengarah ke dalam
- pisahkan entity domain, use case, adapter, dan infrastructure
- jaga agar controller tetap tipis dan tidak memuat business logic
- hindari framework leakage ke layer inti

#### Hexagonal Architecture

Cocok saat:
- core domain perlu berbicara dengan banyak sistem luar
- implementasi adapter dapat berganti-ganti
- test ganda dengan adapter mock memberi nilai tinggi

Panduan penerapan:
- definisikan port sebagai kontrak interaksi
- implementasikan adapter untuk database, API, email, queue, dan sejenisnya
- pastikan core domain tidak bergantung pada library integrasi tertentu

#### Domain-Driven Design (DDD)

Cocok saat:
- aturan bisnis kompleks dan berbeda per konteks
- bahasa domain penting untuk komunikasi tim
- ada kebutuhan boundary model yang jelas

Panduan penerapan:
- identifikasi bounded context
- gunakan ubiquitous language secara konsisten
- tempatkan behavior di entity atau aggregate, bukan di service generik tanpa konteks
- gunakan value object untuk konsep yang tervalidasi dan immutable
- pilih kedalaman DDD sesuai kapasitas tim; tidak semua proyek butuh DDD penuh

#### Modular Monolith

Cocok saat:
- sistem butuh boundary kuat tetapi belum layak menjadi microservices
- deployment tunggal masih memadai
- tim ingin meminimalkan overhead distributed system

Panduan penerapan:
- buat modul dengan API internal yang tegas
- hindari akses lintas modul langsung ke tabel atau detail internal modul lain
- siapkan boundary yang dapat diekstrak nanti bila memang dibutuhkan

#### Microservices

Cocok saat semua kondisi berikut cukup terpenuhi:
- domain boundary jelas
- kebutuhan scale berbeda nyata antar service
- kebutuhan deploy independen bernilai tinggi
- tim siap menangani observability, CI/CD, retry, idempotency, tracing, dan distributed failure

Jika kondisi tersebut belum matang, modular monolith biasanya lebih aman.

### 3. Definisikan aturan dependency dan boundary

Untuk pattern apa pun, tetapkan:
- modul apa saja yang boleh bergantung pada modul lain
- kontrak antar layer atau antar modul
- data ownership
- aturan anti-corruption bila ada integrasi lintas context
- batas tempat business logic boleh hidup

### 4. Rencanakan migrasi bertahap

Saat refactor sistem yang sudah ada:
- mulai dari boundary paling bernilai atau paling menyakitkan
- pindahkan business logic keluar dari controller atau layer transport
- bungkus integrasi eksternal di adapter atau gateway
- ukur dampak ke testability, coupling, dan kecepatan perubahan
- hindari big bang rewrite bila migrasi bertahap memungkinkan

### 5. Validasi hasil desain

Tanyakan:
- apakah core logic bisa diuji tanpa infrastruktur berat
- apakah boundary modul mudah dijelaskan
- apakah abstraction yang ditambah benar-benar dipakai
- apakah tim mampu mengoperasikan desain ini dalam jangka menengah
- apakah solusi lebih sederhana akan cukup untuk 6–12 bulan ke depan

## Pitfall umum

Hindari:
- anemic domain model yang hanya memindahkan data tanpa behavior
- framework coupling di layer inti
- controller atau service layer yang terlalu gemuk
- repository abstraction untuk CRUD sederhana tanpa manfaat nyata
- microservices terlalu dini
- clean architecture penuh untuk kasus yang sebenarnya linear dan kecil

## Heuristik cepat

- CRUD sederhana + satu database + tim kecil → struktur modular sederhana sering cukup
- domain kompleks + aturan bisnis kaya → pertimbangkan DDD dan clean boundary
- banyak integrasi eksternal + kebutuhan swap adapter → hexagonal memberi nilai tinggi
- kebutuhan growth, tetapi operasional masih sederhana → modular monolith lebih aman daripada microservices

## Catatan kompatibilitas KiloCode

Skill upstream merujuk file referensi eksternal yang sangat panjang. Pada adaptasi KiloCode ini, inti playbook diringkas langsung ke `SKILL.md` agar dapat dipakai mandiri tanpa membuka resource tambahan, sambil tetap mempertahankan panduan clean architecture, hexagonal architecture, DDD, modular monolith, dan microservices.