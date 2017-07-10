import { Component, OnInit } from '@angular/core';
import { LocalApiProvider } from '../../providers/local-api/local-api';
import { Platform } from 'ionic-angular';
import { WalletProvider } from '../../providers/wallet/wallet';

@Component({
  templateUrl: 'wallets.html'
})
export class WalletsPage implements OnInit {

  wallets = [];

  constructor(
    private localApi: LocalApiProvider,
    private platform: Platform,
    private wallet: WalletProvider,
  ) {}

  ngOnInit() {
    console.log('updated');
    this.platform.ready().then(() => this.getWallets());
  }

  getWallets() {
    this.wallet.all().subscribe(wallets => this.wallets = wallets);
  }

  createAddress(wallet) {
    this.localApi.createAddress(wallet.name.substr(0, wallet.name.length - 4), 1);
  }

  createWallet() {
    this.localApi.createWallet('abcd').subscribe(wallet => console.log(wallet));
  }
}
