import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import {
  AlertController,
  LoadingController,
  NavController,
  Slides,
  ViewController,
} from 'ionic-angular';
import { WalletsPage } from '../../pages/wallets/wallets';
import { SecureStorageProvider } from '../../providers/secure-storage/secure-storage';
import { WalletProvider } from '../../providers/wallet/wallet.provider';
import { SeedValidation } from './../../match';

@Component({
  selector: 'page-pincode',
  templateUrl: 'pincode.html',
})
export class PincodePage implements OnInit {
  @ViewChild('slides') slides: Slides;
  form: FormGroup;
  status: number;
  seed: string;
  confirmSeed: string;
  correct: string;
  pin: string;
  showError: boolean;
  display: boolean;
  storageAvailable: boolean = true;
  showConfirm: boolean;
  showConfirmCheck: boolean;

  constructor(
    public alert: AlertController,
    public el: ElementRef,
    public nav: NavController,
    public secureStorage: SecureStorageProvider,
    public loadingCtrl: LoadingController,
    private view: ViewController,
    private wallet: WalletProvider,
    fb: FormBuilder,
  ) {
    this.form = fb.group(
      {
        confirmSeed: ['', Validators.required],
        label: ['', Validators.required],
        seed: ['', Validators.required],
      },
      {
        validator: SeedValidation.MatchSeed,
      },
    );
  }

  ngOnInit() {
    this.pin = '';
    this.nav.setRoot(WalletsPage);
    // this.generateSeed();
    // const loader = this.loadingCtrl.create({ content: 'Please wait...' });
    // loader.present();

    // this.secureStorage.get('pin').subscribe(pin => {
    //     this.status = 1;
    //     this.correct = pin;
    //     this.display = true;
    //     loader.dismiss();
    //   }, error => {
    //     if (error.toString() === 'Error: Key [_SS_pin] not found.') {
    //       this.startCreateNewPinFlow();
    //     } else {
    //       // error.toString() === 'Error: Device is not secure'
    //       this.storageAvailable = false;
    //     }
    //     this.display = true;
    //     loader.dismiss();
    //   });
  }

  createWallet() {
    this.wallet.create(this.form.value.label, this.form.value.seed);
    this.nav.setRoot(WalletsPage);
  }

  generateSeed() {
    this.wallet
      .generateSeed()
      .subscribe(seed => this.form.controls.seed.setValue(seed));
  }

  disableSecure() {
    this.secureStorage.secureStorageDisabled = true;
    this.nav.setRoot(WalletsPage);
  }

  pressNumber(value: string) {
    this.pin += this.pin.length < 4 ? value : '';
    if (this.pin.length >= 4) {
      this.handlePin();
    }
  }

  pressBack() {
    this.pin = this.pin.substr(0, this.pin.length - 1);
  }

  ionViewWillEnter() {
    this.slides.update();
    this.slides.lockSwipes(true);
  }

  confirmCreateWallet() {
    this.showConfirm = true;
  }
  closeModal() {
    this.storageAvailable = true;
    this.showConfirm = false;
  }

  private confirmPin() {
    if (this.pin === this.correct) {
      this.secureStorage.set('pin', this.pin).subscribe(() => {
        this.slides.lockSwipes(false);
        this.slides.slideNext();
        this.slides.lockSwipes(true);
      });
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

  private newPin() {
    this.status = 3;
    this.correct = this.pin;
    this.pin = '';
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
    setTimeout(() => (this.pin = ''), 200);
    setTimeout(() => (this.showError = false), 500);
  }
}
