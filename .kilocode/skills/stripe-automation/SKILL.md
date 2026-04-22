---
name: stripe-automation
description: Gunakan saat perlu mengotomasi Stripe melalui Rube MCP untuk customer, payment, subscription, invoice, product, price, refund, dan operasi pembayaran umum.
license: Complete terms in LICENSE.txt
metadata:
  category: automation
  source:
    upstream: .tmp-antigravity-skills/skills/stripe-automation
    type: community
  depends_on:
    - Rube MCP
    - koneksi Stripe aktif di Rube
---

# Stripe Automation

Skill ini memandu otomasi Stripe melalui toolkit Stripe di Rube MCP.

## Kapan digunakan

Gunakan skill ini saat perlu:
- membuat atau mencari customer
- membuat payment intent atau charge
- membuat, membaca, memperbarui, atau membatalkan subscription
- membuat atau mencari invoice
- melihat product dan price
- membuat refund

## Prasyarat

- Pastikan `RUBE_SEARCH_TOOLS` tersedia.
- Pastikan koneksi `stripe` aktif melalui `RUBE_MANAGE_CONNECTIONS`.
- Selalu mulai dengan `RUBE_SEARCH_TOOLS` untuk mengambil skema tool terbaru.

## Alur kerja inti

### 1. Kelola customer

Urutan kerja:
1. `STRIPE_SEARCH_CUSTOMERS`
2. `STRIPE_LIST_CUSTOMERS`
3. `STRIPE_CREATE_CUSTOMER`
4. `STRIPE_POST_CUSTOMERS_CUSTOMER`

Parameter penting:
- `email`
- `name`
- `description`
- `metadata`
- `customer`

Pitfall utama:
- Stripe mengizinkan customer duplikat dengan email yang sama.
- Cari dulu sebelum membuat customer baru.
- Customer ID biasanya diawali `cus_`.

### 2. Kelola charge dan payment

Urutan kerja:
1. `STRIPE_LIST_CHARGES`
2. `STRIPE_CREATE_PAYMENT_INTENT`
3. `STRIPE_CONFIRM_PAYMENT_INTENT`
4. `STRIPE_POST_CHARGES`
5. `STRIPE_CAPTURE_CHARGE`

Parameter penting:
- `amount`
- `currency`
- `customer`
- `payment_method`
- `description`

Pitfall utama:
- `amount` memakai unit terkecil mata uang.
- `currency` harus huruf kecil seperti `usd`.
- Payment Intent adalah alur yang lebih direkomendasikan dibanding direct charge.

### 3. Kelola subscription

Urutan kerja:
1. `STRIPE_LIST_SUBSCRIPTIONS`
2. `STRIPE_POST_CUSTOMERS_CUSTOMER_SUBSCRIPTIONS`
3. `STRIPE_RETRIEVE_SUBSCRIPTION`
4. `STRIPE_UPDATE_SUBSCRIPTION`

Parameter penting:
- `customer`
- `items`
- `subscription`

Catatan:
- Subscription memerlukan customer valid dan biasanya payment method aktif.
- Gunakan price ID, bukan product ID, untuk item subscription.
- Pembatalan dapat langsung atau di akhir periode.

### 4. Kelola invoice

Urutan kerja:
1. `STRIPE_LIST_INVOICES`
2. `STRIPE_SEARCH_INVOICES`
3. `STRIPE_CREATE_INVOICE`

Parameter penting:
- `customer`
- `collection_method`
- `days_until_due`

Pitfall utama:
- Invoice dapat auto-finalize secara default.
- Gunakan `auto_advance: false` bila ingin mempertahankan draft.

### 5. Kelola product dan price

Urutan kerja:
1. `STRIPE_LIST_PRODUCTS`
2. `STRIPE_SEARCH_PRODUCTS`
3. `STRIPE_LIST_PRICES`
4. `STRIPE_GET_PRICES_SEARCH`

Parameter penting:
- `active`
- `query`

Catatan:
- Product dan price adalah objek terpisah.
- Satu product dapat memiliki banyak price.
- Price ID dipakai untuk subscription dan checkout.

### 6. Kelola refund

Urutan kerja:
1. `STRIPE_LIST_REFUNDS`
2. `STRIPE_POST_CHARGES_CHARGE_REFUNDS`
3. `STRIPE_CREATE_REFUND`

Parameter penting:
- `charge`
- `amount`
- `reason`

Catatan:
- `amount` opsional untuk full refund.
- Refund parsial memakai unit terkecil mata uang.
- Refund dapat memerlukan beberapa hari kerja untuk muncul di statement pelanggan.

## Pola kerja yang direkomendasikan

### Format amount

Stripe memakai unit terkecil mata uang:
- USD 10.50 menjadi 1050
- EUR 10.50 menjadi 1050
- JPY 1000 tetap 1000

### Pagination

- Gunakan `limit` hingga maksimal 100.
- Periksa `has_more`.
- Gunakan `starting_after` dengan ID objek terakhir.

## Pitfall penting

- Mata uang zero-decimal seperti JPY tidak memakai pecahan.
- Prefix ID umum:
  - customer: `cus_`
  - charge: `ch_`
  - subscription: `sub_`
  - invoice: `in_`
  - product: `prod_`
  - price: `price_`
  - payment intent: `pi_`
  - refund: `re_`
- Subscription memakai price ID, bukan product ID.

## Checklist eksekusi

1. Panggil `RUBE_SEARCH_TOOLS`.
2. Pastikan koneksi `stripe` aktif.
3. Resolve customer, product, price, atau subscription yang relevan.
4. Validasi amount dan currency.
5. Jalankan operasi inti.
6. Verifikasi hasil dengan membaca ulang objek Stripe terkait.

## Referensi tool cepat

- `STRIPE_CREATE_CUSTOMER`
- `STRIPE_SEARCH_CUSTOMERS`
- `STRIPE_LIST_CUSTOMERS`
- `STRIPE_POST_CUSTOMERS_CUSTOMER`
- `STRIPE_LIST_CHARGES`
- `STRIPE_CREATE_PAYMENT_INTENT`
- `STRIPE_CONFIRM_PAYMENT_INTENT`
- `STRIPE_POST_CHARGES`
- `STRIPE_CAPTURE_CHARGE`
- `STRIPE_LIST_SUBSCRIPTIONS`
- `STRIPE_POST_CUSTOMERS_CUSTOMER_SUBSCRIPTIONS`
- `STRIPE_RETRIEVE_SUBSCRIPTION`
- `STRIPE_UPDATE_SUBSCRIPTION`
- `STRIPE_LIST_INVOICES`
- `STRIPE_SEARCH_INVOICES`
- `STRIPE_CREATE_INVOICE`
- `STRIPE_LIST_PRODUCTS`
- `STRIPE_SEARCH_PRODUCTS`
- `STRIPE_LIST_PRICES`
- `STRIPE_GET_PRICES_SEARCH`
- `STRIPE_LIST_REFUNDS`
- `STRIPE_POST_CHARGES_CHARGE_REFUNDS`
- `STRIPE_CREATE_REFUND`
- `STRIPE_LIST_CUSTOMER_PAYMENT_METHODS`
- `STRIPE_CREATE_CHECKOUT_SESSION`
- `STRIPE_LIST_PAYMENT_INTENTS`

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/stripe-automation` agar mandiri dan konsisten untuk format KiloCode.
