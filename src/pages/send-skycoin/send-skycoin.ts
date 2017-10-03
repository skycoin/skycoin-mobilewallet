import { Component, OnInit } from '@angular/core';
import { WalletProvider } from '../../providers/wallet/wallet.provider';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalApiProvider } from '../../providers/local-api/local-api.provider';
import { NavController } from 'ionic-angular';

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
    public wallet: WalletProvider,
  ) {}

  ngOnInit() {
    this.initForm();
  }

  send() {
    this.loading = true;
    const seed = this.form.value.wallet.seed;
    const addresses = this.form.value.wallet.entries.length;
    const amount = this.form.value.amount * 1000000;
    this.localApi.postTransaction(seed, addresses, this.form.value.address, amount)
      .subscribe(() => setTimeout(() => this.returnAndRefresh(), 3000));
  }

  private initForm() {
    this.form = this.formBuilder.group({
      wallet: ['', Validators.required],
      address: ['', Validators.required],
      amount: ['', Validators.required],
    });
  }

  private returnAndRefresh() {
    this.loading = false;
    this.wallet.refreshBalances();
    this.nav.popToRoot();
    setTimeout(() => this.wallet.refreshBalances(), 5000)
  }
}
