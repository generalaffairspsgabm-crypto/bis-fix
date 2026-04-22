# Defense-in-Depth Validation

## Ringkasan

Saat bug terjadi karena data invalid, satu validasi sering terasa cukup. Namun satu lapisan validasi bisa dilewati oleh jalur kode lain, refactor, atau mock. Prinsip dokumen ini: validasi di setiap lapisan penting agar bug menjadi sulit atau mustahil terulang.

## Mengapa perlu banyak lapisan

Validasi tunggal berarti "kita memperbaiki bug".
Validasi berlapis berarti "kita membuat bug itu sulit terjadi lagi".

Setiap lapisan menangkap kelas masalah yang berbeda:
- boundary validation menangkap input invalid sejak awal
- business logic validation menangkap mismatch konteks operasi
- environment guard mencegah operasi berbahaya pada konteks tertentu
- debug instrumentation membantu investigasi saat lapisan lain gagal

## Empat lapisan utama

### 1. Entry point validation
Tolak input yang jelas-jelas invalid di batas API.

### 2. Business logic validation
Pastikan data masuk akal untuk operasi yang sedang dijalankan.

### 3. Environment guard
Blok operasi berbahaya pada konteks sensitif, misalnya saat test atau CI.

### 4. Debug instrumentation
Catat context penting untuk forensik: path, cwd, env, state, dan stack trace.

## Cara menerapkan

Saat menemukan bug:
1. telusuri alur data
2. petakan checkpoint tempat data lewat
3. tambahkan validasi di tiap lapisan relevan
4. uji bahwa tiap lapisan benar-benar menangkap penyimpangan

## Insight utama

Jangan berhenti pada satu titik validasi. Jika akar masalah menyentuh banyak lapisan, pastikan perlindungan juga berlapis.
