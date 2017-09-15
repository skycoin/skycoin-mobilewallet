import { Injectable } from '@angular/core';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';
import 'rxjs/add/operator/map';
import { Platform } from 'ionic-angular';

@Injectable()
export class SecureStorageProvider {

  constructor(
    private platform: Platform,
    private secureStorage: SecureStorage,
  ) {}

  get(key: string) {
    this.platform.ready().then(() => {
      this.secureStorage.create('wallets')
        .then((storage: SecureStorageObject) => {
          storage.get(key)
            .then(
              data => JSON.parse(data),
              error => console.log(error)
            );
        });
    });
  }

  set(key: string, value: any) {
    this.platform.ready().then(() => {
      this.secureStorage.create('wallets')
        .then((storage: SecureStorageObject) => {
          storage.set(JSON.stringify(key), value)
            .then(
              data => console.log(data),
              error => console.log(error)
            );
        });
    });
  }

  destroy(key: string) {
    this.platform.ready().then(() => {
      this.secureStorage.create('wallets')
        .then((storage: SecureStorageObject) => {
          storage.remove(key)
            .then(
              data => console.log(data),
              error => console.log(error)
            );
        });
    });
  }
}
