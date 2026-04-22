---
name: azure-ai-ml-py
description: Gunakan saat membangun workflow Azure Machine Learning dengan SDK Python v2, termasuk workspace, data asset, model registry, compute, job training, environment, dan pipeline.
---

# Azure Machine Learning SDK v2 untuk Python

Skill ini dipakai saat perlu mengelola resource Azure Machine Learning melalui [`MLClient`](https://learn.microsoft.com/azure/machine-learning/how-to-configure-cli?view=azureml-api-2), menjalankan job training, mendaftarkan data dan model, serta menyusun pipeline ML yang dapat diulang.

## Kapan digunakan

Gunakan skill ini ketika pekerjaan melibatkan salah satu kebutuhan berikut:

- Membuat atau mengakses workspace Azure ML.
- Mendaftarkan data asset file atau folder.
- Mendaftarkan model hasil training.
- Membuat atau mengubah compute cluster.
- Menjalankan command job atau pipeline job.
- Menyiapkan environment kustom untuk eksperimen atau deployment.

## Dependensi

Instal paket utama:

```bash
pip install azure-ai-ml azure-identity
```

Jika workflow memakai file konfigurasi lokal, siapkan juga [`config.json`](https://learn.microsoft.com/azure/machine-learning/how-to-configure-cli?view=azureml-api-2) workspace.

## Variabel lingkungan

Siapkan variabel berikut bila tidak memakai file konfigurasi:

```bash
AZURE_SUBSCRIPTION_ID=<subscription-id>
AZURE_RESOURCE_GROUP=<resource-group>
AZURE_ML_WORKSPACE_NAME=<workspace-name>
```

## Autentikasi

Prioritaskan [`DefaultAzureCredential`](https://learn.microsoft.com/python/api/azure-identity/azure.identity.defaultazurecredential) agar skill dapat berjalan di lokal, CI, atau Azure tanpa mengganti kode.

```python
import os
from azure.ai.ml import MLClient
from azure.identity import DefaultAzureCredential

ml_client = MLClient(
    credential=DefaultAzureCredential(),
    subscription_id=os.environ["AZURE_SUBSCRIPTION_ID"],
    resource_group_name=os.environ["AZURE_RESOURCE_GROUP"],
    workspace_name=os.environ["AZURE_ML_WORKSPACE_NAME"],
)
```

Alternatif bila repo sudah memiliki [`config.json`](https://learn.microsoft.com/azure/machine-learning/how-to-configure-cli?view=azureml-api-2):

```python
from azure.ai.ml import MLClient
from azure.identity import DefaultAzureCredential

ml_client = MLClient.from_config(credential=DefaultAzureCredential())
```

## Workflow inti

### 1. Kelola workspace

Gunakan entitas [`Workspace`](https://learn.microsoft.com/python/api/azure-ai-ml/azure.ai.ml.entities.workspace) untuk membuat workspace baru.

```python
from azure.ai.ml.entities import Workspace

workspace = Workspace(
    name="my-workspace",
    location="eastus",
    display_name="My Workspace",
    description="Workspace untuk eksperimen ML",
    tags={"purpose": "demo"},
)

ml_client.workspaces.begin_create(workspace).result()
```

Untuk inspeksi cepat:

```python
for ws in ml_client.workspaces.list():
    print(f"{ws.name}: {ws.location}")
```

### 2. Daftarkan data asset

Gunakan [`Data`](https://learn.microsoft.com/python/api/azure-ai-ml/azure.ai.ml.entities.data) dan [`AssetTypes`](https://learn.microsoft.com/python/api/azure-ai-ml/azure.ai.ml.constants.assettypes).

```python
from azure.ai.ml.entities import Data
from azure.ai.ml.constants import AssetTypes

train_data = Data(
    name="my-dataset",
    version="1",
    path="azureml://datastores/workspaceblobstore/paths/data/train.csv",
    type=AssetTypes.URI_FILE,
    description="Training data",
)

ml_client.data.create_or_update(train_data)
```

Untuk folder:

```python
folder_data = Data(
    name="my-folder-dataset",
    version="1",
    path="azureml://datastores/workspaceblobstore/paths/data/",
    type=AssetTypes.URI_FOLDER,
)

ml_client.data.create_or_update(folder_data)
```

### 3. Daftarkan model

```python
from azure.ai.ml.entities import Model
from azure.ai.ml.constants import AssetTypes

model = Model(
    name="my-model",
    version="1",
    path="./model/",
    type=AssetTypes.CUSTOM_MODEL,
    description="Model hasil training",
)

ml_client.models.create_or_update(model)
```

Audit versi model:

```python
for item in ml_client.models.list(name="my-model"):
    print(f"{item.name} v{item.version}")
```

### 4. Siapkan compute

```python
from azure.ai.ml.entities import AmlCompute

cluster = AmlCompute(
    name="cpu-cluster",
    type="amlcompute",
    size="Standard_DS3_v2",
    min_instances=0,
    max_instances=4,
    idle_time_before_scale_down=120,
)

ml_client.compute.begin_create_or_update(cluster).result()
```

Lihat compute yang tersedia:

```python
for compute in ml_client.compute.list():
    print(f"{compute.name}: {compute.type}")
```

### 5. Jalankan command job

Gunakan [`command()`](https://learn.microsoft.com/python/api/azure-ai-ml/azure.ai.ml.command) untuk training atau preprocessing.

```python
from azure.ai.ml import command, Input

job = command(
    code="./src",
    command="python train.py --data ${{inputs.data}} --lr ${{inputs.learning_rate}}",
    inputs={
        "data": Input(type="uri_folder", path="azureml:my-dataset:1"),
        "learning_rate": 0.01,
    },
    environment="AzureML-sklearn-1.0-ubuntu20.04-py38-cpu@latest",
    compute="cpu-cluster",
    display_name="training-job",
)

returned_job = ml_client.jobs.create_or_update(job)
print(returned_job.studio_url)
```

Pantau progres:

```python
ml_client.jobs.stream(returned_job.name)
```

### 6. Susun pipeline

Gunakan dekorator [`dsl.pipeline`](https://learn.microsoft.com/azure/machine-learning/how-to-create-component-pipelines-cli?view=azureml-api-2) untuk workflow multi-step.

```python
from azure.ai.ml import dsl, Input

@dsl.pipeline(compute="cpu-cluster", description="Training pipeline")
def training_pipeline(data_input):
    prep_step = prep_component(data=data_input)
    train_step = train_component(
        data=prep_step.outputs.output_data,
        learning_rate=0.01,
    )
    return {"model": train_step.outputs.model}

pipeline_job = training_pipeline(
    data_input=Input(type="uri_folder", path="azureml:my-dataset:1")
)

ml_client.jobs.create_or_update(pipeline_job)
```

## Praktik kerja yang disarankan

1. Gunakan [`DefaultAzureCredential`](https://learn.microsoft.com/python/api/azure-identity/azure.identity.defaultazurecredential) sebagai default, lalu fallback ke konfigurasi lokal hanya bila perlu.
2. Simpan data, model, dan environment sebagai asset berversi agar eksperimen dapat direproduksi.
3. Pisahkan preprocessing, training, dan evaluasi ke komponen berbeda bila pipeline mulai kompleks.
4. Gunakan compute cluster autoscaling untuk menekan biaya idle.
5. Simpan nama workspace, datastore, dan compute di konfigurasi proyek agar tidak hardcode di banyak file.
6. Pantau URL Studio dari hasil [`ml_client.jobs.create_or_update()`](https://learn.microsoft.com/python/api/azure-ai-ml/azure.ai.ml.operations.joboperations) untuk debugging cepat.

## Checklist implementasi

- Verifikasi paket [`azure-ai-ml`](https://pypi.org/project/azure-ai-ml/) dan [`azure-identity`](https://pypi.org/project/azure-identity/) tersedia.
- Verifikasi autentikasi berhasil sebelum membuat resource.
- Verifikasi asset input sudah ada atau dibuat lebih dulu.
- Verifikasi compute target tersedia sebelum submit job.
- Verifikasi output job atau pipeline tercatat untuk langkah berikutnya.

## Batasan penting

- Pembuatan workspace sering memerlukan izin subscription atau resource group yang lebih tinggi daripada operasi job biasa.
- Beberapa contoh environment bawaan Azure ML dapat berubah versi; cek image terbaru sebelum dipakai di produksi.
- Pipeline contoh mengasumsikan komponen seperti `prep_component` dan `train_component` sudah didefinisikan di kode proyek.

## Referensi mandiri

- Dokumentasi Azure ML SDK v2 Python: https://learn.microsoft.com/azure/machine-learning/how-to-configure-cli?view=azureml-api-2
- Referensi [`MLClient`](https://learn.microsoft.com/python/api/azure-ai-ml/azure.ai.ml.mlclient)
- Referensi [`command()`](https://learn.microsoft.com/python/api/azure-ai-ml/azure.ai.ml.command)
- Referensi [`dsl.pipeline`](https://learn.microsoft.com/azure/machine-learning/how-to-create-component-pipelines-cli?view=azureml-api-2)
