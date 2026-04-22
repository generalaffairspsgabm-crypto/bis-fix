---
name: angular-state-management
description: Gunakan saat menata state management Angular modern dengan Signals, NgRx, Component Store, atau RxJS agar state lokal, global, dan server tetap jelas, efisien, dan mudah dipelihara.
license: Complete terms in LICENSE.txt
metadata:
  category: frontend
  source:
    upstream: .tmp-antigravity-skills/skills/angular-state-management
    type: community
  depends_on:
    - proyek Angular modern
    - pemahaman dasar Signals, RxJS, dan dependency injection Angular
    - keputusan arsitektur tentang local state, global state, dan server state
---

# Angular State Management

Skill ini memandu pemilihan dan penerapan pola state management Angular modern, mulai dari state lokal berbasis Signals sampai store global berbasis NgRx.

## Kapan digunakan

Gunakan skill ini saat perlu:
- memilih solusi state management untuk aplikasi Angular
- membangun state lokal atau shared state berbasis Signals
- menata global state yang kompleks
- mengelola optimistic update
- memisahkan UI state, domain state, dan server state
- memigrasikan pola state lama ke pendekatan yang lebih modern

## Kategori state

### 1. Local state

Dipakai untuk:
- toggle UI
- tab aktif
- modal state
- filter lokal komponen

Solusi yang cocok:
- `signal()`
- `computed()`
- state privat di komponen atau service kecil

### 2. Shared state

Dipakai saat beberapa komponen terkait perlu berbagi state.

Solusi yang cocok:
- signal service
- feature store ringan
- Component Store bila logika mulai kompleks

### 3. Global state

Dipakai untuk state lintas aplikasi yang kompleks, misalnya:
- auth session
- permission
- cart besar
- entity cache lintas halaman

Solusi yang cocok:
- NgRx Store
- SignalStore / NgRx Signals
- arsitektur store terpusat lain bila memang dibutuhkan

### 4. Server state

Dipakai untuk data remote, cache, loading, invalidation, dan sinkronisasi backend.

Catatan penting:
- jangan campur semua data API ke global state tanpa alasan
- bedakan server state dari UI state
- pikirkan cache, refresh, retry, dan invalidation sejak awal

## Panduan memilih solusi

Gunakan aturan praktis berikut:
- aplikasi kecil, state sederhana → signal service
- fitur menengah dengan logika terstruktur → feature store atau Component Store
- aplikasi besar dengan banyak domain dan efek lintas fitur → NgRx Store
- kebutuhan reaktif modern dengan ergonomi Angular baru → Signals atau SignalStore

## Prinsip desain

- simpan state sedekat mungkin dengan tempat ia dipakai
- naikkan ke shared/global hanya bila benar-benar perlu
- pisahkan state turunan dengan `computed`, jangan disimpan ganda
- pisahkan command/action dari selector/read model
- jangan jadikan store sebagai tempat semua hal

## Pola inti

### 1. Signal service sederhana

Cocok untuk state kecil dan jelas.

Karakteristik:
- writable signal privat
- readonly signal publik
- computed selector untuk derived state
- method eksplisit untuk mutasi

Gunakan pola ini untuk:
- counter
- preference UI
- filter panel
- state wizard sederhana

### 2. Feature store berbasis Signals

Cocok saat satu domain fitur punya:
- entity utama
- loading
- error
- selector turunan
- beberapa action async

Praktik baik:
- simpan `loading`, `error`, dan data utama terpisah
- reset error sebelum request baru
- gunakan `computed` untuk selector seperti `isAuthenticated`, `displayName`, atau `filteredItems`

### 3. SignalStore / NgRx Signals

Cocok saat ingin struktur store yang lebih formal namun tetap modern.

Gunakan saat perlu:
- state awal yang eksplisit
- computed selector terstruktur
- method store yang konsisten
- patch state yang aman dan mudah dibaca

### 4. NgRx Store klasik

Pilih bila aplikasi membutuhkan:
- event sourcing gaya action/reducer/effect
- tooling devtools yang kuat
- domain besar dengan banyak tim
- auditability dan pola enterprise yang konsisten

Namun hindari bila:
- masalahnya kecil dan bisa selesai dengan signal service
- tim belum siap dengan kompleksitas tambahan

## Optimistic update

Gunakan optimistic update bila:
- aksi user harus terasa instan
- kegagalan dapat di-rollback dengan jelas
- konflik data relatif rendah

Checklist optimistic update:
1. update UI lebih dulu
2. kirim request ke server
3. rollback bila gagal
4. tampilkan error ke user
5. sinkronkan ulang bila perlu

## Anti-pattern penting

- menyimpan derived state sebagai state terpisah
- mencampur UI state dan server state tanpa batas jelas
- memakai global store untuk semua hal kecil
- mutasi state dari banyak tempat tanpa API store yang jelas
- tidak menyimpan loading dan error state secara eksplisit
- membuat selector mahal tanpa memoization atau `computed`

## Checklist implementasi

1. Petakan state menjadi local, shared, global, dan server.
2. Pilih solusi paling sederhana yang masih memadai.
3. Definisikan shape state secara eksplisit.
4. Pisahkan writable state, selector, dan action.
5. Tambahkan loading, error, dan empty state.
6. Hindari duplikasi derived state.
7. Uji alur async, rollback, dan reset state.
8. Dokumentasikan alasan pemilihan pola.

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/angular-state-management` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
