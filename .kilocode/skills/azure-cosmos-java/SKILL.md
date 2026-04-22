---
name: azure-cosmos-java
description: Gunakan saat membangun integrasi Azure Cosmos DB NoSQL di Java untuk operasi database, container, item, query, dan pola reaktif sinkron maupun async.
license: Complete terms in LICENSE.txt
metadata:
  category: cloud
  source:
    upstream: .tmp-antigravity-skills/skills/azure-cosmos-java
    type: community
  depends_on:
    - Java
    - dependensi Maven `com.azure:azure-cosmos`
    - akun Azure Cosmos DB NoSQL API
    - endpoint dan kredensial Cosmos DB
---

# Azure Cosmos DB SDK untuk Java

Skill ini membantu penggunaan SDK Java untuk Azure Cosmos DB NoSQL API, termasuk pembuatan client, database, container, CRUD item, query, dan pengaturan performa dasar.

## Kapan digunakan

Gunakan skill ini saat perlu:
- menghubungkan aplikasi Java ke Azure Cosmos DB
- membuat database atau container secara programatis
- menjalankan CRUD item dengan partition key
- memakai client async berbasis reactive chain
- mengukur konsumsi RU dan menata konsistensi
- membangun service data plane untuk workload global dan throughput tinggi

## Dependensi

Gunakan dependensi Maven berikut:

```xml
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-cosmos</artifactId>
    <version>LATEST</version>
</dependency>
```

Atau gunakan Azure SDK BOM agar versi paket konsisten:

```xml
<dependencyManagement>
    <dependencies>
        <dependency>
            <groupId>com.azure</groupId>
            <artifactId>azure-sdk-bom</artifactId>
            <version>{bom_version}</version>
            <type>pom</type>
            <scope>import</scope>
        </dependency>
    </dependencies>
</dependencyManagement>

<dependencies>
    <dependency>
        <groupId>com.azure</groupId>
        <artifactId>azure-cosmos</artifactId>
    </dependency>
</dependencies>
```

## Konfigurasi environment

```bash
COSMOS_ENDPOINT=https://<account>.documents.azure.com:443/
COSMOS_KEY=<primary-key>
```

## Autentikasi

### Client sinkron berbasis key

```java
import com.azure.cosmos.CosmosClient;
import com.azure.cosmos.CosmosClientBuilder;

CosmosClient client = new CosmosClientBuilder()
    .endpoint(System.getenv("COSMOS_ENDPOINT"))
    .key(System.getenv("COSMOS_KEY"))
    .buildClient();
```

### Client async

```java
import com.azure.cosmos.CosmosAsyncClient;
import com.azure.cosmos.CosmosClientBuilder;

CosmosAsyncClient asyncClient = new CosmosClientBuilder()
    .endpoint(System.getenv("COSMOS_ENDPOINT"))
    .key(System.getenv("COSMOS_KEY"))
    .buildAsyncClient();
```

### Client dengan kustomisasi

```java
import com.azure.cosmos.ConsistencyLevel;
import java.util.Arrays;

CosmosClient client = new CosmosClientBuilder()
    .endpoint(serviceEndpoint)
    .key(key)
    .directMode(directConnectionConfig, gatewayConnectionConfig)
    .consistencyLevel(ConsistencyLevel.SESSION)
    .connectionSharingAcrossClientsEnabled(true)
    .contentResponseOnWriteEnabled(true)
    .userAgentSuffix("my-application")
    .preferredRegions(Arrays.asList("West US", "East US"))
    .buildClient();
```

## Hierarki client

- `CosmosClient` atau `CosmosAsyncClient` untuk operasi level account
- `CosmosDatabase` atau `CosmosAsyncDatabase` untuk operasi database
- `CosmosContainer` atau `CosmosAsyncContainer` untuk operasi item dan query

## Workflow inti

### Membuat database

```java
client.createDatabaseIfNotExists("myDatabase")
    .map(response -> client.getDatabase(response.getProperties().getId()));
```

Versi async:

```java
asyncClient.createDatabaseIfNotExists("myDatabase")
    .map(response -> asyncClient.getDatabase(response.getProperties().getId()))
    .subscribe(database -> System.out.println("Created: " + database.getId()));
```

### Membuat container

```java
asyncClient.createDatabaseIfNotExists("myDatabase")
    .flatMap(dbResponse -> {
        String databaseId = dbResponse.getProperties().getId();
        return asyncClient.getDatabase(databaseId)
            .createContainerIfNotExists("myContainer", "/partitionKey")
            .map(containerResponse -> asyncClient.getDatabase(databaseId)
                .getContainer(containerResponse.getProperties().getId()));
    })
    .subscribe(container -> System.out.println("Container: " + container.getId()));
```

## CRUD item

```java
import com.azure.cosmos.models.PartitionKey;

CosmosAsyncContainer container = asyncClient
    .getDatabase("myDatabase")
    .getContainer("myContainer");

container.createItem(new User("1", "John Doe", "john@example.com"))
    .flatMap(response -> container.readItem(
        response.getItem().getId(),
        new PartitionKey(response.getItem().getId()),
        User.class))
    .flatMap(response -> {
        User user = response.getItem();
        user.setEmail("john.doe@example.com");
        return container.replaceItem(
            user,
            user.getId(),
            new PartitionKey(user.getId()));
    })
    .flatMap(response -> container.deleteItem(
        response.getItem().getId(),
        new PartitionKey(response.getItem().getId())))
    .block();
```

## Query dokumen

```java
import com.azure.cosmos.models.CosmosQueryRequestOptions;
import com.azure.cosmos.util.CosmosPagedIterable;

CosmosContainer container = client
    .getDatabase("myDatabase")
    .getContainer("myContainer");

String query = "SELECT * FROM c WHERE c.status = @status";
CosmosQueryRequestOptions options = new CosmosQueryRequestOptions();

CosmosPagedIterable<User> results = container.queryItems(
    query,
    options,
    User.class
);

results.forEach(user -> System.out.println("User: " + user.getName()));
```

Untuk keamanan, gunakan parameter query bila tersedia pada pola implementasi Anda dan hindari string concatenation dari input user.

## Konsep penting

### Partition key

Pilih partition key yang:
- punya kardinalitas tinggi
- mendistribusikan data dan trafik secara merata
- sering dipakai pada query utama
- selaras dengan boundary tenant atau workspace

### Consistency level

Level umum yang tersedia:
- Strong
- Bounded Staleness
- Session
- Consistent Prefix
- Eventual

Gunakan `Session` sebagai default pragmatis bila tidak ada kebutuhan konsistensi lebih kuat.

### Request Units

Semua operasi mengonsumsi RU. Pantau charge untuk tuning performa:

```java
CosmosItemResponse<User> response = container.createItem(user);
System.out.println("RU charge: " + response.getRequestCharge());
```

## Praktik terbaik

- reuse client dan container, jangan buat ulang per request
- selalu sertakan partition key untuk point read dan write
- gunakan async client untuk throughput tinggi atau pipeline reaktif
- ukur RU pada operasi mahal seperti query lintas partition
- pilih consistency level berdasarkan kebutuhan bisnis, bukan default acak
- gunakan region preference bila aplikasi multi-region
- pisahkan model domain dari DTO persistence bila struktur dokumen kompleks

## Anti-pattern yang perlu dihindari

- memakai partition key yang buruk seperti nilai dengan kardinalitas rendah
- query lintas partition tanpa alasan jelas
- membuat client baru di setiap operasi
- mengabaikan RU charge saat performa menurun
- mencampur logic bisnis dengan konfigurasi koneksi Cosmos

## Sumber upstream

Konten dinormalisasi dari `.tmp-antigravity-skills/skills/azure-cosmos-java` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
