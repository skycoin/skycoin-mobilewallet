import { Component } from '@angular/core';
import { NavParams, Platform } from 'ionic-angular';
import { WalletProvider } from '../../providers/wallet/wallet.provider';
import { Subscription } from 'rxjs/Subscription';
import { AddressModel } from '../../models/address.model';
import { Clipboard } from '@ionic-native/clipboard';

@Component({
  selector: 'page-wallet-detail',
  templateUrl: 'wallet-detail.html',
})
export class WalletDetailPage {
  sum: number = 0;
  wallet: any;

  private walletSubscription: Subscription;

  constructor(
    private clipboard: Clipboard,
    private platform: Platform,
    private walletProvider: WalletProvider,
    private navParams: NavParams,
  ) {}

  ngOnInit() {
    this.walletSubscription = this.walletProvider.find(this.navParams.get('wallet')).subscribe(wallet => {
      this.wallet = wallet;
      console.log(this.wallet);
    });
  }

  copy(address: AddressModel) {
    this.platform.ready().then(() => this.clipboard.copy(address.address));
  }

  createAddress() {
    this.walletProvider.createAddress(this.wallet);
  }
}
