---
name: azure-cosmos-db-py
description: Gunakan saat membangun layanan Azure Cosmos DB NoSQL production-grade di Python dengan pola service layer, autentikasi aman, validasi partition key, dan pengujian terstruktur.
license: Complete terms in LICENSE.txt
metadata:
  category: cloud
  source:
    upstream: .tmp-antigravity-skills/skills/azure-cosmos-db-py
    type: community
  depends_on:
    - Python 3
    - paket `azure-cosmos`
    - paket `azure-identity`
    - akses ke akun Azure Cosmos DB atau emulator lokal
    - framework aplikasi seperti FastAPI atau service layer Python serupa
---

# Implementasi Service Azure Cosmos DB untuk Python

Skill ini memandu pembangunan service Azure Cosmos DB NoSQL yang siap produksi. Fokusnya bukan hanya CRUD, tetapi juga boundary arsitektur, autentikasi, graceful degradation, validasi keamanan, dan pola test-first.

## Kapan digunakan

Gunakan skill ini saat perlu:
- membangun modul akses data Cosmos DB untuk backend Python
- membuat service layer di atas container Cosmos DB
- memakai `DefaultAzureCredential` di Azure dan key emulator saat lokal
- menata model request, response, dan model internal secara konsisten
- menulis test untuk service yang bergantung pada Cosmos DB
- menangani kegagalan Cosmos DB tanpa merusak seluruh aplikasi

## Dependensi

```bash
pip install azure-cosmos azure-identity
```

## Konfigurasi environment

```bash
COSMOS_ENDPOINT=https://<account>.documents.azure.com:443/
COSMOS_DATABASE_NAME=<database-name>
COSMOS_CONTAINER_ID=<container-id>
COSMOS_KEY=<emulator-key>
```

Catatan:
- `COSMOS_KEY` dipakai hanya untuk emulator lokal
- untuk deployment Azure, utamakan Microsoft Entra ID melalui `DefaultAzureCredential`

## Arsitektur yang direkomendasikan

Pisahkan tanggung jawab menjadi tiga lapisan:

1. router atau handler HTTP
   - autentikasi dan otorisasi request
   - mapping error HTTP
2. service layer
   - business logic
   - validasi input dan otorisasi berbasis partition key
   - konversi dokumen ke model domain
3. modul client Cosmos DB
   - inisialisasi singleton client atau container
   - pemilihan mode autentikasi
   - wrapper async bila SDK dipakai dari aplikasi async

## Pola autentikasi

### Produksi dengan `DefaultAzureCredential`

```python
import os
from azure.cosmos import CosmosClient
from azure.identity import DefaultAzureCredential

client = CosmosClient(
    url=os.environ["COSMOS_ENDPOINT"],
    credential=DefaultAzureCredential(),
)
```

### Emulator lokal

```python
from azure.cosmos import CosmosClient

client = CosmosClient(
    url="https://localhost:8081",
    credential=os.environ["COSMOS_KEY"],
    connection_verify=False,
)
```

## Pola modul client

Gunakan singleton agar koneksi tidak dibuat berulang:

```python
from azure.cosmos import CosmosClient
from azure.identity import DefaultAzureCredential

_cosmos_container = None


def _is_emulator_endpoint(endpoint: str) -> bool:
    return "localhost" in endpoint or "127.0.0.1" in endpoint


async def get_container(settings):
    global _cosmos_container

    if _cosmos_container is None:
        if _is_emulator_endpoint(settings.cosmos_endpoint):
            client = CosmosClient(
                url=settings.cosmos_endpoint,
                credential=settings.cosmos_key,
                connection_verify=False,
            )
        else:
            client = CosmosClient(
                url=settings.cosmos_endpoint,
                credential=DefaultAzureCredential(),
            )

        database = client.get_database_client(settings.cosmos_database_name)
        _cosmos_container = database.get_container_client(settings.cosmos_container_id)

    return _cosmos_container
```

Jika aplikasi berbasis async tetapi SDK dipakai sinkron, bungkus operasi blocking dengan executor atau helper seperti `run_in_threadpool`.

## Pola model data

Pisahkan model berdasarkan tanggung jawab:

```python
from datetime import datetime
from typing import Optional
from pydantic import BaseModel, Field


class ProjectBase(BaseModel):
    name: str = Field(..., min_length=1, max_length=200)


class ProjectCreate(ProjectBase):
    workspace_id: str = Field(..., alias="workspaceId")


class ProjectUpdate(BaseModel):
    name: Optional[str] = Field(None, min_length=1)


class Project(ProjectBase):
    id: str
    created_at: datetime = Field(..., alias="createdAt")


class ProjectInDB(Project):
    doc_type: str = "project"
```

Pola ini membantu memisahkan:
- payload create
- payload partial update
- response API
- representasi internal dokumen

## Pola service layer

```python
class ProjectService:
    def __init__(self, container_provider):
        self._container_provider = container_provider

    async def _use_cosmos(self) -> bool:
        return await self._container_provider() is not None

    async def get_by_id(self, project_id: str, workspace_id: str):
        container = await self._container_provider()
        if container is None:
            return None

        document = container.read_item(item=project_id, partition_key=workspace_id)
        return self._doc_to_model(document)

    def _doc_to_model(self, document: dict):
        return {
            "id": document["id"],
            "name": document["name"],
        }
```

Sesuaikan implementasi model nyata dengan domain aplikasi. Yang penting adalah boundary service tetap jelas.

## Prinsip inti

### Keamanan

- gunakan RBAC dan `DefaultAzureCredential` di Azure
- jangan simpan key produksi di source code
- gunakan query berparameter, bukan string concatenation
- validasi bahwa partition key yang dipakai sesuai otorisasi user
- jangan izinkan akses lintas partition tanpa alasan bisnis yang jelas

### Clean code

- modul client hanya mengurus koneksi dan inisialisasi
- service layer hanya mengurus business logic
- gunakan nama helper konsisten seperti `_doc_to_model()` dan `_model_to_doc()`
- beri type hints pada method publik
- gunakan alias camelCase bila API eksternal memerlukannya

### Graceful degradation

Jika Cosmos DB tidak tersedia, service dapat:
- mengembalikan `None` untuk lookup tunggal
- mengembalikan list kosong untuk query koleksi
- melempar exception domain yang bisa dipetakan ke fallback terkontrol

Pilih satu strategi dan konsisten di seluruh service.

## Query dan akses data

Gunakan query berparameter:

```python
query = "SELECT * FROM c WHERE c.workspaceId = @workspace_id AND c.docType = @doc_type"
parameters = [
    {"name": "@workspace_id", "value": workspace_id},
    {"name": "@doc_type", "value": "project"},
]

items = list(container.query_items(
    query=query,
    parameters=parameters,
    partition_key=workspace_id,
))
```

## Strategi partition key

Partition key yang baik seharusnya:
- punya kardinalitas tinggi
- sering dipakai pada query utama
- selaras dengan boundary otorisasi
- menghindari hot partition

Contoh umum:
- `workspaceId`
- `tenantId`
- `customerId`

Hindari partition key yang terlalu sedikit variasinya seperti status atau tipe dokumen.

## Pola pengujian

Tulis test sebelum implementasi atau minimal sebelum refactor besar.

```python
import pytest


@pytest.fixture
def mock_cosmos_container(mocker):
    container = mocker.MagicMock()
    mocker.patch("app.db.cosmos.get_container", return_value=container)
    return container


@pytest.mark.asyncio
async def test_get_project_by_id_returns_project(mock_cosmos_container):
    mock_cosmos_container.read_item.return_value = {
        "id": "123",
        "name": "Test",
    }

    result = await project_service.get_by_id("123", "workspace-1")

    assert result["id"] == "123"
    assert result["name"] == "Test"
```

## Checklist implementasi

- siapkan modul client singleton
- pilih autentikasi berdasarkan environment
- definisikan model create, update, response, dan internal
- implementasikan service layer dengan boundary jelas
- gunakan query berparameter
- validasi partition key terhadap konteks user
- tambahkan test untuk success path, not found, dan Cosmos unavailable
- log error transient tanpa membocorkan secret

## Anti-pattern yang perlu dihindari

- memakai key produksi di source code
- mencampur HTTP exception langsung di modul database
- query lintas partition sebagai default
- string concatenation untuk query SQL Cosmos
- membuat client baru pada setiap request
- menyamakan model API dengan dokumen internal tanpa boundary

## Sumber upstream

Konten dinormalisasi dari `.tmp-antigravity-skills/skills/azure-cosmos-db-py` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
