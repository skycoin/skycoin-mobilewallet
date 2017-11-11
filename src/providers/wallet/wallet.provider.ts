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
import { BackendApiProvider } from '../backend-api/backend-api.provider';
import { Output } from '../../app/app.datatypes';

@Injectable()
export class WalletProvider {

  wallets: Subject<WalletModel[]> = new BehaviorSubject<WalletModel[]>([]);

  private secureStorageDisabled: boolean;

  get addresses(): Observable<AddressModel[]> {
    return this.all().map(wallets => wallets.reduce((array, wallet) => array.concat(wallet.entries.slice(0, wallet.visible)), []));
  }

  constructor(
    private backendApi: BackendApiProvider,
    private localApi: LocalApiProvider,
    private platform: Platform,
    private secureStorage: SecureStorageProvider,
  ) {
    this.platform.ready().then(() => this.loadData());
  }


  addAddress(wallet: WalletModel) {
    wallet.visible += 1;
    this.updateWallet(wallet);
  }

  all(): Observable<WalletModel[]> {
    return this.wallets.asObservable();
  }

  disableSecureStorage() {
    this.secureStorageDisabled = true;
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

  create(label: string, seed: string) {
    this.localApi.getAddresses(seed, 32)
      .subscribe(data => {
        let wallet: WalletModel = {
          label: label,
          seed: seed,
          balance: null,
          hours: null,
          entries: data,
          visible: 1,
        };

        this.addWallet(wallet);
      });
  }

  generateSeed() {
    return this.localApi.getSeed();
  }

  refresh() {
    this.loadData();
  }

  refreshBalances() {
    this.all().first().subscribe(wallets => {
      Observable.forkJoin(wallets.map(wallet => this.addBalance(wallet)))
        .subscribe(wallets => this.updateWallets(wallets))
    });
  }

  private addBalance(wallet: WalletModel): Observable<WalletModel> {
    return this.backendApi.getOutputs(wallet.entries, wallet.visible).map((outputs: Output[]) => {
      wallet.entries = this.attachOutputsToAddresses(wallet.entries, outputs);
      wallet.balance = outputs.reduce((balance, output) => balance + output.coins, 0);
      wallet.hours = outputs.reduce((hours, output) => hours + output.hours, 0);
      return wallet;
    });
  }

  private addWallet(wallet: WalletModel) {
    this.wallets.first().subscribe(wallets => {
      wallets.push(wallet);
      this.updateWallets(wallets);
      this.refreshBalances();
    });
  }

  private attachOutputsToAddresses(addresses: AddressModel[], outputs: Output[]): AddressModel[] {
    const clonedAddresses = JSON.parse(JSON.stringify(addresses));
    clonedAddresses.forEach(address => {
      address.balance = 0;
      address.hours = 0;
    });
    outputs.forEach(output => {
      const address = clonedAddresses.find(address => address.address === output.address);
      if (address) {
        address.balance = address.balance ? address.balance + output.coins : output.coins;
        address.hours = address.hours ? address.hours + output.hours : output.hours;
      }
    });

    return clonedAddresses;
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
