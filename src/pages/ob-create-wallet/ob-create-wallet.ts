import { Component, OnInit } from '@angular/core';
import { NavController } from 'ionic-angular';
import { FormBuilder, FormGroup, Validators } from "@angular/forms";
import { WalletProvider } from "../../providers/wallet/wallet.provider";
import { SeedValidation } from "../../match";
import { TabsPage } from '../tabs/tabs';

@Component( {
  selector: 'page-ob-create-wallet',
  templateUrl: 'ob-create-wallet.html',
} )
export class ObCreateWalletPage implements OnInit {
  form: FormGroup;
  seed: string;
  confirmSeed: string
  showConfirm: boolean;
  showConfirmCheck: boolean;

  constructor( public nav: NavController,
               private wallet: WalletProvider,
               fb: FormBuilder ) {

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
    this.wallet.create( this.form.value.label, this.form.value.seed );
    this.nav.setRoot( TabsPage );
  }

  generateSeed() {
    this.wallet
      .generateSeed()
      .subscribe( seed => this.form.controls.seed.setValue( seed ) );
  }

  confirmCreateWallet() {
    this.showConfirm = true;
  }

  closeModal() {
    this.showConfirm = false;
  }

}
