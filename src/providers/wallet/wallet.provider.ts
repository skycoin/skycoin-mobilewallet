import { Injectable } from '@angular/core';
import { Platform } from 'ionic-angular';
import 'rxjs/add/observable/forkJoin';
import 'rxjs/add/observable/fromPromise';
import 'rxjs/add/operator/do';
import 'rxjs/add/operator/filter';
import 'rxjs/add/operator/first';
import 'rxjs/add/operator/map';
import 'rxjs/add/operator/retry';
import { BehaviorSubject } from 'rxjs/BehaviorSubject';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { Address } from '../../models/address.model';
import { Wallet } from '../../models/wallet.model';
import { ApiService } from '../backend-api/backend-api.provider';
import { LocalApiProvider } from '../local-api/local-api.provider';
import { SecureStorageProvider } from '../secure-storage/secure-storage';

@Injectable()
export class WalletProvider {
  addresses: Address[];
  wallets: Subject<Wallet[]> = new BehaviorSubject<Wallet[]>([]);

  constructor(
    private apiService: ApiService,
    private localApi: LocalApiProvider,
    private platform: Platform,
    private secureStorage: SecureStorageProvider,
  ) {
    this.platform.ready().then(() => this.loadData());
  }

  addAddress(wallet: Wallet) {
    wallet.visible += 1;
    this.updateWallet(wallet);
  }

  find(wallet: Wallet) {
    return this.wallets
      .asObservable()
      .map(wallets =>
        wallets.find(
          w => w.addresses[0].address === wallet.addresses[0].address,
        ),
      );
  }

  sum(): Observable<number> {
    return this.all().map(wallets =>
      wallets
        .map(wallet => (wallet.coins >= 0 ? wallet.coins : 0))
        .reduce((a, b) => a + b, 0),
    );
  }

  create(label: string, seed: string) {
    this.localApi.getAddresses(seed, 16).subscribe(data => {
      const wallet: Wallet = {
        visible: 1,
        label,
        seed,
        coins: null,
        hours: null,
        addresses: [{ address: data[0].address, coins: null, hours: null }],
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
    this.wallets.first().subscribe(wallets => {
      Observable.forkJoin(
        wallets.map(wallet =>
          this.retrieveWalletBalance(wallet).map(response => {
            wallet.addresses = response;
            wallet.coins = response
              .map(address => (address.coins >= 0 ? address.coins : 0))
              .reduce((a, b) => a + b, 0);
            wallet.hours = response
              .map(address => (address.hours >= 0 ? address.hours : 0))
              .reduce((a, b) => a + b, 0);
            return wallet;
          }),
        ),
      ).subscribe(newWallets => this.wallets.next(newWallets));
    });
  }

  all(): Observable<Wallet[]> {
    return this.wallets.asObservable();
  }

  allAddresses(): Observable<any[]> {
    return this.all().map(wallets =>
      wallets.reduce((array, wallet) => array.concat(wallet.addresses), []),
    );
  }

  transactions(): Observable<any[]> {
    return this.allAddresses()
      .filter(addresses => !!addresses.length)
      .first()
      .flatMap(addresses => {
        this.addresses = addresses;
        return Observable.forkJoin(
          addresses.map(address => this.apiService.getExplorerAddress(address)),
        );
      })
      .map(transactions =>
        [].concat
          .apply([], transactions)
          .sort((a, b) => b.timestamp - a.timestamp),
      )
      .map(transactions =>
        transactions.reduce((array, item) => {
          if (!array.find(trans => trans.txid === item.txid)) {
            array.push(item);
          }
          return array;
        }, []),
      )
      .map(transactions =>
        transactions.map(transaction => {
          const outgoing = !!this.addresses.find(
            address => transaction.inputs[0].owner === address.address,
          );
          transaction.outputs.forEach(output => {
            if (
              outgoing &&
              !this.addresses.find(address => output.dst === address.address)
            ) {
              transaction.addresses.push(output.dst);
              transaction.balance =
                transaction.balance - parseFloat(output.coins);
            }
            if (
              !outgoing &&
              this.addresses.find(address => output.dst === address.address)
            ) {
              transaction.addresses.push(output.dst);
              transaction.balance =
                transaction.balance + parseFloat(output.coins);
            }
            return transaction;
          });

          return transaction;
        }),
      );
  }

  private addWallet(wallet: Wallet) {
    this.wallets.first().subscribe(wallets => {
      wallets = wallets ? wallets : [];
      wallets.push(wallet);
      this.updateWallets(wallets);
      this.refreshBalances();
    });
  }

  private updateWallet(wallet: Wallet) {
    this.wallets.first().subscribe(wallets => {
      const index = wallets.findIndex(w => w.seed === wallet.seed);
      wallets[index] = wallet;
      this.updateWallets(wallets);
      this.refreshBalances();
    });
  }

  private updateWallets(wallets: Wallet[]) {
    if (this.secureStorage.secureStorageDisabled) {
      wallets.forEach(wallet => (wallet.seed = ''));
    }
    this.wallets.next(wallets);
    this.secureStorage.set('wallets', wallets);
  }

  private indexWallets(): Observable<Wallet[]> {
    return this.secureStorage.get('wallets');
  }

  private loadData(): void {
    this.indexWallets()
      .first()
      .subscribe(
        wallets => {
          this.wallets.next(wallets);
          this.refreshBalances();
        },
        // tslint:disable-next-line:no-console
        error => console.log(error),
      );
  }

  private retrieveAddressBalance(address: any | any[]) {
    const addresses = Array.isArray(address)
      ? address.map(address => address.address).join(',')
      : address.address;
    return this.apiService.get('balance', { addrs: addresses });
  }

  private retrieveWalletBalance(wallet: Wallet): Observable<any> {
    return Observable.forkJoin(
      wallet.addresses.map(address =>
        this.retrieveAddressBalance(address).map(balance => {
          address.coins = balance.confirmed.coins / 1000000;
          address.hours = balance.confirmed.hours;
          return address;
        }),
      ),
    );
  }
}
