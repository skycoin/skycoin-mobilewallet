import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { AddressProvider } from '../../providers/address/address';

@Component({
  selector: 'page-wallet-detail',
  templateUrl: 'wallet-detail.html',
})
export class WalletDetailPage {
  wallet: any;

  constructor(
    private address: AddressProvider,
    private navParams: NavParams
  ) {
    this.wallet = this.navParams.get('wallet');
  }

  createAddress() {
    this.address.create(this.wallet).subscribe(address => {
      if (this.wallet.addresses && this.wallet.addresses.length) {
        this.wallet.addresses.push(address);
      } else {
        this.wallet.addresses = [address];
      }
    });
  }
}
