import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';

declare var Skycoin: any;

@Injectable()
export class LocalApiProvider {

  createAddress(id: string, index: number): Observable<any> {
    return this.call('createAddress', [id, 1]);
  }

  createWallet(seed: string): Observable<any> {
    return this.call('createWallet', ['skycoin', seed])
  }

  getBalance(address: string) {
    return this.call('getAddressBalance', ['skycoin', address]).map(balance => JSON.parse(balance));
  }

  sendSkycoin(id: string, address: string, amount: number) {
    return this.call('sendSkycoin', ['skycoin', id, address, amount * 1000000]);
  }

  private call(method, args = []) {
    console.log('calling: ' + method);
    console.log(args);
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
