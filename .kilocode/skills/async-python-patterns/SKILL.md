---
name: async-python-patterns
description: Gunakan saat membangun aplikasi Python asynchronous dengan `asyncio`, pola konkurensi, async/await, timeout, cancellation, dan backpressure untuk workload I/O-bound.
license: Complete terms in LICENSE.txt
metadata:
  category: backend
  source:
    upstream: .tmp-antigravity-skills/skills/async-python-patterns
    type: community
  depends_on:
    - proyek Python dengan kebutuhan konkurensi atau I/O non-blocking
---

# Async Python Patterns

Skill ini memandu implementasi Python asynchronous menggunakan `asyncio` dan pola konkurensi yang aman untuk sistem I/O-bound. Fokusnya adalah memilih pola async yang tepat, mengelola cancellation, timeout, error propagation, dan menjaga sistem tetap stabil di bawah beban.

## Kapan digunakan

Gunakan skill ini saat:
- membangun API async dengan FastAPI, aiohttp, atau framework serupa
- menjalankan banyak operasi I/O secara paralel
- membuat scraper, worker, atau service yang menangani banyak request jaringan
- membangun aplikasi real-time seperti WebSocket server
- mengelola background task, queue consumer, atau pipeline async
- mengoptimalkan workload yang bottleneck-nya ada pada I/O, bukan CPU

## Jangan gunakan skill ini saat

- workload dominan CPU-bound dan hampir tidak ada I/O
- skrip sinkron sederhana sudah cukup
- runtime atau dependency tidak kompatibel dengan event loop async

## Tujuan utama

- memilih pola async yang sesuai karakter workload
- mencegah blocking tersembunyi di dalam jalur async
- mengelola timeout, cancellation, dan backpressure secara eksplisit
- menjaga kode async tetap dapat diuji dan di-debug

## Prinsip inti

- async cocok untuk I/O-bound, bukan solusi universal untuk semua performa
- satu operasi blocking dapat merusak manfaat concurrency pada event loop
- cancellation harus dianggap bagian dari desain, bukan kasus pinggir
- batasi concurrency; jangan membuat task tanpa kontrol
- error handling harus mempertimbangkan partial failure dan cleanup

## Alur kerja inti

### 1. Klasifikasikan workload lebih dulu

Sebelum menulis kode async, tentukan:
- apakah bottleneck utama adalah network, disk, database, atau API eksternal
- apakah ada bagian CPU-bound yang perlu dipindah ke worker terpisah
- berapa tingkat concurrency yang realistis
- apakah urutan hasil penting atau bisa diproses independen

Jika masalah utamanya CPU-bound, pertimbangkan process pool, worker queue, atau arsitektur lain di luar event loop utama.

### 2. Pilih pola konkurensi yang tepat

Gunakan pola sesuai kebutuhan:
- task independen: `gather` atau task group
- producer-consumer: queue async
- concurrency terbatas: semaphore atau worker pool
- operasi dengan SLA ketat: timeout per task
- alur panjang: cancellation-aware orchestration

Jangan membuat ratusan atau ribuan task tanpa batas hanya karena API async memudahkan.

### 3. Hindari blocking di jalur async

Audit hal-hal berikut:
- pemanggilan library sinkron di dalam `async def`
- operasi file atau database yang ternyata blocking
- parsing atau komputasi berat di event loop utama
- retry loop yang memakai sleep sinkron

Jika perlu, pindahkan kerja blocking ke thread pool atau proses terpisah.

### 4. Desain timeout, cancellation, dan cleanup

Setiap operasi penting sebaiknya punya:
- timeout yang jelas
- perilaku saat dibatalkan
- cleanup resource seperti koneksi, file handle, atau lock
- strategi retry yang tidak menyebabkan storm

Cancellation bukan error biasa; pastikan resource tetap dilepas dengan benar.

### 5. Terapkan backpressure dan pembatasan concurrency

Untuk sistem yang menerima banyak input:
- gunakan queue dengan batas ukuran bila perlu
- batasi jumlah worker aktif
- lindungi dependency eksternal dari lonjakan request
- ukur latency dan throughput sebelum menaikkan concurrency

Lebih baik throughput stabil daripada concurrency tinggi yang membuat sistem runtuh.

### 6. Siapkan testing dan debugging async

Minimal lakukan:
- test untuk timeout dan cancellation path
- test partial failure pada beberapa task paralel
- verifikasi tidak ada task bocor setelah test selesai
- logging yang cukup untuk melacak lifecycle task penting

## Checklist implementasi

1. Pastikan workload memang I/O-bound dan cocok untuk async.
2. Pilih pola konkurensi yang sesuai: gather, queue, pool, atau task group.
3. Audit dependency blocking di jalur async.
4. Tambahkan timeout, cancellation handling, dan cleanup.
5. Batasi concurrency dan siapkan backpressure.
6. Uji jalur sukses, gagal, timeout, dan cancellation.

## Anti-pattern penting

- memakai async untuk workload CPU-bound tanpa strategi tambahan
- memanggil library sinkron berat di dalam `async def`
- membuat task tanpa batas dan tanpa observability
- mengabaikan cancellation sehingga resource bocor
- menganggap concurrency tinggi selalu berarti performa lebih baik

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/async-python-patterns` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
