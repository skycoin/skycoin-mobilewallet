import { Component, OnInit } from '@angular/core';
import { WalletProvider } from '../../providers/wallet/wallet.provider';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalApiProvider } from '../../providers/local-api/local-api.provider';
import { NavController, ViewController } from 'ionic-angular';

@Component({
  selector: 'page-send-skycoin',
  templateUrl: 'send-skycoin.html',
})
export class SendSkycoinPage implements OnInit {

  form: FormGroup;
  loading = false;

  constructor(
    public formBuilder: FormBuilder,
    public localApi: LocalApiProvider,
    public nav: NavController,
    private view: ViewController,
    public wallet: WalletProvider,
  ) {}

  ngOnInit() {
    this.initForm();
  }

  cancel() {
    this.view.dismiss()
  }

  send() {
    this.loading = true;
    const seed = this.form.value.wallet.seed;
    const addresses = this.form.value.wallet.visible;
    const amount = this.form.value.amount * 1000000;
    this.localApi.postTransaction(seed, addresses, this.form.value.address, amount)
      .subscribe(
        () => setTimeout(() => this.returnAndRefresh(), 3000),
        error => console.log(error)
      );
  }

  private initForm() {
    this.form = this.formBuilder.group({
      wallet: ['', Validators.required],
      address: ['24pexN7n4uwgktCG4FrohgADbesTV3yTt5x', Validators.required],
      amount: ['', Validators.required],
    });
  }

  private returnAndRefresh() {
    this.loading = false;
    this.nav.popToRoot();
    setTimeout(() => this.wallet.refreshBalances(), 5000)
  }
}
