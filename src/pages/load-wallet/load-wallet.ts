import { Component, OnInit } from '@angular/core';
import { WalletProvider } from '../../providers/wallet/wallet.provider';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'page-load-wallet',
  templateUrl: 'load-wallet.html',
})
export class LoadWalletPage implements OnInit {

  form: FormGroup;
  seed: string;

  constructor(
    private view: ViewController,
    private wallet: WalletProvider,
  ) {}

  ngOnInit() {
    this.initForm();
  }

  cancel() {
    this.view.dismiss()
  }

  createWallet() {
    this.wallet.create(this.form.value.label, this.form.value.seed);
    this.view.dismiss();
  }

  private initForm() {
    this.form = new FormGroup({
      label: new FormControl('', Validators.required),
      seed: new FormControl('', Validators.required),
    });
  }
}
