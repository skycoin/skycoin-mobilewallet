import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Observer } from 'rxjs/Observer';
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';
import { AddressModel } from '../../models/address.model';

declare var Skycoin: any;

@Injectable()
export class LocalApiProvider {

  getAddresses(seed: string, amount: number): Observable<AddressModel[]> {
    return this.call('getAddresses', [seed, amount])
      .map(response => JSON.parse(response).map(address => ({
        adddress: address.Address,
        balance: 0,
      })))
  }

  getBalances(addresses: string): Observable<any> {
    return this.call('getBalances', [addresses]).map(response => JSON.parse(response))
  }

  postTransaction(seed: string, addresses: number, destination: string, amount: number): Observable<any> {
    return this.call('postTransaction', [seed, addresses, destination, amount])
  }

  private call(method, args = []) {
    return Observable.create((observer: Observer<any>) => {
      Skycoin[method](
        success => {
          observer.next(success);
          observer.complete();
        },
        error => {
          observer.error(error)
        }, args);
    }).catch(error => console.log(error));
  }
}
