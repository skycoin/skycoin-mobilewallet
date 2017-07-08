import { Component, OnInit } from '@angular/core';
import { File } from '@ionic-native/file';
import { LocalApiProvider } from '../../providers/local-api/local-api';
import { Platform } from 'ionic-angular';

@Component({
  templateUrl: 'wallets.html'
})
export class WalletsPage implements OnInit {

  wallets = [];

  constructor(
    private file: File,
    private localApi: LocalApiProvider,
    private platform: Platform,
  ) {}

  ngOnInit() {
    this.platform.ready().then(() => this.getWallets());
  }

  getWallets() {
    this.file.listDir(this.file.externalRootDirectory, 'superwallet')
      .then(files => {
        this.wallets = files;
      })
      .catch(error => {
        console.log(error);
      })
  }

  createWallet() {
    this.localApi.createWallet('abcd');
  }
}
