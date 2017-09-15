import { Injectable } from '@angular/core';
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
import { SecureStorageProvider } from '../secure-storage/secure-storage';
import { AddressModel } from '../../models/address.model';

@Injectable()
export class WalletProvider {

  wallets: Subject<WalletModel[]> = new BehaviorSubject<WalletModel[]>([]);

  constructor(
    private localApi: LocalApiProvider,
    private platform: Platform,
    private secureStorage: SecureStorageProvider,
  ) {
    this.platform.ready().then(() => this.loadData());
  }

  all(): Observable<WalletModel[]> {
    return this.wallets.asObservable();
  }

  createAddress(wallet: WalletModel) {
    const count = wallet.entries ? wallet.entries.length : 0;
    this.localApi.getAddresses(wallet.seed, count + 1)
      .subscribe(addresses => {
        wallet.entries = addresses;
        this.updateWallet(wallet);
      });
  }

  find(wallet: WalletModel) {
    return this.wallets.asObservable().map(wallets => wallets.find(w => w.seed === wallet.seed));
  }

  remove(wallet: WalletModel) {
    this.wallets.first().subscribe(wallets => {
      wallets = wallets.filter(w => w.seed !== wallet.seed);
      this.updateWallets(wallets);
    });
  }

  sum(): Observable<number> {
    return this.all().map(wallets => wallets.map(wallet => wallet.balance >= 0 ? wallet.balance : 0).reduce((a,b) => a + b, 0));
  }

  private addBalance(wallet: WalletModel): Observable<WalletModel> {
    return this.localApi.getBalances(wallet.seed, wallet.entries.length).map(addressesWithBalance => {
        wallet.entries = addressesWithBalance;
        wallet.balance = addressesWithBalance.reduce((balance, address) => balance + address.balance, 0);
        return wallet;
      })
  }

  create(seed: string): Observable<AddressModel[]> {
    // TODO: fix this
    return this.localApi.getAddresses(seed, 1)
      .do(data => {
        let wallet: WalletModel = {
          label: "Todo: add label",
          seed: seed,
          balance: null,
          entries: data,
        };

        this.addWallet(wallet);
      });
  }

  generateSeed() {
    return this.localApi.generateSeed();
  }

  refresh() {
    this.loadData();
  }

  private addWallet(wallet: WalletModel) {
    this.wallets.first().subscribe(wallets => {
      wallets.push(wallet);
      this.updateWallets(wallets);
      this.refreshBalances();
    });
  }

  private updateWallet(wallet: WalletModel) {
    this.wallets.first().subscribe(wallets => {
      const index = wallets.findIndex(w => w.seed === wallet.seed);
      wallets[index] = wallet;
      this.updateWallets(wallets);
      this.refreshBalances();
    });
  }

  private updateWallets(wallets: WalletModel[]) {
    this.wallets.next(wallets);
    this.secureStorage.set('wallets', wallets);
  }

  private refreshBalances() {
    this.wallets.first().subscribe(wallets => {
      Observable.forkJoin(wallets.map(wallet => this.addBalance(wallet)))
        .subscribe(wallets => {
          console.log(wallets);
          this.updateWallets(wallets)
        })
    });
  }

  private indexWallets(): Observable<WalletModel[]> {
    return this.secureStorage.get('wallets');
  }

  private loadData(): void {
    this.indexWallets()
      .first()
      .subscribe(wallets => {
          this.wallets.next(wallets);
          this.refreshBalances();
        }, error => console.log(error));
  }
}
