---
name: asana-automation
description: Gunakan saat perlu mengotomasi Asana melalui Rube MCP untuk mengelola task, project, section, team, workspace, dan operasi paralel berbasis API Asana.
license: Complete terms in LICENSE.txt
metadata:
  category: automation
  source:
    upstream: .tmp-antigravity-skills/skills/asana-automation
    type: community
  depends_on:
    - Rube MCP
    - koneksi Asana aktif di Rube
---

# Asana Automation

Skill ini memandu otomasi Asana melalui toolkit Asana di Rube MCP.

## Kapan digunakan

Gunakan skill ini saat perlu:
- mencari, membuat, atau mengelola task
- membuat project dan section baru
- memindahkan task ke section tertentu
- melihat team, user workspace, atau identitas user saat ini
- menjalankan beberapa request Asana secara paralel

## Prasyarat

- Pastikan `RUBE_SEARCH_TOOLS` tersedia.
- Pastikan koneksi `asana` aktif melalui `RUBE_MANAGE_CONNECTIONS`.
- Selalu mulai dengan `RUBE_SEARCH_TOOLS` untuk mengambil skema tool terbaru.

## Alur kerja inti

### 1. Kelola task

Gunakan saat perlu membuat, mencari, atau mengorganisasi task.

Urutan kerja:
1. `ASANA_GET_MULTIPLE_WORKSPACES` untuk mendapatkan workspace GID.
2. `ASANA_SEARCH_TASKS_IN_WORKSPACE` untuk mencari task.
3. `ASANA_GET_TASKS_FROM_A_PROJECT` untuk melihat task dalam project.
4. `ASANA_CREATE_A_TASK` untuk membuat task.
5. `ASANA_GET_A_TASK` untuk membaca detail task.
6. `ASANA_CREATE_SUBTASK` untuk membuat subtask.
7. `ASANA_GET_TASK_SUBTASKS` untuk melihat subtask.

Parameter penting:
- `workspace`: workspace GID.
- `projects`: daftar project GID.
- `name`: nama task.
- `notes`: deskripsi task.
- `assignee`: user GID atau email.
- `due_on`: tanggal jatuh tempo format `YYYY-MM-DD`.

Pitfall utama:
- Banyak operasi membutuhkan workspace GID terlebih dahulu.
- Semua GID Asana berupa string, bukan integer.
- Pencarian task bersifat workspace-scoped.

### 2. Kelola project dan section

Gunakan saat perlu membuat project, melihat section, atau memindahkan task.

Urutan kerja:
1. `ASANA_GET_WORKSPACE_PROJECTS` untuk daftar project.
2. `ASANA_GET_A_PROJECT` untuk detail project.
3. `ASANA_CREATE_A_PROJECT` untuk membuat project.
4. `ASANA_GET_SECTIONS_IN_PROJECT` untuk daftar section.
5. `ASANA_CREATE_SECTION_IN_PROJECT` untuk membuat section.
6. `ASANA_ADD_TASK_TO_SECTION` untuk memindahkan task ke section.
7. `ASANA_GET_TASKS_FROM_A_SECTION` untuk melihat isi section.

Parameter penting:
- `project_gid`
- `workspace`
- `name`
- `task`
- `section`

Catatan:
- Project berada di dalam workspace.
- Section memiliki urutan di dalam project.
- Duplikasi project adalah operasi terpisah dan dapat menyalin task tergantung opsi.

### 3. Kelola team dan user

Gunakan saat perlu melihat struktur organisasi di Asana.

Urutan kerja:
1. `ASANA_GET_TEAMS_IN_WORKSPACE`
2. `ASANA_GET_USERS_FOR_TEAM`
3. `ASANA_GET_USERS_FOR_WORKSPACE`
4. `ASANA_GET_CURRENT_USER`
5. `ASANA_GET_MULTIPLE_USERS`

Parameter penting:
- `workspace_gid`
- `team_gid`

Catatan:
- User dan team bersifat workspace-scoped.
- Resolusi team atau user sebaiknya dilakukan sebelum assignment task.

### 4. Operasi paralel

Gunakan `ASANA_SUBMIT_PARALLEL_REQUESTS` saat perlu mengeksekusi beberapa request API sekaligus.

Parameter penting:
- `actions`: array aksi berisi method, path, dan data.

Pitfall utama:
- Tiap aksi harus valid sebagai request API Asana.
- Kegagalan satu aksi tidak membatalkan aksi lain yang sudah sukses.

## Pola kerja yang direkomendasikan

### Resolusi ID

- Workspace name ke GID: `ASANA_GET_MULTIPLE_WORKSPACES`
- Project name ke GID: `ASANA_GET_WORKSPACE_PROJECTS`
- Section target: `ASANA_GET_SECTIONS_IN_PROJECT`
- User target: `ASANA_GET_USERS_FOR_WORKSPACE` atau `ASANA_GET_USERS_FOR_TEAM`

### Pagination

- Asana memakai cursor atau `offset` pada banyak endpoint.
- Ikuti `next_page.offset` sampai habis.
- Jangan ubah filter di tengah pagination.

## Pitfall penting

- Semua ID Asana adalah string GID.
- Banyak operasi gagal bila workspace context tidak diberikan.
- Search task tidak otomatis terbatas ke project tertentu kecuali difilter eksplisit.
- Operasi paralel tidak transactional.

## Checklist eksekusi

1. Panggil `RUBE_SEARCH_TOOLS`.
2. Pastikan koneksi `asana` aktif.
3. Resolve workspace, project, section, atau user ke GID.
4. Jalankan operasi inti.
5. Verifikasi hasil dengan membaca ulang task, project, atau section terkait.

## Referensi tool cepat

- `ASANA_GET_MULTIPLE_WORKSPACES`
- `ASANA_SEARCH_TASKS_IN_WORKSPACE`
- `ASANA_GET_TASKS_FROM_A_PROJECT`
- `ASANA_CREATE_A_TASK`
- `ASANA_GET_A_TASK`
- `ASANA_CREATE_SUBTASK`
- `ASANA_GET_TASK_SUBTASKS`
- `ASANA_GET_WORKSPACE_PROJECTS`
- `ASANA_GET_A_PROJECT`
- `ASANA_CREATE_A_PROJECT`
- `ASANA_GET_SECTIONS_IN_PROJECT`
- `ASANA_CREATE_SECTION_IN_PROJECT`
- `ASANA_ADD_TASK_TO_SECTION`
- `ASANA_GET_TASKS_FROM_A_SECTION`
- `ASANA_GET_TEAMS_IN_WORKSPACE`
- `ASANA_GET_USERS_FOR_TEAM`
- `ASANA_GET_USERS_FOR_WORKSPACE`
- `ASANA_GET_CURRENT_USER`
- `ASANA_GET_MULTIPLE_USERS`
- `ASANA_SUBMIT_PARALLEL_REQUESTS`

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/asana-automation` agar mandiri dan konsisten untuk format KiloCode.
