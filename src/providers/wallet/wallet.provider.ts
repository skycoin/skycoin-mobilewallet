import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file';
import { LocalApiProvider } from '../local-api/local-api.provider';
import { StorageApiProvider } from '../storage-api/storage-api.provider';
import { Observable } from 'rxjs/Observable';
import { WalletModel } from '../../models/wallet.model';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/retry";

@Injectable()
export class WalletProvider {

  private wallets: WalletModel[];

  constructor(
    private file: File,
    private localApi: LocalApiProvider,
    private storage: StorageApiProvider,
  ) {}

  all(): Observable<WalletModel[]> {
    return this.wallets ? Observable.of(this.wallets) : this.indexWallets();
  }

  balance(wallet: WalletModel): Observable<any> {
    return this.localApi.getBalanceOfWallet(wallet.id).retry(3);
  }

  create(seed: string): Observable<WalletModel> {
    return this.localApi.createWallet(seed).flatMap(wallet => {
      return this.storage.create('wallets', {seed: wallet})
        .flatMap(seed => this.file.readAsText(this.file.externalRootDirectory, 'superwallet/' + seed.seed + '.wlt'))
        .map(file => JSON.parse(file))
        .do((wallet: WalletModel) => (this.wallets||<any>[]).push(wallet));
    });
  }

  destroy(wallet: any) {
    const filename = 'superwallet/' + wallet.id + '.wlt';
    return Observable.fromPromise(this.file.removeFile(this.file.externalRootDirectory, filename))
      .do(() => {
        const index = this.wallets.findIndex(w => w.id === wallet.id);
        if (index > -1) this.wallets.splice(index, 1);
      });
  }

  generateSeed() {
    return this.localApi.generateSeed();
  }

  private indexWallets() {
    return Observable.fromPromise(this.file.listDir(this.file.externalRootDirectory, 'superwallet'))
      .map(paths => paths.filter(path => path.name.substr(path.name.length - 4) === '.wlt'))
      .flatMap(paths => {
        const files = paths.map(path => this.file.readAsText(this.file.externalRootDirectory, 'superwallet/' + path.name));
        return Observable.forkJoin(files).map(files => files.map(file => JSON.parse(file)));
      })
      .do(wallets => this.wallets = wallets);
  }
}
