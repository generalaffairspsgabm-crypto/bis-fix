---
name: azure-data-tables-py
description: Gunakan saat membangun integrasi Azure Data Tables di Python untuk entity CRUD, inspeksi skema ringan, query, dan transaksi batch.
license: Complete terms in LICENSE.txt
metadata:
  category: cloud
  source:
    upstream: .tmp-antigravity-skills/skills/azure-data-tables-py
    type: community
  depends_on:
    - Python 3
    - paket `azure-data-tables`
    - paket `azure-identity`
    - akun Azure Storage Table atau Azure Cosmos DB Table API
---

# Azure Data Tables SDK untuk Python

Skill ini memandu penggunaan SDK Python untuk Azure Data Tables, baik untuk Azure Storage Table maupun Azure Cosmos DB Table API. Fokusnya mencakup autentikasi, pembuatan tabel, CRUD entity, query, dan batch transaction.

## Kapan digunakan

Gunakan skill ini saat perlu:
- menyimpan data semi-terstruktur berbasis `PartitionKey` dan `RowKey`
- membuat metadata store, lookup table, atau state ringan
- melakukan query sederhana tanpa relasi kompleks
- menjalankan transaksi batch dalam satu partition
- mengakses Azure Table Storage dari aplikasi Python

## Dependensi

```bash
pip install azure-data-tables azure-identity
```

## Konfigurasi environment

```bash
AZURE_TABLES_ENDPOINT=https://<account>.table.core.windows.net
AZURE_TABLES_CONNECTION_STRING=<connection-string>
AZURE_TABLES_TABLE_NAME=mytable
```

## Autentikasi

### Dengan connection string

```python
from azure.data.tables import TableClient

client = TableClient.from_connection_string(
    conn_str="<connection-string>",
    table_name="mytable",
)
```

### Dengan Microsoft Entra ID

```python
from azure.data.tables import TableClient
from azure.identity import DefaultAzureCredential

credential = DefaultAzureCredential()
client = TableClient(
    endpoint="https://<account>.table.core.windows.net",
    table_name="mytable",
    credential=credential,
)
```

## Membuat tabel

```python
from azure.data.tables import TableServiceClient

service = TableServiceClient.from_connection_string("<connection-string>")
service.create_table_if_not_exists(table_name="mytable")
```

## Model entity

Entity minimal harus memiliki:
- `PartitionKey`
- `RowKey`

Contoh entity:

```python
entity = {
    "PartitionKey": "tenant-001",
    "RowKey": "user-001",
    "name": "Rina",
    "email": "rina@example.com",
    "active": True,
}
```

## CRUD entity

### Create entity

```python
client.create_entity(entity=entity)
```

### Upsert entity

```python
client.upsert_entity(mode="MERGE", entity=entity)
```

### Read entity

```python
loaded = client.get_entity(partition_key="tenant-001", row_key="user-001")
print(loaded["email"])
```

### Update entity

```python
loaded = client.get_entity(partition_key="tenant-001", row_key="user-001")
loaded["active"] = False
client.update_entity(mode="MERGE", entity=loaded)
```

### Delete entity

```python
client.delete_entity(partition_key="tenant-001", row_key="user-001")
```

## Query entity

### List semua entity

```python
for entity in client.list_entities():
    print(entity["PartitionKey"], entity["RowKey"])
```

### Filter OData

```python
entities = client.query_entities(
    query_filter="PartitionKey eq @pk and active eq @active",
    parameters={"pk": "tenant-001", "active": True},
)

for entity in entities:
    print(entity["RowKey"])
```

### Projection kolom tertentu

```python
entities = client.query_entities(
    query_filter="PartitionKey eq 'tenant-001'",
    select=["RowKey", "email"],
)
```

## Batch transaction

Semua operasi batch harus berada dalam partition yang sama.

```python
operations = [
    ("create", {
        "PartitionKey": "tenant-001",
        "RowKey": "user-101",
        "name": "A",
    }),
    ("create", {
        "PartitionKey": "tenant-001",
        "RowKey": "user-102",
        "name": "B",
    }),
]

client.submit_transaction(operations)
```

## Praktik terbaik

- desain `PartitionKey` berdasarkan pola akses utama
- gunakan `RowKey` yang unik dan stabil
- simpan entity tetap kecil dan fokus
- gunakan query terfilter, bukan scan penuh tabel, untuk jalur utama
- gunakan batch hanya untuk entity dalam partition yang sama
- pilih Entra ID untuk produksi bila memungkinkan

## Anti-pattern yang perlu dihindari

- satu `PartitionKey` untuk hampir semua data
- menyimpan payload besar yang lebih cocok di Blob Storage
- mengandalkan full scan untuk fitur utama
- mencampur operasi lintas partition dalam satu transaksi
- menyimpan connection string di source code

## Sumber upstream

Konten dinormalisasi dari `.tmp-antigravity-skills/skills/azure-data-tables-py` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
