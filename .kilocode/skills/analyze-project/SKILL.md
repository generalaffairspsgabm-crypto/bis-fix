---
name: analyze-project
description: >-
  Gunakan saat perlu melakukan postmortem berbasis bukti terhadap sesi coding
  berbantuan AI untuk mengklasifikasikan scope drift, pola rework, akar masalah,
  hotspot repo, dan rekomendasi perbaikan workflow berikutnya.
license: CC-BY-4.0
metadata:
  category: analysis
  source:
    repository: 'https://github.com/sickn33/antigravity-awesome-skills'
    path: skills/analyze-project
    license_path: LICENSE-CONTENT
  original_metadata:
    risk: unknown
    source: community
    version: '1.0'
---

# Analyze Project

Skill ini memandu analisis postmortem atas sesi coding berbantuan AI. Tujuannya bukan sekadar menceritakan apa yang terjadi, tetapi menjelaskan mengapa terjadi scope drift, rework, churn verifikasi, atau abandonment, lalu menghubungkannya dengan prompt, agent, repo, dan workflow.

## Kapan digunakan

Gunakan saat:
- ingin menganalisis sesi delivery AI yang penuh rework atau scope drift
- perlu memisahkan masalah spesifikasi, agent, repo, dan validasi
- ingin menemukan hotspot file atau subsystem yang sering memicu struggle
- ingin menyusun rekomendasi perbaikan prompt, repo health, atau workflow delivery

## Prinsip analisis

Pegang aturan ini selama analisis:
- perlakukan jumlah revisi sebagai sinyal iterasi, bukan bukti kegagalan otomatis
- bedakan scope tambahan dari user, scope tambahan yang memang perlu ditemukan, dan scope tambahan akibat agent
- bedakan kesalahan agent dari friksi repo
- setiap diagnosis harus punya evidence dan confidence
- jika buktinya lemah, katakan lemah

Urutan kepercayaan evidence:
- isi artefak langsung
- timestamp dan urutan perubahan
- metadata atau summary turunan
- inferensi

## 1. Klasifikasikan intent sesi

Tentukan intent utama sesi dari objective dan artefak yang ada, misalnya:
- delivery
- debugging
- refactor
- research
- exploration
- audit/analysis

Intent penting untuk mencegah over-judging sesi riset atau eksplorasi dengan standar sesi implementasi sempit.

## 2. Kumpulkan evidence sesi

Baca artefak inti yang tersedia, misalnya:
- task definition
- implementation plan
- walkthrough atau ringkasan eksekusi
- metadata sesi
- versi revisi atau snapshot resolved
- artefak markdown lain yang relevan

Dari sana, catat:
- apakah ada task, plan, walkthrough
- apakah sesi tampak selesai atau abandoned
- jumlah revisi task/plan/walkthrough
- objective awal dan hasil akhir
- file, folder, atau subsystem yang sering disebut
- apakah acceptance criteria, constraints, non-goals, dan file targets ada sejak awal

## 3. Nilai prompt sufficiency

Nilai permintaan awal dari beberapa dimensi:
- clarity
- boundedness
- testability
- architectural specificity
- constraint awareness
- dependency awareness

Hasilkan penilaian tingkat tinggi seperti:
- tinggi
- sedang
- rendah

Lalu catat elemen prompt yang kemungkinan berkontribusi pada friksi berikutnya.

Prompt pendek tidak selalu buruk. Tugas sempit yang jelas tetap bisa memiliki sufficiency tinggi.

## 4. Klasifikasikan perubahan scope

Bedakan perubahan scope menjadi tiga kelas:
- **human-added scope**: user menambah permintaan baru
- **necessary discovered scope**: pekerjaan tambahan memang wajib agar tugas awal benar-benar selesai
- **agent-introduced scope**: kerja tambahan yang tampaknya tidak diminta dan tidak diperlukan

Untuk setiap klasifikasi, sertakan:
- evidence
- confidence
- alasan mengapa klasifikasi lain kurang cocok

## 5. Identifikasi bentuk rework

Cari pola dominan sesi, misalnya:
- clean execution
- early replan lalu stabil
- progressive scope expansion
- reopen/reclose churn
- late-stage verification churn
- abandoned mid-flight
- exploratory session

Pola ini membantu membedakan kegagalan desain awal dari kegagalan validasi akhir.

## 6. Tentukan root cause utama

Untuk sesi yang tidak bersih, pilih akar masalah utama seperti:
- **SPEC_AMBIGUITY**
- **HUMAN_SCOPE_CHANGE**
- **REPO_FRAGILITY**
- **AGENT_ARCHITECTURAL_ERROR**
- **VERIFICATION_CHURN**
- **LEGITIMATE_TASK_COMPLEXITY**

Boleh tambahkan akar masalah sekunder jika material.

Aturan penting:
- selalu sertakan evidence
- jelaskan mengapa alternatif lain tidak dipilih
- berikan confidence

## 7. Skor severity untuk prioritas

Gunakan severity untuk memprioritaskan, bukan menghakimi. Faktor yang bisa dipertimbangkan:
- completion failure
- intensitas replanning
- instability scope
- tingkat keparahan pola rework
- rendahnya prompt sufficiency
- dampak root cause
- frekuensi hotspot pada subsystem tertentu

Kelompokkan ke band seperti:
- low
- moderate
- significant
- high
- critical

Selalu jelaskan driver severity, terutama 2–4 pendorong utama.

## 8. Cluster hotspot repo

Di banyak sesi, cari file, folder, atau subsystem yang berulang kali terkait dengan:
- replanning
- abandonment
- verification churn
- severity tinggi

Untuk tiap cluster, lihat:
- berapa sesi yang menyentuh area itu
- rata-rata revisi
- completion rate
- akar masalah yang paling sering

Tujuannya adalah menemukan apakah masalah dominan ada pada prompt, workflow, agent, atau bagian repo tertentu.

## 9. Lakukan perbandingan kohort

Bandingkan kelompok sesi seperti:
- first-shot success vs re-planned
- completed vs abandoned
- prompt sufficiency tinggi vs rendah
- narrow scope vs high scope growth
- short sessions vs long sessions
- subsystem low-friction vs high-friction

Jangan hanya mengulang rata-rata. Tarik pola yang bermakna dan tetap berhati-hati terhadap inferensi berlebihan.

## 10. Hasilkan temuan non-obvious

Buat 3–7 temuan yang lebih tajam daripada sekadar restatement angka.

Setiap temuan harus berisi:
- observasi
- mengapa penting
- evidence
- confidence

Contoh jenis temuan yang baik:
- replanning lebih sering dipicu file targeting lemah daripada acceptance criteria lemah
- scope growth dimulai setelah early success, menandakan ekspansi dari sisi manusia
- area auth lebih sering gagal karena repo fragility daripada halusinasi agent

## 11. Susun laporan akhir yang bisa ditindaklanjuti

Laporan yang baik setidaknya memuat:
- ringkasan metrik inti
- breakdown root cause
- analisis prompt sufficiency
- analisis perubahan scope
- pola rework dominan
- peta friction hotspot
- daftar sesi paling bersih dan paling bermasalah
- severity triage
- rekomendasi prioritas
- breakdown per conversation atau per session

Untuk setiap rekomendasi, tulis:
- pola yang diamati
- penyebab yang mungkin
- evidence
- perubahan yang disarankan
- manfaat yang diharapkan
- confidence

## Checklist review cepat

Sebelum analisis dianggap final, pastikan:
- diagnosis memisahkan prompt, agent, repo, dan validation issues
- setiap root cause punya evidence
- scope drift diklasifikasikan, bukan hanya disebut “melebar”
- hotspot dihubungkan dengan pola berulang, bukan satu insiden tunggal
- severity dijelaskan driver-nya
- rekomendasi bisa ditindaklanjuti, bukan generik

## Anti-pattern

Hindari:
- menyalahkan agent untuk semua churn
- menyamakan banyak revisi dengan kegagalan tanpa konteks
- menganggap semua scope growth buruk
- memberi diagnosis pasti saat evidence lemah
- menilai sesi eksplorasi seperti sesi delivery yang bounded
- membuat rekomendasi abstrak tanpa kaitan ke evidence

## Catatan Kompatibilitas KiloCode

Skill sumber merujuk struktur artefak Antigravity yang spesifik. Pada versi KiloCode ini, workflow dinormalisasi menjadi kerangka postmortem umum yang tetap berguna untuk sesi AI-assisted coding lain selama ada artefak tugas, rencana, revisi, dan bukti eksekusi.
