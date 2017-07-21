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
    this.localApi.sendSkycoin(this.form.value.wallet_id, this.form.value.address, this.form.value.amount)
      .subscribe(response => console.log(response));
  }

  private initForm() {
    this.form = this.formBuilder.group({
      wallet_id: ['', Validators.required],
      address: ['', Validators.required],
      amount: ['', Validators.required],
    });

    this.form.controls.address.setValue('2aoDbTxBZzB2v9BvYgfswhQAu8Lq4Vub8iz');
  }
}
