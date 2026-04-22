---
name: analytics-tracking
description: Gunakan saat merancang, mengaudit, atau memperbaiki sistem tracking analytics agar event, conversion, attribution, dan governance menghasilkan data yang layak dipakai untuk keputusan.
license: Complete terms in LICENSE.txt
metadata:
  category: analytics
  source:
    upstream: .tmp-antigravity-skills/skills/analytics-tracking
    type: community
  depends_on:
    - akses ke implementasi tracking saat ini
    - daftar event, conversion, dan dashboard yang aktif
    - konteks bisnis, consent, dan kebutuhan pelaporan
---

# Analytics Tracking

Skill ini memandu desain dan audit tracking analytics agar data yang dikumpulkan benar-benar dapat dipercaya untuk keputusan marketing, growth, dan product.

## Kapan digunakan

Gunakan skill ini saat perlu:
- mengaudit kualitas tracking yang sudah ada
- mendesain event model baru
- memperbaiki conversion tracking yang meragukan
- menata attribution dan UTM
- menyusun governance analytics yang berkelanjutan

## Prinsip non-negotiable

- jangan melacak semuanya tanpa tujuan
- jangan mengoptimalkan dashboard sebelum instrumentasi benar
- jangan menganggap angka tool analytics otomatis benar tanpa validasi
- lebih baik sedikit event yang akurat daripada banyak event yang menyesatkan

## Fase 0: Measurement Readiness & Signal Quality Index

Sebelum menambah atau mengubah tracking, nilai kesiapan sistem dengan skor 0–100.

### Kategori penilaian

- **Decision alignment** — apakah setiap event mendukung keputusan nyata
- **Event model clarity** — apakah nama dan properti event konsisten dan bermakna
- **Data accuracy & integrity** — apakah event akurat, tidak duplikat, dan tervalidasi lintas platform
- **Conversion definition quality** — apakah conversion benar-benar merepresentasikan keberhasilan
- **Attribution & context** — apakah sumber traffic dan konteks user terjaga
- **Governance & maintenance** — apakah tracking terdokumentasi, punya owner, dan dimonitor

### Interpretasi skor

- **85–100**: measurement-ready
- **70–84**: usable with gaps
- **55–69**: unreliable
- **<55**: broken

Jika hasilnya **broken**, hentikan optimasi dan prioritaskan remediation.

## Fase 1: Definisikan konteks keputusan

Jawab pertanyaan berikut:
- keputusan apa yang akan diambil dari data ini
- siapa pengguna datanya: marketing, product, leadership, atau ops
- tindakan apa yang akan dilakukan bila metrik berubah
- tool apa yang dipakai: GA4, GTM, Mixpanel, Amplitude, PostHog, Segment, atau lainnya
- constraint privasi, consent, dan regulasi apa yang berlaku

## Desain event model

### Aturan event yang sehat

Event harus merepresentasikan:
- intent
- completion
- commitment
- perubahan state yang penting

Hindari event yang hanya berupa:
- klik kosmetik
- noise UI
- duplikasi dari event lain
- event “jaga-jaga” tanpa use case keputusan

### Kategori event umum

- **Exposure / navigation**: `page_view`, `content_viewed`, `pricing_viewed`
- **Intent**: `cta_clicked`, `form_started`, `demo_requested`
- **Completion**: `signup_completed`, `purchase_completed`, `subscription_changed`
- **State change**: `onboarding_completed`, `feature_activated`

### Properti event

Properti harus:
- memberi konteks yang dibutuhkan untuk segmentasi
- konsisten tipe datanya
- terdokumentasi
- tidak berlebihan

Contoh properti yang sering penting:
- `page_type`
- `plan`
- `source`, `medium`, `campaign`
- `experiment_variant`
- `device_type`
- `user_role`

## Conversion tracking

### Definisi conversion yang baik

Conversion harus:
- merepresentasikan outcome yang bernilai
- dihitung dengan aturan yang jelas
- dapat dibedakan dari langkah funnel lain
- tidak terinflasi oleh refresh, retry, atau duplikasi event

### Audit conversion

Periksa:
- apakah event conversion bisa terpicu lebih dari sekali tanpa kontrol
- apakah conversion dihitung di client, server, atau keduanya
- apakah ada mismatch antara data analytics dan data backend
- apakah funnel step saling eksklusif dan berurutan

## Attribution dan konteks

Pastikan:
- UTM konsisten dan tervalidasi
- source/medium tidak hilang saat redirect atau cross-domain
- identitas user dan anonymous session dapat direkonsiliasi dengan benar
- cross-device dan cross-domain ditangani sesuai kebutuhan bisnis

## Validasi kualitas data

Lakukan verifikasi eksplisit untuk:
- firing event pada kondisi yang benar
- tidak ada duplikasi
- nilai properti lengkap dan valid
- parity lintas browser, device, dan app/web
- consent mode atau privacy gating bekerja sesuai aturan

Metode validasi yang umum:
- debug view tool analytics
- network inspection
- log server-side event
- perbandingan dengan database sumber kebenaran
- pengujian manual skenario utama dan edge case

## Governance dan maintenance

Tracking yang sehat harus punya:
- dokumentasi event dan properti
- owner yang jelas
- proses review perubahan tracking
- versioning atau changelog
- monitoring untuk drop event, spike aneh, atau schema drift

## Anti-pattern penting

- event sprawl tanpa taxonomy
- conversion didefinisikan terlalu longgar
- dashboard dibangun dari event yang belum tervalidasi
- mengandalkan satu tool tanpa cross-check
- tidak ada dokumentasi atau owner
- perubahan tracking dilakukan diam-diam tanpa review

## Checklist eksekusi

1. Nilai Measurement Readiness & Signal Quality Index.
2. Tentukan keputusan bisnis yang harus didukung.
3. Audit tool, event, conversion, dan attribution yang ada.
4. Rapikan taxonomy event dan properti.
5. Validasi firing, deduplikasi, dan akurasi nilai.
6. Perbaiki definisi conversion dan funnel.
7. Dokumentasikan governance dan ownership.
8. Baru setelah itu optimalkan dashboard atau eksperimen.

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/analytics-tracking` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
