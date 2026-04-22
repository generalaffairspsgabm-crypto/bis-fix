---
name: aws-cost-optimizer
description: Gunakan saat menganalisis biaya AWS, menemukan pemborosan, dan menyusun rekomendasi optimasi seperti rightsizing, Savings Plans, tagging, dan lifecycle policy.
license: Complete terms in LICENSE.txt
metadata:
  category: cloud
  source:
    upstream: .tmp-antigravity-skills/skills/aws-cost-optimizer
    type: community
  depends_on:
    - akses baca ke billing, Cost Explorer, atau inventaris resource AWS
---

# AWS Cost Optimizer

Skill ini membantu menganalisis pola pengeluaran AWS dan menyusun rekomendasi optimasi biaya yang dapat ditindaklanjuti. Fokusnya adalah menggabungkan data biaya dengan konteks resource agar rekomendasi tidak berhenti pada angka, tetapi mengarah ke tindakan seperti rightsizing, cleanup, perubahan lifecycle, atau pembelian komitmen yang lebih efisien.

## Kapan digunakan

Gunakan skill ini saat perlu:
- memahami komponen biaya AWS terbesar
- membandingkan pengeluaran antar periode
- menemukan resource idle atau underutilized
- menyusun rencana penghematan jangka pendek dan jangka menengah
- menyiapkan laporan optimasi biaya untuk tim teknis atau manajemen

## Tujuan utama

- memetakan sumber biaya terbesar dan tren kenaikannya
- menemukan quick wins penghematan dengan risiko rendah
- mengidentifikasi peluang optimasi strategis seperti rightsizing atau komitmen kapasitas
- membangun proses monitoring biaya yang berulang

## Domain analisis utama

### 1. Analisis biaya

Fokus pada:
- biaya per layanan
- biaya per region
- biaya per tag atau unit bisnis
- perubahan month-over-month
- anomali atau lonjakan mendadak

### 2. Optimasi resource

Cari peluang seperti:
- EC2 idle atau CPU sangat rendah
- volume EBS unattached
- snapshot lama
- Elastic IP tidak terpakai
- RDS underutilized
- objek S3 lama yang cocok untuk lifecycle policy

### 3. Optimasi strategis

Pertimbangkan:
- Reserved Instances atau Savings Plans
- rightsizing instance
- pemindahan workload ke region yang lebih efisien bila relevan
- penggunaan Spot untuk workload non-kritis
- retensi log dan data yang lebih hemat

## Input yang ideal

Skill ini paling efektif bila tersedia:
- data biaya 3 sampai 6 bulan terakhir
- breakdown biaya per layanan
- inventaris resource utama
- metrik utilisasi seperti CPU, memori, atau I/O bila ada
- tag cost allocation yang cukup rapi
- konteks bisnis: workload kritis, non-kritis, dev, staging, production

Jika data belum lengkap, prioritaskan:
1. top layanan dengan biaya tertinggi
2. tren biaya bulanan
3. daftar resource idle atau underutilized
4. status tagging
5. peluang quick wins yang paling jelas

## Alur kerja inti

### 1. Baseline assessment

Mulai dengan baseline biaya:
- tarik data biaya beberapa bulan terakhir
- identifikasi 5 layanan paling mahal
- hitung pertumbuhan biaya antar bulan
- tandai lonjakan yang tidak biasa

Pertanyaan yang perlu dijawab:
- layanan mana yang paling dominan?
- apakah kenaikan biaya bersifat musiman, bertahap, atau mendadak?
- apakah ada region atau environment yang tidak proporsional?

### 2. Temukan quick wins

Cari peluang penghematan cepat dengan risiko rendah:
- hapus volume unattached
- lepaskan Elastic IP yang tidak dipakai
- hapus snapshot lama yang tervalidasi aman
- hentikan instance non-production yang idle
- terapkan lifecycle policy pada bucket yang sesuai

Untuk tiap quick win, sertakan:
- resource yang terdampak
- estimasi penghematan
- tingkat risiko
- tindakan yang disarankan

### 3. Analisis rightsizing

Untuk compute dan database, evaluasi:
- utilisasi rata-rata vs kapasitas saat ini
- pola puncak vs rata-rata
- apakah instance terlalu besar untuk workload nyata
- apakah ada workload yang cocok dijadwalkan hidup-mati

Hasil rightsizing sebaiknya mencakup:
- resource saat ini
- utilisasi yang diamati
- ukuran yang direkomendasikan
- estimasi penghematan
- risiko performa yang perlu diuji

### 4. Evaluasi komitmen biaya

Untuk workload stabil, pertimbangkan:
- Savings Plans
- Reserved Instances
- komitmen jangka 1 atau 3 tahun

Sebelum merekomendasikan komitmen, pastikan:
- pola penggunaan cukup stabil
- workload tidak sedang berubah drastis
- ada keyakinan terhadap baseline konsumsi

### 5. Bangun monitoring berkelanjutan

Rekomendasikan kontrol seperti:
- AWS Budgets dengan alert
- Cost Anomaly Detection
- tagging wajib untuk cost allocation
- review biaya bulanan
- dashboard biaya per tim atau per produk

## Struktur output yang direkomendasikan

### Ringkasan eksekutif

Sertakan:
- total biaya periode analisis
- perubahan dibanding periode sebelumnya
- 3 sampai 5 sumber biaya terbesar
- estimasi total peluang penghematan

### Daftar peluang optimasi

Gunakan format seperti:

```markdown
## Peluang Optimasi
- Area: EC2 idle
- Dampak: tinggi
- Risiko: rendah sampai sedang
- Estimasi hemat: ...
- Tindakan: hentikan atau rightsize instance tertentu
```

### Rencana aksi bertahap

Pisahkan menjadi:
- quick wins minggu ini
- optimasi strategis bulan ini
- perbaikan governance jangka menengah

## Checklist optimasi biaya

- apakah Cost Explorer atau sumber biaya setara sudah tersedia?
- apakah top layanan mahal sudah diidentifikasi?
- apakah resource idle sudah dipetakan?
- apakah tagging cukup baik untuk alokasi biaya?
- apakah ada peluang rightsizing yang jelas?
- apakah komitmen biaya layak dipertimbangkan?
- apakah alert dan monitoring biaya sudah ada?

## Praktik baik

- gabungkan data biaya dengan data utilisasi sebelum memberi rekomendasi
- prioritaskan quick wins berisiko rendah terlebih dahulu
- dokumentasikan asumsi di balik estimasi penghematan
- bedakan rekomendasi untuk dev, staging, dan production
- ulangi analisis secara berkala, bukan sekali saja

## Anti-pattern

- merekomendasikan penghapusan resource hanya dari biaya tanpa konteks operasional
- rightsizing berdasarkan rata-rata saja tanpa melihat puncak beban
- membeli komitmen kapasitas tanpa baseline penggunaan yang stabil
- mengabaikan tagging sehingga biaya sulit ditelusuri
- fokus hanya pada compute dan melupakan storage, transfer, atau logging

## Batasan

- tanpa data utilisasi, beberapa rekomendasi hanya bersifat indikatif
- biaya tinggi tidak selalu berarti pemborosan; bisa jadi memang mendukung workload bernilai tinggi
- estimasi penghematan perlu divalidasi terhadap harga aktual, region, dan pola penggunaan

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/aws-cost-optimizer` agar mandiri, berbahasa Indonesia, dan tidak bergantung pada integrasi eksternal yang tidak tersedia di workspace.
