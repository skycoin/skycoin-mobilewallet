import { Component, OnInit } from '@angular/core';
import { WalletProvider } from '../../providers/wallet/wallet.provider';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { LocalApiProvider } from '../../providers/local-api/local-api.provider';

@Component({
  selector: 'page-send-skycoin',
  templateUrl: 'send-skycoin.html',
})
export class SendSkycoinPage implements OnInit {

  form: FormGroup;

  constructor(
    public formBuilder: FormBuilder,
    public localApi: LocalApiProvider,
    public wallet: WalletProvider
  ) {}

  ngOnInit() {
    this.initForm();
  }

  send() {
    const seed = this.form.value.wallet.seed;
    const addresses = this.form.value.wallet.entries.length;
    const amount = this.form.value.amount * 1000000;
    this.localApi.postTransaction(seed, addresses, this.form.value.address, amount)
      .subscribe(response => console.log(response));
  }

  private initForm() {
    this.form = this.formBuilder.group({
      wallet: ['', Validators.required],
      address: ['', Validators.required],
      amount: ['', Validators.required],
    });

    this.form.controls.address.setValue('2aoDbTxBZzB2v9BvYgfswhQAu8Lq4Vub8iz');
  }
}
