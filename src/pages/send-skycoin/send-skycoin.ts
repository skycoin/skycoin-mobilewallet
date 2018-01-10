import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ViewController } from 'ionic-angular';
import { LocalApiProvider } from '../../providers/local-api/local-api.provider';
import { SecureStorageProvider } from '../../providers/secure-storage/secure-storage';
import { WalletsPage } from '../wallets/wallets';

@Component({
  selector: 'page-send-skycoin',
  templateUrl: 'send-skycoin.html',
})
export class SendSkycoinPage implements OnInit {

  form: FormGroup;
  loading = false;
  seedRequired: boolean;

  constructor(
    private formBuilder: FormBuilder,
    private localApi: LocalApiProvider,
    private nav: NavController,
    private secureStorage: SecureStorageProvider,
    private view: ViewController,
  ) {
    if (this.secureStorage.secureStorageDisabled) {
      this.seedRequired = true;
    }
  }

  ngOnInit() {
    this.initForm();
  }

  cancel() {
    this.view.dismiss();
  }

  send() {
    this.loading = true;
    const seed = this.seedRequired ? this.form.value.seed : this.form.value.wallet.seed;
    const addresses = this.form.value.wallet.visible;
    const amount = this.form.value.amount * 1000000;
    this.localApi.postTransaction(seed, addresses, this.form.value.address, amount)
      .subscribe(
        () => this.nav.setRoot(WalletsPage),
        // tslint:disable-next-line:no-console
        (error) => console.log(error),
      );
  }

  private initForm() {
    const group: any = {
      address: ['', Validators.required],
      amount: ['', Validators.required],
      wallet: ['', Validators.required],
    };

    if (this.seedRequired) {
      group.seed = ['', Validators.required];
    }

    this.form = this.formBuilder.group(group);
  }
}
