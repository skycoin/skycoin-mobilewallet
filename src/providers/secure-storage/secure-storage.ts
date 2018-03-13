import { Injectable } from '@angular/core';
import { SecureStorage, SecureStorageObject } from '@ionic-native/secure-storage';
import { Platform } from 'ionic-angular';
import 'rxjs/add/observable/fromPromise';
import { Observable } from 'rxjs/Observable';
import { StorageApiProvider } from '../storage-api/storage-api.provider';

@Injectable()
export class SecureStorageProvider {

  secureStorageDisabled: boolean;

  constructor(
    private platform: Platform,
    private secureStorage: SecureStorage,
    private storage: StorageApiProvider,
  ) {}

  get(key: string): Observable<any> {
    if (this.secureStorageDisabled) {
      return this.storage.get(key);
    }

    return Observable.fromPromise(this.platform.ready().then(() => {
      return this.secureStorage.create('wallets')
        .then((storage: SecureStorageObject) => {
          return storage.get(key);
        });
    })).map((value) => JSON.parse(value));
  }

  set(key: string, value: any) {
    if (this.secureStorageDisabled) {
      return this.storage.set(key, value);
    }

    return Observable.fromPromise(this.platform.ready().then(() => {
      return this.secureStorage.create('wallets').then((storage: SecureStorageObject) => {
        return storage.set(key, JSON.stringify(value));
      });
    }));
  }
}
