---
name: architect-review
description: >-
  Gunakan saat perlu meninjau desain sistem atau perubahan besar dari sudut
  pandang arsitektur untuk menilai dampak pada skalabilitas, maintainability,
  resilience, security boundary, dan kesesuaian terhadap pattern yang dipilih.
license: CC-BY-4.0
metadata:
  category: architecture
  source:
    repository: 'https://github.com/sickn33/antigravity-awesome-skills'
    path: skills/architect-review
    license_path: LICENSE-CONTENT
  original_metadata:
    risk: unknown
    source: community
    date_added: '2026-02-27'
---

# Architect Review

Skill ini memandu review arsitektur untuk perubahan yang berdampak lintas modul, service, data flow, atau operational concern. Tujuannya bukan sekadar memberi opini “bagus” atau “buruk”, melainkan menilai apakah desain yang diusulkan benar-benar cocok dengan kebutuhan, constraint, dan risiko sistem.

## Kapan digunakan

Gunakan saat:
- mereview perubahan desain besar atau proposal arsitektur baru
- menilai dampak skalabilitas, reliability, atau maintainability
- memeriksa kepatuhan terhadap prinsip clean architecture, modularity, atau boundary domain
- menilai desain distributed system, event-driven flow, atau service decomposition
- memberi arahan arsitektural untuk sistem yang kompleks atau bertumbuh

## Jangan gunakan saat

Jangan gunakan saat:
- perubahan hanya kecil dan lokal di satu modul
- kebutuhan utama hanyalah code review implementasi kecil
- konteks sistem, tujuan bisnis, atau constraint terlalu minim untuk membuat penilaian arsitektur yang valid

## Sasaran review

Hasil review harus menjawab:
- apa masalah arsitektural yang sedang diselesaikan
- apa dampak perubahan terhadap kualitas sistem utama
- risiko dan trade-off apa yang diterima
- alternatif apa yang lebih sederhana atau lebih aman
- langkah validasi apa yang dibutuhkan sebelum perubahan dianggap layak

## Alur review

### 1. Kumpulkan konteks sistem

Tentukan terlebih dahulu:
- objective bisnis dan teknis
- area sistem yang berubah
- scale, throughput, dan growth expectation
- kebutuhan availability, security, compliance, dan observability
- constraint tim, deadline, tooling, atau platform

Jika konteks belum cukup, mintalah klarifikasi minimum atau lakukan discovery ringan pada artefak desain, diagram, ADR, dan struktur repo.

### 2. Nilai dampak arsitektural

Evaluasi perubahan terhadap beberapa dimensi:
- **modularity**: apakah boundary modul tetap jelas
- **scalability**: apakah desain dapat tumbuh sesuai pola beban
- **reliability**: bagaimana failure ditahan, diisolasi, dan dipulihkan
- **security**: apakah trust boundary, secret flow, dan permission model aman
- **maintainability**: apakah kompleksitas baru masih bisa dipelihara tim
- **operability**: apakah monitoring, logging, tracing, rollout, dan rollback realistis
- **cost**: apakah biaya kompleksitas dan infrastruktur sepadan dengan manfaat

### 3. Identifikasi pelanggaran atau anti-pattern

Cari sinyal seperti:
- boundary domain kabur
- coupling antarmodul terlalu tinggi
- data ownership tidak jelas
- distributed complexity diperkenalkan terlalu dini
- pattern dipakai demi tren, bukan karena requirement
- kebutuhan observability, retry, idempotency, atau backpressure diabaikan
- migration path tidak realistis

### 4. Bandingkan dengan alternatif

Untuk setiap rekomendasi utama:
- sebutkan alternatif lebih sederhana
- jelaskan kapan alternatif itu cukup
- jelaskan mengapa opsi yang dipilih lebih tepat atau justru terlalu berat
- dokumentasikan trade-off secara eksplisit

### 5. Susun keputusan dan langkah validasi

Tutup review dengan:
- status rekomendasi: layak, layak dengan syarat, atau belum layak
- daftar risiko utama
- validasi yang masih perlu dilakukan
- urutan next step yang dapat ditindaklanjuti
- saran dokumentasi keputusan bila perubahan material

## Checklist review cepat

Sebelum review dianggap selesai, pastikan sudah menjawab:
- apakah kebutuhan dan constraint benar-benar dipahami
- apakah arsitektur yang diusulkan memecahkan masalah yang tepat
- apakah alternatif lebih sederhana sudah dipertimbangkan
- apakah boundary data, service, dan tanggung jawab jelas
- apakah aspek resilience, observability, dan security ikut ditinjau
- apakah ada rencana validasi dan mitigasi risiko

## Format keluaran yang disarankan

Gunakan struktur seperti ini:
- ringkasan konteks
- area perubahan dan dampak
- temuan utama
- risiko dan trade-off
- alternatif yang dipertimbangkan
- rekomendasi akhir
- validasi lanjutan atau ADR yang perlu dibuat

## Anti-pattern

Hindari:
- menyetujui desain berisiko tinggi tanpa rencana validasi
- memaksakan pattern besar untuk masalah yang masih sederhana
- menilai arsitektur hanya dari preferensi pribadi
- mengabaikan kemampuan tim untuk mengoperasikan desain tersebut
- fokus ke diagram tanpa menilai migration path dan operability

## Catatan kompatibilitas KiloCode

Skill sumber sangat luas dan bernuansa persona “master architect”. Pada adaptasi KiloCode ini, fokus dipersempit menjadi workflow review arsitektur yang terstruktur, evidence-based, dan dapat dipakai lintas stack tanpa bergantung pada tool atau framework tertentu.