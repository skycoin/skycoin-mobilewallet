import { Component, ElementRef } from '@angular/core';
import { AlertController, NavController } from 'ionic-angular';
import { SecureStorageProvider } from '../../providers/secure-storage/secure-storage';
import { WalletsPage } from '../wallets/wallets';

/**
 * Generated class for the PincodePage page.
 *
 * See http://ionicframework.com/docs/components/#navigation for more info
 * on Ionic pages and navigation.
 */
@Component({
  selector: 'page-pincode',
  templateUrl: 'pincode.html',
})
export class PincodePage {
  status: number;
  correct: string;
  pin = "";
  showError = false;


  constructor(
    public alert: AlertController,
    public el: ElementRef,
    public nav: NavController,
    public secureStorage: SecureStorageProvider,
  ) {
    this.secureStorage.get('pin').subscribe(
      pin => {
        this.status = 1;
        this.correct = pin;
      },
      error => this.startCreateNewPinFlow()
    );
  }

  pressNumber(value: string) {
    this.pin += this.pin.length < 4 ? value : "";
    if (this.pin.length >= 4) {
      this.handlePin();
    }
  }

  private confirmPin() {
    if (this.pin === this.correct) {
      this.secureStorage.set('pin', this.pin).subscribe(
        () => this.nav.setRoot(WalletsPage),
        () => this.handleUnsafeDevice()
      );

    } else {
      this.wrongPin();
      this.status = 2;
    }
  }

  private handlePin() {
    switch (this.status) {
      case 1:
        this.verifyPin();
        break;
      case 2:
        this.newPin();
        break;
      case 3:
        this.confirmPin();
        break;
    }
  }

  private handleUnsafeDevice() {
    const alert = this.alert.create({
      title: 'Unsafe device',
      message: 'Please enable the screen lock on your device. This app cannot operate securely without it.',
      buttons: [
        { text: 'Ok', handler: () => this.secureStorage.secureDevice() }
      ]
    });
    alert.present();

  }

  private newPin() {
    this.status = 3;
    this.correct = this.pin;
    this.pin = "";
  }

  private startCreateNewPinFlow() {
    this.status = 2;
  }

  private verifyPin() {
    if (this.pin === this.correct) {
      this.nav.setRoot(WalletsPage);
    } else {
      this.wrongPin();
    }
  }

  private wrongPin() {
    this.showError = true;
    setTimeout(() => this.pin = "", 200);
    setTimeout(() => this.showError = false, 500);
  }
}
