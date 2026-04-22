---
name: api-design-principles
description: >-
  Gunakan saat merancang atau mereview API REST maupun GraphQL agar kontraknya
  konsisten, mudah dipakai consumer, aman dievolusikan, dan tetap maintainable.
license: CC-BY-4.0
metadata:
  category: architecture
  source:
    repository: 'https://github.com/sickn33/antigravity-awesome-skills'
    path: skills/api-design-principles
    license_path: LICENSE-CONTENT
  original_metadata:
    risk: safe
    source: community
    date_added: '2026-02-27'
---

# API Design Principles

Skill ini membantu menghasilkan desain API yang **jelas untuk consumer**, **stabil untuk jangka panjang**, dan **mudah dioperasikan** oleh tim yang membangunnya.

Gunakan saat:
- merancang endpoint atau schema baru
- merefactor kontrak API yang membingungkan
- menetapkan standar desain API tim
- mereview spesifikasi sebelum implementasi
- menyiapkan dokumentasi dan contoh penggunaan

## Hasil yang diharapkan

Saat skill ini aktif, fokuskan keputusan pada:
- kejelasan consumer dan use case utama
- konsistensi naming, resource, dan perilaku
- error handling yang dapat diprediksi
- versioning dan perubahan kontrak yang aman
- dokumentasi contoh yang realistis

## Proses kerja

### 1. Pahami consumer dan use case

Sebelum memilih bentuk API, identifikasi:
- siapa consumer-nya: frontend internal, integrasi partner, publik, atau sistem antar-layanan
- operasi utama yang paling sering dilakukan
- constraint performa, keamanan, dan kompatibilitas
- apakah API perlu dioptimalkan untuk mobile, batch, realtime, atau third-party integration

Jika consumer tidak jelas, jangan lanjut ke detail endpoint terlalu cepat.

### 2. Pilih gaya API yang sesuai

Gunakan pendekatan yang paling sesuai dengan kebutuhan:
- **REST** bila domain berorientasi resource, cacheability penting, dan operasi CRUD dominan
- **GraphQL** bila consumer butuh fleksibilitas query tinggi dan variasi kebutuhan data besar
- kombinasi hanya bila ada alasan operasional yang jelas

Hindari memilih paradigma karena tren. Pilih berdasarkan bentuk domain, kebutuhan consumer, dan biaya operasional.

### 3. Model resource atau type dengan jelas

Untuk REST:
- gunakan noun yang stabil dan mudah dipahami
- buat relasi resource konsisten
- hindari endpoint yang terasa seperti RPC terselubung bila domain seharusnya berbasis resource

Untuk GraphQL:
- desain type dan field agar merepresentasikan domain, bukan kebocoran storage model
- pastikan mutation memiliki intent yang jelas
- jaga konsistensi penamaan field, input, dan payload

## Area desain yang wajib diputuskan

### Naming dan struktur
- gunakan nama yang intention-revealing
- konsisten pada singular/plural
- pilih pola path, field, dan parameter yang seragam
- hindari singkatan yang tidak umum

### Error handling
- definisikan format error yang stabil
- sertakan code yang bisa ditindaklanjuti consumer
- pisahkan validation error, authorization error, not found, conflict, dan server error
- pastikan pesan aman untuk diekspos

### Pagination, filtering, sorting
- pilih satu strategi pagination utama dan gunakan konsisten
- dokumentasikan limit default dan maksimum
- definisikan filter dan sorting yang eksplisit, bukan perilaku implisit

### Authentication dan authorization
- jelaskan mekanisme auth dari awal
- bedakan akses siapa yang boleh memanggil endpoint tertentu
- sertakan kebutuhan scope, role, atau policy bila relevan

### Versioning dan evolusi kontrak
- tentukan bagaimana breaking change akan dikelola
- pilih strategi versioning yang realistis secara operasional
- untuk perubahan non-breaking, utamakan additive change
- dokumentasikan deprecation policy bila API bersifat publik atau lintas-tim

## Checklist review desain API

Sebelum desain dianggap siap:
- apakah consumer utama dan use case inti sudah jelas?
- apakah bentuk API konsisten dengan domain?
- apakah resource/type dan aksi utamanya mudah diprediksi?
- apakah error, auth, pagination, dan versioning sudah didefinisikan?
- apakah ada contoh request/response nyata untuk memvalidasi kontrak?
- apakah dokumentasi cukup untuk dipakai implementer dan consumer?

## Anti-pattern yang perlu dihindari

Waspadai hal berikut:
- endpoint campuran yang tidak punya model domain jelas
- nama field/path yang inkonsisten antar endpoint
- overload satu endpoint untuk terlalu banyak perilaku
- error generik tanpa code atau konteks yang dapat ditindaklanjuti
- desain yang mengutamakan detail database ketimbang kebutuhan consumer
- GraphQL schema yang terlalu bocor ke struktur backend internal

## Output yang disarankan

Saat menggunakan skill ini, hasil akhir sebaiknya mencakup:
- ringkasan consumer dan constraint
- daftar resource/type utama
- keputusan auth, pagination, error, dan versioning
- contoh request/response
- catatan trade-off dan area yang sengaja ditunda

## Catatan Kompatibilitas KiloCode

Skill sumber merujuk ke `resources/implementation-playbook.md`. Pada konversi KiloCode ini, kontennya dipadatkan langsung ke panduan praktis agar tetap usable tanpa dependensi file tambahan.