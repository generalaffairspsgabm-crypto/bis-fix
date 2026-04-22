---
name: azure-identity-py
description: Gunakan saat membangun autentikasi Azure SDK di Python dengan `DefaultAzureCredential`, service principal, managed identity, dan pola kredensial produksi.
license: Complete terms in LICENSE.txt
metadata:
  category: cloud
  source:
    upstream: .tmp-antigravity-skills/skills/azure-identity-py
    type: community
  depends_on:
    - Python 3
    - paket `azure-identity`
    - akses ke Microsoft Entra ID atau managed identity Azure
---

# Azure Identity SDK untuk Python

Skill ini memandu penggunaan `azure-identity` di Python untuk autentikasi ke layanan Azure. Fokusnya mencakup `DefaultAzureCredential`, service principal, managed identity, environment variable, dan praktik aman untuk produksi.

## Kapan digunakan

Gunakan skill ini saat perlu:
- mengautentikasi Azure SDK tanpa hardcode secret
- memakai `DefaultAzureCredential` untuk local development dan production
- menghubungkan aplikasi ke layanan Azure dengan managed identity
- memakai service principal untuk automation atau CI/CD
- menstandarkan pola autentikasi lintas banyak SDK Azure di Python

## Dependensi

```bash
pip install azure-identity
```

## Konsep inti

`azure-identity` menyediakan credential object yang dipakai oleh banyak SDK Azure. Credential ini menangani token acquisition ke Microsoft Entra ID.

Credential yang umum:
- `DefaultAzureCredential`
- `ManagedIdentityCredential`
- `ClientSecretCredential`
- `AzureCliCredential`
- `EnvironmentCredential`

## DefaultAzureCredential

Ini adalah pilihan default paling praktis untuk sebagian besar aplikasi.

```python
from azure.identity import DefaultAzureCredential

credential = DefaultAzureCredential()
```

Biasanya credential ini mencoba beberapa sumber secara berurutan, seperti:
- environment variables
- managed identity
- Azure CLI login
- developer tooling lain yang didukung

Contoh penggunaan dengan SDK lain:

```python
from azure.identity import DefaultAzureCredential
from azure.storage.blob import BlobServiceClient

credential = DefaultAzureCredential()
client = BlobServiceClient(
    account_url="https://<account>.blob.core.windows.net",
    credential=credential,
)
```

## EnvironmentCredential

Gunakan bila ingin eksplisit memakai service principal dari environment variable.

```bash
AZURE_TENANT_ID=<tenant-id>
AZURE_CLIENT_ID=<client-id>
AZURE_CLIENT_SECRET=<client-secret>
```

```python
from azure.identity import EnvironmentCredential

credential = EnvironmentCredential()
```

## ClientSecretCredential

```python
from azure.identity import ClientSecretCredential

credential = ClientSecretCredential(
    tenant_id="<tenant-id>",
    client_id="<client-id>",
    client_secret="<client-secret>",
)
```

Gunakan ini bila Anda memang perlu mengontrol service principal secara eksplisit.

## ManagedIdentityCredential

Untuk workload yang berjalan di Azure, managed identity biasanya lebih aman daripada secret.

```python
from azure.identity import ManagedIdentityCredential

credential = ManagedIdentityCredential()
```

Jika memakai user-assigned managed identity:

```python
credential = ManagedIdentityCredential(client_id="<managed-identity-client-id>")
```

## AzureCliCredential

Berguna untuk local development setelah login dengan Azure CLI.

```python
from azure.identity import AzureCliCredential

credential = AzureCliCredential()
```

## Mengambil token langsung

Kadang Anda perlu token mentah untuk REST call.

```python
from azure.identity import DefaultAzureCredential

credential = DefaultAzureCredential()
token = credential.get_token("https://storage.azure.com/.default")
print(token.token)
```

## Praktik terbaik

- gunakan `DefaultAzureCredential` sebagai default utama
- gunakan managed identity untuk workload yang berjalan di Azure
- gunakan service principal hanya bila managed identity tidak tersedia
- simpan secret di environment variable atau secret manager, bukan source code
- reuse credential object, jangan buat ulang terus-menerus
- dokumentasikan scope token yang dibutuhkan bila memakai REST manual

## Strategi pemilihan credential

- local development: `DefaultAzureCredential` atau `AzureCliCredential`
- aplikasi di Azure: `DefaultAzureCredential` dengan managed identity aktif
- CI/CD non-interaktif: `EnvironmentCredential` atau `ClientSecretCredential`
- skenario multi-tenant atau kontrol eksplisit: credential spesifik sesuai kebutuhan

## Anti-pattern yang perlu dihindari

- hardcode client secret di repository
- memakai credential berbeda-beda tanpa standar lintas service
- membuat credential baru di setiap request
- mengandalkan login interaktif untuk workload server produksi
- tidak menutup credential async bila memakai varian async

## Sumber upstream

Konten dinormalisasi dari `.tmp-antigravity-skills/skills/azure-identity-py` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
