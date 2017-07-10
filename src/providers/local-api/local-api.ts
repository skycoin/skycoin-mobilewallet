import { Injectable } from '@angular/core';
import 'rxjs/add/operator/map';
import { Platform } from 'ionic-angular';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

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
    return Observable.create((observer: Observer<any>) => {
      Skycoin[method](
        success => {
          observer.next(success);
          observer.complete();
        },
        error => {
          observer.error(error)
        }, args);
    });
  }
}
