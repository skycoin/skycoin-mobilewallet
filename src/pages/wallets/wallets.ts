import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WalletProvider } from '../../providers/wallet/wallet.provider';
import { WalletDetailPage } from '../wallet-detail/wallet-detail';
import { WalletModel } from '../../models/wallet.model';
import { SendSkycoinPage } from '../send-skycoin/send-skycoin';
import { NewWalletPage } from '../new-wallet/new-wallet';
import { Subject } from 'rxjs/Subject';
import {TransactionsPage} from "../transactions/transactions";

@Component({
  templateUrl: 'wallets.html'
})
export class WalletsPage {

  showCreateForm: boolean = false;
  sum: number = 0;
  wallets: Subject<WalletModel[]>;

  constructor(
    public nav: NavController,
    public wallet: WalletProvider,
  ) {}

  ngOnInit() {
    this.wallet.sum().subscribe(data => this.sum = data);
  }

  deleteWallet(wallet) {
    this.wallet.remove(wallet);
  }

  openWallet(wallet) {
    this.nav.push(WalletDetailPage, {wallet: wallet});
  }

  openNewWalletPage() {
    this.nav.push(NewWalletPage);
  }

  openSendPage() {
    this.nav.push(SendSkycoinPage);
  }

  openTransactions() {
    this.nav.push(TransactionsPage);
  }

  refreshData() {
    console.log('refreshing');
    this.wallet.refresh();
  }
}
