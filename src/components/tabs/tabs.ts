import { Component } from '@angular/core';
import { ModalController, NavController } from 'ionic-angular';
import { SendSkycoinPage } from '../../pages/send-skycoin/send-skycoin';
import { TransactionsPage } from '../../pages/transactions/transactions';
import { WalletsPage } from '../../pages/wallets/wallets';

@Component({
  selector: 'tabs',
  templateUrl: 'tabs.html',
})
export class TabsComponent {

  constructor(
    private modal: ModalController,
    private nav: NavController,
  ) {}

  openWalletsPage() {
    this.nav.setRoot(WalletsPage);
  }

  openSendPage() {
    const modal = this.modal.create(SendSkycoinPage);
    modal.present();
  }

  openTransactions() {
    this.nav.setRoot(TransactionsPage);
  }
}
