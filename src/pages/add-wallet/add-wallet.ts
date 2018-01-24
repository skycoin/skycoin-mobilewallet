import { Component, OnInit, ViewChild } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
} from '@angular/forms';
import { ViewController } from 'ionic-angular';
import { WalletProvider } from '../../providers/wallet/wallet.provider'
import { ButtonComponent } from './../../components/button/button.component'
import { SeedValidation } from './../../match';

@Component( {
  selector: 'page-add-wallet',
  templateUrl: 'add-wallet.html',
} )
export class AddWalletPage implements OnInit {
  @ViewChild('button') button: ButtonComponent;
  showConfirm: boolean;
  form: FormGroup;
  seed: string;

  constructor( public view: ViewController,
               private wallet: WalletProvider,
               fb: FormBuilder, ) {
    this.form = fb.group(
      {
        confirmSeed: [ '', Validators.required ],
        label: [ '', Validators.required ],
        seed: [ '', Validators.required ],
      },
      {
        validator: SeedValidation.MatchSeed,
      },
    );
  }

  ngOnInit() {
    this.generateSeed();
  }

  createWallet() {
    this.button.setLoading();
    this.wallet.create( this.form.value.label, this.form.value.seed );
    this.button.setSuccess();
    this.view.dismiss();
  }

  cancel() {
    this.view.dismiss();
  }

  generateSeed() {
    this.wallet
      .generateSeed()
      .subscribe(seed => this.form.controls.seed.setValue(seed));
  }

  confirmCreateWallet() {
    this.showConfirm = true;
  }

  closeModal() {
    this.showConfirm = false;
  }

  private resetForm() {
    this.form.controls.label.reset(undefined);
    this.form.controls.seed.reset(undefined);
    this.form.controls.confirmSeed.reset(undefined);
  }
}
