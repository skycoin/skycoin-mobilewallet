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
    })).map(value => JSON.parse(value));
  }

  set(key: string, value: any) {
    return Observable.fromPromise(this.platform.ready().then(() => {
      return this.secureStorage.create('wallets').then((storage: SecureStorageObject) => {
        return storage.set(key, JSON.stringify(value));
      });
    }));
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

  secureDevice() : void {
    // this.platform.ready().then(() => {
    //   this.secureStorage.create('_').then((storage: SecureStorageObject) => {
    //     console.log('reached');
    //     storage.secureDevice()
    //   });
    // })
  }
}
