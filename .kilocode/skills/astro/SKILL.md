---
name: astro
description: Gunakan saat membangun situs berbasis konten dengan Astro menggunakan pendekatan zero-JS by default, islands architecture, content collections, dan dukungan Markdown atau MDX.
license: Complete terms in LICENSE.txt
metadata:
  category: frontend
  source:
    upstream: .tmp-antigravity-skills/skills/astro
    type: community
  depends_on:
    - proyek web berbasis Astro atau kebutuhan situs konten berperforma tinggi
---

# Astro

Skill ini memandu penggunaan Astro untuk situs yang berfokus pada konten seperti blog, dokumentasi, landing page, portfolio, dan situs marketing. Fokus utamanya adalah performa, struktur konten yang rapi, dan interaktivitas selektif melalui islands architecture.

## Kapan digunakan

Gunakan skill ini saat:
- membangun blog, dokumentasi, portfolio, atau situs marketing
- performa dan Core Web Vitals menjadi prioritas utama
- proyek didominasi konten Markdown atau MDX
- membutuhkan output statis dengan opsi SSR pada route tertentu
- bekerja dengan file `.astro`, `Astro.props`, content collections, atau directive `client:`

## Tujuan utama

- menjaga JavaScript browser seminimal mungkin
- memisahkan konten statis dari komponen interaktif secara jelas
- membangun struktur konten yang type-safe dan mudah dipelihara
- memilih hydration hanya pada komponen yang benar-benar perlu interaksi

## Prinsip inti

- default Astro adalah HTML statis; jangan kirim JavaScript tanpa alasan
- gunakan islands architecture untuk interaktivitas selektif
- pilih framework UI tambahan hanya bila benar-benar dibutuhkan
- utamakan content collections untuk konten terstruktur
- bedakan kebutuhan SSG, prerender, dan SSR sejak awal

## Alur kerja inti

### 1. Tentukan mode rendering yang tepat

Pilih pendekatan berdasarkan kebutuhan:
- SSG untuk halaman statis dan konten yang jarang berubah
- prerender untuk halaman yang bisa dibangun di awal deployment
- SSR untuk route yang butuh data dinamis saat request

Jangan aktifkan SSR untuk seluruh situs bila sebagian besar halaman sebenarnya statis.

### 2. Susun struktur proyek berbasis konten

Area penting yang biasanya perlu dijaga:
- `src/pages/` untuk routing berbasis file
- `src/layouts/` untuk shell halaman
- `src/components/` untuk komponen UI
- `src/content/` untuk koleksi konten type-safe
- `public/` untuk aset statis

Pisahkan konten, layout, dan komponen agar perubahan editorial tidak bercampur dengan logika UI.

### 3. Gunakan komponen `.astro` untuk markup server-first

Dalam file `.astro`:
- bagian frontmatter berjalan di server
- template menghasilkan HTML
- style lokal dapat di-scope otomatis

Gunakan `.astro` sebagai default untuk komponen presentasional. Tambahkan React, Vue, Svelte, atau framework lain hanya untuk area yang memang interaktif.

### 4. Kelola konten dengan content collections

Gunakan content collections saat:
- ada banyak artikel, dokumentasi, atau entri konten
- metadata perlu tervalidasi
- sorting, filtering, dan draft state perlu konsisten

Pastikan schema konten eksplisit, misalnya untuk:
- judul
- tanggal
- tag
- status draft
- slug atau metadata SEO tambahan

### 5. Terapkan islands architecture secara disiplin

Secara default, komponen framework UI sebaiknya tetap statis. Tambahkan hydration hanya bila perlu, misalnya:
- `client:load` untuk interaksi yang harus aktif segera
- `client:visible` untuk komponen yang cukup aktif saat terlihat
- `client:idle` untuk interaksi non-kritis
- `client:media` untuk perilaku khusus breakpoint tertentu

Prinsipnya: jangan menghidrasi seluruh halaman hanya karena satu widget interaktif.

### 6. Gunakan layout untuk konsistensi halaman

Layout sebaiknya menangani:
- metadata dasar seperti title dan description
- struktur HTML utama
- navigasi dan footer bersama
- slot konten halaman

Jaga layout tetap ringan dan reusable.

## Checklist implementasi

1. Tentukan apakah halaman perlu SSG, prerender, atau SSR.
2. Gunakan `.astro` sebagai default untuk komponen non-interaktif.
3. Simpan konten terstruktur di content collections bila jumlah konten signifikan.
4. Tambahkan hydration hanya pada komponen yang benar-benar interaktif.
5. Audit ukuran JavaScript yang dikirim ke browser.
6. Verifikasi route dinamis, slug, dan metadata halaman bekerja benar.

## Anti-pattern penting

- memakai framework client-side penuh untuk seluruh situs tanpa kebutuhan nyata
- menghidrasi terlalu banyak komponen sekaligus
- mencampur konten editorial dengan logika UI kompleks dalam satu file
- memakai SSR global padahal mayoritas halaman statis
- mengabaikan schema konten sehingga metadata mudah rusak atau tidak konsisten

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/astro` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
