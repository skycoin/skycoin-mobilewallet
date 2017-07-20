import { Component, OnInit } from '@angular/core';
import { WalletProvider } from '../../providers/wallet/wallet';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController } from 'ionic-angular';

@Component({
  selector: 'page-new-wallet',
  templateUrl: 'new-wallet.html',
})
export class NewWalletPage implements OnInit {

  form: FormGroup;
  seed: string;

  constructor(
    public formBuilder: FormBuilder,
    public nav: NavController,
    private wallet: WalletProvider,
  ) {}

  ngOnInit() {
    this.initForm();
  }

  createWallet() {
    this.wallet.create(this.form.value.seed).subscribe(() => this.nav.pop());
  }

  generateSeed() {
    this.wallet.generateSeed().subscribe(seed => this.form.controls.seed.setValue(seed));
  }

  private initForm() {
    this.form = this.formBuilder.group({
      seed: ['', Validators.required],
    });

    this.generateSeed();
  }
}
