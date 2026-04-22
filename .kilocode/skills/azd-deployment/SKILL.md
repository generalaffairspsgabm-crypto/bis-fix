---
name: azd-deployment
description: Gunakan saat merancang atau menjalankan deployment aplikasi container ke Azure Container Apps dengan Azure Developer CLI, termasuk environment, remote build, Bicep, dan alur idempoten.
license: Complete terms in LICENSE.txt
metadata:
  category: cloud
  source:
    upstream: .tmp-antigravity-skills/skills/azd-deployment
    type: community
  depends_on:
    - akses ke Azure subscription dan Azure Developer CLI
    - pemahaman dasar tentang container, Bicep, dan Azure Container Apps
---

# AZD Deployment

Skill ini membantu deployment aplikasi containerized ke Azure menggunakan Azure Developer CLI (`azd`), terutama untuk skenario frontend dan backend yang berjalan di Azure Container Apps. Fokusnya adalah menjaga deployment tetap terstruktur, idempoten, dan mudah diulang melalui kombinasi `azure.yaml`, environment `azd`, dan infrastruktur deklaratif berbasis Bicep.

## Kapan digunakan

Gunakan skill ini saat perlu:
- menyiapkan deployment aplikasi container ke Azure Container Apps
- mengelola environment seperti dev, staging, dan prod dengan `azd`
- menghubungkan definisi service di `azure.yaml` dengan infrastruktur Bicep
- memastikan deployment dapat diulang tanpa drift besar
- mengatur alur build remote, environment variable, dan output infrastruktur

## Tujuan utama

- membuat deployment Azure yang konsisten dan dapat diulang
- memisahkan definisi aplikasi, environment, dan infrastruktur dengan jelas
- memanfaatkan remote build dan managed environment secara aman
- mengurangi konfigurasi manual yang rawan drift

## Konsep inti

### 1. `azure.yaml`

File ini mendefinisikan:
- nama proyek `azd`
- daftar service yang akan dideploy
- bahasa dan host tiap service
- konfigurasi Docker seperti path, context, dan remote build
- hooks sebelum atau sesudah provisioning dan deployment

### 2. Environment `azd`

Setiap environment seperti dev atau prod memiliki nilai konfigurasi sendiri, misalnya:
- nama environment
- lokasi Azure
- endpoint layanan eksternal
- output dari Bicep yang dipakai service saat deploy

### 3. Infrastruktur deklaratif

Gunakan Bicep untuk:
- resource group dan resource inti
- Container Apps environment
- Container App per service
- registry, identity, secret, dan output yang dibutuhkan aplikasi

## Struktur proyek yang direkomendasikan

Pola umum:

```text
project/
├── azure.yaml
├── infra/
│   ├── main.bicep
│   ├── main.parameters.json
│   └── modules/
├── .azure/
│   └── <env-name>/
└── src/
    ├── frontend/
    └── backend/
```

Tujuan struktur ini adalah memisahkan:
- definisi deployment
- definisi infrastruktur
- state environment yang dikelola `azd`
- source code aplikasi

## Alur kerja inti

### 1. Siapkan autentikasi dan environment

Sebelum deploy:
- login ke Azure
- pilih subscription yang benar
- buat environment `azd` yang sesuai
- isi variabel environment yang dibutuhkan

Pastikan environment dev, staging, dan prod tidak saling bercampur.

### 2. Definisikan service di `azure.yaml`

Untuk tiap service, tentukan:
- path proyek
- bahasa utama
- target host, misalnya `containerapp`
- konfigurasi Docker
- apakah build dilakukan secara remote

Gunakan remote build bila ingin memindahkan proses build image ke Azure Container Registry dan mengurangi ketergantungan pada mesin lokal.

### 3. Hubungkan environment variable ke Bicep

Gunakan pola parameter injection agar nilai environment dapat dipakai oleh infrastruktur.

Prinsip penting:
- nilai sensitif jangan di-hardcode
- gunakan environment variable untuk nilai yang berubah antar environment
- gunakan output Bicep untuk mengalirkan endpoint atau identifier kembali ke aplikasi

### 4. Provision dan deploy secara idempoten

`azd up` umumnya mencakup:
- provisioning infrastruktur
- build image
- push image
- deployment service

Karena Bicep bersifat deklaratif, deployment seharusnya merekonsiliasi state menuju konfigurasi yang diinginkan, bukan membuat resource duplikat setiap kali.

### 5. Verifikasi hasil deployment

Setelah deploy:
- cek URI service yang dihasilkan
- verifikasi environment variable yang terpasang
- pastikan komunikasi antar service berjalan
- cek apakah perubahan manual di portal berisiko tertimpa pada deploy berikutnya

## Praktik desain penting

### Remote build

Gunakan remote build bila:
- image cukup besar
- build lokal tidak konsisten
- ingin memanfaatkan ACR untuk pipeline build yang lebih stabil

### Output Bicep ke aplikasi

Gunakan output untuk nilai seperti:
- URI frontend
- URI backend
- principal ID
- nama resource penting

Ini membantu mengurangi konfigurasi manual setelah provisioning.

### Hooks

Hooks berguna untuk:
- validasi sebelum provisioning
- setup tambahan setelah provisioning
- logging atau verifikasi setelah deployment

Namun gunakan hooks secara hemat. Jangan pindahkan logika inti infrastruktur ke skrip imperatif bila masih bisa dinyatakan di Bicep.

## Checklist implementasi

- apakah `azure.yaml` sudah mendefinisikan semua service yang relevan?
- apakah tiap environment punya konfigurasi terpisah?
- apakah parameter Bicep dipetakan dari environment variable dengan jelas?
- apakah output penting dari infrastruktur tersedia untuk aplikasi?
- apakah remote build diperlukan dan sudah dikonfigurasi benar?
- apakah deployment aman diulang tanpa membuat drift besar?

## Risiko dan kehati-hatian

- perubahan manual di portal dapat hilang bila tidak direpresentasikan di Bicep
- environment variable yang salah dapat menyebabkan deploy sukses tetapi aplikasi gagal saat runtime
- resource existing perlu direferensikan dengan benar agar tidak dibuat ulang
- custom domain, secret, atau konfigurasi ingress perlu perhatian khusus agar tidak tertimpa

## Praktik baik

- perlakukan `azure.yaml` dan Bicep sebagai source of truth deployment
- pisahkan environment dev, staging, dan prod secara tegas
- gunakan output Bicep untuk mengurangi copy-paste konfigurasi
- dokumentasikan variabel environment yang wajib ada
- verifikasi idempotency dengan menjalankan deploy ulang pada perubahan kecil

## Anti-pattern

- menyimpan konfigurasi penting hanya di portal tanpa representasi deklaratif
- mencampur nilai environment antar stage
- mengandalkan skrip manual untuk langkah yang seharusnya ada di Bicep atau `azure.yaml`
- menganggap deploy sukses hanya dari status CLI tanpa verifikasi endpoint dan runtime

## Batasan

- skill ini berfokus pada pola deployment dengan `azd`, bukan seluruh ekosistem Azure DevOps
- detail resource spesifik tetap perlu disesuaikan dengan arsitektur aplikasi dan kebijakan organisasi

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/azd-deployment` agar mandiri, berbahasa Indonesia, dan tidak bergantung pada referensi eksternal yang tidak tersedia di workspace.
