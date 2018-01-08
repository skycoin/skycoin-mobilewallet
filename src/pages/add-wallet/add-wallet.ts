import { Component, OnInit } from '@angular/core';
import { WalletProvider } from '../../providers/wallet/wallet.provider';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ViewController } from 'ionic-angular';

@Component({
  selector: 'page-add-wallet',
  templateUrl: 'add-wallet.html',
})
export class AddWalletPage implements OnInit {

  form: FormGroup;
  label: string="";
  seed: string="";
  confirmseed: string="";

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

  generateSeed() {
    this.wallet.generateSeed().subscribe(seed => {
      this.form.controls.seed.setValue(seed);
      this.form.controls.confirmseed.setValue(seed)
    });
  }

  validateSeed(){
   return (this.form.controls.seed.value && this.form.controls.seed.value === this.form.controls.confirmseed.value)
  }

  private initForm() {
    this.form = new FormGroup({
      label: new FormControl('', Validators.required),
      seed: new FormControl('', Validators.required),
      confirmseed: new FormControl('', Validators.required)
    });
    console.log(this.form);


    this.generateSeed();
  }
}
