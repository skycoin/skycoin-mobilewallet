import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { WalletProvider } from '../../providers/wallet/wallet';
import { WalletDetailPage } from '../wallet-detail/wallet-detail';
import { WalletModel } from '../../models/wallet.model';
import { SendSkycoinPage } from '../send-skycoin/send-skycoin';

@Component({
  templateUrl: 'wallets.html'
})
export class WalletsPage implements OnInit {

  sum = 0;
  wallets: WalletModel[] = [];

  constructor(
    private platform: Platform,
    public nav: NavController,
    private wallet: WalletProvider,
  ) {}

  ngOnInit() {
    this.platform.ready().then(() => this.getWallets());
  }

  createWallet() {
    this.wallet.create().subscribe((wallet: WalletModel) => this.wallets.unshift(wallet));
  }

  deleteWallet(wallet) {
    this.wallet.destroy(wallet).subscribe(() => this.wallets = this.wallets.filter(o => o.id !== wallet.id));
  }

  getWallets() {
    this.wallet.all().subscribe((wallets: WalletModel[]) => {
      this.wallets = wallets;
      wallets.forEach((wallet, index) => {
        this.wallet.balance(wallet).subscribe(result => {
          console.log(result);
          this.sum = this.sum + result.balance;
          this.wallets[index].balance = result.balance;
        })
      });
    });
  }

  openWallet(wallet) {
    this.nav.push(WalletDetailPage, {wallet: wallet});
  }

  openSendPage() {
    this.nav.push(SendSkycoinPage);
  }
}
