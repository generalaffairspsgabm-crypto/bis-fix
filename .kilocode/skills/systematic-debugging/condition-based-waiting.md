# Condition-Based Waiting

## Ringkasan

Flaky test sering disebabkan oleh delay arbitrer seperti `setTimeout` atau `sleep`. Dokumen ini mengarahkan untuk menunggu kondisi yang benar-benar diinginkan, bukan menebak berapa lama proses akan selesai.

## Kapan digunakan

Gunakan saat:
- test memakai delay arbitrer
- test flaky di mesin lambat atau CI
- menunggu operasi async selesai
- timeout sering muncul saat test paralel

Jangan gunakan delay arbitrer kecuali Anda benar-benar sedang menguji perilaku berbasis waktu dan alasannya terdokumentasi.

## Pola inti

```typescript
// Salah: menebak waktu
await new Promise(r => setTimeout(r, 50));
expect(getResult()).toBeDefined();

// Benar: tunggu kondisi
await waitFor(() => getResult() !== undefined, 'hasil tersedia');
expect(getResult()).toBeDefined();
```

## Contoh helper

```typescript
async function waitFor<T>(
  condition: () => T | undefined | null | false,
  description: string,
  timeoutMs = 5000
): Promise<T> {
  const start = Date.now();

  while (true) {
    const result = condition();
    if (result) return result;

    if (Date.now() - start > timeoutMs) {
      throw new Error(`Timeout menunggu ${description} setelah ${timeoutMs}ms`);
    }

    await new Promise(r => setTimeout(r, 10));
  }
}
```

## Kesalahan umum

- polling terlalu cepat dan memboroskan CPU
- tidak memberi timeout sehingga loop bisa berjalan tanpa akhir
- memakai data stale karena state diambil di luar loop

## Kapan timeout arbitrer masih benar

Timeout tetap bisa digunakan bila:
1. ada kondisi pemicu yang ditunggu dulu
2. waktu tunggu berdasarkan karakteristik sistem yang diketahui, bukan tebakan
3. alasan pemakaian timeout dijelaskan di komentar atau dokumentasi test

## Manfaat

Pendekatan ini membantu:
- mengurangi race condition
- membuat test lebih stabil
- mempercepat debugging test async
