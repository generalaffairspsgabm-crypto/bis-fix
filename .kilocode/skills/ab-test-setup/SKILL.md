---
name: ab-test-setup
description: >-
  Gunakan saat merancang eksperimen A/B agar hipotesis, metrik, ukuran sampel,
  guardrail, dan kesiapan eksekusi dibekukan sebelum implementasi sehingga tes
  valid, aman, dan dapat diinterpretasikan dengan benar.
license: CC-BY-4.0
metadata:
  category: product
  source:
    repository: 'https://github.com/sickn33/antigravity-awesome-skills'
    path: skills/ab-test-setup
    license_path: LICENSE-CONTENT
  original_metadata:
    risk: unknown
    source: community
    date_added: '2026-02-27'
---

# A/B Test Setup

Skill ini memandu persiapan eksperimen A/B sebelum perubahan produk mulai diimplementasikan.
Fokus utamanya adalah mencegah eksperimen yang kabur, underpowered, bias, atau “terlihat menang” tetapi tidak valid.

## Kapan digunakan

Gunakan saat:
- menyusun eksperimen produk, growth, pricing, onboarding, atau konversi
- menilai apakah ide perubahan layak diuji dengan A/B test
- membekukan hipotesis, metrik utama, MDE, dan durasi tes sebelum launch
- mereview kesiapan tracking dan guardrail metric
- menolak eksperimen yang belum cukup kuat secara desain

## Hasil yang harus ada sebelum implementasi

Sebelum eksperimen boleh dilanjutkan, pastikan artefak berikut tersedia:
- pernyataan hipotesis final
- audiens target yang spesifik
- satu metrik utama yang dibekukan
- metrik sekunder seperlunya
- guardrail metric yang jelas
- baseline rate atau estimasi yang layak
- MDE yang realistis
- estimasi ukuran sampel per varian
- estimasi durasi tes
- status verifikasi tracking

Jika salah satu elemen inti belum ada, hentikan progres ke implementasi.

## 1. Kunci hipotesis lebih dulu

Hipotesis yang valid harus memuat:
- observasi atau bukti awal
- satu perubahan spesifik
- arah efek yang diharapkan
- audiens yang terkena
- definisi sukses yang dapat diukur

Gunakan format kerja berikut:

```text
Dengan mengubah [perubahan tunggal] untuk [audiens],
metrik utama [nama metrik] diperkirakan [naik/turun] setidaknya [MDE],
berdasarkan [observasi/bukti awal].
```

Jangan lanjut ke desain varian atau implementasi bila hipotesis masih bercampur dengan banyak perubahan sekaligus.

## 2. Validasi asumsi eksperimen

Catat dan uji asumsi penting berikut:
- stabilitas traffic selama periode tes
- independensi user atau unit randomisasi
- keandalan event tracking dan atribusi
- kualitas randomisasi
- faktor eksternal seperti kampanye, seasonality, atau release lain

Jika asumsi lemah, beri peringatan eksplisit dan sarankan:
- menunda eksperimen
- menyederhanakan desain
- mengganti metrik
- menunggu volume traffic memadai

## 3. Pilih tipe eksperimen paling sederhana

Gunakan pilihan paling sederhana yang masih valid:
- **A/B test** untuk satu perubahan dengan dua varian
- **A/B/n** bila memang perlu membandingkan beberapa opsi dan traffic cukup tinggi
- **Multivariate test** hanya bila ingin mengukur interaksi antar elemen dan volume sangat besar
- **Split URL test** untuk perubahan struktur besar antar halaman/alur

Default yang sehat adalah A/B biasa. Jangan memakai desain yang lebih rumit tanpa kebutuhan yang jelas.

## 4. Bekukan metrik dengan disiplin

### Metrik utama

Tentukan tepat satu metrik utama:
- paling langsung terhubung ke hipotesis
- dibekukan sebelum launch
- menjadi dasar keputusan menang/kalah

### Metrik sekunder

Gunakan untuk memahami mengapa hasil terjadi, bukan mengganti keputusan metrik utama.

### Guardrail metric

Tetapkan metrik yang tidak boleh memburuk, misalnya:
- bounce rate
- crash rate
- refund rate
- latency
- unsubscribe rate
- support contact rate

Eksperimen tidak boleh dianggap sukses bila guardrail penting rusak meskipun metrik utama naik.

## 5. Hitung ukuran sampel dan durasi

Minimal tentukan:
- baseline conversion atau baseline metric saat ini
- MDE
- confidence level, umumnya 95%
- statistical power, umumnya 80%

Lalu estimasikan:
- ukuran sampel per varian
- total durasi tes berdasarkan traffic nyata

Jangan izinkan eksperimen berjalan tanpa estimasi ukuran sampel yang realistis. Tes yang kekurangan traffic hanya menghasilkan kebisingan yang mahal.

## 6. Pasang execution readiness gate

Implementasi hanya boleh dimulai bila semua benar:
- hipotesis final sudah dikunci
- metrik utama sudah dibekukan
- ukuran sampel sudah dihitung
- durasi tes sudah ditentukan
- guardrail sudah disepakati
- tracking sudah diverifikasi

Bila ada item yang kosong, anggap eksperimen belum siap.

## 7. Disiplin saat eksperimen berjalan

Lakukan:
- pantau kesehatan teknis dan kualitas tracking
- dokumentasikan faktor eksternal yang memengaruhi hasil
- jaga konfigurasi tes tetap stabil

Jangan lakukan:
- menghentikan tes lebih awal hanya karena hasil tampak bagus
- mengganti varian di tengah tes
- menambah sumber traffic baru tanpa pertimbangan validitas
- mengubah definisi sukses setelah launch

## 8. Analisis hasil dengan benar

Saat membaca hasil:
- jangan generalisasi melebihi populasi yang diuji
- jangan klaim kausalitas di luar perubahan yang benar-benar dites
- pisahkan signifikansi statistik dari keputusan bisnis
- jangan override kegagalan guardrail

Interpretasi umum:
- **positif signifikan** → pertimbangkan rollout bertahap
- **negatif signifikan** → tolak varian dan dokumentasikan pembelajaran
- **inkonklusif** → evaluasi kebutuhan traffic tambahan atau perubahan yang lebih besar
- **guardrail gagal** → jangan kirim ke produksi walaupun metrik utama menang

## 9. Dokumentasi wajib

Simpan catatan eksperimen yang memuat:
- hipotesis
- varian yang diuji
- metrik utama, sekunder, guardrail
- ukuran sampel target vs aktual
- durasi aktual
- hasil
- keputusan akhir
- pembelajaran dan ide lanjutan

Gunakan lokasi dokumentasi yang bisa dicari ulang agar tim tidak mengulang eksperimen buruk yang sama.

## Kondisi penolakan

Tolak atau tunda eksperimen bila:
- baseline tidak diketahui dan tidak bisa diperkirakan layak
- traffic tidak cukup untuk mendeteksi MDE
- metrik utama belum didefinisikan
- banyak variabel diubah tanpa desain yang sesuai
- hipotesis tidak bisa dinyatakan dengan jelas

## Checklist review cepat

Sebelum eksperimen dilanjutkan, periksa:
- apakah hanya ada satu hipotesis utama?
- apakah hanya ada satu primary metric?
- apakah MDE masuk akal terhadap volume traffic?
- apakah guardrail mewakili risiko bisnis nyata?
- apakah tracking sudah diverifikasi sebelum launch?
- apakah tidak ada rencana “peek lalu putuskan cepat”?

## Anti-pattern

Hindari:
- mulai build sebelum hipotesis dikunci
- memilih banyak metrik utama sekaligus
- menghitung kemenangan dari metric shopping setelah tes selesai
- menjalankan A/B/n besar pada traffic rendah
- memakai eksperimen untuk membenarkan ide, bukan belajar

## Catatan Kompatibilitas KiloCode

Versi KiloCode ini menormalkan skill sumber menjadi panduan eksperimen yang ringkas dan mandiri. Detail tool statistik spesifik tidak dibundel agar skill tetap umum dan dapat dipakai lintas stack analitik.
