---
name: aws-cost-cleanup
description: Gunakan saat ingin mengidentifikasi dan membersihkan resource AWS yang tidak terpakai agar pemborosan biaya berkurang dengan alur discovery, validasi, dry-run, dan eksekusi aman.
license: Complete terms in LICENSE.txt
metadata:
  category: cloud
  source:
    upstream: .tmp-antigravity-skills/skills/aws-cost-cleanup
    type: community
  depends_on:
    - akses AWS yang memadai untuk inspeksi resource
    - izin eksplisit sebelum tindakan penghapusan
---

# AWS Cost Cleanup

Skill ini membantu mengurangi pemborosan biaya AWS dengan mengidentifikasi resource yang tidak terpakai lalu membersihkannya secara aman. Fokus utamanya bukan sekadar menghapus resource, tetapi memastikan ada proses discovery, validasi dependensi, dry-run, dan verifikasi pasca-eksekusi.

## Kapan digunakan

Gunakan skill ini saat perlu:
- mencari resource AWS yang idle atau orphaned
- membersihkan volume, snapshot, IP, atau resource jaringan yang tidak lagi dipakai
- menyiapkan cleanup berkala untuk mengurangi biaya cloud
- membuat rencana cleanup yang aman sebelum eksekusi produksi

## Tujuan utama

- mengurangi biaya dari resource yang tidak memberi nilai
- menghindari penghapusan resource yang masih dipakai
- menghasilkan daftar cleanup yang dapat diaudit
- memprioritaskan quick wins dengan risiko rendah

## Target cleanup umum

### Storage
- volume EBS yang unattached
- snapshot EBS lama yang tidak lagi dibutuhkan
- multipart upload S3 yang tidak selesai
- versi objek lama pada bucket versioned

### Compute
- instance EC2 berhenti lama tanpa rencana pemakaian
- AMI yang tidak dipakai beserta snapshot terkait
- Elastic IP yang tidak terasosiasi

### Networking
- load balancer yang tidak menerima trafik atau tidak punya target aktif
- NAT Gateway yang tidak lagi diperlukan
- ENI orphaned atau tertinggal dari resource yang sudah dihapus

## Prasyarat operasional

Sebelum cleanup, pastikan:
- ada akses baca ke akun AWS yang relevan
- ada izin eksplisit sebelum penghapusan resource
- lingkungan target jelas: dev, staging, atau production
- tagging, owner, dan dependensi resource dapat diperiksa
- ada rencana rollback atau mitigasi bila cleanup salah sasaran

## Alur kerja inti

### 1. Discovery phase

Mulai dengan inspeksi read-only.

Kumpulkan:
- daftar resource idle atau unattached
- usia resource
- estimasi biaya bulanan atau tahunan
- tag owner, environment, dan project
- indikasi dependensi

Output tahap ini sebaiknya berupa shortlist resource kandidat cleanup, bukan langsung penghapusan.

### 2. Validation phase

Untuk setiap kandidat cleanup, verifikasi:
- apakah resource benar-benar tidak dipakai
- apakah ada dependensi tersembunyi
- apakah resource terkait backup, DR, atau compliance
- apakah ada owner yang perlu dikonfirmasi
- apakah resource berada di production atau non-production

Prioritaskan resource dengan risiko rendah terlebih dahulu.

### 3. Dry-run phase

Sebelum eksekusi nyata:
- tampilkan daftar resource yang akan dihapus
- sertakan alasan penghapusan
- sertakan estimasi penghematan
- minta persetujuan eksplisit bila konteksnya operasional nyata

Dry-run wajib untuk tindakan destruktif.

### 4. Execution phase

Saat eksekusi:
- lakukan per kategori resource
- catat resource yang berhasil dihapus dan yang gagal
- hentikan batch bila muncul indikasi dependensi tak terduga
- jangan campur cleanup risiko rendah dan tinggi dalam satu langkah tanpa kontrol

### 5. Verification phase

Setelah cleanup:
- verifikasi resource benar-benar hilang atau berubah status sesuai harapan
- cek apakah ada dampak operasional
- hitung ulang estimasi penghematan
- dokumentasikan hasil cleanup

## Prioritas quick wins

Urutan yang umumnya aman untuk batch awal:
1. Elastic IP yang tidak terasosiasi
2. volume EBS unattached yang jelas orphaned
3. snapshot lama yang sudah tervalidasi tidak dibutuhkan
4. multipart upload S3 yang tidak selesai
5. instance berhenti lama di non-production

Resource seperti NAT Gateway, load balancer, atau AMI perlu validasi lebih ketat karena dampaknya bisa lebih besar.

## Template evaluasi resource

Gunakan format seperti ini:

```markdown
## Kandidat Cleanup
- Resource: vol-xxxx
- Tipe: EBS volume
- Status: available
- Umur: 120 hari
- Tag owner: tidak ada
- Environment: dev
- Dependensi: tidak ditemukan
- Estimasi hemat: sedang
- Rekomendasi: aman untuk dry-run delete
```

## Checklist keselamatan

- apakah sudah dilakukan discovery read-only?
- apakah owner resource sudah diketahui atau dikonfirmasi?
- apakah dependensi sudah diperiksa?
- apakah resource berada di production?
- apakah ada backup atau snapshot yang diperlukan sebelum hapus?
- apakah dry-run sudah dilakukan?
- apakah hasil eksekusi akan diverifikasi?

## Praktik baik

- mulai dari akun atau environment non-production
- gunakan tag sebagai sinyal penting, tetapi jangan mengandalkannya sepenuhnya
- dokumentasikan alasan setiap penghapusan
- hitung penghematan agar cleanup punya prioritas bisnis yang jelas
- jadikan cleanup sebagai proses berulang, bukan kegiatan sekali saja

## Anti-pattern

- menghapus resource hanya karena terlihat idle tanpa validasi
- menjalankan cleanup destruktif langsung di production
- menghapus snapshot tanpa memahami kebutuhan backup atau compliance
- menggabungkan terlalu banyak tipe resource dalam satu batch tanpa kontrol
- tidak mencatat hasil cleanup dan dampaknya

## Batasan

- status idle tidak selalu berarti aman untuk dihapus
- beberapa resource tampak orphaned tetapi masih dipakai oleh proses jarang jalan
- estimasi biaya sering perlu dikonfirmasi dengan data billing aktual
- cleanup aman membutuhkan konteks operasional yang tidak selalu terlihat dari metadata saja

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/aws-cost-cleanup` agar mandiri, berbahasa Indonesia, dan tidak bergantung pada skrip eksternal yang tidak tersedia di workspace.
