---
name: azure-appconfiguration-java
description: Gunakan saat membangun integrasi Azure App Configuration di Java untuk pengelolaan konfigurasi terpusat, feature flag, label, secret reference, dan snapshot.
license: Complete terms in LICENSE.txt
metadata:
  category: cloud
  source:
    upstream: .tmp-antigravity-skills/skills/azure-appconfiguration-java
    type: community
  depends_on:
    - Azure App Configuration store aktif
    - connection string atau `DefaultAzureCredential`
    - dependensi Maven `com.azure:azure-data-appconfiguration`
---

# Azure App Configuration untuk Java

Skill ini membantu penggunaan Azure App Configuration di Java untuk menyimpan dan mengambil konfigurasi aplikasi secara terpusat. Cakupannya meliputi CRUD setting, filter berdasarkan key atau label, optimistic concurrency dengan ETag, feature flag, secret reference, dan snapshot.

## Kapan digunakan

Gunakan skill ini saat perlu:
- memusatkan konfigurasi lintas environment
- memisahkan nilai konfigurasi dengan label seperti `Development` atau `Production`
- mengelola feature flag dari backend Java
- melakukan update aman berbasis ETag
- membuat snapshot konfigurasi untuk rilis tertentu

## Instalasi

```xml
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-data-appconfiguration</artifactId>
    <version>1.8.0</version>
</dependency>
```

Alternatifnya, gunakan Azure SDK BOM bila proyek Anda sudah menstandarkan versi paket Azure.

## Variabel lingkungan

```bash
AZURE_APPCONFIG_CONNECTION_STRING=Endpoint=https://<store>.azconfig.io;Id=<id>;Secret=<secret>
AZURE_APPCONFIG_ENDPOINT=https://<store>.azconfig.io
```

## Pembuatan client

### Connection string

```java
import com.azure.data.appconfiguration.ConfigurationClient;
import com.azure.data.appconfiguration.ConfigurationClientBuilder;

ConfigurationClient configClient = new ConfigurationClientBuilder()
    .connectionString(System.getenv("AZURE_APPCONFIG_CONNECTION_STRING"))
    .buildClient();
```

### Async client

```java
import com.azure.data.appconfiguration.ConfigurationAsyncClient;

ConfigurationAsyncClient asyncClient = new ConfigurationClientBuilder()
    .connectionString(System.getenv("AZURE_APPCONFIG_CONNECTION_STRING"))
    .buildAsyncClient();
```

### Entra ID

```java
import com.azure.data.appconfiguration.ConfigurationClient;
import com.azure.data.appconfiguration.ConfigurationClientBuilder;
import com.azure.identity.DefaultAzureCredentialBuilder;

ConfigurationClient configClient = new ConfigurationClientBuilder()
    .credential(new DefaultAzureCredentialBuilder().build())
    .endpoint(System.getenv("AZURE_APPCONFIG_ENDPOINT"))
    .buildClient();
```

## Konsep utama

| Konsep | Kegunaan |
|---|---|
| Configuration Setting | pasangan key-value dengan label opsional |
| Label | pemisah konfigurasi per environment atau tenant |
| Feature Flag | setting khusus untuk feature management |
| Secret Reference | pointer ke secret di Key Vault |
| Snapshot | tampilan immutable dari sekumpulan setting |

## Operasi setting

### Add setting

```java
import com.azure.data.appconfiguration.models.ConfigurationSetting;

ConfigurationSetting setting = configClient.addConfigurationSetting(
    "app/database/connection",
    "Production",
    "Server=prod.db.com;Database=myapp"
);
```

### Set setting

```java
ConfigurationSetting setting = configClient.setConfigurationSetting(
    "app/cache/enabled",
    "Production",
    "true"
);
```

### Get setting

```java
ConfigurationSetting setting = configClient.getConfigurationSetting(
    "app/database/connection",
    "Production"
);

System.out.println("Value: " + setting.getValue());
System.out.println("Content-Type: " + setting.getContentType());
System.out.println("Last Modified: " + setting.getLastModified());
```

### Conditional get

```java
import com.azure.core.http.rest.Response;
import com.azure.core.util.Context;

Response<ConfigurationSetting> response = configClient.getConfigurationSettingWithResponse(
    setting,
    null,
    true,
    Context.NONE
);

if (response.getStatusCode() == 304) {
    System.out.println("Setting belum berubah");
} else {
    ConfigurationSetting updated = response.getValue();
}
```

### Conditional update

```java
Response<ConfigurationSetting> response = configClient.setConfigurationSettingWithResponse(
    setting,
    true,
    Context.NONE
);
```

### Delete setting

```java
ConfigurationSetting deleted = configClient.deleteConfigurationSetting(
    "app/cache/enabled",
    "Production"
);
```

### Conditional delete

```java
Response<ConfigurationSetting> response = configClient.deleteConfigurationSettingWithResponse(
    setting,
    true,
    Context.NONE
);
```

## Listing dan filtering

### Filter key

```java
import com.azure.data.appconfiguration.models.SettingSelector;
import com.azure.core.http.rest.PagedIterable;

SettingSelector selector = new SettingSelector().setKeyFilter("app/*");
PagedIterable<ConfigurationSetting> settings = configClient.listConfigurationSettings(selector);

for (ConfigurationSetting s : settings) {
    System.out.println(s.getKey() + " = " + s.getValue());
}
```

### Filter label

Gunakan `setLabelFilter("Production")` pada `SettingSelector` bila ingin membatasi hasil ke label tertentu.

## Praktik yang disarankan

- gunakan label untuk memisahkan environment, tenant, atau rollout stage
- gunakan `setConfigurationSettingWithResponse(..., true, ...)` untuk optimistic concurrency
- simpan secret sensitif di Key Vault dan gunakan secret reference bila memungkinkan
- hindari hardcode connection string di source code
- gunakan snapshot untuk freeze konfigurasi rilis penting

## Checklist implementasi

1. Siapkan App Configuration store.
2. Tentukan strategi autentikasi: connection string atau Entra ID.
3. Definisikan skema key dan label yang konsisten.
4. Gunakan ETag untuk update aman bila ada banyak writer.
5. Pisahkan feature flag dari setting biasa bila perlu governance berbeda.

## Sumber upstream

Konten dinormalisasi dari `.tmp-antigravity-skills/skills/azure-appconfiguration-java` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
