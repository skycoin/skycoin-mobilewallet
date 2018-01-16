import { Component } from '@angular/core';
import { NavParams } from 'ionic-angular';
import { WalletsPage } from '../wallets/wallets';
import { SendSkycoinPage } from '../send-skycoin/send-skycoin';
import { TransactionsPage } from '../transactions/transactions';

@Component({
  selector: 'tabs-page',
  templateUrl: 'tabs.html',
})
export class TabsPage {

  tab1Root: any = WalletsPage;
  tab2Root: any = SendSkycoinPage;
  tab3Root: any = TransactionsPage;
  mySelectedIndex: number;

  constructor(navParams: NavParams) {
    this.mySelectedIndex = navParams.data.tabIndex || 0;
  }

}
