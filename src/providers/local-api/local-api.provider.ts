import { Injectable } from '@angular/core';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import { AddressModel } from '../../models/address.model';

declare var Skycoin: any;

@Injectable()
export class LocalApiProvider {

  getAddresses(seed: string, amount: number): Observable<AddressModel[]> {
    return this.call('getAddresses', [seed, amount])
      .map((response) => JSON.parse(response).map((address) => ({
        address: address.Address,
        balance: 0,
        hours: 0,
      })));
  }

  getSeed(): Observable<any> {
    return this.call('getSeed', []);
  }

  postTransaction(seed: string, addresses: number, destination: string, amount: number): Observable<any> {
    return this.call('postTransaction', [seed, addresses, destination, amount]);
  }

  private call(method, args = []) {
    return Observable.create((observer: Observer<any>) => {
      Skycoin[method](
        (success) => {
          observer.next(success);
          observer.complete();
        },
        (error) => {
          observer.error(error);
        }, args);
    // tslint:disable-next-line:no-console
    }).catch((error) => console.log(error));
  }
}
