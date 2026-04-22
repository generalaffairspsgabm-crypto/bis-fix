---
name: sentry-automation
description: Gunakan saat perlu mengotomasi Sentry melalui Rube MCP untuk mengelola issue dan event, alert rule, release, monitor, project, team, dan observabilitas organisasi.
license: Complete terms in LICENSE.txt
metadata:
  category: automation
  source:
    upstream: .tmp-antigravity-skills/skills/sentry-automation
    type: community
  depends_on:
    - Rube MCP
    - koneksi Sentry aktif di Rube
---

# Sentry Automation

Skill ini memandu otomasi Sentry melalui toolkit Sentry di Rube MCP.

## Kapan digunakan

Gunakan skill ini saat perlu:
- mencari dan men-triage issue error
- membaca event individual dan stack trace
- melihat issue per project
- membuat atau memperbarui alert rule
- membuat release dan deployment record
- melihat organisasi, team, member, project, atau monitor cron

## Prasyarat

- Pastikan `RUBE_SEARCH_TOOLS` tersedia.
- Pastikan koneksi `sentry` aktif melalui `RUBE_MANAGE_CONNECTIONS`.
- Selalu mulai dengan `RUBE_SEARCH_TOOLS` untuk mengambil skema tool terbaru.

## Alur kerja inti

### 1. Investigasi issue

Gunakan saat perlu menemukan dan memahami error issue.

Urutan kerja:
1. `SENTRY_LIST_AN_ORGANIZATIONS_ISSUES`
2. `SENTRY_GET_ORGANIZATION_ISSUE_DETAILS`
3. `SENTRY_LIST_AN_ISSUES_EVENTS`
4. `SENTRY_RETRIEVE_AN_ISSUE_EVENT`
5. `SENTRY_RETRIEVE_ISSUE_TAG_DETAILS`

Parameter penting:
- `organization_id_or_slug`
- `issue_id`
- `query`
- `sort`
- `statsPeriod`

Contoh query umum:
- `is:unresolved`
- `assigned:me`
- `!has:release`
- `browser:Chrome`
- `times-seen:>100`

Pitfall utama:
- Gunakan slug organisasi, bukan display name.
- `issue_id` adalah angka, sedangkan event ID biasanya UUID.
- Event dalam satu issue bisa memiliki stack trace berbeda.

### 2. Kelola issue per project

Gunakan saat perlu fokus pada satu project.

Urutan kerja:
1. `SENTRY_RETRIEVE_ORGANIZATION_PROJECTS` untuk resolve project slug.
2. `SENTRY_RETRIEVE_PROJECT_ISSUES_LIST`.
3. `SENTRY_RETRIEVE_ISSUE_EVENTS_BY_ID` bila perlu.

Catatan:
- Selalu resolve nama project ke slug terlebih dahulu.
- Pagination project issue list bisa berbeda dari issue list tingkat organisasi.

### 3. Konfigurasi alert rule

Gunakan saat perlu membuat atau memperbarui alert.

Urutan kerja:
1. `SENTRY_RETRIEVE_ORGANIZATION_PROJECTS`
2. `SENTRY_RETRIEVE_PROJECT_RULES_BY_ORG_AND_PROJECT_ID`
3. `SENTRY_CREATE_PROJECT_RULE_FOR_ALERTS`
4. `SENTRY_CREATE_ORGANIZATION_ALERT_RULE`
5. `SENTRY_UPDATE_ORGANIZATION_ALERT_RULES`
6. `SENTRY_RETRIEVE_ALERT_RULE_DETAILS`
7. `SENTRY_GET_PROJECT_RULE_DETAILS`

Parameter penting:
- `name`
- `conditions`
- `actions`
- `filters`
- `frequency`
- `actionMatch`

Pitfall utama:
- Alert project-level dan org-level adalah dua jenis berbeda.
- Struktur JSON untuk conditions, actions, dan filters harus valid sesuai skema tool.
- `frequency` terlalu rendah dapat memicu alert fatigue.

### 4. Kelola release

Gunakan saat perlu membuat release, deployment, atau upload file release.

Urutan kerja:
1. `SENTRY_LIST_ORGANIZATION_RELEASES`
2. `SENTRY_CREATE_RELEASE_FOR_ORGANIZATION`
3. `SENTRY_UPDATE_RELEASE_DETAILS_FOR_ORGANIZATION`
4. `SENTRY_CREATE_RELEASE_DEPLOY_FOR_ORG`
5. `SENTRY_UPLOAD_RELEASE_FILE_TO_ORGANIZATION`

Parameter penting:
- `version`
- `projects`
- `dateReleased`
- `environment`

Catatan:
- Release harus unik dalam organisasi.
- Deployment release adalah langkah terpisah dari pembuatan release.
- Upload source map atau file release memerlukan release yang sudah ada.

### 5. Monitor organisasi dan team

Gunakan saat perlu melihat struktur organisasi.

Urutan kerja:
1. `SENTRY_GET_ORGANIZATION_DETAILS` atau `SENTRY_GET_ORGANIZATION_BY_ID_OR_SLUG`
2. `SENTRY_LIST_TEAMS_IN_ORGANIZATION`
3. `SENTRY_LIST_ORGANIZATION_MEMBERS`
4. `SENTRY_GET_PROJECT_LIST`

Parameter penting:
- `organization_id_or_slug`
- `cursor`

Catatan:
- Banyak endpoint memakai pagination berbasis cursor.
- Visibilitas team dan member bergantung pada permission token.

### 6. Kelola monitor cron

Gunakan `SENTRY_UPDATE_A_MONITOR` saat perlu memperbarui konfigurasi monitor.

Parameter penting:
- `organization_id_or_slug`
- `monitor_id_or_slug`
- `name`
- `schedule`
- `checkin_margin`
- `max_runtime`

Pitfall utama:
- Perubahan schedule berlaku segera.
- Monitor slug biasanya auto-generated dari nama.

## Pola kerja yang direkomendasikan

### Resolusi ID

- Organisasi ke slug: gunakan endpoint detail organisasi.
- Project name ke slug: `SENTRY_RETRIEVE_ORGANIZATION_PROJECTS`.
- Issue target: cari dulu lewat issue list dengan query yang tepat.

### Pagination

- Sentry banyak memakai cursor dari header `Link`.
- Ikuti cursor sampai tidak ada halaman berikutnya.

## Pitfall penting

- Gunakan slug untuk organisasi dan project, bukan display name.
- Issue ID numerik berbeda dari event ID UUID.
- Scope token harus sesuai operasi.
- Hormati rate limit dan lakukan backoff saat 429.

## Checklist eksekusi

1. Panggil `RUBE_SEARCH_TOOLS`.
2. Pastikan koneksi `sentry` aktif.
3. Resolve organisasi dan project ke slug.
4. Jalankan operasi inti.
5. Verifikasi hasil dengan membaca ulang issue, rule, release, atau monitor terkait.

## Referensi tool cepat

- `SENTRY_LIST_AN_ORGANIZATIONS_ISSUES`
- `SENTRY_GET_ORGANIZATION_ISSUE_DETAILS`
- `SENTRY_LIST_AN_ISSUES_EVENTS`
- `SENTRY_RETRIEVE_AN_ISSUE_EVENT`
- `SENTRY_RETRIEVE_ISSUE_TAG_DETAILS`
- `SENTRY_RETRIEVE_ORGANIZATION_PROJECTS`
- `SENTRY_RETRIEVE_PROJECT_ISSUES_LIST`
- `SENTRY_RETRIEVE_ISSUE_EVENTS_BY_ID`
- `SENTRY_RETRIEVE_PROJECT_RULES_BY_ORG_AND_PROJECT_ID`
- `SENTRY_CREATE_PROJECT_RULE_FOR_ALERTS`
- `SENTRY_CREATE_ORGANIZATION_ALERT_RULE`
- `SENTRY_UPDATE_ORGANIZATION_ALERT_RULES`
- `SENTRY_RETRIEVE_ALERT_RULE_DETAILS`
- `SENTRY_GET_PROJECT_RULE_DETAILS`
- `SENTRY_LIST_ORGANIZATION_RELEASES`
- `SENTRY_CREATE_RELEASE_FOR_ORGANIZATION`
- `SENTRY_UPDATE_RELEASE_DETAILS_FOR_ORGANIZATION`
- `SENTRY_CREATE_RELEASE_DEPLOY_FOR_ORG`
- `SENTRY_UPLOAD_RELEASE_FILE_TO_ORGANIZATION`
- `SENTRY_GET_ORGANIZATION_DETAILS`
- `SENTRY_LIST_TEAMS_IN_ORGANIZATION`
- `SENTRY_LIST_ORGANIZATION_MEMBERS`
- `SENTRY_GET_PROJECT_LIST`
- `SENTRY_UPDATE_A_MONITOR`

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/sentry-automation` agar mandiri dan konsisten untuk format KiloCode.
