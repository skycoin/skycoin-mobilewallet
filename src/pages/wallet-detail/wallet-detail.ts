import { Component, OnDestroy, OnInit } from '@angular/core';
import { Clipboard } from '@ionic-native/clipboard';
import {
  ModalController,
  NavParams,
  Platform,
  ToastController,
} from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { AddressModel } from '../../models/address.model';
import { WalletProvider } from '../../providers/wallet/wallet.provider';

@Component({
  selector: 'page-wallet-detail',
  templateUrl: 'wallet-detail.html',
})
export class WalletDetailPage implements OnInit, OnDestroy {
  address: AddressModel;
  addresses: AddressModel[];
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
    this.walletSubscription = this.walletProvider
      .find(this.navParams.get('wallet'))
      .subscribe(wallet => {
        this.addresses =
          wallet && wallet.entries
            ? wallet.entries.slice(0, wallet.visible)
            : [];
        this.wallet = wallet;
      });
  }

  ngOnDestroy() {
    this.walletSubscription.unsubscribe();
  }

  open(address: AddressModel) {
    this.address = address;
  }

  closeModal() {
    this.address = null;
  }

  copy(address: AddressModel) {
    this.platform.ready().then(() => {
      this.clipboard.copy(address.address);
      const toast = this.toast.create({
        duration: 3000,
        message: 'Address copied to clipboard',
      });
      toast.present();
    });
  }

  addAddress() {
    this.walletProvider.addAddress(this.wallet);
  }
}
