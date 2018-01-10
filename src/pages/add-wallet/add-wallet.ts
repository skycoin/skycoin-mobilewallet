import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ViewController } from 'ionic-angular';
import { WalletProvider } from '../../providers/wallet/wallet.provider';

@Component({
  selector: 'page-add-wallet',
  templateUrl: 'add-wallet.html',
})
export class AddWalletPage implements OnInit {

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
    this.view.dismiss();
  }

  createWallet() {
    this.wallet.create(this.form.value.label, this.form.value.seed);
    this.view.dismiss();
  }

  generateSeed() {
    this.wallet.generateSeed().subscribe((seed) => this.form.controls.seed.setValue(seed));
  }

  private initForm() {
    this.form = new FormGroup({
      label: new FormControl('', Validators.required),
      seed: new FormControl('', Validators.required),
    });

    this.generateSeed();
  }
}
