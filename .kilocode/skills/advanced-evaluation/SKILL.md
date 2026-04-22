---
name: advanced-evaluation
description: >-
  Gunakan saat merancang evaluasi LLM-as-judge, membandingkan output model,
  menyusun rubric, memitigasi bias penilaian, atau membangun pipeline evaluasi
  kualitas otomatis yang lebih andal daripada scoring ad hoc.
license: CC-BY-4.0
metadata:
  category: ai-quality
  source:
    repository: 'https://github.com/sickn33/antigravity-awesome-skills'
    path: skills/advanced-evaluation
    license_path: LICENSE-CONTENT
  original_metadata:
    risk: safe
    source: community
    date_added: '2026-03-18'
---

# Advanced Evaluation

Skill ini membahas teknik evaluasi tingkat produksi untuk keluaran LLM dengan pendekatan LLM-as-judge. Fokusnya bukan hanya memberi skor, tetapi memilih metode evaluasi yang tepat, memahami bias hakim LLM, dan membangun pipeline evaluasi yang bisa dipercaya.

Inti pemahamannya: LLM-as-judge bukan satu teknik tunggal. Metode yang tepat bergantung pada jenis tugas, definisi kualitas, dan risiko bias yang muncul.

## Kapan digunakan

Gunakan saat:
- membangun pipeline evaluasi otomatis untuk output LLM
- membandingkan dua atau lebih respons model
- membuat rubric evaluasi untuk tim manusia atau evaluator otomatis
- memeriksa konsistensi sistem evaluasi yang terasa tidak stabil
- menghubungkan penilaian otomatis dengan judgment manusia
- merancang evaluasi untuk perubahan prompt, model, atau agent behavior

## Kerangka keputusan utama

Pilih pendekatan berdasarkan struktur tugas:
- **Direct scoring** untuk kriteria objektif seperti factuality, instruction following, format compliance, toxicity
- **Pairwise comparison** untuk preferensi subjektif seperti tone, style, clarity, persuasiveness, creativity
- **Reference-based evaluation** bila kualitas harus dibandingkan dengan sumber atau jawaban acuan

Jangan memaksa satu pendekatan untuk semua kasus.

## 1. Pahami dua keluarga evaluasi utama

### Direct scoring

Gunakan saat evaluator perlu memberi skor pada satu respons terhadap kriteria yang jelas.

Cocok untuk:
- akurasi faktual
- kepatuhan format
- kelengkapan instruksi
- klasifikasi pass/fail

Risiko utamanya:
- drift interpretasi skala
- rubrik yang terlalu kabur
- skor tidak konsisten antar run

### Pairwise comparison

Gunakan saat evaluator harus memilih mana respons yang lebih baik di antara dua kandidat.

Cocok untuk:
- kualitas penjelasan
- preferensi gaya
- kenyamanan dibaca
- daya persuasi

Keunggulan umumnya lebih baik pada tugas preferensi, tetapi rawan bias posisi dan bias panjang.

## 2. Mitigasi bias evaluator

LLM judge punya bias sistematis. Perlakukan ini sebagai desain problem, bukan detail kecil.

Bias yang perlu diantisipasi:
- **Position bias**: respons yang tampil lebih dulu cenderung lebih disukai
- **Length bias**: jawaban panjang terlihat lebih baik walau tidak lebih bernilai
- **Verbosity bias**: detail berlebih dihargai walau tidak relevan
- **Authority bias**: nada percaya diri dianggap lebih benar
- **Self-enhancement bias**: model menilai output model sejenis secara lebih menguntungkan

Mitigasi minimum:
- tukar posisi A/B pada pairwise comparison
- izinkan hasil tie bila kualitas memang setara
- instruksikan evaluator agar mengabaikan panjang yang tidak relevan
- minta evidence atau justifikasi sebelum skor akhir
- jika mungkin, gunakan model evaluator berbeda dari model generator

## 3. Wajibkan justifikasi sebelum skor

Untuk direct scoring maupun pairwise comparison:
- minta evaluator mengidentifikasi evidence dulu
- baru setelah itu simpulkan skor atau pemenang

Aturan praktis:
- jangan minta “beri skor 1–5” tanpa alasan
- jangan terima evaluasi tanpa jejak reasoning yang bisa diaudit
- bila justifikasi lemah, anggap skor kurang dapat dipercaya

## 4. Rancang rubric yang bisa dipakai konsisten

Rubrik yang baik harus memuat:
- nama kriteria
- definisi apa yang diukur
- level skor yang jelas
- ciri observabel di tiap level
- edge case atau kondisi ambigu
- guidance umum agar evaluasi konsisten

Prinsipnya:
- satu kriteria hanya mengukur satu hal
- skala harus sesuai detail rubrik
- domain penting: rubric code readability harus berbicara tentang variabel, fungsi, struktur; rubric medical accuracy harus berbicara tentang terminologi dan evidence klinis

Gunakan tingkat ketegasan yang sesuai:
- **lenient** untuk eksplorasi atau iterasi awal
- **balanced** untuk evaluasi produk umum
- **strict** untuk domain berisiko tinggi atau berkebutuhan kualitas tinggi

## 5. Pilih metrik yang cocok

Gunakan metrik sesuai jenis output:
- pass/fail → precision, recall, F1, agreement
- rating ordinal → Spearman, Kendall, weighted agreement
- pairwise preference → agreement rate, position consistency, confidence calibration
- multi-label → macro/micro F1, per-label precision/recall

Hal yang lebih penting dari sekadar agreement tinggi adalah pola disagreement. Jika evaluator konsisten salah di satu jenis kriteria, itu lebih berbahaya daripada noise acak.

## 6. Pola implementasi direct scoring

Paket minimum direct scoring:
- prompt asli
- respons yang dinilai
- daftar kriteria
- definisi skala
- instruksi untuk mengumpulkan evidence
- output terstruktur

Struktur prompt yang sehat biasanya berisi:
- konteks tugas
- respons yang dinilai
- kriteria dan bobot
- instruksi mencari bukti
- permintaan skor beserta justifikasi
- format JSON atau struktur hasil lain yang konsisten

Gunakan skala sederhana bila rubric belum matang:
- 1–3 untuk keputusan ringan
- 1–5 untuk kebanyakan kebutuhan produksi
- 1–10 hanya bila deskripsi level sangat rinci

## 7. Pola implementasi pairwise comparison

Untuk pairwise comparison, workflow minimumnya:
1. bandingkan A vs B
2. bandingkan lagi setelah posisi ditukar
3. cek konsistensi hasil
4. jika bertentangan, turunkan confidence atau putuskan tie

Confidence yang sehat:
- bila dua pass setuju → rata-rata confidence bisa dipakai
- bila dua pass bertentangan → turunkan confidence secara keras

Jangan pernah mengandalkan single-pass pairwise pada evaluasi penting.

## 8. Bangun pipeline evaluasi, bukan prompt tunggal

Pipeline evaluasi produksi biasanya terdiri dari:
- loader rubric dan criteria
- evaluator utama
- lapisan mitigasi bias
- confidence calibration
- penyimpanan hasil terstruktur
- analisis disagreement terhadap human judgment bila tersedia

Untuk skala besar, pertimbangkan:
- **panel of LLMs** untuk mengurangi bias model tunggal
- **hierarchical evaluation**: model murah untuk screening, model mahal untuk edge case
- **human-in-the-loop** untuk kasus confidence rendah atau high-stakes

## 9. Validasi evaluator terhadap manusia

Evaluasi otomatis hanya berguna jika hasilnya cukup berkorelasi dengan penilaian manusia pada domain yang sama.

Lakukan:
- ambil sampel data dan nilai oleh manusia
- bandingkan hasil evaluator otomatis
- cari pola mismatch per kriteria, domain, atau tipe respons
- sesuaikan rubric dan prompt evaluasi bila mismatch sistematis

Jangan menyimpulkan evaluator “bagus” hanya karena terlihat meyakinkan.

## Checklist desain evaluasi

Sebelum pipeline dianggap siap, periksa:
- apakah direct vs pairwise dipilih dengan alasan jelas?
- apakah setiap kriteria hanya mengukur satu aspek?
- apakah evaluator wajib memberi justifikasi sebelum skor?
- apakah pairwise memakai swap posisi?
- apakah confidence punya arti operasional?
- apakah edge case sudah ditulis di rubric?
- apakah ada pembandingan dengan human judgment?

## Anti-pattern

Hindari:
- scoring tanpa justifikasi
- pairwise comparison sekali jalan tanpa position swap
- rubric generik untuk domain spesifik
- terlalu banyak kriteria campuran dalam satu label
- skala 1–10 tanpa deskripsi level yang tegas
- mengabaikan bias panjang dan bias posisi
- percaya penuh pada automated evaluator tanpa kalibrasi terhadap manusia

## Catatan Kompatibilitas KiloCode

Skill sumber memuat referensi riset dan contoh panjang. Versi KiloCode ini dinormalisasi menjadi panduan evaluasi praktis yang mandiri, dengan fokus pada pemilihan metode, mitigasi bias, desain rubric, dan arsitektur pipeline evaluasi.
