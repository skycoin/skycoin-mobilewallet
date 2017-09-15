import { Injectable } from '@angular/core';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';
import 'rxjs/add/observable/fromPromise';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class SecureStorageProvider {

  constructor(
    private platform: Platform,
    private secureStorage: SecureStorage,
  ) {}

  get(key: string): Observable<any> {
    return Observable.fromPromise(this.platform.ready().then(() => {
      return this.secureStorage.create('wallets')
        .then((storage: SecureStorageObject) => {
          return storage.get(key)
        });
    }));
  }

  set(key: string, value: any) {
    this.platform.ready().then(() => {
      this.secureStorage.create('wallets')
        .then((storage: SecureStorageObject) => {
          storage.set(key, JSON.stringify(value))
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
