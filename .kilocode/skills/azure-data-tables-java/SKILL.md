---
name: azure-data-tables-java
description: Gunakan saat membangun integrasi Azure Table Storage atau Azure Data Tables di Java untuk entity CRUD, query, batch transaction, dan autentikasi modern.
license: Complete terms in LICENSE.txt
metadata:
  category: cloud
  source:
    upstream: .tmp-antigravity-skills/skills/azure-data-tables-java
    type: community
  depends_on:
    - Java
    - dependensi Maven `com.azure:azure-data-tables`
    - akun Azure Storage atau Azure Cosmos DB Table API
---

# Azure Data Tables SDK untuk Java

Skill ini memandu penggunaan SDK Java untuk Azure Data Tables, baik pada Azure Storage Table maupun Azure Cosmos DB Table API. Fokusnya mencakup autentikasi, pembuatan tabel, CRUD entity, query, dan transaksi batch.

## Kapan digunakan

Gunakan skill ini saat perlu:
- menyimpan data key-value semi-terstruktur berbasis `PartitionKey` dan `RowKey`
- membangun lookup table, metadata store, atau state ringan
- melakukan query sederhana tanpa kebutuhan relasi kompleks
- menjalankan batch transaction dalam satu partition
- memakai Azure Table Storage atau Cosmos DB Table API dari Java

## Dependensi

```xml
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-data-tables</artifactId>
    <version>LATEST</version>
</dependency>
```

## Konfigurasi environment

```bash
AZURE_TABLES_ENDPOINT=https://<account>.table.core.windows.net
AZURE_TABLES_CONNECTION_STRING=<connection-string>
AZURE_TABLES_TABLE_NAME=mytable
```

## Autentikasi

### Dengan connection string

```java
import com.azure.data.tables.TableClient;
import com.azure.data.tables.TableClientBuilder;

TableClient tableClient = new TableClientBuilder()
    .connectionString(System.getenv("AZURE_TABLES_CONNECTION_STRING"))
    .tableName("mytable")
    .buildClient();
```

### Dengan Microsoft Entra ID

```java
import com.azure.data.tables.TableClient;
import com.azure.data.tables.TableClientBuilder;
import com.azure.identity.DefaultAzureCredentialBuilder;

TableClient tableClient = new TableClientBuilder()
    .endpoint(System.getenv("AZURE_TABLES_ENDPOINT"))
    .credential(new DefaultAzureCredentialBuilder().build())
    .tableName("mytable")
    .buildClient();
```

## Membuat tabel

```java
tableClient.createTable();
```

Atau gunakan client service untuk membuat tabel bila belum ada:

```java
import com.azure.data.tables.TableServiceClient;
import com.azure.data.tables.TableServiceClientBuilder;

TableServiceClient serviceClient = new TableServiceClientBuilder()
    .connectionString(System.getenv("AZURE_TABLES_CONNECTION_STRING"))
    .buildClient();

serviceClient.createTableIfNotExists("mytable");
```

## Model entity

Gunakan `TableEntity` untuk struktur fleksibel:

```java
import com.azure.data.tables.models.TableEntity;

TableEntity entity = new TableEntity("tenant-001", "user-001")
    .addProperty("name", "Rina")
    .addProperty("email", "rina@example.com")
    .addProperty("active", true);
```

- `PartitionKey` mengelompokkan entity
- `RowKey` mengidentifikasi entity unik dalam partition

## CRUD entity

### Create entity

```java
tableClient.createEntity(entity);
```

### Upsert entity

```java
tableClient.upsertEntity(entity);
```

### Read entity

```java
TableEntity loaded = tableClient.getEntity("tenant-001", "user-001");
System.out.println(loaded.getProperty("email"));
```

### Update entity

```java
TableEntity loaded = tableClient.getEntity("tenant-001", "user-001");
loaded.addProperty("active", false);
tableClient.updateEntity(loaded);
```

### Delete entity

```java
tableClient.deleteEntity("tenant-001", "user-001");
```

## Query entity

### Query semua entity

```java
tableClient.listEntities().forEach(item -> {
    System.out.println(item.getPartitionKey() + " / " + item.getRowKey());
});
```

### Filter berdasarkan properti

```java
tableClient.listEntities().stream()
    .filter(entityItem -> Boolean.TRUE.equals(entityItem.getProperty("active")))
    .forEach(entityItem -> System.out.println(entityItem.getRowKey()));
```

Untuk query server-side, gunakan filter OData bila tersedia pada versi SDK yang dipakai.

## Batch transaction

Semua operasi batch harus berada dalam partition yang sama.

```java
import com.azure.data.tables.models.TableTransactionAction;
import com.azure.data.tables.models.TableTransactionActionType;
import java.util.Arrays;

TableEntity e1 = new TableEntity("tenant-001", "user-101").addProperty("name", "A");
TableEntity e2 = new TableEntity("tenant-001", "user-102").addProperty("name", "B");

tableClient.submitTransaction(Arrays.asList(
    new TableTransactionAction(TableTransactionActionType.CREATE, e1),
    new TableTransactionAction(TableTransactionActionType.CREATE, e2)
));
```

## Praktik terbaik

- desain `PartitionKey` untuk distribusi dan pola query utama
- gunakan `RowKey` yang stabil dan unik
- simpan entity kecil dan fokus pada akses cepat
- gunakan batch hanya untuk entity dalam partition yang sama
- pilih Entra ID untuk produksi bila memungkinkan
- pisahkan model domain dari representasi `TableEntity` bila skema mulai kompleks

## Anti-pattern yang perlu dihindari

- memakai satu `PartitionKey` untuk hampir semua data sehingga hot partition
- menyimpan dokumen besar yang lebih cocok di Blob Storage atau Cosmos DB NoSQL
- mengandalkan scan penuh tabel untuk query utama
- mencampur banyak operasi lintas partition dalam satu batch

## Sumber upstream

Konten dinormalisasi dari `.tmp-antigravity-skills/skills/azure-data-tables-java` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
