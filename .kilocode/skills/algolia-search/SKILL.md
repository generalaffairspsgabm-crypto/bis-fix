---
name: algolia-search
description: Gunakan saat mengimplementasikan pencarian Algolia, strategi indexing, React InstantSearch, SSR Next.js, dan tuning relevansi agar pengalaman search cepat, aman, dan akurat.
license: Complete terms in LICENSE.txt
metadata:
  category: search
  source:
    upstream: .tmp-antigravity-skills/skills/algolia-search
    type: community
  depends_on:
    - akun Algolia dengan index aktif
    - kredensial search-only key untuk frontend
    - admin key hanya untuk proses indexing server-side
---

# Algolia Search

Skill ini merangkum pola implementasi Algolia yang aman dan siap produksi, dengan fokus pada integrasi frontend, SSR, sinkronisasi data, dan tuning relevansi.

## Kapan digunakan

Gunakan skill ini saat perlu:
- menambahkan pencarian Algolia ke aplikasi web
- membangun UI search dengan React InstantSearch
- mengaktifkan SSR search di Next.js
- menyinkronkan data aplikasi ke index Algolia
- menata ranking, typo tolerance, facet, dan relevansi hasil

## Prasyarat

- Pastikan `APP_ID`, `SEARCH_ONLY_KEY`, dan `ADMIN_KEY` dipisahkan dengan benar.
- Jangan pernah mengekspos admin key ke frontend.
- Pastikan setiap record memiliki `objectID` yang stabil.
- Tentukan lebih dulu atribut yang searchable, filterable, sortable, dan facetable.

## Alur kerja inti

### 1. Siapkan client frontend yang aman

Gunakan client ringan untuk browser:

```ts
import algoliasearch from 'algoliasearch/lite'

export const searchClient = algoliasearch(
  process.env.NEXT_PUBLIC_ALGOLIA_APP_ID!,
  process.env.NEXT_PUBLIC_ALGOLIA_SEARCH_KEY!
)
```

Prinsip penting:
- frontend hanya memakai search-only key
- gunakan `algoliasearch/lite` untuk bundle lebih kecil
- simpan nama index sebagai konstanta terpusat

### 2. Bangun UI search dengan React InstantSearch

Komponen dasar yang umum dipakai:
- `InstantSearch`
- `SearchBox`
- `Hits`
- `Configure`
- `RefinementList`
- `Pagination`

Hook yang sering dipakai:
- `useSearchBox`
- `useHits`
- `useRefinementList`
- `usePagination`
- `useInstantSearch`

Pola implementasi:
- set `hitsPerPage` eksplisit
- tampilkan loading state dari status search
- render hit dengan komponen kecil yang fokus pada presentasi
- gunakan facet hanya untuk atribut yang benar-benar membantu keputusan user

### 3. Aktifkan SSR di Next.js bila perlu

Untuk halaman search yang perlu SSR:
- gunakan `InstantSearchNext`, bukan `InstantSearch` biasa
- aktifkan rendering dinamis bila hasil harus selalu segar
- sinkronkan state pencarian dengan URL bila halaman perlu shareable/filterable

Checklist SSR:
1. Gunakan paket `react-instantsearch-nextjs`.
2. Tentukan `indexName` dan `searchClient` yang sama dengan client biasa.
3. Atur routing agar query dan filter tersimpan di URL.
4. Hindari static rendering untuk halaman hasil yang harus real-time.

## Strategi indexing dan sinkronisasi data

### Pendekatan utama

1. **Full reindex**
   - cocok untuk bootstrap awal atau perubahan skema besar
   - mahal untuk dataset besar

2. **Full record update**
   - mengganti satu record penuh
   - cocok saat sumber data authoritative mudah diambil ulang

3. **Partial update**
   - hanya memperbarui atribut tertentu
   - cocok untuk perubahan kecil dan frekuensi tinggi

### Best practice indexing

- lakukan indexing di server, worker, atau pipeline backend
- batch record dalam ukuran wajar
- gunakan incremental update bila memungkinkan
- hindari operasi hapus massal yang mahal tanpa alasan kuat
- pastikan mapping data ke record konsisten antar deploy

Contoh atribut record yang umum:
- `objectID`
- `name`
- `description`
- `category`
- `brand`
- `price`
- `updatedAt`

## Tuning relevansi

Saat hasil search terasa buruk, evaluasi area berikut:

### Ranking dan searchable attributes

- urutkan atribut searchable dari paling penting ke paling lemah
- pisahkan atribut untuk exact match dan atribut untuk recall luas
- jangan masukkan field bising atau terlalu panjang tanpa alasan

### Facet dan filter

- gunakan facet untuk kategori, brand, status, atau rentang harga
- jangan jadikan terlalu banyak facet karena membebani UX
- pastikan atribut facet memang sering dipakai user untuk mempersempit hasil

### Typo tolerance dan synonyms

- aktifkan typo tolerance untuk query umum
- tambahkan synonym untuk istilah bisnis, singkatan, atau ejaan lokal
- evaluasi stop words dan pluralization sesuai bahasa target

### Analytics pencarian

Pantau:
- query tanpa hasil
- query populer
- CTR hasil pencarian
- refinement yang paling sering dipakai
- drop-off setelah search

## Anti-pattern penting

- memakai admin key di frontend
- memakai client penuh di browser padahal cukup `lite`
- tidak menetapkan `objectID`
- mengindeks field mentah tanpa kurasi
- melakukan full reindex untuk setiap perubahan kecil
- membangun halaman SSR dengan komponen yang tidak mendukung SSR Algolia

## Checklist implementasi

1. Pisahkan search-only key dan admin key.
2. Definisikan struktur record dan `objectID`.
3. Tentukan searchable, filterable, dan sortable attributes.
4. Implementasikan UI search dasar.
5. Tambahkan facet dan pagination seperlunya.
6. Siapkan pipeline indexing server-side.
7. Uji query populer, typo, no-result, dan filter kombinasi.
8. Pantau analytics pencarian lalu iterasi relevansi.

## Referensi internal cepat

- Frontend browser: `algoliasearch/lite`
- SSR Next.js: `react-instantsearch-nextjs`
- Widget utama: `InstantSearch`, `SearchBox`, `Hits`, `RefinementList`
- Hook utama: `useSearchBox`, `useHits`, `useInstantSearch`

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/algolia-search` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
