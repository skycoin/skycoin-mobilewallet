import { Component } from '@angular/core';
import { WalletProvider } from '../../providers/wallet/wallet';

@Component({
  selector: 'page-new-wallet',
  templateUrl: 'new-wallet.html',
})
export class NewWalletPage {

  seed: string;

  constructor(
    private wallet: WalletProvider,
  ) {}

  ionViewDidLoad() {
    console.log('ionViewDidLoad NewWalletPage');
  }

  generateSeed() {
    this.wallet.generateSeed().subscribe(seed => console.log(seed));
  }
}
