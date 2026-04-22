---
name: azure-appconfiguration-py
description: Gunakan saat membangun integrasi Azure App Configuration di Python untuk konfigurasi terpusat, feature flag, label, read-only setting, dan snapshot.
license: Complete terms in LICENSE.txt
metadata:
  category: cloud
  source:
    upstream: .tmp-antigravity-skills/skills/azure-appconfiguration-py
    type: community
  depends_on:
    - Azure App Configuration store aktif
    - connection string atau `DefaultAzureCredential`
    - paket Python `azure-appconfiguration`
---

# Azure App Configuration untuk Python

Skill ini membantu penggunaan Azure App Configuration di Python untuk menyimpan, mengambil, dan mengelola konfigurasi aplikasi secara terpusat. Cakupannya meliputi setting biasa, label, feature flag, read-only setting, snapshot, dan async client.

## Kapan digunakan

Gunakan skill ini saat perlu:
- memusatkan konfigurasi aplikasi Python lintas environment
- memisahkan nilai konfigurasi dengan label seperti `development` dan `production`
- mengelola feature flag dari backend atau worker Python
- membuat snapshot konfigurasi untuk rilis tertentu
- mengunci setting agar tidak mudah berubah

## Instalasi

```bash
pip install azure-appconfiguration
```

Untuk autentikasi Entra ID, tambahkan juga `azure-identity`.

## Variabel lingkungan

```bash
AZURE_APPCONFIGURATION_CONNECTION_STRING=Endpoint=https://<name>.azconfig.io;Id=...;Secret=...
AZURE_APPCONFIGURATION_ENDPOINT=https://<name>.azconfig.io
```

## Autentikasi

### Connection string

```python
import os
from azure.appconfiguration import AzureAppConfigurationClient

client = AzureAppConfigurationClient.from_connection_string(
    os.environ["AZURE_APPCONFIGURATION_CONNECTION_STRING"]
)
```

### Entra ID

```python
import os
from azure.appconfiguration import AzureAppConfigurationClient
from azure.identity import DefaultAzureCredential

client = AzureAppConfigurationClient(
    base_url=os.environ["AZURE_APPCONFIGURATION_ENDPOINT"],
    credential=DefaultAzureCredential(),
)
```

## Operasi setting

### Get setting

```python
setting = client.get_configuration_setting(key="app:settings:message")
print(f"{setting.key} = {setting.value}")
```

### Get dengan label

```python
setting = client.get_configuration_setting(
    key="app:settings:message",
    label="production",
)
```

### Set setting

```python
from azure.appconfiguration import ConfigurationSetting

setting = ConfigurationSetting(
    key="app:settings:message",
    value="Hello, World!",
    label="development",
    content_type="text/plain",
    tags={"environment": "dev"},
)

client.set_configuration_setting(setting)
```

### Delete setting

```python
client.delete_configuration_setting(
    key="app:settings:message",
    label="development",
)
```

## Listing setting

### Semua setting

```python
settings = client.list_configuration_settings()
for setting in settings:
    print(f"{setting.key} [{setting.label}] = {setting.value}")
```

### Filter key prefix

```python
settings = client.list_configuration_settings(
    key_filter="app:settings:*"
)
```

### Filter label

```python
settings = client.list_configuration_settings(
    label_filter="production"
)
```

## Feature flags

### Set feature flag

```python
from azure.appconfiguration import ConfigurationSetting
import json

feature_flag = ConfigurationSetting(
    key=".appconfig.featureflag/beta-feature",
    value=json.dumps({
        "id": "beta-feature",
        "enabled": True,
        "conditions": {
            "client_filters": []
        }
    }),
    content_type="application/vnd.microsoft.appconfig.ff+json;charset=utf-8",
)

client.set_configuration_setting(feature_flag)
```

### Get feature flag

```python
import json

setting = client.get_configuration_setting(
    key=".appconfig.featureflag/beta-feature"
)
flag_data = json.loads(setting.value)
print(f"Feature enabled: {flag_data['enabled']}")
```

### List feature flags

```python
import json

flags = client.list_configuration_settings(
    key_filter=".appconfig.featureflag/*"
)
for flag in flags:
    data = json.loads(flag.value)
    print(f"{data['id']}: {'enabled' if data['enabled'] else 'disabled'}")
```

## Read-only setting

```python
client.set_read_only(
    configuration_setting=setting,
    read_only=True,
)

client.set_read_only(
    configuration_setting=setting,
    read_only=False,
)
```

## Snapshot

### Create snapshot

```python
from azure.appconfiguration import ConfigurationSnapshot, ConfigurationSettingFilter

snapshot = ConfigurationSnapshot(
    name="v1-snapshot",
    filters=[
        ConfigurationSettingFilter(key="app:*", label="production")
    ],
)

created = client.begin_create_snapshot(
    name="v1-snapshot",
    snapshot=snapshot,
).result()
```

### List snapshot settings

```python
settings = client.list_configuration_settings(
    snapshot_name="v1-snapshot"
)
```

## Async client

```python
from azure.appconfiguration.aio import AzureAppConfigurationClient
from azure.identity.aio import DefaultAzureCredential

async def main(endpoint: str):
    credential = DefaultAzureCredential()
    client = AzureAppConfigurationClient(
        base_url=endpoint,
        credential=credential,
    )
    setting = await client.get_configuration_setting(key="app:settings:message")
    print(setting.value)
```

## Praktik yang disarankan

- gunakan label untuk memisahkan environment atau tenant
- gunakan naming key yang konsisten, misalnya `app:module:setting`
- simpan secret sensitif di Key Vault, bukan langsung di App Configuration bila memungkinkan
- gunakan snapshot untuk freeze konfigurasi rilis
- gunakan read-only untuk setting yang tidak boleh diubah sembarangan

## Checklist implementasi

1. Siapkan App Configuration store.
2. Tentukan autentikasi: connection string atau Entra ID.
3. Definisikan skema key dan label.
4. Pisahkan feature flag dari setting biasa.
5. Gunakan snapshot untuk kebutuhan audit atau rollback konfigurasi.

## Sumber upstream

Konten dinormalisasi dari `.tmp-antigravity-skills/skills/azure-appconfiguration-py` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
