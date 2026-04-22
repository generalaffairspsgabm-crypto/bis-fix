---
name: android-jetpack-compose-expert
description: Gunakan saat membangun UI Android modern dengan Jetpack Compose, termasuk setup dependensi, pola state, navigasi type-safe, dan optimasi recomposition.
license: Complete terms in LICENSE.txt
metadata:
  category: mobile-development
  source:
    upstream: .tmp-antigravity-skills/skills/android-jetpack-compose-expert
    type: community
  depends_on:
    - proyek Android berbasis Kotlin
    - Jetpack Compose, ViewModel, dan StateFlow
---

# Android Jetpack Compose Expert

Skill ini memandu pembangunan aplikasi Android production-grade dengan Jetpack Compose. Fokusnya adalah arsitektur UI modern, pemisahan state dan event, navigasi yang aman terhadap tipe, serta optimasi performa agar recomposition tetap terkendali.

## Kapan digunakan

Gunakan skill ini saat perlu:
- memulai proyek Android baru dengan Jetpack Compose
- memigrasikan layout XML lama ke Compose
- menata state UI kompleks dengan `ViewModel` dan `StateFlow`
- mengelola side effect seperti loading, snackbar, atau retry
- mengoptimalkan performa Compose dan mengurangi recomposition yang tidak perlu
- menyiapkan navigasi Compose yang lebih aman terhadap tipe data

## Tujuan utama

- membangun UI deklaratif yang mudah diuji dan dipelihara
- menjaga boundary jelas antara screen container dan komponen presentasional
- memastikan state diekspos secara immutable
- menghindari operasi mahal di dalam composition
- memakai pola Material 3 dan lifecycle-aware collection

## Setup proyek dan dependensi

Pastikan katalog versi atau dependency management memuat Compose BOM dan library inti yang relevan.

Contoh isi `libs.versions.toml`:

```kotlin
[versions]
composeBom = "2024.02.01"
activityCompose = "1.8.2"

[libraries]
androidx-compose-bom = { group = "androidx.compose", name = "compose-bom", version.ref = "composeBom" }
androidx-ui = { group = "androidx.compose.ui", name = "ui" }
androidx-ui-graphics = { group = "androidx.compose.ui", name = "ui-graphics" }
androidx-ui-tooling-preview = { group = "androidx.compose.ui", name = "ui-tooling-preview" }
androidx-material3 = { group = "androidx.compose.material3", name = "material3" }
androidx-activity-compose = { group = "androidx.activity", name = "activity-compose", version.ref = "activityCompose" }
```

Tambahkan juga dependency lifecycle-aware collection dan dependency injection sesuai stack proyek, misalnya `collectAsStateWithLifecycle()` dan Hilt bila memang dipakai.

## Pola state yang direkomendasikan

Gunakan `ViewModel` sebagai pemilik state layar. Ekspos state melalui `StateFlow` read-only dan simpan mutable state secara privat.

```kotlin
data class UserUiState(
    val isLoading: Boolean = false,
    val user: User? = null,
    val error: String? = null
)

class UserViewModel @Inject constructor(
    private val userRepository: UserRepository
) : ViewModel() {

    private val _uiState = MutableStateFlow(UserUiState())
    val uiState: StateFlow<UserUiState> = _uiState.asStateFlow()

    fun loadUser() {
        viewModelScope.launch {
            _uiState.update { it.copy(isLoading = true) }
            try {
                val user = userRepository.getUser()
                _uiState.update { it.copy(user = user, isLoading = false) }
            } catch (e: Exception) {
                _uiState.update { it.copy(error = e.message, isLoading = false) }
            }
        }
    }
}
```

### Prinsip penting

- jangan pernah mengekspos `MutableStateFlow` langsung ke UI
- simpan event handling di `ViewModel`, bukan di child composable
- gunakan model state tunggal per layar bila memungkinkan
- representasikan loading, success, dan error secara eksplisit

## Struktur screen dan content

Pisahkan composable container yang membaca state dari composable presentasional yang menerima data dan callback.

```kotlin
@Composable
fun UserScreen(
    viewModel: UserViewModel = hiltViewModel()
) {
    val uiState by viewModel.uiState.collectAsStateWithLifecycle()

    UserContent(
        uiState = uiState,
        onRetry = viewModel::loadUser
    )
}

@Composable
fun UserContent(
    uiState: UserUiState,
    onRetry: () -> Unit
) {
    Scaffold { padding ->
        Box(modifier = Modifier.padding(padding)) {
            when {
                uiState.isLoading -> CircularProgressIndicator()
                uiState.error != null -> ErrorView(uiState.error, onRetry)
                uiState.user != null -> UserProfile(uiState.user)
            }
        }
    }
}
```

### Aturan desain komponen

- `Screen` bertugas menghubungkan `ViewModel` dengan UI
- `Content` dan child composable harus sebisa mungkin stateless
- teruskan data dan lambda callback, bukan instance `ViewModel`
- gunakan `Scaffold` untuk struktur layar Material 3 yang konsisten

## Navigasi type-safe

Bila stack proyek mendukung navigasi Compose modern dengan serializable routes, gunakan route bertipe agar parameter lebih aman dan mudah direfactor.

```kotlin
@Serializable
object Home

@Serializable
data class Profile(val userId: String)

@Composable
fun AppNavHost(navController: NavHostController) {
    NavHost(navController, startDestination = Home) {
        composable<Home> {
            HomeScreen(onNavigateToProfile = { id ->
                navController.navigate(Profile(userId = id))
            })
        }
        composable<Profile> { backStackEntry ->
            val profile: Profile = backStackEntry.toRoute()
            ProfileScreen(userId = profile.userId)
        }
    }
}
```

## Optimasi performa Compose

### Lakukan

- gunakan `remember` untuk menyimpan hasil komputasi yang tidak perlu dihitung ulang
- gunakan `derivedStateOf` untuk nilai turunan yang bergantung pada state lain
- tandai model UI yang relevan sebagai `@Immutable` atau `@Stable` bila memang sesuai
- gunakan `LaunchedEffect` untuk side effect satu kali atau side effect berbasis perubahan state
- profil recomposition dengan Layout Inspector bila UI terasa berat

### Hindari

- sorting, filtering, atau mapping mahal langsung di body composable tanpa memoization
- membuat object baru berulang kali di composition bila nilainya sebenarnya stabil
- mengubah state selama fase composition
- meneruskan dependency besar ke banyak child composable tanpa alasan jelas

## Troubleshooting cepat

### Infinite recomposition

Periksa apakah ada:
- object baru yang dibuat terus-menerus di composition
- update state yang dipicu langsung saat composable dirender
- `Modifier`, `List`, atau lambda yang berubah setiap render tanpa `remember`

### UI tidak sinkron dengan lifecycle

Gunakan `collectAsStateWithLifecycle()` agar koleksi flow mengikuti lifecycle layar dan tidak terus aktif saat layar tidak terlihat.

### Screen sulit diuji

Pisahkan logika bisnis ke `ViewModel` dan buat composable presentasional menerima state plain object serta callback sederhana.

## Checklist implementasi

1. Pastikan dependency Compose, Material 3, dan lifecycle sudah benar.
2. Definisikan model state UI yang eksplisit.
3. Simpan mutable state di `ViewModel`, ekspos versi immutable.
4. Pisahkan screen container dari content stateless.
5. Gunakan side effect API Compose secara tepat.
6. Audit recomposition untuk operasi mahal dan object tidak stabil.
7. Terapkan navigasi type-safe bila stack mendukung.

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/android-jetpack-compose-expert` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
