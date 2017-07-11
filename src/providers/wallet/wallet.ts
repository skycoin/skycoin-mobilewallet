import { Injectable } from '@angular/core';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import { LocalApiProvider } from '../local-api/local-api';
import { StorageApiProvider } from '../storage-api/storage-api';

@Injectable()
export class WalletProvider {

  constructor(
    private localApi: LocalApiProvider,
    private storage: StorageApiProvider,
  ) { }

  create() {
    return this.localApi.createWallet('').flatMap(wallet => this.storage.create('wallets', {seed: wallet}));
  }

  all() {
    return this.storage.all('wallets');
  }
}
