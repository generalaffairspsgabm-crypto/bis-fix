---
name: azure-cosmos-py
description: Gunakan saat membangun integrasi Azure Cosmos DB NoSQL API di Python untuk CRUD dokumen, query, container, throughput, dan operasi async.
license: Complete terms in LICENSE.txt
metadata:
  category: cloud
  source:
    upstream: .tmp-antigravity-skills/skills/azure-cosmos-py
    type: community
  depends_on:
    - Python 3
    - paket `azure-cosmos`
    - paket `azure-identity`
    - akun Azure Cosmos DB NoSQL API
---

# Azure Cosmos DB SDK untuk Python

Skill ini memandu penggunaan SDK Python untuk Azure Cosmos DB NoSQL API, termasuk setup database dan container, CRUD item, query, throughput, partition key, dan client async.

## Kapan digunakan

Gunakan skill ini saat perlu:
- membuat atau mengakses database dan container Cosmos DB
- melakukan CRUD dokumen berbasis partition key
- menjalankan query terparameterisasi
- mengatur throughput container
- memakai client async untuk workload I/O-bound
- membangun service data plane Python di atas Cosmos DB

## Dependensi

```bash
pip install azure-cosmos azure-identity
```

## Konfigurasi environment

```bash
COSMOS_ENDPOINT=https://<account>.documents.azure.com:443/
COSMOS_DATABASE=mydb
COSMOS_CONTAINER=mycontainer
```

## Autentikasi

Gunakan Microsoft Entra ID bila memungkinkan:

```python
from azure.identity import DefaultAzureCredential
from azure.cosmos import CosmosClient

credential = DefaultAzureCredential()
endpoint = "https://<account>.documents.azure.com:443/"

client = CosmosClient(url=endpoint, credential=credential)
```

## Hierarki client

- `CosmosClient` untuk operasi level account
- `DatabaseProxy` untuk operasi database
- `ContainerProxy` untuk operasi container dan item

## Workflow inti

### Setup database dan container

```python
from azure.cosmos import PartitionKey

# Get or create database
database = client.create_database_if_not_exists(id="mydb")

# Get or create container
container = database.create_container_if_not_exists(
    id="mycontainer",
    partition_key=PartitionKey(path="/category"),
)

# Get existing resources
database = client.get_database_client("mydb")
container = database.get_container_client("mycontainer")
```

## CRUD item

### Create item

```python
item = {
    "id": "item-001",
    "category": "electronics",
    "name": "Laptop",
    "price": 999.99,
    "tags": ["computer", "portable"],
}

created = container.create_item(body=item)
print(created["id"])
```

### Read item

```python
item = container.read_item(
    item="item-001",
    partition_key="electronics",
)
print(item["name"])
```

### Replace item

```python
item = container.read_item(item="item-001", partition_key="electronics")
item["price"] = 899.99
item["on_sale"] = True

updated = container.replace_item(item=item["id"], body=item)
```

### Upsert item

```python
item = {
    "id": "item-002",
    "category": "electronics",
    "name": "Tablet",
    "price": 499.99,
}

result = container.upsert_item(body=item)
```

### Delete item

```python
container.delete_item(
    item="item-001",
    partition_key="electronics",
)
```

## Query

### Query dalam satu partition

```python
query = "SELECT * FROM c WHERE c.price < @max_price"
items = container.query_items(
    query=query,
    parameters=[{"name": "@max_price", "value": 500}],
    partition_key="electronics",
)

for item in items:
    print(f"{item['name']}: ${item['price']}")
```

### Query lintas partition

```python
query = "SELECT * FROM c WHERE c.price < @max_price"
items = container.query_items(
    query=query,
    parameters=[{"name": "@max_price", "value": 500}],
    enable_cross_partition_query=True,
)

for item in items:
    print(item)
```

Gunakan query lintas partition secara hemat karena biaya RU lebih tinggi.

### Query dengan projection

```python
query = "SELECT c.id, c.name, c.price FROM c WHERE c.category = @category"
items = container.query_items(
    query=query,
    parameters=[{"name": "@category", "value": "electronics"}],
    partition_key="electronics",
)
```

### Membaca semua item

```python
items = container.read_all_items()
```

Untuk workload produksi, lebih aman gunakan query yang dibatasi partition key atau filter yang jelas.

## Partition key

Partition key sangat penting untuk efisiensi operasi.

```python
from azure.cosmos import PartitionKey

container = database.create_container_if_not_exists(
    id="orders",
    partition_key=PartitionKey(path="/customer_id"),
)
```

Contoh hierarchical partition key:

```python
container = database.create_container_if_not_exists(
    id="events",
    partition_key=PartitionKey(path=["/tenant_id", "/user_id"]),
)
```

## Throughput

```python
container = database.create_container_if_not_exists(
    id="mycontainer",
    partition_key=PartitionKey(path="/pk"),
    offer_throughput=400,
)

offer = container.read_offer()
print(f"Throughput: {offer.offer_throughput} RU/s")

container.replace_throughput(throughput=1000)
```

## Client async

```python
from azure.cosmos.aio import CosmosClient
from azure.identity.aio import DefaultAzureCredential

async def main():
    credential = DefaultAzureCredential()
    client = CosmosClient(url=endpoint, credential=credential)

    database = client.get_database_client("mydb")
    container = database.get_container_client("mycontainer")

    item = await container.read_item(item="item-001", partition_key="electronics")
    print(item)

    await client.close()
    await credential.close()
```

## Praktik terbaik

- selalu sertakan partition key untuk point read dan write
- gunakan query berparameter, bukan string concatenation
- pilih partition key dengan kardinalitas tinggi
- reuse client dan container proxy
- pantau biaya RU pada query mahal
- gunakan async client untuk concurrency tinggi
- batasi `read_all_items()` pada skenario administrasi atau debugging

## Anti-pattern yang perlu dihindari

- query lintas partition sebagai default
- partition key yang buruk seperti nilai status atau boolean
- membuat client baru di setiap request
- menyimpan secret di source code
- mengabaikan throughput saat beban meningkat

## Sumber upstream

Konten dinormalisasi dari `.tmp-antigravity-skills/skills/azure-cosmos-py` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
