---
name: audit-skills
description: Gunakan saat mengaudit skill atau bundle AI secara statis untuk mendeteksi pola berbahaya, kebocoran data, manipulasi sistem, obfuscation, dan risiko lintas platform tanpa mengeksekusi payload.
license: Complete terms in LICENSE.txt
metadata:
  category: security
  source:
    upstream: .tmp-antigravity-skills/skills/audit-skills
    type: community
  depends_on:
    - akses baca ke skill, bundle, atau arsip yang akan diaudit secara statis
---

# Audit Skills

Skill ini memandu audit keamanan statis terhadap skill atau bundle AI untuk menemukan pola berbahaya, kebocoran data, manipulasi sistem, persistence, dan indikator obfuscation. Fokusnya adalah analisis non-intrusif lintas platform tanpa menjalankan kode yang dicurigai.

## Kapan digunakan

Gunakan skill ini saat:
- perlu menilai apakah sebuah skill atau bundle aman digunakan
- ingin memeriksa legitimasi skill pihak ketiga sebelum diimpor
- perlu audit statis terhadap script, installer, atau artefak skill lintas platform
- ingin mendeteksi pola privilege escalation, exfiltration, persistence, atau payload tersamarkan
- perlu meninjau apakah scope sebuah skill masuk akal dibanding fungsi yang diklaim

## Tujuan utama

- melakukan audit statis tanpa mengeksekusi kode berisiko
- menemukan indikator perilaku berbahaya lintas Windows, macOS, Linux, Android, dan iOS
- menilai kesesuaian antara klaim skill dan aksi yang diminta
- menghasilkan laporan risiko yang dapat ditindaklanjuti

## Prinsip inti

- jangan menjalankan kode yang sedang diaudit
- perlakukan akses sistem, jaringan, dan perubahan permission sebagai sinyal penting
- periksa apakah aksi yang diminta relevan dengan tujuan skill
- cari obfuscation, persistence, dan exfiltration secara eksplisit
- bedakan indikator kuat, indikator lemah, dan false positive potensial

## Alur kerja inti

### 1. Lakukan analisis statis dasar

Periksa:
- struktur direktori dan file utama
- script shell, batch, PowerShell, atau installer
- referensi command sistem sensitif
- file konfigurasi, manifest, dan metadata skill
- dependensi atau artefak yang tampak tidak relevan dengan fungsi skill

### 2. Cari pola privilege dan manipulasi sistem

Waspadai indikator seperti:
- perubahan ownership atau permission
- pengaturan execution policy
- penguncian file atau folder
- perubahan atribut file untuk menyembunyikan artefak
- modifikasi area sistem atau profil pengguna yang tidak relevan

Nilai apakah aksi tersebut benar-benar diperlukan oleh fungsi skill.

### 3. Cari pola eksekusi script dan persistence

Audit untuk:
- pemanggilan `.bat`, `.cmd`, `.ps1`, `.sh`, atau shell tersembunyi
- command yang mengeksekusi script hasil unduhan
- scheduled task, cron, launch agent, service, atau run key
- mekanisme auto-start yang tidak dijelaskan secara terbuka

### 4. Cari indikasi exfiltration dan disclosure

Periksa:
- penggunaan `curl`, `wget`, `Invoke-WebRequest`, `scp`, `ftp`, `nc`, atau alat serupa
- akses ke `.env`, kredensial, keychain, SSH key, cookie store, atau keystore
- komunikasi ke endpoint yang tidak jelas relevansinya
- scanning jaringan internal atau enumerasi host lokal

### 5. Audit obfuscation dan legitimasi scope

Cari indikator seperti:
- Base64, hex, XOR, atau string yang sengaja disamarkan
- pipeline seperti unduh lalu eksekusi
- payload yang dibangun saat runtime
- ketidaksesuaian antara deskripsi skill dan kemampuan aktual

Contoh red flag: skill desain UI yang ternyata meminta `adb shell`, `sudo`, atau modifikasi registry.

### 6. Susun laporan risiko

Laporan sebaiknya mencakup:
- ringkasan temuan utama
- indikator per kategori risiko
- tingkat keyakinan atau severity relatif
- alasan mengapa pola tertentu mencurigakan
- rekomendasi mitigasi atau tindakan lanjutan

## Checklist implementasi

1. Audit struktur skill atau bundle tanpa mengeksekusi kode.
2. Cari pola privilege escalation, permission change, dan manipulasi sistem.
3. Cari persistence, hidden execution, dan installer behavior mencurigakan.
4. Cari exfiltration, disclosure, dan akses ke data sensitif.
5. Cari obfuscation dan ketidaksesuaian scope skill.
6. Hasilkan laporan risiko yang jelas dan defensif.

## Anti-pattern penting

- mengeksekusi script yang sedang diaudit
- menganggap semua command sistem otomatis berbahaya tanpa konteks
- mengabaikan mismatch antara klaim skill dan aksi aktual
- melewatkan artefak mobile atau lintas platform
- tidak membedakan indikator kuat dari sinyal lemah

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/audit-skills` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
