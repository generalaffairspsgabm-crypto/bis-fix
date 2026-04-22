---
name: azure-eventgrid-py
description: Gunakan saat membangun integrasi Azure Event Grid di Python untuk publish event, konsumsi webhook, dan routing event berbasis topik.
license: Complete terms in LICENSE.txt
metadata:
  category: cloud
  source:
    upstream: .tmp-antigravity-skills/skills/azure-eventgrid-py
    type: community
  depends_on:
    - Python 3
    - paket `azure-eventgrid`
    - paket `azure-identity`
    - topik atau domain Azure Event Grid
---

# Azure Event Grid SDK untuk Python

Skill ini memandu penggunaan SDK Python untuk Azure Event Grid, terutama untuk publish event ke custom topic atau namespace topic, serta pola konsumsi event melalui webhook aplikasi.

## Kapan digunakan

Gunakan skill ini saat perlu:
- mem-publish event aplikasi ke Azure Event Grid
- membangun arsitektur event-driven berbasis topic
- mengirim `EventGridEvent` atau `CloudEvent`
- menerima event dari Event Grid melalui webhook HTTP
- menghubungkan perubahan sistem ke subscriber downstream

## Dependensi

```bash
pip install azure-eventgrid azure-identity
```

## Konfigurasi environment

```bash
EVENTGRID_TOPIC_ENDPOINT=https://<topic>.<region>-1.eventgrid.azure.net/api/events
EVENTGRID_TOPIC_KEY=<access-key>
```

## Autentikasi

### Dengan access key

```python
from azure.core.credentials import AzureKeyCredential
from azure.eventgrid import EventGridPublisherClient

client = EventGridPublisherClient(
    endpoint="https://<topic>.<region>-1.eventgrid.azure.net/api/events",
    credential=AzureKeyCredential("<access-key>"),
)
```

### Dengan Microsoft Entra ID

```python
from azure.eventgrid import EventGridPublisherClient
from azure.identity import DefaultAzureCredential

client = EventGridPublisherClient(
    endpoint="https://<topic>.<region>-1.eventgrid.azure.net/api/events",
    credential=DefaultAzureCredential(),
)
```

## Publish event

### Mengirim `EventGridEvent`

```python
from azure.eventgrid import EventGridEvent

event = EventGridEvent(
    subject="orders/123",
    event_type="Contoso.Items.ItemReceived",
    data={"itemSku": "SKU-001", "quantity": 3},
    data_version="1.0",
)

client.send([event])
```

### Mengirim `CloudEvent`

```python
from azure.eventgrid import CloudEvent

cloud_event = CloudEvent(
    source="/applications/inventory-service",
    type="com.contoso.inventory.restocked",
    data={"sku": "SKU-001", "quantity": 10},
)

client.send([cloud_event])
```

### Batch publish

```python
events = [
    EventGridEvent(
        subject=f"orders/{order_id}",
        event_type="Contoso.Orders.Created",
        data={"orderId": order_id},
        data_version="1.0",
    )
    for order_id in ["1001", "1002", "1003"]
]

client.send(events)
```

## Konsumsi event via webhook

Event Grid biasanya mengirim event ke endpoint HTTP aplikasi Anda. Endpoint harus:
- menerima POST JSON
- memvalidasi handshake subscription
- memproses event secara idempoten

Contoh sederhana dengan FastAPI:

```python
from fastapi import FastAPI, Request
from fastapi.responses import JSONResponse

app = FastAPI()

@app.post("/eventgrid/webhook")
async def eventgrid_webhook(request: Request):
    events = await request.json()

    for event in events:
        if event.get("eventType") == "Microsoft.EventGrid.SubscriptionValidationEvent":
            validation_code = event["data"]["validationCode"]
            return JSONResponse({"validationResponse": validation_code})

        print("Received event:", event.get("eventType"), event.get("subject"))

    return {"status": "ok"}
```

## Praktik terbaik

- gunakan `CloudEvent` bila ekosistem Anda sudah mengadopsi standar CNCF
- desain `subject` agar mudah difilter subscriber
- buat consumer webhook idempoten karena event bisa terkirim ulang
- validasi dan log event penting untuk audit trail
- pisahkan publisher logic dari business logic inti
- gunakan retry dan dead-letter strategy di sisi subscriber bila perlu

## Anti-pattern yang perlu dihindari

- mengirim payload terlalu besar tanpa kebutuhan jelas
- memakai event type yang tidak konsisten antar layanan
- mengabaikan subscription validation handshake
- memproses event sinkron berat langsung di webhook tanpa queue lanjutan
- menyimpan access key di source code

## Sumber upstream

Konten dinormalisasi dari `.tmp-antigravity-skills/skills/azure-eventgrid-py` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
