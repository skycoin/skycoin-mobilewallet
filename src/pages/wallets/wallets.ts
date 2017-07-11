import { Component, OnInit } from '@angular/core';
import { Platform } from 'ionic-angular';
import { WalletProvider } from '../../providers/wallet/wallet';
import { AddressProvider } from '../../providers/address/address';

@Component({
  templateUrl: 'wallets.html'
})
export class WalletsPage implements OnInit {

  wallets = [];

  constructor(
    private address: AddressProvider,
    private platform: Platform,
    private wallet: WalletProvider,
  ) {}

  ngOnInit() {
    this.platform.ready().then(() => this.getWallets());
  }

  getWallets() {
    this.wallet.all().subscribe(wallets => this.wallets = wallets);
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
}
