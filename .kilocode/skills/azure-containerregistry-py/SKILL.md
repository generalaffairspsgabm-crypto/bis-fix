---
name: azure-containerregistry-py
description: Gunakan saat mengelola image container, artefak OCI, repository, tag, dan manifest di Azure Container Registry menggunakan SDK Python.
license: Complete terms in LICENSE.txt
metadata:
  category: cloud
  source:
    upstream: .tmp-antigravity-skills/skills/azure-containerregistry-py
    type: community
  depends_on:
    - Python 3
    - paket `azure-containerregistry`
    - paket `azure-identity` untuk autentikasi Microsoft Entra ID
    - endpoint Azure Container Registry yang valid
---

# Azure Container Registry SDK untuk Python

Skill ini membantu penggunaan SDK Python untuk Azure Container Registry agar operasi repository, tag, manifest, dan artefak OCI dilakukan dengan pola yang aman, jelas, dan siap produksi.

## Kapan digunakan

Gunakan skill ini saat perlu:
- membaca daftar repository pada registry
- memeriksa atau memperbarui properti repository
- membaca, memfilter, atau menghapus tag dan manifest
- mengunduh manifest atau blob artefak
- mengotomasi housekeeping image lama
- memakai client async untuk workload I/O-bound

## Dependensi

Instal paket yang dibutuhkan:

```bash
pip install azure-containerregistry azure-identity
```

## Konfigurasi environment

Siapkan endpoint registry:

```bash
AZURE_CONTAINERREGISTRY_ENDPOINT=https://<nama-registry>.azurecr.io
```

Untuk registry publik seperti Microsoft Container Registry, gunakan endpoint publik yang sesuai.

## Autentikasi

### Microsoft Entra ID

Gunakan pendekatan ini untuk workload produksi:

```python
import os
from azure.containerregistry import ContainerRegistryClient
from azure.identity import DefaultAzureCredential

client = ContainerRegistryClient(
    endpoint=os.environ["AZURE_CONTAINERREGISTRY_ENDPOINT"],
    credential=DefaultAzureCredential(),
)
```

### Akses anonim untuk registry publik

Gunakan hanya bila registry memang mengizinkan akses publik:

```python
from azure.containerregistry import ContainerRegistryClient

client = ContainerRegistryClient(
    endpoint="https://mcr.microsoft.com",
    credential=None,
    audience="https://mcr.microsoft.com",
)
```

## Operasi inti

### Daftar repository

```python
from azure.containerregistry import ContainerRegistryClient
from azure.identity import DefaultAzureCredential

client = ContainerRegistryClient(endpoint, DefaultAzureCredential())

for repository in client.list_repository_names():
    print(repository)
```

### Baca properti repository

```python
properties = client.get_repository_properties("my-image")
print(f"Created: {properties.created_on}")
print(f"Modified: {properties.last_updated_on}")
print(f"Manifest count: {properties.manifest_count}")
print(f"Tag count: {properties.tag_count}")
```

### Perbarui properti repository

```python
from azure.containerregistry import RepositoryProperties

client.update_repository_properties(
    "my-image",
    properties=RepositoryProperties(
        can_delete=False,
        can_write=False,
    ),
)
```

### Hapus repository

```python
client.delete_repository("my-image")
```

## Operasi tag

### Daftar tag

```python
for tag in client.list_tag_properties("my-image"):
    print(f"{tag.name}: {tag.created_on}")
```

### Urutkan tag berdasarkan waktu update

```python
from azure.containerregistry import ArtifactTagOrder

for tag in client.list_tag_properties(
    "my-image",
    order_by=ArtifactTagOrder.LAST_UPDATED_ON_DESCENDING,
):
    print(f"{tag.name}: {tag.last_updated_on}")
```

### Baca properti tag

```python
tag = client.get_tag_properties("my-image", "latest")
print(f"Digest: {tag.digest}")
print(f"Created: {tag.created_on}")
```

### Hapus tag

```python
client.delete_tag("my-image", "old-tag")
```

## Operasi manifest

### Daftar manifest

```python
from azure.containerregistry import ArtifactManifestOrder

for manifest in client.list_manifest_properties(
    "my-image",
    order_by=ArtifactManifestOrder.LAST_UPDATED_ON_DESCENDING,
):
    print(f"Digest: {manifest.digest}")
    print(f"Tags: {manifest.tags}")
    print(f"Size: {manifest.size_in_bytes}")
```

### Baca properti manifest

```python
manifest = client.get_manifest_properties("my-image", "latest")
print(f"Digest: {manifest.digest}")
print(f"Architecture: {manifest.architecture}")
print(f"OS: {manifest.operating_system}")
```

### Perbarui properti manifest

```python
from azure.containerregistry import ArtifactManifestProperties

client.update_manifest_properties(
    "my-image",
    "latest",
    properties=ArtifactManifestProperties(
        can_delete=False,
        can_write=False,
    ),
)
```

### Hapus manifest

```python
client.delete_manifest("my-image", "sha256:abc123...")
```

Jika hanya tahu tag, ambil digest lebih dulu:

```python
manifest = client.get_manifest_properties("my-image", "old-tag")
client.delete_manifest("my-image", manifest.digest)
```

## Unduh artefak

### Unduh manifest

```python
manifest = client.download_manifest("my-image", "latest")
print(f"Media type: {manifest.media_type}")
print(f"Digest: {manifest.digest}")
```

### Unduh blob

```python
blob = client.download_blob("my-image", "sha256:abc123...")
with open("layer.tar.gz", "wb") as file_handle:
    for chunk in blob:
        file_handle.write(chunk)
```

## Client async

Gunakan untuk operasi paralel atau throughput tinggi:

```python
from azure.containerregistry.aio import ContainerRegistryClient
from azure.identity.aio import DefaultAzureCredential

async def list_repositories(endpoint: str) -> None:
    credential = DefaultAzureCredential()
    client = ContainerRegistryClient(endpoint, credential)

    async for repo in client.list_repository_names():
        print(repo)

    await client.close()
    await credential.close()
```

## Housekeeping image lama

Contoh pola pembersihan manifest lama berdasarkan cutoff waktu:

```python
from datetime import datetime, timedelta, timezone

cutoff = datetime.now(timezone.utc) - timedelta(days=30)

for manifest in client.list_manifest_properties("my-image"):
    if manifest.last_updated_on and manifest.last_updated_on < cutoff:
        client.delete_manifest("my-image", manifest.digest)
```

Selalu uji dalam mode observasi dulu sebelum benar-benar menghapus.

## Praktik terbaik

- utamakan `DefaultAzureCredential` atau managed identity dibanding secret statis
- gunakan operasi hapus berdasarkan digest agar target lebih presisi
- audit properti `can_delete` dan `can_write` sebelum housekeeping massal
- pisahkan operasi baca dan operasi destruktif dalam workflow berbeda
- tutup client async dan credential async secara eksplisit
- log digest, repository, dan timestamp saat melakukan cleanup otomatis

## Batasan penting

- akses anonim hanya berlaku untuk registry publik tertentu
- operasi hapus repository akan menghapus seluruh tag dan manifest di dalamnya
- urutan tag atau manifest sebaiknya dipakai untuk seleksi, bukan sebagai satu-satunya kontrol keamanan

## Sumber upstream

Konten dinormalisasi dari `.tmp-antigravity-skills/skills/azure-containerregistry-py` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
