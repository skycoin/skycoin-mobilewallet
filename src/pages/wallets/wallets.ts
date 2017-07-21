import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { WalletProvider } from '../../providers/wallet/wallet.provider';
import { WalletDetailPage } from '../wallet-detail/wallet-detail';
import { WalletModel } from '../../models/wallet.model';
import { SendSkycoinPage } from '../send-skycoin/send-skycoin';
import { NewWalletPage } from '../new-wallet/new-wallet';
import { Subject } from 'rxjs/Subject';

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

  deleteWallet(wallet) {
    this.wallet.remove(wallet).subscribe();
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
}
