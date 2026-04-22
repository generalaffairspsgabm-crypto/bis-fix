# Root Cause Tracing

## Ringkasan

Bug sering muncul jauh di call stack. Naluri untuk memperbaiki titik error biasanya hanya menyentuh gejala. Prinsip utama dokumen ini: telusuri panggilan ke belakang sampai menemukan pemicu asli, lalu perbaiki di sumber.

## Kapan digunakan

Gunakan saat:
- error muncul jauh dari entry point
- stack trace panjang
- asal nilai invalid tidak jelas
- perlu menemukan test atau jalur kode yang memicu masalah

## Proses tracing

### 1. Amati gejalanya
Contoh:

```text
Error: git init failed in /path/yang/salah
```

### 2. Temukan penyebab langsung
Cari kode yang secara langsung memicu error.

### 3. Tanyakan: siapa yang memanggil ini?
Telusuri caller satu level ke atas.

### 4. Lanjutkan ke atas
Periksa nilai yang diteruskan dari lapisan sebelumnya. Cari input kosong, state salah, atau asumsi yang bocor.

### 5. Temukan pemicu asli
Teruskan sampai menemukan asal nilai atau kondisi yang salah. Fix harus ditempatkan di sana.

## Instrumentasi stack trace

Jika tracing manual sulit, tambahkan instrumentasi sebelum operasi berbahaya:

```typescript
async function riskyOperation(directory: string) {
  const stack = new Error().stack;
  console.error('DEBUG riskyOperation', {
    directory,
    cwd: process.cwd(),
    stack,
  });

  // operasi aktual
}
```

Panduan praktis:
- gunakan `console.error()` dalam test bila logger biasa disuppress
- log **sebelum** operasi gagal, bukan sesudahnya
- sertakan context seperti path, cwd, environment, dan stack

## Prinsip inti

Jangan pernah memperbaiki hanya pada lokasi error muncul. Jika masih bisa ditelusuri satu level ke atas, teruskan tracing. Setelah sumber ditemukan:
- fix di sumber
- tambahkan validasi di beberapa lapisan bila relevan

## Dampak yang diharapkan

Pendekatan ini membantu:
- menemukan trigger asli lebih cepat
- mengurangi symptom fix
- membuat bug serupa lebih sulit terulang
