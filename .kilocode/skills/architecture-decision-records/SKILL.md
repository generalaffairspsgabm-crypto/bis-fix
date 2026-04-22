---
name: architecture-decision-records
description: >-
  Gunakan saat mengambil keputusan arsitektural penting agar konteks, opsi,
  alasan, konsekuensi, dan status keputusan terdokumentasi jelas serta dapat
  ditelusuri tim di masa depan.
license: CC-BY-4.0
metadata:
  category: planning
  source:
    repository: 'https://github.com/sickn33/antigravity-awesome-skills'
    path: skills/architecture-decision-records
    license_path: LICENSE-CONTENT
  original_metadata:
    risk: unknown
    source: community
    date_added: '2026-02-27'
---

# Architecture Decision Records

Skill ini membantu tim menulis dan merawat **Architecture Decision Records (ADR)** agar keputusan teknis besar tidak hilang dalam chat, issue, atau ingatan individu.

Gunakan saat:
- memilih teknologi atau pola arsitektur utama
- merekam trade-off desain signifikan
- mendokumentasikan keputusan lintas tim
- meninjau keputusan lama atau keputusan yang akan diganti
- membangun jejak keputusan yang bisa dipakai onboarding

## Kapan ADR diperlukan

Tulis ADR bila keputusan menyentuh hal seperti:
- pemilihan framework, database, atau platform inti
- pola integrasi, keamanan, atau deployment
- strategi API, eventing, caching, atau observability
- keputusan yang mahal untuk dibalik
- perubahan yang memengaruhi banyak modul atau tim

ADR biasanya **tidak perlu** untuk:
- bug fix kecil
- patch rutin
- detail implementasi lokal
- perubahan yang sepenuhnya reversibel dan tidak strategis

## Struktur minimum ADR

Setiap ADR sebaiknya memuat:
- **Konteks**: masalah, constraint, dan pendorong keputusan
- **Opsi yang dipertimbangkan**: alternatif yang realistis beserta trade-off
- **Keputusan**: opsi yang dipilih
- **Alasan**: mengapa opsi itu dipilih
- **Konsekuensi**: dampak positif, negatif, risiko, dan tindak lanjut
- **Status**: misalnya Proposed, Accepted, Rejected, Deprecated, atau Superseded

## Proses penulisan ADR

### 1. Tangkap konteks dengan jujur

Dokumentasikan:
- masalah yang memaksa keputusan diambil
- constraint bisnis, teknis, regulasi, atau operasional
- driver utama seperti performa, biaya, keamanan, reliability, atau skill tim

Konteks yang lemah membuat ADR tidak berguna bagi pembaca masa depan.

### 2. Cantumkan opsi yang benar-benar dipertimbangkan

Untuk tiap opsi, jelaskan:
- kelebihan utama
- kekurangan utama
- risiko implementasi
- dampak ke operasi, maintenance, dan onboarding

Jangan menyusun opsi palsu hanya untuk membenarkan pilihan final.

### 3. Nyatakan keputusan dan alasannya

Bagian keputusan harus tegas, singkat, dan dapat dikutip ulang. Setelah itu, jelaskan rasionalnya secara eksplisit:
- kebutuhan mana yang paling berat bobotnya
- trade-off apa yang sengaja diterima
- mengapa opsi lain tidak dipilih

### 4. Rekam konsekuensi

Tuliskan:
- konsekuensi positif
- konsekuensi negatif
- risiko yang perlu dimitigasi
- pekerjaan lanjutan yang harus dibuat setelah ADR diterima

ADR yang baik bukan hanya mengatakan “pilih X”, tetapi juga “apa artinya setelah X dipilih”.

### 5. Kelola lifecycle

Status yang umum dipakai:
- **Proposed**: masih dibahas
- **Accepted**: disetujui dan menjadi acuan implementasi
- **Rejected**: dipertimbangkan tetapi tidak diambil
- **Deprecated**: tidak lagi relevan
- **Superseded**: digantikan ADR lain

Jangan mengubah sejarah keputusan secara diam-diam. Jika keputusan berubah, buat ADR baru yang mereferensikan ADR lama.

## Template ringkas yang direkomendasikan

Gunakan bentuk ini bila tidak ada template proyek khusus:

```markdown
# ADR-XXXX: Judul Keputusan

## Status
Accepted

## Context
Masalah, constraint, dan driver keputusan.

## Considered Options
- Opsi A: pro, kontra, risiko
- Opsi B: pro, kontra, risiko
- Opsi C: pro, kontra, risiko

## Decision
Keputusan final yang dipilih.

## Rationale
Alasan mengapa opsi ini dipilih.

## Consequences
### Positive
- ...

### Negative
- ...

### Risks / Follow-up
- ...
```

## Checklist review ADR

Sebelum ADR dianggap siap:
- apakah konteks menjelaskan kenapa keputusan perlu diambil?
- apakah opsi yang dipertimbangkan cukup realistis?
- apakah trade-off dijelaskan secara jujur?
- apakah keputusan dan rasionalnya eksplisit?
- apakah konsekuensi negatif dan risiko juga ditulis?
- apakah ada hubungan ke ADR lain, dokumen lain, atau pekerjaan tindak lanjut?

## Praktik terbaik

- tulis ADR sebelum implementasi besar dimulai
- jaga tetap ringkas tetapi substansial
- gunakan judul yang spesifik
- hubungkan ADR terkait agar terbentuk decision graph
- perbarui status saat keputusan berubah
- simpan di lokasi yang mudah ditemukan, misalnya `docs/adr/`

## Anti-pattern

Hindari:
- ADR terlalu samar sehingga tidak menjawab apa pun
- ADR hanya berisi keputusan tanpa konteks
- ADR yang menghapus opsi lain seolah tidak pernah dipertimbangkan
- ADR yang diam-diam diubah setelah accepted tanpa supersession
- ADR tanpa implikasi operasional atau tindak lanjut

## Output yang diharapkan saat skill ini dipakai

- draft atau final ADR yang siap ditinjau
- daftar opsi dan trade-off utama
- status keputusan yang jelas
- tautan ke dokumen terkait, tiket implementasi, atau ADR pendukung

## Catatan Kompatibilitas KiloCode

Skill sumber berisi banyak template dan contoh panjang. Pada versi KiloCode ini, materi dinormalisasi menjadi panduan praktis yang tetap mencakup lifecycle, template inti, checklist review, dan prinsip pengelolaan ADR tanpa bergantung pada tool eksternal.