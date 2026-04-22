---
name: azure-ai-voicelive-java
description: Gunakan saat membangun percakapan suara AI real-time di Java dengan Azure AI VoiceLive, termasuk sesi WebSocket, streaming audio, konfigurasi VAD, dan function calling.
license: Complete terms in LICENSE.txt
metadata:
  category: ai
  source:
    upstream: .tmp-antigravity-skills/skills/azure-ai-voicelive-java
    type: community
  depends_on:
    - resource Azure AI dengan endpoint VoiceLive aktif
    - kredensial API key atau `DefaultAzureCredential`
    - dependensi Maven `com.azure:azure-ai-voicelive`
    - runtime reaktif Reactor
---

# Azure AI VoiceLive untuk Java

Skill ini merangkum pola implementasi VoiceLive di Java untuk percakapan suara dua arah secara real-time. Fokus utamanya adalah pembuatan sesi, konfigurasi audio dan turn detection, pengiriman audio PCM16, pemrosesan event streaming, serta penggunaan tool/function calling.

## Kapan digunakan

Gunakan skill ini saat perlu:
- membuat voice assistant real-time di Java
- mengirim audio mikrofon ke model dan menerima audio respons
- mengaktifkan transkripsi input audio
- mengatur VAD untuk percakapan natural
- menambahkan tool/function ke sesi suara

## Instalasi

```xml
<dependency>
    <groupId>com.azure</groupId>
    <artifactId>azure-ai-voicelive</artifactId>
    <version>1.0.0-beta.2</version>
</dependency>
```

## Variabel lingkungan

```bash
AZURE_VOICELIVE_ENDPOINT=https://<resource>.openai.azure.com/
AZURE_VOICELIVE_API_KEY=<api-key>
```

## Autentikasi

### API key

```java
import com.azure.ai.voicelive.VoiceLiveAsyncClient;
import com.azure.ai.voicelive.VoiceLiveClientBuilder;
import com.azure.core.credential.AzureKeyCredential;

VoiceLiveAsyncClient client = new VoiceLiveClientBuilder()
    .endpoint(System.getenv("AZURE_VOICELIVE_ENDPOINT"))
    .credential(new AzureKeyCredential(System.getenv("AZURE_VOICELIVE_API_KEY")))
    .buildAsyncClient();
```

### Entra ID

```java
import com.azure.identity.DefaultAzureCredentialBuilder;

VoiceLiveAsyncClient client = new VoiceLiveClientBuilder()
    .endpoint(System.getenv("AZURE_VOICELIVE_ENDPOINT"))
    .credential(new DefaultAzureCredentialBuilder().build())
    .buildAsyncClient();
```

## Konsep utama

| Konsep | Kegunaan |
|---|---|
| `VoiceLiveAsyncClient` | entry point untuk membuat sesi |
| `VoiceLiveSessionAsyncClient` | koneksi WebSocket aktif |
| `VoiceLiveSessionOptions` | konfigurasi perilaku sesi |

## Persyaratan audio

- sample rate: `24000 Hz`
- format: `16-bit PCM`
- channel: mono
- endianness: little-endian

## Alur kerja inti

### 1. Mulai sesi

```java
import reactor.core.publisher.Mono;

client.startSession("gpt-4o-realtime-preview")
    .flatMap(session -> {
        session.receiveEvents().subscribe(
            event -> System.out.println("Event: " + event.getType()),
            error -> System.err.println("Error: " + error.getMessage())
        );
        return Mono.just(session);
    })
    .block();
```

### 2. Konfigurasi sesi

```java
import com.azure.ai.voicelive.models.*;
import com.azure.core.util.BinaryData;
import java.util.Arrays;

ServerVadTurnDetection turnDetection = new ServerVadTurnDetection()
    .setThreshold(0.5)
    .setPrefixPaddingMs(300)
    .setSilenceDurationMs(500)
    .setInterruptResponse(true)
    .setAutoTruncate(true)
    .setCreateResponse(true);

AudioInputTranscriptionOptions transcription = new AudioInputTranscriptionOptions(
    AudioInputTranscriptionOptionsModel.WHISPER_1);

VoiceLiveSessionOptions options = new VoiceLiveSessionOptions()
    .setInstructions("Anda adalah asisten suara yang membantu.")
    .setVoice(BinaryData.fromObject(new OpenAIVoice(OpenAIVoiceName.ALLOY)))
    .setModalities(Arrays.asList(InteractionModality.TEXT, InteractionModality.AUDIO))
    .setInputAudioFormat(InputAudioFormat.PCM16)
    .setOutputAudioFormat(OutputAudioFormat.PCM16)
    .setInputAudioSamplingRate(24000)
    .setInputAudioNoiseReduction(new AudioNoiseReduction(AudioNoiseReductionType.NEAR_FIELD))
    .setInputAudioEchoCancellation(new AudioEchoCancellation())
    .setInputAudioTranscription(transcription)
    .setTurnDetection(turnDetection);

ClientEventSessionUpdate updateEvent = new ClientEventSessionUpdate(options);
session.sendEvent(updateEvent).subscribe();
```

### 3. Kirim audio input

```java
byte[] audioData = readAudioChunk();
session.sendInputAudio(BinaryData.fromBytes(audioData)).subscribe();
```

### 4. Tangani event

```java
session.receiveEvents().subscribe(event -> {
    ServerEventType eventType = event.getType();

    if (ServerEventType.SESSION_CREATED.equals(eventType)) {
        System.out.println("Session created");
    } else if (ServerEventType.INPUT_AUDIO_BUFFER_SPEECH_STARTED.equals(eventType)) {
        System.out.println("User mulai bicara");
    } else if (ServerEventType.INPUT_AUDIO_BUFFER_SPEECH_STOPPED.equals(eventType)) {
        System.out.println("User berhenti bicara");
    } else if (ServerEventType.RESPONSE_AUDIO_DELTA.equals(eventType)) {
        if (event instanceof SessionUpdateResponseAudioDelta audioEvent) {
            playAudioChunk(audioEvent.getDelta());
        }
    } else if (ServerEventType.RESPONSE_DONE.equals(eventType)) {
        System.out.println("Respons selesai");
    } else if (ServerEventType.ERROR.equals(eventType)) {
        if (event instanceof SessionUpdateError errorEvent) {
            System.err.println("Error: " + errorEvent.getError().getMessage());
        }
    }
});
```

## Konfigurasi voice

### OpenAI voices

```java
VoiceLiveSessionOptions options = new VoiceLiveSessionOptions()
    .setVoice(BinaryData.fromObject(new OpenAIVoice(OpenAIVoiceName.ALLOY)));
```

Voice umum yang disebut upstream: `ALLOY`, `ASH`, `BALLAD`, `CORAL`, `ECHO`, `SAGE`, `SHIMMER`, `VERSE`.

### Azure voices

```java
options.setVoice(BinaryData.fromObject(new AzureStandardVoice("en-US-JennyNeural")));
options.setVoice(BinaryData.fromObject(new AzureCustomVoice("myVoice", "endpointId")));
options.setVoice(BinaryData.fromObject(
    new AzurePersonalVoice("speakerProfileId", PersonalVoiceModels.PHOENIX_LATEST_NEURAL)));
```

## Function calling

```java
VoiceLiveFunctionDefinition weatherFunction = new VoiceLiveFunctionDefinition("get_weather")
    .setDescription("Ambil cuaca terkini untuk lokasi")
    .setParameters(BinaryData.fromObject(parametersSchema));

VoiceLiveSessionOptions options = new VoiceLiveSessionOptions()
    .setTools(Arrays.asList(weatherFunction))
    .setInstructions("Anda memiliki akses ke data cuaca.");
```

## Praktik yang disarankan

- gunakan async client karena pola VoiceLive bersifat streaming dan reaktif
- pastikan audio selalu PCM16 mono 24kHz
- aktifkan noise reduction dan echo cancellation bila sumber audio dari mikrofon user
- tangani interruption dengan `setInterruptResponse(true)` untuk UX natural
- tutup sesi saat percakapan selesai
- log event error dan status koneksi untuk observabilitas

## Penanganan error

```java
session.receiveEvents()
    .doOnError(error -> System.err.println("Connection error: " + error.getMessage()))
    .onErrorResume(error -> reactor.core.publisher.Flux.empty())
    .subscribe();
```

## Checklist implementasi

1. Siapkan endpoint dan kredensial.
2. Buat `VoiceLiveAsyncClient`.
3. Mulai sesi model realtime.
4. Konfigurasikan voice, modalitas, audio format, dan VAD.
5. Stream audio input dan proses event output.
6. Tambahkan tools bila perlu function calling.

## Sumber upstream

Konten dinormalisasi dari `.tmp-antigravity-skills/skills/azure-ai-voicelive-java` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
