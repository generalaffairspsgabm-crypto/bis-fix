---
name: amazon-alexa
description: Gunakan saat membangun integrasi Amazon Alexa, termasuk Alexa Skills, backend AWS Lambda, interaction model, voice UX, integrasi Claude sebagai otak percakapan, dan kontrol smart home.
license: Complete terms in LICENSE.txt
metadata:
  category: voice-platform
  source:
    upstream: .tmp-antigravity-skills/skills/amazon-alexa
    type: community
  depends_on:
    - akun Amazon Developer dan AWS
    - akses ke ASK CLI atau tool deployment Alexa yang setara
---

# Amazon Alexa

Skill ini memandu pembangunan solusi berbasis Amazon Alexa, terutama untuk use case voice assistant cerdas yang memakai backend AWS dan dapat dihubungkan ke model LLM seperti Claude.

## Kapan digunakan

Gunakan skill ini saat perlu:
- membuat Alexa Skill baru
- mendesain interaction model, intent, slot, dan sample utterance
- membangun backend Alexa di AWS Lambda
- menghubungkan Alexa dengan Claude atau LLM lain untuk percakapan cerdas
- menambahkan memori persisten dengan DynamoDB
- mengintegrasikan smart home, routine, atau tampilan Echo Show

## Komponen arsitektur umum

Alur tipikal:

```text
Perangkat Alexa -> Alexa Cloud -> AWS Lambda -> layanan aplikasi / LLM
                                   ├-> DynamoDB
                                   ├-> Polly
                                   ├-> CloudWatch
                                   └-> layanan AWS lain bila perlu
```

## Kapabilitas utama

### 1. Alexa Skill dasar
Bangun skill dengan:
- invocation name yang jelas
- intent inti seperti help, stop, cancel, fallback
- intent domain khusus sesuai use case

### 2. Percakapan berbasis LLM
Gunakan backend Lambda untuk:
- menerima intent dan slot
- membangun prompt dari konteks percakapan
- memanggil model LLM
- mengubah hasil menjadi respons suara yang natural

### 3. Memori persisten
Gunakan DynamoDB untuk menyimpan:
- preferensi pengguna
- histori percakapan ringkas
- profil atau state sesi jangka panjang

### 4. Voice UX
Perhatikan:
- respons singkat dan mudah didengar
- konfirmasi saat aksi penting
- fallback saat ASR atau NLU gagal
- SSML untuk jeda, penekanan, dan ritme suara

### 5. Smart home dan automasi
Skill ini juga relevan untuk:
- kontrol perangkat rumah pintar
- routine berbasis intent
- orkestrasi aksi lintas perangkat atau layanan AWS

## Prasyarat umum

- akun Amazon Developer
- akun AWS
- ASK CLI atau workflow deployment yang setara
- kredensial AWS yang benar
- runtime backend yang didukung, misalnya Python atau Node.js

## Alur kerja yang direkomendasikan

1. definisikan use case dan invocation name
2. rancang interaction model
3. pilih backend Lambda dan dependensi
4. implementasikan handler intent utama
5. tambahkan persistence bila perlu
6. uji utterance, fallback, dan voice UX
7. deploy dan pantau log di CloudWatch

## Interaction model

Saat mendesain interaction model, pastikan:
- intent benar-benar mewakili tujuan pengguna
- slot memakai tipe bawaan atau custom type yang tepat
- sample utterance cukup beragam
- fallback intent tersedia untuk kasus tidak dikenali

Contoh intent yang sering muncul:
- percakapan umum
- kontrol smart home
- eksekusi routine
- bantuan dan penghentian sesi

## Backend Lambda

Backend biasanya bertanggung jawab untuk:
- memetakan request Alexa ke handler
- memuat state pengguna
- memanggil layanan eksternal atau LLM
- menyusun respons suara dan reprompt
- menyimpan histori atau preferensi

Praktik baik:
- batasi latensi agar respons suara tetap cepat
- tangani exception dengan pesan yang ramah pengguna
- pisahkan logika intent, integrasi, dan persistence

## Integrasi LLM

Saat Alexa dipakai sebagai antarmuka suara untuk LLM:
- ringkas konteks sebelum dikirim ke model
- batasi panjang jawaban agar cocok untuk audio
- hindari jawaban terlalu panjang dalam satu giliran
- siapkan strategi follow-up bila topik kompleks
- simpan memori yang relevan, bukan seluruh transkrip mentah

## Voice UX dan SSML

Gunakan SSML untuk:
- jeda alami
- penekanan kata penting
- ritme yang lebih nyaman didengar

Namun jangan berlebihan. Prioritaskan kejelasan dan durasi respons yang efisien.

## Observabilitas

Pantau minimal:
- error handler
- timeout Lambda
- intent yang sering gagal
- fallback rate
- latensi panggilan ke layanan eksternal

## Anti-pattern

- invocation name sulit diucapkan
- terlalu banyak intent yang tumpang tindih
- jawaban audio terlalu panjang dan melelahkan
- menyimpan seluruh histori tanpa strategi ringkasan
- tidak menyediakan fallback atau reprompt
- mengandalkan LLM tanpa guardrail untuk aksi sensitif

## Output yang sebaiknya dihasilkan

Saat membantu pengguna, hasil ideal mencakup:
- rancangan arsitektur Alexa + AWS
- daftar intent dan slot utama
- pola handler backend
- strategi persistence dan observabilitas
- catatan voice UX dan guardrail percakapan

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/amazon-alexa` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
