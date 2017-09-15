import { Injectable } from '@angular/core';
import { File } from '@ionic-native/file';
import { LocalApiProvider } from '../local-api/local-api.provider';
import { Observable } from 'rxjs/Observable';
import { WalletModel } from '../../models/wallet.model';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import "rxjs/add/operator/retry";
import { Subject } from 'rxjs/Subject';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Platform } from 'ionic-angular';

@Injectable()
export class WalletProvider {

  wallets: Subject<WalletModel[]> = new BehaviorSubject<WalletModel[]>([]);

  constructor(
    private file: File,
    private localApi: LocalApiProvider,
    private platform: Platform,
  ) {
    this.platform.ready().then(() => this.loadData());
  }

  all(): Observable<WalletModel[]> {
    return this.wallets.asObservable();
  }

  find(wallet: WalletModel) {
    return this.wallets.asObservable().map(wallets => wallets.find(w => w.seed === wallet.seed));
  }

  remove(wallet: WalletModel) {
    const filename = 'superwallet/' + wallet.seed + '.wlt';
    return Observable.fromPromise(this.file.removeFile(this.file.externalRootDirectory, filename))
      .do(() => {
        this.wallets.first().subscribe(wallets => {
          const index = wallets.findIndex(w => w.seed === wallet.seed);
          if (index > -1) wallets.splice(index, 1);
          this.wallets.next(wallets);
        });
      });
  }

  sum(): Observable<number> {
    return this.all().map(wallets => wallets.map(wallet => wallet.balance >= 0 ? wallet.balance : 0).reduce((a,b) => a + b, 0));
  }

  balance(wallet: WalletModel): Observable<any> {
    return this.localApi.getBalanceOfWallet(wallet.id).retry(3);
  }

  create(seed: string): Observable<WalletModel> {
    const obs = this.localApi.createWallet(seed)
        .flatMap(seed => this.file.readAsText(this.file.externalRootDirectory, 'superwallet/' + seed + '.wlt'))
        .map(file => {
          console.log(file);
          return <WalletModel>JSON.parse(file);
        });

    return obs.do(wallet => this.wallets.first().subscribe(wallets => {
      console.log('doing');
      wallets.push(wallet);
      this.wallets.next(wallets);
      this.refreshBalances();
    }));
  }

  generateSeed() {
    return this.localApi.generateSeed();
  }

  refresh() {
    this.loadData();
  }

  private refreshBalances() {
    this.wallets.first().subscribe(wallets => {
      Observable.forkJoin(wallets.map(wallet => this.balance(wallet).map(balance => {
        wallet.balance = balance.balance;
        return wallet;
      })))
        .subscribe(newWallets => this.wallets.next(newWallets));
    });
  }

  private indexWallets() {
    return Observable.fromPromise(this.file.listDir(this.file.externalRootDirectory, 'superwallet'))
      .map(paths => paths.filter(path => path.name.substr(path.name.length - 4) === '.wlt'))
      .flatMap(paths => {
        const files = paths.map(path => this.file.readAsText(this.file.externalRootDirectory, 'superwallet/' + path.name));
        return Observable.forkJoin(files).map(files => files.map(file => {
          let wallet = JSON.parse(file);
          wallet.balance = -1;
          return wallet;
        }));
      });
  }

  private loadData(): void {
    this.indexWallets().first().subscribe(wallets => {
      this.wallets.next(wallets);
      this.refreshBalances();
    });
  }
}
