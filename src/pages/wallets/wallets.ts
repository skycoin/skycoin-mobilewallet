import { Component, OnInit } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { WalletProvider } from '../../providers/wallet/wallet.provider';
import { WalletDetailPage } from '../wallet-detail/wallet-detail';
import { WalletModel } from '../../models/wallet.model';
import { NewWalletPage } from '../new-wallet/new-wallet';
import { Subject } from 'rxjs/Subject';
import { AddWalletPage } from '../add-wallet/add-wallet';
import { LoadWalletPage } from '../load-wallet/load-wallet';

@Component({
  templateUrl: 'wallets.html'
})
export class WalletsPage implements OnInit {

  sum: number = 0;
  wallets: Subject<WalletModel[]>;

  constructor(
    private modal: ModalController,
    public nav: NavController,
    public wallet: WalletProvider,
  ) {}

  ngOnInit() {
    this.wallet.sum().subscribe(data => this.sum = data);
  }

  addWallet() {
    const modal = this.modal.create(AddWalletPage);
    modal.present();
  }

  deleteWallet(wallet) {
    this.wallet.remove(wallet);
  }

  loadWallet() {
    const modal = this.modal.create(LoadWalletPage);
    modal.present();
  }

  openWallet(wallet) {
    this.nav.push(WalletDetailPage, {wallet: wallet});
  }

  openNewWalletPage() {
    this.nav.push(NewWalletPage);
  }

  refreshData() {
    console.log('refreshing');
    this.wallet.refresh();
  }
}
