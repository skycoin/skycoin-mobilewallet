import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file';
import { LocalApiProvider } from '../local-api/local-api';
import { StorageApiProvider } from '../storage-api/storage-api';
import { Observable } from 'rxjs/Observable';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/retry";
import { WalletModel } from '../../models/wallet.model';

@Injectable()
export class WalletProvider {

  constructor(
    private file: File,
    private localApi: LocalApiProvider,
    private storage: StorageApiProvider,
  ) { }

  all(): Observable<WalletModel[]> {
    return Observable.fromPromise(this.file.listDir(this.file.externalRootDirectory, 'superwallet'))
      .map(paths => paths.filter(path => path.name.substr(path.name.length - 4) === '.wlt'))
      .flatMap(paths => {
        const files = paths.map(path => this.file.readAsText(this.file.externalRootDirectory, 'superwallet/' + path.name));
        return Observable.forkJoin(files).map(files => files.map(file => JSON.parse(file)));
      });
  }

  balance(wallet: WalletModel): Observable<any> {
    return this.localApi.getBalanceOfWallet(wallet.id).retry(3);
  }

  create(): Observable<WalletModel> {
    return this.localApi.createWallet('').flatMap(wallet => {
      return this.storage.create('wallets', {seed: wallet})
        .flatMap(seed => this.file.readAsText(this.file.externalRootDirectory, 'superwallet/' + seed.seed + '.wlt'))
        .map(file => JSON.parse(file));
    });
  }

  destroy(wallet: any) {
    const filename = 'superwallet/' + wallet.id + '.wlt';
    return Observable.fromPromise(this.file.removeFile(this.file.externalRootDirectory, filename));
  }
}
