---
name: auth-implementation-patterns
description: >-
  Gunakan saat membangun sistem autentikasi dan otorisasi agar strategi session,
  JWT, OAuth2/OIDC, RBAC, permission model, penyimpanan secret, dan audit trail
  dipilih serta diterapkan dengan aman dan scalable.
license: CC-BY-4.0
metadata:
  category: security
  source:
    repository: 'https://github.com/sickn33/antigravity-awesome-skills'
    path: skills/auth-implementation-patterns
    license_path: LICENSE-CONTENT
  original_metadata:
    risk: unknown
    source: community
    date_added: '2026-02-27'
---

# Auth Implementation Patterns

Skill ini memandu desain dan implementasi autentikasi serta otorisasi. Fokusnya adalah memilih strategi yang tepat untuk identitas, sesi, token, social login, SSO, dan enforcement policy, sambil menjaga keamanan credential, auditability, dan skalabilitas sistem.

## Kapan digunakan

Gunakan saat:
- membangun login dan session management
- menambahkan JWT atau token-based auth
- mengintegrasikan OAuth2, OpenID Connect, social login, atau SSO
- merancang RBAC, permission model, atau ownership-based authorization
- memperbaiki bug atau desain auth yang rapuh
- meninjau lifecycle token, secret, dan audit requirement

## Jangan gunakan saat

Jangan gunakan saat:
- kebutuhan hanya styling halaman login atau copy UI
- tugas murni infrastruktur tanpa concern identitas atau akses
- kebijakan auth tidak bisa diubah sama sekali dan tidak ada ruang desain

## Prinsip inti

- bedakan jelas autentikasi dan otorisasi
- pilih strategi auth berdasarkan actor, boundary, dan threat model
- perlakukan token, session, dan secret sebagai credential sensitif
- terapkan least privilege dan enforcement sedekat mungkin dengan resource
- rancang lifecycle credential: issuance, expiry, refresh, revocation, rotation
- auditability dan observability auth sama pentingnya dengan login yang berhasil

## Alur kerja

### 1. Petakan actor, boundary, dan flow

Tentukan:
- siapa yang login: end-user, admin, service account, partner, tenant
- apakah sistem single-tenant atau multi-tenant
- flow utama: login, logout, refresh, forgot password, invite, impersonation, MFA
- resource apa yang perlu dilindungi dan pada level apa
- threat model utama: credential theft, session hijack, privilege escalation, replay, CSRF, brute force

### 2. Pilih strategi autentikasi

#### Session-based auth

Cocok saat:
- aplikasi web tradisional atau server-rendered
- kontrol server-side terhadap sesi memberi nilai tinggi
- kebutuhan revocation cepat dan stateful masih dapat diterima

Panduan:
- simpan session di store yang aman bila perlu scale horizontal
- gunakan cookie `HttpOnly`, `Secure`, dan `SameSite` yang sesuai
- rotasi session setelah login atau privilege change

#### JWT atau token-based auth

Cocok saat:
- API stateless dibutuhkan
- banyak service atau client perlu membawa klaim identitas
- scale horizontal penting

Panduan:
- gunakan access token berumur pendek
- gunakan refresh token hanya bila perlu dan kelola revocation dengan benar
- jangan taruh data sensitif berlebihan di payload token
- validasi issuer, audience, expiry, dan signature

#### OAuth2 / OpenID Connect

Cocok saat:
- perlu social login
- perlu enterprise SSO
- autentikasi didelegasikan ke identity provider

Panduan:
- pahami flow yang dipakai, terutama authorization code dengan PKCE untuk client publik
- validasi redirect URI dan state/nonce
- pisahkan concern identity provider dari authorization internal aplikasi

### 3. Rancang model otorisasi

Pilih model sesuai kebutuhan:
- **RBAC** untuk akses berbasis peran
- **permission-based access** untuk kontrol granular
- **resource ownership** untuk objek milik user tertentu
- **tenant isolation** untuk multi-tenant
- **policy-based authorization** untuk aturan kontekstual yang kompleks

Prinsip:
- jangan berhenti di route-level auth saja
- cek akses pada resource yang benar
- dokumentasikan titik enforcement agar tidak tersebar liar

### 4. Kelola secret, credential, dan audit

Pastikan:
- password di-hash dengan algoritma modern yang sesuai
- secret dan key disimpan di secret manager atau storage aman
- token refresh atau credential jangka panjang diperlakukan ekstra ketat
- log tidak pernah memuat password, token, atau secret mentah
- event auth penting tercatat: login, gagal login, logout, refresh, revoke, privilege change

### 5. Tambahkan kontrol keamanan pendukung

Pertimbangkan:
- MFA untuk akun sensitif
- rate limiting dan brute-force protection pada login
- CSRF protection untuk flow berbasis cookie/session
- device/session management bila relevan
- forced logout atau revoke all sessions untuk insiden keamanan

### 6. Validasi desain dan implementasi

Uji minimal terhadap:
- login gagal dan sukses
- refresh token flow
- logout dan revocation
- privilege escalation
- akses lintas tenant atau lintas resource
- session fixation atau token replay sesuai konteks
- audit trail dan observability pada jalur auth penting

## Checklist cepat

- actor dan flow auth utama sudah dipetakan
- strategi auth dipilih sesuai konteks, bukan kebiasaan
- authorization model jelas dan diuji pada level resource
- secret dan credential disimpan aman
- token/session lifecycle terdokumentasi
- brute-force protection dan logging tersedia
- event auth penting dapat diaudit

## Anti-pattern

Hindari:
- mencampur autentikasi dan otorisasi tanpa boundary jelas
- menyimpan secret atau token di log
- access token terlalu panjang umurnya tanpa alasan kuat
- refresh token tanpa mekanisme revocation
- hanya mengandalkan role global tanpa cek ownership atau tenant boundary
- menganggap social login otomatis menyelesaikan authorization internal

## Catatan kompatibilitas KiloCode

Skill upstream merujuk playbook implementasi yang panjang. Pada adaptasi KiloCode ini, pola inti session, JWT, OAuth2/OIDC, RBAC, permission model, ownership check, secret handling, dan audit trail diringkas langsung ke `SKILL.md` agar skill mandiri dan tetap usable tanpa referensi tambahan.