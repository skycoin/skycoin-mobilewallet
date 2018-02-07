import { Component, OnInit, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { NavController, ViewController } from 'ionic-angular';
import { LocalApiProvider } from '../../providers/local-api/local-api.provider';
import { SecureStorageProvider } from '../../providers/secure-storage/secure-storage';
import { WalletsPage } from '../wallets/wallets';
import { Wallet } from "../../models/wallet.model";
import { Subject } from "rxjs/Subject";
import { WalletProvider } from "../../providers/wallet/wallet.provider";
import { ButtonComponent } from './../../components/button/button.component';

@Component( {
  selector: 'page-send-skycoin',
  templateUrl: 'send-skycoin.html',
} )
export class SendSkycoinPage implements OnInit {
  @ViewChild( 'button' ) button: ButtonComponent;
  form: FormGroup;
  loading = false;
  seedRequired: boolean;
  sum: number = 0;
  wallets: Subject<Wallet[]>;

  constructor( private formBuilder: FormBuilder,
               private localApi: LocalApiProvider,
               private nav: NavController,
               private secureStorage: SecureStorageProvider,
               private view: ViewController,
               public wallet: WalletProvider, ) {
    if ( this.secureStorage.secureStorageDisabled ) {
      this.seedRequired = true;
    }
  }

  ngOnInit() {
    this.wallet.sum().subscribe( data => ( this.sum = data ) );
    this.initForm();
  }

  cancel() {
    this.view.dismiss();
  }

  send() {
    this.loading = true;
    const seed = this.seedRequired
      ? this.form.value.seed
      : this.form.value.wallet.seed;
    const addresses = this.form.value.wallet.visible;
    const amount = this.form.value.amount * 1000000;
    this.localApi
      .postTransaction( seed, addresses, this.form.value.address, amount )
      .subscribe(
        () => this.nav.setRoot( WalletsPage ),
        // tslint:disable-next-line:no-console
        error => console.log( error ),
      );

    this.resetForm();
  }

  private initForm() {
    const group: any = {
      address: [ '', Validators.required ],
      amount: [ '', Validators.required ],
      wallet: [ '', Validators.required ],
      notes: [ '', Validators.required ],
    };

    if ( this.seedRequired ) {
      group.seed = [ '', Validators.required ];
    }

    this.form = this.formBuilder.group( group );
  }

  private resetForm() {
    this.form.controls.address.reset( undefined );
    this.form.controls.amount.reset( undefined );
    this.form.controls.wallet.reset( undefined );
    this.form.controls.notes.reset( undefined );
  }
}
