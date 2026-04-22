---
name: audit-context-building
description: Gunakan saat perlu membangun pemahaman kode yang sangat mendalam sebelum audit bug atau keamanan, dengan analisis granular, pemetaan asumsi, invariant, dan alur lintas fungsi.
license: Complete terms in LICENSE.txt
metadata:
  category: security
  source:
    upstream: .tmp-antigravity-skills/skills/audit-context-building
    type: community
  depends_on:
    - akses baca ke kode sumber yang akan dianalisis dan kebutuhan audit mendalam sebelum temuan
---

# Audit Context Building

Skill ini memandu fase pembangunan konteks sebelum audit bug atau keamanan. Fokusnya adalah memahami sistem secara granular dan berbasis bukti sebelum mencoba menemukan kerentanan, akar masalah, atau rekomendasi perbaikan.

## Kapan digunakan

Gunakan skill ini saat:
- perlu memahami kode secara mendalam sebelum mencari bug atau vulnerability
- audit membutuhkan analisis bottom-up, bukan tebakan tingkat tinggi
- risiko halusinasi, kontradiksi, atau context loss harus ditekan
- sedang menyiapkan architecture review, threat modeling, atau security audit yang serius

## Jangan gunakan skill ini untuk

- langsung menyatakan temuan vulnerability
- memberi rekomendasi fix sebelum konteks cukup kuat
- menyusun exploit reasoning
- memberi severity rating tanpa pemahaman sistem yang memadai

## Tujuan utama

- membangun model mental sistem yang stabil dan eksplisit
- menganalisis fungsi dan blok kode secara granular
- memetakan invariant, asumsi, trust boundary, dan alur data
- memperbarui pemahaman lama bila bukti baru bertentangan

## Prinsip inti

- pahami dulu, simpulkan kemudian
- analisis harus berbasis bukti dari kode, bukan intuisi semata
- helper kecil tetap penting karena asumsi sering tersembunyi di sana
- panggilan lintas fungsi dan lintas modul harus diperlakukan sebagai satu alur kontinu
- ketidakpastian harus dinyatakan eksplisit

## Alur kerja inti

### 1. Lakukan orientasi awal secara bottom-up

Sebelum masuk detail, petakan secara minimal:
- modul atau file utama
- entrypoint publik atau eksternal
- aktor penting
- state, storage, atau struktur data utama
- boundary awal antar komponen

Tujuannya bukan menyimpulkan perilaku, tetapi membuat anchor untuk analisis mendalam.

### 2. Analisis fungsi secara granular

Untuk setiap fungsi non-trivial, dokumentasikan minimal:
- tujuan fungsi
- input eksplisit dan implisit
- asumsi dan precondition
- output dan efek samping
- perubahan state
- interaksi eksternal

Lalu pecah per blok logis atau per bagian penting:
- apa yang dilakukan
- mengapa urutannya seperti itu
- asumsi apa yang dipakai
- invariant apa yang dibangun atau dipertahankan
- bagian mana yang bergantung pada blok tersebut

### 3. Lanjutkan analisis melintasi call boundary

Saat menemukan pemanggilan fungsi:
- telusuri callee bila kodenya tersedia
- propagasikan asumsi dan invariant dari caller ke callee dan kembali lagi
- perlakukan seluruh call chain sebagai satu alur eksekusi kontinu

Jika target eksternal tidak tersedia:
- modelkan sebagai boundary tidak tepercaya
- catat asumsi terhadap respons, kegagalan, dan efek sampingnya

### 4. Rekonstruksi pemahaman sistem global

Setelah cukup banyak analisis mikro, rangkum:
- peta baca/tulis state penting
- invariant lintas fungsi atau lintas modul
- workflow end-to-end
- trust boundary dan jalur input tidak tepercaya
- area kompleksitas atau fragility tinggi

### 5. Jaga kualitas anti-halusinasi

Selama analisis:
- kaitkan klaim dengan bukti kode
- revisi asumsi lama bila ada kontradiksi
- tandai area yang belum jelas
- hindari lompatan kesimpulan tanpa jejak analisis

## Checklist implementasi

1. Petakan modul, entrypoint, aktor, dan state utama.
2. Analisis fungsi penting secara granular.
3. Telusuri call chain lintas fungsi dan lintas modul.
4. Dokumentasikan asumsi, invariant, dan efek samping.
5. Rekonstruksi workflow dan trust boundary sistem.
6. Pastikan semua kesimpulan sementara berbasis bukti kode.

## Anti-pattern penting

- merasa sudah paham hanya dari gambaran umum
- melewati helper kecil karena dianggap sepele
- memutus konteks saat berpindah ke fungsi lain
- langsung mencari vulnerability sebelum model sistem cukup matang
- menyembunyikan ketidakpastian atau area yang belum diverifikasi

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/audit-context-building` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
