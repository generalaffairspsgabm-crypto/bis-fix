---
name: api-testing-observability-api-mock
description: Gunakan saat membangun mock API yang realistis untuk development, testing, demo, atau contract validation agar frontend dan integrasi dapat berjalan paralel sebelum backend final tersedia.
license: Complete terms in LICENSE.txt
metadata:
  category: testing
  source:
    upstream: .tmp-antigravity-skills/skills/api-testing-observability-api-mock
    type: community
  depends_on:
    - akses ke kontrak API, contoh payload, dan skenario perilaku yang ingin disimulasikan
---

# API Testing Observability API Mock

Skill ini membantu membuat mock API yang realistis untuk pengembangan frontend, integration testing, demo, dan validasi kontrak. Fokusnya adalah mensimulasikan perilaku API nyata secara cukup akurat tanpa memakai data produksi atau menimbulkan kebingungan antara mock dan layanan sungguhan.

## Kapan digunakan

Gunakan skill ini saat perlu:
- membuat mock API untuk frontend development
- mensimulasikan partner API atau third-party API selama integrasi
- menyiapkan environment demo dengan respons realistis
- memvalidasi kontrak API sebelum backend selesai dibangun
- menguji skenario sukses, gagal, timeout, atau state transition tertentu

## Jangan gunakan saat

- perlu menguji sistem produksi atau integrasi live
- tugas utamanya adalah penetration testing atau security assessment
- tidak ada kontrak API atau perilaku yang cukup jelas untuk dimock

## Tujuan utama

- memungkinkan pengembangan paralel antara frontend dan backend
- menyediakan respons mock yang konsisten dengan kontrak API
- mensimulasikan skenario sukses, error, latency, dan state transition penting
- memudahkan switching antar skenario untuk test dan demo
- menjaga mock tetap jelas terpisah dari layanan produksi

## Prinsip inti

- mock harus mengikuti kontrak API yang disepakati, bukan tebakan longgar
- semua endpoint mock harus diberi label jelas agar tidak tertukar dengan layanan nyata
- gunakan fixture deterministik sebagai default; randomness hanya opsional dan terkontrol
- jangan gunakan secret produksi atau data pelanggan nyata
- dokumentasikan cara menjalankan mock server dan mengganti skenario

## Alur kerja inti

### 1. Klarifikasi kontrak API

Identifikasi:
- daftar route atau operasi yang perlu dimock
- method, path, header, query, dan body
- skema respons sukses dan error
- flow autentikasi yang perlu disimulasikan
- kebutuhan pagination, filtering, sorting, atau webhook
- ekspektasi latency, timeout, dan retry behavior

### 2. Tentukan skenario mock

Minimal pertimbangkan:
- happy path
- validasi gagal
- unauthorized atau forbidden
- not found
- conflict atau duplicate
- timeout atau upstream failure
- state transition seperti draft ke published, pending ke completed, dan sejenisnya

### 3. Siapkan fixture dan state

Rancang:
- fixture data dasar yang deterministik
- variasi data untuk edge case penting
- state store in-memory atau file-based bila mock perlu berubah antar request
- toggle skenario melalui query, header, env var, atau route khusus bila sesuai

### 4. Implementasikan perilaku realistis

Mock yang baik sebaiknya dapat mensimulasikan:
- status code yang benar
- struktur payload yang konsisten
- delay respons yang masuk akal
- error shape yang sama dengan API target
- pagination metadata
- autentikasi palsu yang cukup untuk kebutuhan development

### 5. Dokumentasikan penggunaan

Jelaskan secara eksplisit:
- cara menjalankan mock server
- endpoint yang tersedia
- cara mengganti skenario
- batasan mock dibanding layanan nyata
- cara frontend atau test suite mengarah ke mock

## Checklist kualitas mock API

- [ ] kontrak endpoint sesuai dengan spesifikasi atau implementasi target
- [ ] ada skenario sukses dan error utama
- [ ] payload dan status code realistis
- [ ] fixture tidak memakai data sensitif nyata
- [ ] mock diberi label jelas sebagai non-production
- [ ] ada cara mudah mengganti skenario
- [ ] dokumentasi run dan usage tersedia

## Anti-pattern penting

- mock terlalu sederhana hingga tidak mewakili perilaku API nyata
- payload mock berbeda jauh dari kontrak final
- tidak ada simulasi error sehingga frontend hanya diuji pada happy path
- memakai data produksi atau secret nyata
- tidak memberi penanda jelas bahwa endpoint adalah mock

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/api-testing-observability-api-mock` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
