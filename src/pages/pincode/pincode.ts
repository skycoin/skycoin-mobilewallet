import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { LoadingController, NavController } from 'ionic-angular';
import { SecureStorageProvider } from '../../providers/secure-storage/secure-storage';
import { ObCreateWalletPage } from '../ob-create-wallet/ob-create-wallet';
import { TabsPage } from '../tabs/tabs';

@Component( {
  selector: 'page-pincode',
  templateUrl: 'pincode.html',
} )
export class PincodePage implements OnInit {
  status: number;
  correct: string;
  pin: string;
  showError: boolean;
  display: boolean;
  storageAvailable: boolean = true;

  constructor( public el: ElementRef,
               public nav: NavController,
               public secureStorage: SecureStorageProvider,
               public loadingCtrl: LoadingController, ) {
  }

  ngOnInit() {
    this.pin = '';
    const loader = this.loadingCtrl.create( { content: 'Please wait...' } );
    loader.present();

    this.secureStorage.get( 'pin' ).subscribe(
      pin => {
        this.status = 1;
        this.correct = pin;
        this.display = true;
        loader.dismiss();
      },
      error => {
        if ( error.toString() === 'Error: Key [_SS_pin] not found.' ) {
          this.startCreateNewPinFlow();
        } else {
          this.storageAvailable = false;
        }
        this.display = true;
        loader.dismiss();
      },
    );
  }

  disableSecure() {
    this.secureStorage.secureStorageDisabled = true;
    this.nav.setRoot( TabsPage );
  }

  pressNumber( value: string ) {
    this.pin += this.pin.length < 4 ? value : '';
    if ( this.pin.length >= 4 ) {
      this.handlePin();
    }
  }

  pressBack() {
    this.pin = this.pin.substr( 0, this.pin.length - 1 );
  }

  private startCreateNewPinFlow() {
    this.status = 2;
  }

  private confirmPin() {
    if ( this.pin === this.correct ) {
      this.secureStorage.set( 'pin', this.pin ).subscribe( () => {
        this.nav.setRoot( ObCreateWalletPage );
      } );
    } else {
      this.wrongPin();
      this.status = 2;
    }
  }

  private handlePin() {
    switch ( this.status ) {
      case 1:
        this.verifyPin();
        break;
      case 2:
        this.newPin();
        break;
      case 3:
        this.confirmPin();
        break;
    }
  }

  private newPin() {
    this.status = 3;
    this.correct = this.pin;
    this.pin = '';
  }

  private verifyPin() {
    if ( this.pin === this.correct ) {
      this.nav.setRoot( TabsPage );
    } else {
      this.wrongPin();
    }
  }

  private wrongPin() {
    this.showError = true;
    setTimeout( () => ( this.pin = '' ), 200 );
    setTimeout( () => ( this.showError = false ), 500 );
  }
}
