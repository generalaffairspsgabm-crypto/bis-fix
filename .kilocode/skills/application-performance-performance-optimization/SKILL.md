---
name: application-performance-performance-optimization
description: >-
  Gunakan saat mengoptimalkan performa aplikasi end-to-end agar baseline,
  bottleneck, tuning backend/frontend, load testing, observability, dan guardrail
  regresi ditangani secara terukur di seluruh stack.
license: CC-BY-4.0
metadata:
  category: performance
  source:
    repository: 'https://github.com/sickn33/antigravity-awesome-skills'
    path: skills/application-performance-performance-optimization
    license_path: LICENSE-CONTENT
  original_metadata:
    risk: unknown
    source: community
    date_added: '2026-02-27'
---

# Application Performance Performance Optimization

Skill ini memandu optimasi performa aplikasi secara menyeluruh, dari profiling awal sampai monitoring pasca-perbaikan. Fokusnya adalah pendekatan berbasis bukti: ukur dulu, optimalkan bottleneck yang nyata, validasi hasilnya, lalu pasang guardrail agar regresi tidak kembali.

## Kapan digunakan

Gunakan saat:
- mengoordinasikan optimasi performa backend, frontend, database, dan infrastruktur
- menetapkan baseline dan menemukan bottleneck nyata
- menyusun load test, performance budget, atau capacity plan
- membangun observability untuk target performa dan reliability
- menurunkan latency, meningkatkan throughput, atau memperbaiki efisiensi biaya

## Jangan gunakan saat

Jangan gunakan saat:
- masalah hanya bug kecil lokal tanpa tujuan performa yang lebih luas
- tidak ada akses ke metrik, tracing, profiling, atau data perilaku sistem
- permintaan tidak terkait performa atau skalabilitas

## Prinsip inti

- jangan optimalkan berdasarkan tebakan
- ukur baseline sebelum mengubah apa pun
- prioritaskan bottleneck dengan dampak user atau bisnis terbesar
- validasi setiap perubahan dengan metrik yang sama sebelum dan sesudah
- pasang guardrail agar perbaikan tidak hilang pada iterasi berikutnya
- hindari load test berisiko pada produksi tanpa persetujuan dan pengaman

## Alur kerja

### 1. Tetapkan target performa

Definisikan lebih dulu:
- metrik utama: latency, throughput, error rate, resource usage, cost efficiency
- jalur user atau endpoint kritis
- target SLO atau performance budget
- constraint rollout: zero downtime, maintenance window, atau gradual rollout

Contoh target yang sering dipakai:
- endpoint kritis memiliki P95 yang jelas
- Core Web Vitals berada dalam ambang sehat
- sistem mampu menangani beban puncak tertentu dengan error rate rendah

### 2. Bangun baseline dan profil bottleneck

Kumpulkan bukti dari:
- profiling CPU dan memory
- tracing request end-to-end
- slow query log database
- metrik API response time
- metrik frontend seperti LCP, INP/FID, CLS, dan time to interactive
- real user monitoring bila tersedia

Tujuan tahap ini:
- menemukan hot path
- membedakan bottleneck backend, database, frontend, jaringan, atau infrastruktur
- menghindari optimasi pada area yang tidak dominan

### 3. Nilai observability yang tersedia

Pastikan sistem cukup terlihat untuk dioptimalkan:
- metrics, logs, dan traces tersedia pada jalur kritis
- ada korelasi antar layer bila request melewati banyak service
- dashboard dan alert cukup untuk mendeteksi degradasi
- instrumentation gap dicatat sebelum optimasi besar dimulai

### 4. Optimalkan database dan backend

Prioritaskan area dengan dampak terbesar:
- query lambat, missing index, execution plan buruk
- N+1 query
- connection pooling yang tidak sehat
- caching yang tepat sasaran
- algoritma atau struktur data yang boros
- serialisasi, kompresi, atau payload yang terlalu berat
- bottleneck komunikasi antar service

Untuk distributed system, perhatikan juga:
- jumlah network hop
- retry storm
- queue backlog
- serialization overhead
- cache invalidation dan consistency trade-off

### 5. Optimalkan frontend dan delivery path

Periksa:
- ukuran bundle dan code splitting
- lazy loading dan dynamic import
- critical rendering path
- render-blocking resource
- image optimization dan format modern
- caching CDN dan edge behavior
- performa mobile pada jaringan lambat dan CPU lemah

Fokuskan pada jalur user yang paling penting, bukan sekadar skor sintetis.

### 6. Validasi dengan load test dan regression test

Setelah perubahan utama:
- jalankan load test realistis berdasarkan pola trafik
- ukur normal load, peak load, dan stress scenario bila relevan
- bandingkan hasil dengan baseline awal
- buat regression test atau performance budget untuk CI/CD bila memungkinkan

Jangan klaim perbaikan tanpa bukti sebelum/sesudah.

### 7. Pasang monitoring dan proses continuous optimization

Setelah optimasi berhasil:
- buat dashboard untuk metrik utama
- pasang alert degradasi performa
- dokumentasikan bottleneck yang belum sempat ditangani
- buat backlog optimasi lanjutan
- tetapkan review berkala untuk kapasitas dan regresi

## Checklist cepat

- target performa dan jalur kritis sudah jelas
- baseline tersedia sebelum perubahan
- bottleneck utama diidentifikasi dengan bukti
- observability gap dicatat
- optimasi dilakukan pada area berdampak tinggi
- hasil divalidasi dengan metrik yang sama
- guardrail regresi tersedia
- rollout dan rollback dipikirkan

## Anti-pattern

Hindari:
- optimasi tanpa baseline
- mengejar micro-optimization saat bottleneck utama belum disentuh
- load test produksi tanpa pengaman
- mengukur hanya rata-rata tanpa melihat tail latency
- mengabaikan biaya operasional dari solusi performa baru
- mengklaim “lebih cepat” tanpa data pembanding

## Catatan kompatibilitas KiloCode

Skill upstream berbentuk orkestrasi multi-agent dan merujuk banyak subagent eksternal. Pada adaptasi KiloCode ini, workflow dinormalisasi menjadi playbook optimasi performa end-to-end yang mandiri, tanpa ketergantungan pada agent atau tool eksternal tertentu.