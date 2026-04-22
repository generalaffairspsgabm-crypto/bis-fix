---
name: alpha-vantage
description: Gunakan saat perlu mengambil data pasar keuangan global dari Alpha Vantage, termasuk saham, forex, kripto, komoditas, indikator ekonomi, fundamental perusahaan, dan indikator teknikal.
license: Complete terms in LICENSE.txt
metadata:
  category: finance-data
  source:
    upstream: .tmp-antigravity-skills/skills/alpha-vantage
    type: community
  depends_on:
    - API key Alpha Vantage yang valid
    - koneksi jaringan ke endpoint resmi Alpha Vantage
---

# Alpha Vantage

Skill ini merangkum penggunaan Alpha Vantage sebagai sumber data pasar keuangan. Fokusnya adalah pengambilan data historis dan near-real-time untuk analisis, dashboard, riset, atau pipeline kuantitatif ringan.

## Kapan digunakan

Gunakan skill ini saat perlu:
- mengambil harga saham terbaru atau time series OHLCV
- membaca data fundamental perusahaan
- mengambil data forex, kripto, atau komoditas
- mengakses indikator ekonomi makro
- menghitung atau mengambil indikator teknikal dari API
- membuat prototipe analisis pasar berbasis data publik

## Prasyarat

- miliki API key Alpha Vantage
- simpan key sebagai environment variable, misalnya `ALPHAVANTAGE_API_KEY`
- gunakan hanya endpoint resmi `https://www.alphavantage.co/query`

## Pola request dasar

Semua request mengikuti pola:

```text
https://www.alphavantage.co/query?function=FUNCTION_NAME&apikey=YOUR_KEY&...params
```

Parameter inti:
- `function`
- `apikey`
- parameter spesifik endpoint seperti `symbol`, `interval`, `outputsize`, atau `datatype`

## Kategori data utama

### Saham dan time series
Contoh fungsi:
- `GLOBAL_QUOTE`
- `TIME_SERIES_INTRADAY`
- `TIME_SERIES_DAILY`
- `TIME_SERIES_WEEKLY`
- `TIME_SERIES_MONTHLY`

### Fundamental perusahaan
Contoh fungsi:
- `OVERVIEW`
- `INCOME_STATEMENT`
- `BALANCE_SHEET`
- `CASH_FLOW`
- `EARNINGS`
- `DIVIDENDS`
- `SPLITS`

### Forex
Contoh fungsi:
- `CURRENCY_EXCHANGE_RATE`
- `FX_INTRADAY`
- `FX_DAILY`
- `FX_WEEKLY`
- `FX_MONTHLY`

### Kripto
Contoh fungsi:
- `CRYPTO_INTRADAY`
- `DIGITAL_CURRENCY_DAILY`
- `CURRENCY_EXCHANGE_RATE`

### Komoditas dan ekonomi
Contoh fungsi:
- `GOLD`
- `BRENT`
- `NATURAL_GAS`
- `REAL_GDP`
- `CPI`
- `INFLATION`
- `UNEMPLOYMENT`
- `FEDERAL_FUNDS_RATE`

### Indikator teknikal
Contoh fungsi:
- `SMA`
- `EMA`
- `MACD`
- `RSI`
- `BBANDS`
- `ADX`
- `ATR`
- `OBV`
- `VWAP`

## Parameter umum yang perlu dipahami

- `outputsize`: `compact` atau `full`
- `datatype`: `json` atau `csv`
- `interval`: tergantung endpoint, misalnya `1min`, `5min`, `daily`, `weekly`, `monthly`
- `adjusted`: `true` atau `false` untuk penyesuaian split atau dividen pada endpoint tertentu

## Alur kerja yang direkomendasikan

1. tentukan kelas aset dan endpoint yang tepat
2. validasi simbol atau pasangan mata uang
3. pilih horizon data dan `outputsize`
4. kirim request dengan rate limit yang aman
5. cek error payload sebelum parsing
6. normalisasi hasil ke struktur internal yang konsisten

## Praktik terbaik

- cache hasil bila request berulang
- beri jeda antar request saat memproses banyak simbol
- cek field seperti `Error Message`, `Note`, atau `Information` sebelum memakai data
- normalisasi nama kolom karena format respons berbeda antar endpoint
- dokumentasikan timezone dan frekuensi data agar tidak salah interpretasi

## Rate limit dan reliabilitas

Tier gratis memiliki batas ketat. Karena itu:
- hindari burst request
- gunakan batching atau antrean internal
- siapkan fallback bila API mengembalikan catatan rate limit
- jangan menganggap data kosong berarti simbol tidak valid sebelum memeriksa pesan respons

## Contoh use case

### Harga saham terbaru
Gunakan `GLOBAL_QUOTE` saat hanya perlu snapshot harga terakhir.

### Time series harian
Gunakan `TIME_SERIES_DAILY` saat perlu OHLCV historis untuk chart atau backtest ringan.

### Fundamental perusahaan
Gunakan `OVERVIEW` atau laporan keuangan saat perlu valuasi, market cap, atau metrik bisnis.

### Indikator teknikal
Gunakan endpoint indikator seperti `RSI` atau `MACD` bila ingin menghindari perhitungan manual di sisi klien.

## Anti-pattern

- menyimpan API key di kode sumber atau log
- mengirim request paralel besar tanpa memperhatikan rate limit
- mencampur data adjusted dan non-adjusted tanpa label jelas
- menganggap semua endpoint memiliki struktur JSON yang sama
- memakai data pasar untuk keputusan investasi tanpa validasi tambahan

## Catatan interpretasi

Skill ini membantu akses data, bukan memberi nasihat investasi. Semua analisis lanjutan tetap perlu validasi metodologi, kualitas data, dan konteks pasar.

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/alpha-vantage` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
