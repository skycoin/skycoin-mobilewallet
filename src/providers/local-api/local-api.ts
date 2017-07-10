import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Platform } from 'ionic-angular';

declare var Skycoin: any;

@Injectable()
export class LocalApiProvider {

  constructor(
    private platform: Platform,
  ) {}

  createAddress(id: string, index: number) {
    console.log(id);
    return this.call('createAddress', [id, 1]);
  }

  createWallet(seed: string) {
    return this.call('createWallet', ['skycoin', seed])
  }

  private call(method, args = []) {
    console.log('calling: ' + method);
    this.platform.ready().then(() => {
      Skycoin[method](function (success) {
          console.log('success', success);
        },
        function (error) {
          console.log(error);
        }, args);
    });
  }
}
