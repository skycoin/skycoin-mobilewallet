import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { AddressProvider } from '../../providers/address/address.provider';
import { WalletProvider } from '../../providers/wallet/wallet.provider';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'page-wallet-detail',
  templateUrl: 'wallet-detail.html',
})
export class WalletDetailPage {
  sum: number = 0;
  wallet: any;

  private walletSubscription: Subscription;

  constructor(
    private address: AddressProvider,
    private walletProvider: WalletProvider,
    private navParams: NavParams,
  ) {}

  ngOnInit() {
    this.walletSubscription = this.walletProvider.find(this.navParams.get('wallet')).subscribe(wallet => {
      this.wallet = wallet;
      this.addAddressBalances();
    });
  }

  createAddress() {
    this.walletProvider.createAddress(this.wallet);
  }

  private addAddressBalances() {
    if (this.wallet.entries) {
      this.wallet.entries.forEach((address, index ) => {
        this.address.getBalance(address).subscribe(balance => {
          this.wallet.entries[index].balance = balance.balance;
          this.sum = this.sum + balance.balance;
        })
      });
    }
  }
}
