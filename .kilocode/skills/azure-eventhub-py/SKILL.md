---
name: azure-eventhub-py
description: Gunakan saat membangun integrasi Azure Event Hubs di Python untuk producer, consumer, checkpointing, dan streaming event skala besar.
license: Complete terms in LICENSE.txt
metadata:
  category: cloud
  source:
    upstream: .tmp-antigravity-skills/skills/azure-eventhub-py
    type: community
  depends_on:
    - Python 3
    - paket `azure-eventhub`
    - paket `azure-eventhub-checkpointstoreblob`
    - paket `azure-identity`
    - namespace Azure Event Hubs
---

# Azure Event Hubs SDK untuk Python

Skill ini memandu penggunaan SDK Python untuk Azure Event Hubs, termasuk producer, consumer, consumer group, checkpointing dengan Blob Storage, dan pola streaming event throughput tinggi.

## Kapan digunakan

Gunakan skill ini saat perlu:
- mengirim event telemetry atau log dalam volume besar
- mengonsumsi stream event dari Event Hubs
- membangun pipeline ingestion near real-time
- memakai checkpointing agar consumer dapat melanjutkan dari posisi terakhir
- memproses event secara paralel lintas partition

## Dependensi

```bash
pip install azure-eventhub azure-eventhub-checkpointstoreblob azure-identity
```

## Konfigurasi environment

```bash
EVENTHUB_NAMESPACE=<namespace>.servicebus.windows.net
EVENTHUB_NAME=<eventhub-name>
EVENTHUB_CONNECTION_STRING=<connection-string>
BLOB_STORAGE_CONNECTION_STRING=<blob-connection-string>
BLOB_CONTAINER_NAME=<checkpoint-container>
```

## Autentikasi

### Dengan connection string

```python
from azure.eventhub import EventHubProducerClient

producer = EventHubProducerClient.from_connection_string(
    conn_str="<connection-string>",
    eventhub_name="orders",
)
```

### Dengan Microsoft Entra ID

```python
from azure.eventhub import EventHubProducerClient
from azure.identity import DefaultAzureCredential

producer = EventHubProducerClient(
    fully_qualified_namespace="<namespace>.servicebus.windows.net",
    eventhub_name="orders",
    credential=DefaultAzureCredential(),
)
```

## Producer

### Mengirim batch event

```python
from azure.eventhub import EventData

event_data_batch = producer.create_batch()
event_data_batch.add(EventData("first event"))
event_data_batch.add(EventData("second event"))
producer.send_batch(event_data_batch)
```

### Mengirim payload JSON

```python
import json
from azure.eventhub import EventData

payload = {"orderId": "123", "status": "created"}
producer.send_batch([EventData(json.dumps(payload))])
```

### Menentukan partition key

```python
batch = producer.create_batch(partition_key="tenant-001")
batch.add(EventData("event for tenant 001"))
producer.send_batch(batch)
```

Gunakan `partition_key` bila urutan event per entitas penting.

## Consumer sederhana

```python
from azure.eventhub import EventHubConsumerClient

consumer = EventHubConsumerClient.from_connection_string(
    conn_str="<connection-string>",
    consumer_group="$Default",
    eventhub_name="orders",
)

def on_event(partition_context, event):
    print("Partition:", partition_context.partition_id)
    print("Body:", event.body_as_str())

with consumer:
    consumer.receive(
        on_event=on_event,
        starting_position="-1",
    )
```

`starting_position="-1"` berarti mulai dari event paling awal yang tersedia.

## Checkpointing dengan Blob Storage

```python
from azure.eventhub import EventHubConsumerClient
from azure.eventhub.extensions.checkpointstoreblob import BlobCheckpointStore

checkpoint_store = BlobCheckpointStore.from_connection_string(
    "<blob-connection-string>",
    "checkpoint-container",
)

consumer = EventHubConsumerClient.from_connection_string(
    conn_str="<connection-string>",
    consumer_group="$Default",
    eventhub_name="orders",
    checkpoint_store=checkpoint_store,
)

def on_event(partition_context, event):
    print(event.body_as_str())
    partition_context.update_checkpoint(event)

with consumer:
    consumer.receive(on_event=on_event, starting_position="-1")
```

## Praktik terbaik

- reuse producer dan consumer client, jangan buat ulang per event
- gunakan batch untuk efisiensi throughput
- checkpoint hanya setelah event benar-benar diproses sukses
- gunakan `partition_key` bila butuh ordering per entitas
- pisahkan ingestion dari processing berat dengan worker atau queue lanjutan
- monitor lag consumer dan error reconnect

## Anti-pattern yang perlu dihindari

- mengirim satu event per koneksi baru
- checkpoint sebelum proses bisnis selesai
- payload terlalu besar tanpa kompresi atau desain event yang baik
- mengandalkan satu consumer tunggal untuk semua beban tinggi
- menyimpan connection string di source code

## Sumber upstream

Konten dinormalisasi dari `.tmp-antigravity-skills/skills/azure-eventhub-py` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
