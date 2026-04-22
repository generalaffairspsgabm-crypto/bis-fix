---
name: azure-cosmos-ts
description: Gunakan saat membangun integrasi Azure Cosmos DB NoSQL API di TypeScript atau JavaScript untuk CRUD dokumen, query SQL API, container, dan operasi throughput.
license: Complete terms in LICENSE.txt
metadata:
  category: cloud
  source:
    upstream: .tmp-antigravity-skills/skills/azure-cosmos-ts
    type: community
  depends_on:
    - Node.js
    - paket `@azure/cosmos`
    - akun Azure Cosmos DB NoSQL API
---

# Azure Cosmos DB SDK untuk TypeScript

Skill ini memandu penggunaan SDK TypeScript atau JavaScript untuk Azure Cosmos DB NoSQL API, termasuk pembuatan client, database, container, CRUD item, query SQL API, dan pengaturan throughput.

## Kapan digunakan

Gunakan skill ini saat perlu:
- menghubungkan aplikasi Node.js ke Azure Cosmos DB
- membuat database dan container secara programatis
- melakukan CRUD item berbasis partition key
- menjalankan query SQL API dengan parameter
- mengelola throughput container
- membangun repository layer untuk aplikasi backend TypeScript

## Dependensi

```bash
npm install @azure/cosmos
```

## Konfigurasi environment

```bash
COSMOS_ENDPOINT=https://<account>.documents.azure.com:443/
COSMOS_KEY=<primary-key>
COSMOS_DATABASE=mydb
COSMOS_CONTAINER=mycontainer
```

## Autentikasi

```ts
import { CosmosClient } from "@azure/cosmos";

const client = new CosmosClient({
  endpoint: process.env.COSMOS_ENDPOINT!,
  key: process.env.COSMOS_KEY!,
});
```

## Hierarki client

- `CosmosClient` untuk operasi level account
- `database()` untuk akses database
- `container()` untuk akses container
- `items` untuk operasi dokumen

## Workflow inti

### Membuat database dan container

```ts
const { database } = await client.databases.createIfNotExists({
  id: "mydb",
});

const { container } = await database.containers.createIfNotExists({
  id: "products",
  partitionKey: {
    paths: ["/category"],
  },
});
```

### Mengakses resource yang sudah ada

```ts
const database = client.database("mydb");
const container = database.container("products");
```

## CRUD item

### Create item

```ts
const item = {
  id: "product-001",
  category: "electronics",
  name: "Laptop",
  price: 999.99,
};

const { resource } = await container.items.create(item);
console.log(resource?.id);
```

### Read item

```ts
const { resource } = await container
  .item("product-001", "electronics")
  .read();

console.log(resource?.name);
```

### Replace item

```ts
const { resource } = await container
  .item("product-001", "electronics")
  .read();

if (resource) {
  resource.price = 899.99;
  const { resource: updated } = await container
    .item(resource.id, resource.category)
    .replace(resource);
  console.log(updated?.price);
}
```

### Upsert item

```ts
await container.items.upsert({
  id: "product-002",
  category: "electronics",
  name: "Tablet",
  price: 499.99,
});
```

### Delete item

```ts
await container.item("product-001", "electronics").delete();
```

## Query SQL API

### Query dengan parameter

```ts
const querySpec = {
  query: "SELECT * FROM c WHERE c.price < @maxPrice AND c.category = @category",
  parameters: [
    { name: "@maxPrice", value: 1000 },
    { name: "@category", value: "electronics" },
  ],
};

const { resources } = await container.items.query(querySpec).fetchAll();
console.log(resources);
```

### Query dengan projection

```ts
const querySpec = {
  query: "SELECT c.id, c.name, c.price FROM c WHERE c.category = @category",
  parameters: [{ name: "@category", value: "electronics" }],
};

const { resources } = await container.items.query(querySpec).fetchAll();
```

### Iterasi hasil query bertahap

```ts
const iterator = container.items.query({
  query: "SELECT * FROM c WHERE c.category = @category",
  parameters: [{ name: "@category", value: "electronics" }],
});

while (iterator.hasMoreResults()) {
  const { resources } = await iterator.fetchNext();
  for (const item of resources) {
    console.log(item.id);
  }
}
```

## Throughput

### Membuat container dengan throughput

```ts
const { container } = await database.containers.createIfNotExists(
  {
    id: "orders",
    partitionKey: { paths: ["/customerId"] },
  },
  {
    offerThroughput: 400,
  }
);
```

### Membaca throughput

```ts
const { resource: offer } = await container.readOffer();
console.log(offer?.content?.offerThroughput);
```

## Partition key

Pilih partition key yang:
- sering dipakai pada point read
- punya distribusi merata
- tidak menyebabkan hot partition
- selaras dengan tenant, customer, atau workspace bila relevan

## Praktik terbaik

- gunakan query berparameter untuk semua input dinamis
- selalu sertakan partition key saat membaca item tunggal
- reuse `CosmosClient` sebagai singleton aplikasi
- pisahkan repository layer dari handler HTTP
- ukur biaya query dan hindari fetch-all tanpa batas
- gunakan projection bila tidak butuh seluruh dokumen

## Anti-pattern yang perlu dihindari

- menyimpan key di source code
- query tanpa filter pada container besar
- partition key dengan kardinalitas rendah
- membuat client baru di setiap request
- mengandalkan cross-partition query untuk semua use case

## Sumber upstream

Konten dinormalisasi dari `.tmp-antigravity-skills/skills/azure-cosmos-ts` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
