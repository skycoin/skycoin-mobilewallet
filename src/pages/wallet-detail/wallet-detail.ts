import { Component } from '@angular/core';
import {ModalController, NavParams, Platform, ToastController} from 'ionic-angular';
import { WalletProvider } from '../../providers/wallet/wallet.provider';
import { Subscription } from 'rxjs/Subscription';
import { AddressModel } from '../../models/address.model';
import { Clipboard } from '@ionic-native/clipboard';

@Component({
  selector: 'page-wallet-detail',
  templateUrl: 'wallet-detail.html',
})
export class WalletDetailPage {
  address: AddressModel;
  sum: number = 0;
  wallet: any;

  private walletSubscription: Subscription;

  constructor(
    private clipboard: Clipboard,
    private platform: Platform,
    public modal: ModalController,
    public toast: ToastController,
    private walletProvider: WalletProvider,
    private navParams: NavParams,
  ) {}

  ngOnInit() {
    this.walletSubscription = this.walletProvider.find(this.navParams.get('wallet')).subscribe(wallet => {
      this.wallet = wallet;
      console.log(this.wallet);
    });
  }

  open(address: AddressModel) {
    this.address = address;
  }

  closeModal() {
    this.address = null;
  }

  copy(address: AddressModel) {
    console.log('starting');
    this.platform.ready().then(() => {
      console.log('done');
      this.clipboard.copy(address.address);
      let toast = this.toast.create({
        message: 'Address copied to clipboard',
        duration: 3000
      });
      toast.present();
    });
  }

  createAddress() {
    this.walletProvider.createAddress(this.wallet);
  }
}
