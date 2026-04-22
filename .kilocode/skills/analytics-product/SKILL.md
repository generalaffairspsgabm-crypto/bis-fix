---
name: analytics-product
description: Gunakan saat merancang analytics produk, event model, funnel, cohort, retensi, north star metric, OKR, dan dashboard agar keputusan produk berbasis data yang benar-benar dapat dipercaya.
license: Complete terms in LICENSE.txt
metadata:
  category: product-analytics
  source:
    upstream: .tmp-antigravity-skills/skills/analytics-product
    type: community
  depends_on:
    - definisi tujuan produk dan keputusan bisnis yang jelas
    - tool analytics seperti PostHog, Mixpanel, Amplitude, atau setara
    - event instrumentation yang dapat diubah dan diverifikasi
---

# Analytics Product

Skill ini membantu merancang sistem analytics produk yang fokus pada keputusan, bukan sekadar dashboard. Cakupannya meliputi event taxonomy, funnel, cohort retention, north star metric, dan dashboard eksekutif.

## Kapan digunakan

Gunakan skill ini saat perlu:
- menentukan event inti produk
- mendesain funnel aktivasi atau monetisasi
- menganalisis cohort dan retensi
- menetapkan north star metric
- menyusun OKR berbasis metrik produk
- membangun dashboard produk yang actionable

## Prinsip inti

- ukur hanya hal yang mendukung keputusan nyata
- event harus merepresentasikan aksi atau perubahan state yang bermakna
- nama event harus konsisten dan mudah dibaca
- properti event harus memberi konteks, bukan kebisingan
- dashboard tidak boleh mendahului kualitas instrumentasi

## Konvensi penamaan event

Gunakan pola:

```text
[objek]_[aksi_bermakna]
```

Contoh baik:
- `user_signed_up`
- `onboarding_completed`
- `conversation_started`
- `upgrade_completed`

Contoh buruk:
- `click`
- `signup`
- `conversion`

Aturan praktis:
- gunakan past tense atau state completion bila event menandai hasil
- hindari nama terlalu generik
- pertahankan satu bahasa dan satu gaya penamaan di seluruh sistem

## Kerangka event inti

Kelompokkan event berdasarkan lifecycle produk:

### 1. Akuisisi
- `user_signed_up`
- `landing_cta_clicked`
- `invite_accepted`

### 2. Onboarding dan aktivasi
- `onboarding_started`
- `onboarding_completed`
- `first_value_reached`
- `aha_moment_reached`

### 3. Engagement dan retensi
- `session_started`
- `feature_used`
- `conversation_started`
- `conversation_completed`

### 4. Monetisasi
- `upgrade_viewed`
- `upgrade_started`
- `upgrade_completed`
- `subscription_canceled`
- `payment_failed`

## Properti event yang sehat

Setiap event sebaiknya hanya membawa properti yang benar-benar dibutuhkan untuk segmentasi atau diagnosis, misalnya:
- `source`, `medium`, `campaign`
- `plan`, `tier`, `price`
- `device`, `platform`, `locale`
- `feature_name`, `intent`, `trigger`
- `duration`, `step_count`, `error_code`

Hindari:
- properti duplikat antar event tanpa alasan
- payload terlalu besar
- field bebas yang sulit distandardisasi
- data sensitif tanpa kebutuhan dan kontrol privasi

## Funnel produk

### Cara menyusun funnel

1. Tentukan outcome bisnis yang ingin dicapai.
2. Pecah menjadi tahapan perilaku yang jelas.
3. Pastikan setiap tahap punya event yang unik.
4. Ukur conversion rate antar tahap.
5. Investigasi drop-off terbesar terlebih dahulu.

### Contoh funnel aktivasi

1. user melihat landing page
2. user klik CTA utama
3. user menyelesaikan signup
4. user mencapai first value
5. user kembali di hari berikutnya
6. user aktif beberapa kali dalam seminggu
7. user upgrade ke paket berbayar

### Cara mengoptimalkan funnel

Untuk setiap drop-off besar:
1. identifikasi titik keluarnya user
2. cari penyebab dengan session replay, survey, atau interview
3. buat hipotesis perubahan
4. uji dengan eksperimen yang valid
5. ukur hasil dengan horizon waktu yang cukup
6. dokumentasikan pembelajaran, termasuk eksperimen gagal

## Cohort dan retensi

Gunakan cohort untuk menjawab apakah user yang datang pada periode tertentu tetap aktif dari waktu ke waktu.

### Metrik retensi yang umum
- D1, D7, D30 retention
- weekly retention
- rolling retention
- unbounded retention untuk use case tertentu

### Praktik baik
- definisikan event aktif yang benar-benar mencerminkan nilai produk
- bedakan antara login dan penggunaan bernilai
- gunakan cohort berdasarkan first value, bukan selalu signup
- bandingkan retensi antar channel, persona, plan, dan fitur

## North star metric

North star metric harus:
- mencerminkan nilai yang diterima user
- berkorelasi dengan pertumbuhan jangka panjang
- cukup sederhana untuk dipahami lintas tim
- sulit dimanipulasi dengan vanity behavior

### Cara memilih north star metric

1. Tentukan apa yang benar-benar bernilai bagi user.
2. Cari perilaku yang memprediksi retensi dan monetisasi.
3. Definisikan ambang yang bermakna.
4. Pastikan metrik dapat dihitung konsisten.

Contoh:
- pengguna dengan minimal 3 sesi bernilai per minggu
- tim yang menyelesaikan minimal 1 workflow inti per minggu
- akun yang mengaktifkan fitur utama dan kembali menggunakannya

## Dashboard produk

Dashboard yang sehat biasanya mencakup:
- north star metric
- acquisition volume dan kualitas
- activation funnel
- retention cohort
- engagement depth
- monetization conversion
- churn atau cancellation reasons
- segmentasi per channel, plan, persona, atau platform

Aturan dashboard:
- satu dashboard untuk satu tujuan utama
- tampilkan definisi metrik secara eksplisit
- bedakan leading indicator dan lagging indicator
- jangan campur metrik operasional dan strategis tanpa struktur

## OKR berbasis analytics

Contoh struktur:
- **Objective**: meningkatkan aktivasi pengguna baru
- **KR1**: conversion signup ke first value naik dari 28% ke 40%
- **KR2**: D7 retention cohort baru naik dari 12% ke 20%
- **KR3**: waktu ke first value turun dari 18 menit ke 8 menit

## Pitfall penting

- melacak terlalu banyak event tanpa pemilik keputusan
- memakai event generik yang tidak bisa diinterpretasi
- menganggap page view sebagai sinyal nilai utama
- menetapkan north star metric yang vanity
- membangun dashboard sebelum definisi event stabil
- mencampur definisi aktif antar laporan

## Checklist eksekusi

1. Tentukan keputusan bisnis yang ingin didukung.
2. Definisikan lifecycle produk dan event inti.
3. Tetapkan naming convention dan properti wajib.
4. Rancang funnel utama.
5. Definisikan active event untuk retensi.
6. Pilih north star metric.
7. Implementasikan tracking dan validasi data.
8. Bangun dashboard yang langsung mendukung keputusan.
9. Review berkala event yang tidak lagi berguna.

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/analytics-product` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
