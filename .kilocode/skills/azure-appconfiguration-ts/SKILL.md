---
name: azure-appconfiguration-ts
description: Gunakan saat membangun integrasi Azure App Configuration di TypeScript untuk konfigurasi terpusat, dynamic refresh, feature flag, dan Key Vault reference.
license: Complete terms in LICENSE.txt
metadata:
  category: cloud
  source:
    upstream: .tmp-antigravity-skills/skills/azure-appconfiguration-ts
    type: community
  depends_on:
    - Azure App Configuration store aktif
    - connection string atau `DefaultAzureCredential`
    - paket `@azure/app-configuration` atau `@azure/app-configuration-provider`
---

# Azure App Configuration untuk TypeScript

Skill ini merangkum penggunaan Azure App Configuration di TypeScript untuk CRUD setting, provider konfigurasi tingkat tinggi, dynamic refresh, feature flag, dan resolusi Key Vault reference.

## Kapan digunakan

Gunakan skill ini saat perlu:
- memusatkan konfigurasi aplikasi Node.js atau TypeScript
- memuat konfigurasi sebagai object atau map
- melakukan refresh konfigurasi tanpa restart aplikasi
- mengelola feature flag dari App Configuration
- menghubungkan App Configuration dengan Key Vault

## Instalasi

```bash
npm install @azure/app-configuration @azure/identity
npm install @azure/app-configuration-provider @azure/identity
npm install @microsoft/feature-management
```

## Variabel lingkungan

```bash
AZURE_APPCONFIG_ENDPOINT=https://<your-resource>.azconfig.io
AZURE_APPCONFIG_CONNECTION_STRING=Endpoint=https://...;Id=...;Secret=...
```

## Autentikasi

```typescript
import { AppConfigurationClient } from "@azure/app-configuration";
import { DefaultAzureCredential } from "@azure/identity";

const client = new AppConfigurationClient(
  process.env.AZURE_APPCONFIG_ENDPOINT!,
  new DefaultAzureCredential(),
);

const client2 = new AppConfigurationClient(
  process.env.AZURE_APPCONFIG_CONNECTION_STRING!,
);
```

## CRUD setting

### Create atau update

```typescript
await client.addConfigurationSetting({
  key: "app:settings:message",
  value: "Hello World",
  label: "production",
  contentType: "text/plain",
  tags: { environment: "prod" },
});

await client.setConfigurationSetting({
  key: "app:settings:message",
  value: "Updated value",
  label: "production",
});

const existing = await client.getConfigurationSetting({ key: "myKey" });
existing.value = "new value";
await client.setConfigurationSetting(existing, { onlyIfUnchanged: true });
```

### Read setting

```typescript
const setting = await client.getConfigurationSetting({
  key: "app:settings:message",
  label: "production",
});
console.log(setting.value);

const settings = client.listConfigurationSettings({
  keyFilter: "app:*",
  labelFilter: "production",
});

for await (const item of settings) {
  console.log(`${item.key}: ${item.value}`);
}
```

### Delete setting

```typescript
await client.deleteConfigurationSetting({
  key: "app:settings:message",
  label: "production",
});
```

### Lock atau unlock

```typescript
await client.setReadOnly({ key: "myKey", label: "prod" }, true);
await client.setReadOnly({ key: "myKey", label: "prod" }, false);
```

## Provider konfigurasi tingkat tinggi

### Load configuration

```typescript
import { load } from "@azure/app-configuration-provider";
import { DefaultAzureCredential } from "@azure/identity";

const appConfig = await load(
  process.env.AZURE_APPCONFIG_ENDPOINT!,
  new DefaultAzureCredential(),
  {
    selectors: [{ keyFilter: "app:*", labelFilter: "production" }],
    trimKeyPrefixes: ["app:"],
  },
);

const value = appConfig.get("settings:message");
const config = appConfig.constructConfigurationObject({ separator: ":" });
console.log(config.settings.message);
```

### Dynamic refresh

```typescript
const appConfig = await load(process.env.AZURE_APPCONFIG_ENDPOINT!, new DefaultAzureCredential(), {
  selectors: [{ keyFilter: "app:*" }],
  refreshOptions: {
    enabled: true,
    refreshIntervalInMs: 30_000,
  },
});

appConfig.refresh();

const disposer = appConfig.onRefresh(() => {
  console.log("Configuration refreshed");
});
```

Pola umum di Express:

```typescript
app.use((req, _res, next) => {
  appConfig.refresh();
  next();
});
```

### Key Vault references

```typescript
const appConfig = await load(process.env.AZURE_APPCONFIG_ENDPOINT!, new DefaultAzureCredential(), {
  selectors: [{ keyFilter: "app:*" }],
  keyVaultOptions: {
    credential: new DefaultAzureCredential(),
    secretRefreshIntervalInMs: 7_200_000,
  },
});

const dbPassword = appConfig.get("database:password");
```

## Feature flags

### Create feature flag low-level

```typescript
import {
  featureFlagPrefix,
  featureFlagContentType,
  FeatureFlagValue,
  ConfigurationSetting,
} from "@azure/app-configuration";

const flag: ConfigurationSetting<FeatureFlagValue> = {
  key: `${featureFlagPrefix}Beta`,
  contentType: featureFlagContentType,
  value: {
    id: "Beta",
    enabled: true,
    description: "Beta feature",
    conditions: {
      clientFilters: [],
    },
  },
};

await client.setConfigurationSetting(flag);
```

## Praktik yang disarankan

- gunakan provider tingkat tinggi untuk aplikasi runtime, dan low-level client untuk operasi admin
- gunakan `trimKeyPrefixes` agar object konfigurasi lebih bersih
- aktifkan refresh hanya untuk key yang memang perlu dinamis
- gunakan `onlyIfUnchanged` untuk update aman saat ada banyak writer
- simpan secret di Key Vault dan resolve lewat provider

## Checklist implementasi

1. Siapkan App Configuration store.
2. Tentukan apakah butuh low-level CRUD atau provider runtime.
3. Definisikan key, label, dan prefix yang konsisten.
4. Aktifkan refresh bila konfigurasi perlu berubah saat runtime.
5. Pisahkan feature flag dari setting biasa.

## Sumber upstream

Konten dinormalisasi dari `.tmp-antigravity-skills/skills/azure-appconfiguration-ts` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
