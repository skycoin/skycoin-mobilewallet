import { Component } from '@angular/core';
import { LocalApiProvider } from '../../providers/local-api/local-api';

@Component({
  templateUrl: 'wallets.html'
})
export class WalletsPage {

  constructor(
    private localApi: LocalApiProvider,
  ) {}

  createWallet() {

    console.log('creatingWallet');
    this.localApi.createWallet('abcd');
  }
}
