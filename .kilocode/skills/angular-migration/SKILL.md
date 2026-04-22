---
name: angular-migration
description: Gunakan saat memigrasikan aplikasi AngularJS ke Angular modern, termasuk strategi hybrid, konversi directive ke component, modernisasi dependency injection, dan migrasi routing.
license: Complete terms in LICENSE.txt
metadata:
  category: frontend-development
  source:
    upstream: .tmp-antigravity-skills/skills/angular-migration
    type: community
  depends_on:
    - codebase AngularJS atau Angular lama
    - pemahaman TypeScript dan Angular modern
---

# Angular Migration

Skill ini memandu migrasi dari AngularJS 1.x ke Angular modern secara bertahap dan aman. Fokusnya adalah memilih strategi migrasi yang realistis, menjaga kompatibilitas selama transisi, dan mengurangi risiko cutover besar yang sulit dipulihkan.

## Kapan digunakan

Gunakan skill ini saat perlu:
- memigrasikan aplikasi AngularJS 1.x ke Angular 2+
- menjalankan aplikasi hybrid AngularJS dan Angular secara berdampingan
- mengonversi controller atau directive lama menjadi component modern
- memodernisasi dependency injection dan service layer
- memigrasikan sistem routing lama ke Angular Router
- menaikkan aplikasi Angular lama ke praktik Angular modern

## Jangan gunakan skill ini saat

- aplikasi tidak berasal dari AngularJS
- aplikasi sudah berada di Angular modern dan hanya butuh perbaikan kecil
- perubahan hanya berupa bug UI kecil tanpa perubahan framework

## Tujuan utama

- memilih strategi migrasi yang sesuai ukuran dan risiko proyek
- menjaga aplikasi tetap dapat dirilis selama migrasi berlangsung
- memecah migrasi menjadi milestone yang dapat diverifikasi
- mengurangi coupling antara area AngularJS lama dan Angular baru

## Alur kerja inti

1. audit codebase AngularJS, dependency, dan area risiko tinggi
2. pilih strategi migrasi: rewrite penuh, hybrid incremental, atau vertical slice
3. siapkan fondasi Angular modern dan `ngUpgrade` bila perlu
4. migrasikan modul, component, service, dan routing secara bertahap
5. validasi dengan test, staging, dan rencana rollback yang jelas

## Aturan keselamatan

- hindari cutover big-bang tanpa rollback plan
- pertahankan pengujian kompatibilitas selama mode hybrid
- prioritaskan migrasi area bernilai tinggi atau paling sering berubah
- jangan migrasikan semuanya sekaligus bila observabilitas dan test belum siap

## Strategi migrasi

### 1. Big bang atau rewrite penuh

Cocok untuk aplikasi kecil atau saat biaya mempertahankan AngularJS lebih tinggi daripada rewrite.

Karakteristik:
- seluruh aplikasi ditulis ulang di Angular modern
- pengembangan paralel terhadap sistem lama
- perpindahan dilakukan sekaligus saat siap

Risiko:
- biaya awal tinggi
- feedback integrasi datang terlambat
- rollback lebih sulit bila scope terlalu besar

### 2. Incremental hybrid

Cocok untuk aplikasi besar yang harus tetap berjalan selama migrasi.

Karakteristik:
- AngularJS dan Angular berjalan berdampingan
- migrasi dilakukan per fitur atau per modul
- `ngUpgrade` dipakai untuk interoperabilitas

Keunggulan:
- risiko lebih rendah
- bisa dirilis bertahap
- cocok untuk continuous delivery

### 3. Vertical slice

Cocok untuk aplikasi menengah dengan boundary fitur yang cukup jelas.

Karakteristik:
- satu fitur dimigrasikan end-to-end
- fitur baru dibangun di Angular modern
- area lama dipertahankan sementara sampai tergantikan

## Setup aplikasi hybrid

Contoh bootstrap hybrid:

```typescript
import { platformBrowserDynamic } from '@angular/platform-browser-dynamic';
import { UpgradeModule } from '@angular/upgrade/static';
import { AppModule } from './app/app.module';

platformBrowserDynamic()
  .bootstrapModule(AppModule)
  .then(platformRef => {
    const upgrade = platformRef.injector.get(UpgradeModule);
    upgrade.bootstrap(document.body, ['myAngularJSApp'], { strictDi: true });
  });
```

Contoh `AppModule`:

```typescript
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { UpgradeModule } from '@angular/upgrade/static';

@NgModule({
  imports: [
    BrowserModule,
    UpgradeModule
  ]
})
export class AppModule {
  constructor(private upgrade: UpgradeModule) {}

  ngDoBootstrap() {
    // bootstrap manual di main.ts
  }
}
```

## Pola konversi komponen

### Controller AngularJS ke Angular component

Sebelum:

```javascript
angular.module('myApp').controller('UserController', function($scope, UserService) {
  $scope.user = {};

  $scope.loadUser = function(id) {
    UserService.getUser(id).then(function(user) {
      $scope.user = user;
    });
  };

  $scope.saveUser = function() {
    UserService.saveUser($scope.user);
  };
});
```

Sesudah:

```typescript
import { Component, OnInit } from '@angular/core';
import { UserService } from './user.service';

@Component({
  selector: 'app-user',
  template: `
    <div>
      <h2>{{ user.name }}</h2>
      <button (click)="saveUser()">Save</button>
    </div>
  `
})
export class UserComponent implements OnInit {
  user: any = {};

  constructor(private userService: UserService) {}

  ngOnInit() {
    this.loadUser(1);
  }

  loadUser(id: number) {
    this.userService.getUser(id).subscribe(user => {
      this.user = user;
    });
  }

  saveUser() {
    this.userService.saveUser(this.user);
  }
}
```

### Directive AngularJS ke Angular component

Sebelum:

```javascript
angular.module('myApp').directive('userCard', function() {
  return {
    restrict: 'E',
    scope: {
      user: '=',
      onDelete: '&'
    },
    template: `
      <div class="card">
        <h3>{{ user.name }}</h3>
        <button ng-click="onDelete()">Delete</button>
      </div>
    `
  };
});
```

Sesudah:

```typescript
import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-user-card',
  template: `
    <div class="card">
      <h3>{{ user.name }}</h3>
      <button (click)="delete.emit()">Delete</button>
    </div>
  `
})
export class UserCardComponent {
  @Input() user: any;
  @Output() delete = new EventEmitter<void>();
}
```

## Migrasi service dan dependency injection

Pindahkan service AngularJS berbasis factory atau service ke injectable Angular modern.

Sebelum:

```javascript
angular.module('myApp').factory('UserService', function($http) {
  return {
    getUser: function(id) {
      return $http.get('/api/users/' + id);
    },
    saveUser: function(user) {
      return $http.post('/api/users', user);
    }
  };
});
```

Sesudah:

```typescript
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class UserService {
  constructor(private http: HttpClient) {}

  getUser(id: number): Observable<any> {
    return this.http.get(`/api/users/${id}`);
  }

  saveUser(user: any): Observable<any> {
    return this.http.post('/api/users', user);
  }
}
```

### Prinsip migrasi service

- ganti `$http` dengan `HttpClient`
- ganti promise lama dengan `Observable` bila sesuai pola Angular
- pindahkan dependency registration ke decorator `@Injectable`
- audit singleton behavior agar tidak berubah diam-diam saat hybrid mode

## Migrasi routing

Saat memigrasikan routing:
- petakan route AngularJS lama ke route Angular baru
- prioritaskan fitur dengan boundary URL yang jelas
- hindari perubahan URL publik bila tidak perlu
- siapkan redirect atau compatibility layer untuk deep link lama

## Checklist audit awal

1. inventaris modul AngularJS, directive, controller, filter, dan service
2. identifikasi dependency pihak ketiga yang tidak kompatibel
3. tandai area dengan coupling tinggi ke `$scope`, `$rootScope`, atau event bus lama
4. petakan route, guard, dan dependency data loading
5. tentukan area yang paling aman untuk pilot migration

## Checklist cutover aman

- ada milestone migrasi yang kecil dan dapat diuji
- ada test regresi untuk fitur inti
- staging environment mencerminkan produksi
- rollback plan terdokumentasi
- monitoring error dan performa aktif selama transisi

## Anti-pattern penting

- memulai rewrite penuh tanpa inventaris dependency
- memigrasikan UI tanpa memikirkan service dan routing
- mempertahankan pola `$scope` terlalu lama di area Angular baru
- mencampur terlalu banyak pola lama dan baru tanpa boundary jelas
- menunda validasi sampai akhir proyek

## Sumber upstream

Konten dinormalisasi dari skill upstream di `.tmp-antigravity-skills/skills/angular-migration` agar mandiri, berbahasa Indonesia, dan konsisten dengan format KiloCode.
