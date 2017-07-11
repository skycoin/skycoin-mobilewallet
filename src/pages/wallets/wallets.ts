import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { WalletProvider } from '../../providers/wallet/wallet';
import { AddressProvider } from '../../providers/address/address';
import { WalletDetailPage } from '../wallet-detail/wallet-detail';

@Component({
  templateUrl: 'wallets.html'
})
export class WalletsPage implements OnInit {

  wallets = [];

  constructor(
    private address: AddressProvider,
    private platform: Platform,
    public nav: NavController,
    private wallet: WalletProvider,
  ) {}

  ngOnInit() {
    this.platform.ready().then(() => this.getWallets());
  }

  getWallets() {
    this.wallet.all().subscribe(wallets => {
      this.wallets = wallets;
      console.log(wallets);
    });
  }

  createAddress(wallet) {
    this.address.create(wallet).subscribe(address => {
      if (wallet.addresses && wallet.addresses.length) {
        wallet.addresses.push(address);
      } else {
        wallet.addresses = [address];
      }
    });
  }

  createWallet() {
    this.wallet.create().subscribe(wallet => this.wallets.unshift(wallet));
  }

  deleteWallet(wallet) {
    this.wallet.destroy(wallet).subscribe(() => this.wallets = this.wallets.filter(o => {
      console.log('filtering');
      return o.seed !== wallet.seed
    }));
  }

  openWallet(wallet) {
    console.log('opening');
    this.nav.push(WalletDetailPage, {wallet: wallet});
  }
}
