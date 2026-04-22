---
name: agent-evaluation
description: >-
  Gunakan saat menguji, membenchmark, atau memonitor agen LLM dari sisi
  perilaku, reliabilitas, capability coverage, regresi, dan robustness agar
  performa agent tidak dinilai hanya dari demo tunggal.
license: CC-BY-4.0
metadata:
  category: ai-quality
  source:
    repository: 'https://github.com/sickn33/antigravity-awesome-skills'
    path: skills/agent-evaluation
    license_path: LICENSE-CONTENT
  original_metadata:
    risk: safe
    source: vibeship-spawner-skills (Apache 2.0)
    date_added: '2026-02-27'
---

# Agent Evaluation

Skill ini membahas pengujian dan benchmarking agent LLM secara realistis. Fokusnya adalah memastikan agent dinilai dari perilaku berulang, reliabilitas, dan batas kemampuannya, bukan dari satu demo yang kebetulan berhasil.

Prinsip dasarnya: agent bersifat stokastik. Karena itu, evaluasi harus melihat distribusi hasil, konsistensi perilaku, kegagalan batas, dan regresi dari waktu ke waktu.

## Kapan digunakan

Gunakan saat:
- membangun test suite untuk agent LLM
- menilai apakah agent cukup andal untuk dipakai di produksi
- memonitor regresi setelah perubahan prompt, tool, memory, atau orchestration
- merancang benchmark kemampuan agent terhadap tugas dunia nyata
- menguji apakah agent tetap berada dalam behavioral boundary yang aman
- mencari edge case dan failure mode melalui adversarial testing

## Pilar evaluasi agent

Evaluasi agent sebaiknya mencakup lima lapisan:
- **functional correctness**: apakah tugas selesai dengan benar
- **behavioral consistency**: apakah perilaku relatif stabil antar run
- **safety and boundary compliance**: apakah agent menghindari perilaku yang dilarang
- **latency and cost profile**: apakah performanya realistis untuk operasi nyata
- **regression resistance**: apakah perubahan baru merusak capability lama

Jangan puas dengan satu angka agregat bila tidak tahu lapisan mana yang sebenarnya bermasalah.

## 1. Uji berulang, bukan sekali jalan

Karena output agent tidak deterministik:
- jalankan test penting berkali-kali
- ukur pass rate, bukan hanya pass/fail tunggal
- simpan distribusi skor, latency, dan pola perilaku
- gunakan confidence interval bila memungkinkan

Metrik minimum yang berguna:
- pass rate
- mean score atau partial credit
- variance atau standard deviation
- mean latency dan p95 latency
- konsistensi perilaku antar run

Hasil satu kali yang bagus bukan bukti reliabilitas.

## 2. Definisikan behavioral contract

Selain correctness, definisikan perilaku yang:
- **harus dilakukan** agent
- **tidak boleh dilakukan** agent
- **harus dilakukan pada konteks tertentu**

Contoh behavioral contract:
- agent support harus tetap sopan
- agent tidak boleh membocorkan data internal
- agent refund harus merujuk kebijakan saat diminta refund
- agent coding tidak boleh mengklaim verifikasi tanpa bukti

Gunakan contract untuk memeriksa bukan hanya “jawaban benar”, tetapi “cara agent bertindak”.

## 3. Lakukan adversarial testing

Uji agent dengan tujuan aktif untuk memecah perilakunya.

Kategori yang umum:
- prompt injection
- role confusion
- boundary testing
- resource exhaustion
- output manipulation
- tool abuse bila agent memiliki tool

Contoh sasaran uji:
- apakah agent mengikuti instruksi berbahaya yang menimpa aturan sistem
- apakah agent mengungkap system prompt atau rahasia
- apakah agent loop tak terkendali pada input rekursif
- apakah agent gagal secara anggun pada input ekstrem

Anggap adversarial suite sebagai sumber belajar failure mode, bukan sekadar checklist keamanan.

## 4. Desain benchmark dari tugas nyata

Benchmark agent yang baik:
- memakai tugas yang mirip penggunaan produksi
- punya definisi keberhasilan yang dapat diperiksa
- mencakup level kesulitan berbeda
- memisahkan capability utama per domain
- cukup kecil untuk dijalankan ulang, tetapi cukup kaya untuk menangkap regresi

Pisahkan benchmark menjadi beberapa kelompok, misalnya:
- tool use
- planning
- retrieval + synthesis
- multi-step execution
- refusal and safety
- recovery from bad intermediate state

Jangan mencampur semua hal ke satu skor tanpa breakdown.

## 5. Ukur regression, bukan hanya snapshot performa

Setiap perubahan pada prompt, tool schema, memory, atau orchestration dapat memindahkan failure mode.

Karena itu:
- simpan baseline benchmark
- bandingkan hasil sebelum dan sesudah perubahan
- tandai capability yang turun walau skor keseluruhan naik
- prioritaskan regresi di area kritis produksi

Perubahan yang memberi “average improvement” tetapi menghancurkan satu use case penting tetap harus dianggap masalah.

## 6. Nilai agent sebagai sistem, bukan hanya model

Kinerja agent berasal dari kombinasi:
- model dasar
- system prompt
- toolset
- memory
- context assembly
- guardrails
- retry dan recovery logic

Saat menemukan bug evaluasi, identifikasi lapisan sumber masalah:
- model kurang mampu
- prompt salah framing
- tool interface buruk
- context kurang lengkap
- recovery logic lemah
- environment atau repo menyebabkan flakiness

Tanpa pemisahan ini, rekomendasi perbaikan akan salah sasaran.

## 7. Gunakan scoring yang sesuai risiko

Untuk tugas penting, gunakan evaluasi berlapis:
- pass/fail untuk requirement keras
- partial credit untuk kualitas progresif
- severity rating untuk pelanggaran boundary
- cost dan latency untuk kelayakan operasional

Contoh:
- kegagalan sopan santun mungkin medium
- kebocoran data internal harus critical
- output benar tetapi terlalu lambat mungkin lulus secara fungsi, gagal secara operasional

## 8. Bangun monitoring produksi

Setelah agent lolos benchmark offline, tetap monitor di produksi:
- success rate per workflow
- tool failure rate
- fallback rate
- retry frequency
- latency distribution
- token/cost trend
- human escalation rate
- kategori error yang berulang

Benchmark statis tidak akan menangkap semua drift dunia nyata.

## Workflow evaluasi yang direkomendasikan

Urutan kerja yang sehat:
1. definisikan capability yang ingin dijaga
2. susun test case representatif
3. tandai behavioral must/must-not
4. jalankan test berkali-kali
5. analisis distribusi hasil dan kegagalan dominan
6. tambahkan adversarial suite
7. simpan baseline
8. gunakan suite yang sama untuk regression checking
9. monitor produksi untuk menutup gap offline vs online

## Checklist review cepat

Sebelum menyatakan agent “cukup baik”, periksa:
- apakah test penting dijalankan berulang kali?
- apakah ada pass rate, bukan hanya demo tunggal?
- apakah behavioral contract tertulis?
- apakah ada adversarial test?
- apakah benchmark mewakili tugas nyata?
- apakah hasil dipecah per capability?
- apakah regresi dibanding baseline sebelumnya?
- apakah ada monitoring setelah deployment?

## Anti-pattern

Hindari:
- menyimpulkan kualitas agent dari satu contoh sukses
- hanya mengukur akurasi tanpa konsistensi perilaku
- menguji agent dengan prompt yang terlalu “ramah” dan tidak realistis
- tidak menyimpan baseline sebelum perubahan besar
- menganggap bug agent pasti berasal dari model, padahal bisa dari tools atau context
- mengabaikan cost dan latency pada evaluasi agent produksi

## Catatan Kompatibilitas KiloCode

Skill sumber memuat contoh kode TypeScript dan uraian sangat panjang. Versi KiloCode ini dinormalisasi menjadi panduan evaluasi agent yang mandiri, dengan fokus pada repeated testing, behavioral contracts, adversarial testing, benchmark design, regression analysis, dan monitoring produksi.
