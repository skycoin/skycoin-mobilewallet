import { Component } from '@angular/core';
import { NavController } from 'ionic-angular';
import { SendSkycoinPage } from '../../pages/send-skycoin/send-skycoin';
import { TransactionsPage } from '../../pages/transactions/transactions';
import { WalletsPage } from '../../pages/wallets/wallets';

@Component({
  selector: 'tabs',
  templateUrl: 'tabs.html'
})
export class TabsComponent {

  constructor(
    private nav: NavController,
  ) {}

  openWalletsPage() {
    this.nav.push(WalletsPage);
  }

  openSendPage() {
    this.nav.push(SendSkycoinPage);
  }

  openTransactions() {
    this.nav.push(TransactionsPage);
  }
}
