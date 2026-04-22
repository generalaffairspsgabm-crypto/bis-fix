---
name: ai-agents-architect
description: Gunakan saat merancang sistem agent AI otonom, termasuk loop agent, tool use, memori, strategi planning, orkestrasi multi-agent, observabilitas, dan guardrail keselamatan.
license: Complete terms in LICENSE.txt
metadata:
  category: ai-systems
  source:
    upstream: .tmp-antigravity-skills/skills/ai-agents-architect
    type: community
  depends_on:
    - pemahaman dasar tentang LLM API, function calling, dan prompt engineering
---

# AI Agents Architect

Skill ini memandu desain sistem agent AI yang dapat bertindak relatif otonom namun tetap terkendali. Fokusnya adalah memilih pola agent yang tepat, mendefinisikan tool dengan jelas, mengelola memori, dan merancang kegagalan yang aman serta mudah diamati.

## Kapan digunakan

Gunakan skill ini saat perlu:
- merancang agent tunggal atau sistem multi-agent
- memilih pola loop agent seperti ReAct atau plan-and-execute
- mendefinisikan tool dan kontrak function calling
- merancang memori jangka pendek dan jangka panjang
- menambahkan observabilitas, recovery, dan guardrail pada agent

## Tujuan utama

- membangun agent yang mampu bertindak tanpa kehilangan kontrol
- memastikan tool, memori, dan planning bekerja sebagai sistem yang koheren
- mengurangi kegagalan diam-diam dan perilaku tak terduga
- menyeimbangkan otonomi dengan eskalasi atau human-in-the-loop

## Prinsip inti

- agent harus gagal dengan jelas, bukan diam-diam
- setiap tool harus punya deskripsi, parameter, dan contoh yang jelas
- memori adalah alat bantu konteks, bukan tempat menimbun semua hal
- planning membantu, tetapi tidak menghapus kebutuhan guardrail
- multi-agent menambah kompleksitas; gunakan hanya jika manfaatnya nyata

## Komponen arsitektur utama

### 1. Loop agent

Loop agent menentukan bagaimana model berpikir, bertindak, dan mengevaluasi hasil.

Pilih pola berdasarkan kompleksitas tugas:
- tugas sederhana dengan observasi langsung: gunakan loop ringan
- tugas kompleks multi-langkah: gunakan planning eksplisit
- tugas panjang atau mahal: tambahkan checkpoint dan batas biaya

### 2. Tool use

Tool adalah antarmuka agent ke dunia luar. Tool yang buruk akan merusak agent yang bagus.

Tool yang baik harus punya:
- tujuan satu kalimat yang jelas
- kapan digunakan dan kapan tidak
- parameter dengan tipe dan deskripsi
- contoh input/output
- error case yang mungkin muncul

### 3. Memori

Memori harus dibagi menurut fungsi:
- **working memory** untuk konteks tugas saat ini
- **episodic memory** untuk hasil atau interaksi masa lalu
- **semantic memory** untuk fakta dan pola yang dipelajari

Gunakan retrieval atau ringkasan, bukan menyimpan semua observasi mentah.

### 4. Planning

Planning membantu agent memecah tugas besar menjadi langkah yang dapat dieksekusi. Namun planning harus bisa direvisi saat realitas berubah.

### 5. Observabilitas dan recovery

Agent perlu jejak eksekusi yang cukup untuk menjawab:
- tool apa yang dipanggil?
- mengapa tool itu dipilih?
- di langkah mana kegagalan terjadi?
- apakah agent mencoba recovery atau fallback?

## Pola arsitektur yang umum

### ReAct loop

Pola **Reason → Act → Observe** cocok untuk tugas dengan alur aksi-observasi yang jelas.

Gunakan saat:
- tool sedikit dan jelas
- tiap langkah bergantung pada hasil langkah sebelumnya
- tugas tidak terlalu panjang

Praktik penting:
- batasi jumlah iterasi
- log tiap aksi dan observasi
- hentikan jika agent mengulang pola yang sama tanpa progres

### Plan-and-Execute

Pola ini memisahkan fase perencanaan dan eksekusi.

Gunakan saat:
- tugas kompleks dan multi-langkah
- perlu dekomposisi eksplisit sebelum bertindak
- ada kemungkinan replanning setelah sebagian langkah selesai

Praktik penting:
- buat rencana awal yang cukup granular
- evaluasi ulang setelah tiap milestone
- izinkan replanning bila asumsi awal salah

### Tool registry

Pola ini cocok saat jumlah tool banyak atau berubah dinamis.

Gunakan saat:
- ada banyak tool dengan domain berbeda
- tool mahal perlu lazy loading
- perlu pelacakan penggunaan tool untuk optimasi

Praktik penting:
- simpan schema dan contoh penggunaan
- buat mekanisme seleksi tool yang eksplisit
- hindari mengekspos terlalu banyak tool sekaligus tanpa filter relevansi

### Hierarchical memory

Pola ini cocok untuk agent jangka panjang.

Gunakan saat:
- konteks percakapan panjang
- agent perlu mengingat hasil sebelumnya
- ada kebutuhan retrieval dari memori jangka panjang

Praktik penting:
- ringkas observasi sebelum disimpan
- simpan hanya yang relevan
- gunakan RAG atau retrieval untuk memori besar

### Supervisor pattern

Supervisor mendelegasikan pekerjaan ke specialist agents.

Gunakan saat:
- tugas benar-benar membutuhkan spesialisasi berbeda
- ada manfaat nyata dari pemisahan peran
- hasil perlu digabungkan kembali secara terstruktur

Praktik penting:
- supervisor bertanggung jawab atas dekomposisi dan agregasi
- specialist harus punya scope sempit dan jelas
- error handling tetap dipusatkan di supervisor

### Checkpoint recovery

Pola ini menyimpan state agar tugas panjang bisa dilanjutkan setelah gagal.

Gunakan saat:
- proses panjang dan mahal
- ada risiko timeout atau kegagalan tool
- hasil parsial bernilai dan tidak boleh hilang

Praktik penting:
- checkpoint setelah langkah penting berhasil
- simpan state, progres, dan konteks minimum yang dibutuhkan untuk resume
- bersihkan checkpoint saat tugas selesai

## Guardrail yang wajib dipikirkan

### Batas iterasi dan biaya

Selalu tetapkan:
- `max_iterations`
- timeout per run
- batas token atau biaya
- circuit breaker untuk kegagalan tool berulang

Tanpa batas ini, agent bisa loop tanpa akhir atau menghabiskan biaya besar.

### Eskalasi dan human-in-the-loop

Tentukan kapan agent harus berhenti dan meminta bantuan, misalnya saat:
- confidence rendah
- tool penting gagal berulang
- aksi bersifat destruktif atau irreversible
- data yang dibutuhkan tidak tersedia

### Error surfacing

Jangan telan error tool secara diam-diam. Agent harus menerima:
- tipe error
- pesan error
- petunjuk recovery bila ada

Tanpa ini, agent akan melanjutkan dengan asumsi salah.

## Sharp edges yang sering terjadi

### 1. Loop tanpa batas iterasi

Gejala:
- agent berjalan terus
- biaya API melonjak
- aplikasi terasa hang

Perbaikan:
- tetapkan batas iterasi, timeout, dan cost cap
- deteksi pola pengulangan tanpa progres

### 2. Deskripsi tool kabur atau tidak lengkap

Gejala:
- agent memilih tool yang salah
- parameter sering salah
- agent tampak “tidak tahu” kemampuan yang sebenarnya ada

Perbaikan:
- tulis spesifikasi tool yang lengkap dan eksplisit
- sertakan contoh input/output
- jelaskan kapan tool dipakai dan kapan tidak

### 3. Error tool tidak diteruskan ke agent

Gejala:
- jawaban akhir salah karena data hilang atau rusak
- debugging sulit
- agent tampak percaya diri padahal fondasinya salah

Perbaikan:
- teruskan error ke agent dalam format yang bisa dipahami
- izinkan retry atau fallback yang terkontrol

### 4. Semua observasi disimpan ke memori

Gejala:
- context window cepat penuh
- biaya token naik
- agent mengutip informasi lama yang tidak relevan

Perbaikan:
- ringkas sebelum menyimpan
- filter berdasarkan relevansi
- gunakan retrieval untuk memori jangka panjang

## Checklist desain agent

1. Apakah pola loop sesuai kompleksitas tugas?
2. Apakah semua tool punya kontrak yang jelas?
3. Apakah ada batas iterasi, timeout, dan biaya?
4. Apakah memori dibagi menurut fungsi, bukan ditumpuk mentah?
5. Apakah replanning dimungkinkan saat kondisi berubah?
6. Apakah error tool terlihat oleh agent dan operator?
7. Apakah ada kondisi eskalasi ke manusia?
8. Apakah multi-agent benar-benar diperlukan?
9. Apakah ada logging atau tracing yang cukup untuk debugging?

## Anti-pattern penting

- memakai multi-agent hanya karena terdengar canggih
- mengekspos terlalu banyak tool tanpa seleksi relevansi
- menyimpan semua hal ke memori tanpa kurasi
- membiarkan agent terus mencoba tanpa batas
- menyembunyikan error tool dari agent
- tidak mendefinisikan kapan agent harus berhenti atau eskalasi

## Hasil yang diharapkan

Dengan mengikuti skill ini, sistem agent akan:
- lebih terstruktur dan dapat diprediksi
- lebih mudah diobservasi dan di-debug
- lebih aman terhadap loop, misuse tool, dan kegagalan diam-diam
- lebih mudah diskalakan dari agent tunggal ke orkestrasi yang lebih kompleks

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/ai-agents-architect` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.