import { Component, OnInit } from '@angular/core';
import { WalletProvider } from '../../providers/wallet/wallet';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { WalletModel } from '../../models/wallet.model';
import { LocalApiProvider } from '../../providers/local-api/local-api';

@Component({
  selector: 'page-send-skycoin',
  templateUrl: 'send-skycoin.html',
})
export class SendSkycoinPage implements OnInit {

  form: FormGroup;
  wallets: WalletModel[] = [];

  constructor(
    public formBuilder: FormBuilder,
    public localApi: LocalApiProvider,
    public walletProvider: WalletProvider
  ) {}

  ngOnInit() {
    this.initForm();
    this.walletProvider.all().subscribe(wallets => this.wallets = wallets);
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
