import { Component, OnInit } from '@angular/core';
import { NavController, Platform } from 'ionic-angular';
import { WalletProvider } from '../../providers/wallet/wallet';
import { WalletDetailPage } from '../wallet-detail/wallet-detail';
import { WalletModel } from '../../models/wallet.model';

@Component({
  templateUrl: 'wallets.html'
})
export class WalletsPage implements OnInit {

  wallets: WalletModel[] = [];

  constructor(
    private platform: Platform,
    public nav: NavController,
    private wallet: WalletProvider,
  ) {}

  ngOnInit() {
    this.platform.ready().then(() => this.getWallets());
  }

  getWallets() {
    this.wallet.all().subscribe((wallets: WalletModel[]) => this.wallets = wallets);
  }

  createWallet() {
    this.wallet.create().subscribe((wallet: WalletModel) => this.wallets.unshift(wallet));
  }

  deleteWallet(wallet) {
    this.wallet.destroy(wallet).subscribe(() => this.wallets = this.wallets.filter(o => o.id !== wallet.id));
  }

  openWallet(wallet) {
    this.nav.push(WalletDetailPage, {wallet: wallet});
  }
}
