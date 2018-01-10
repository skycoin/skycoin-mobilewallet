import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Config } from '../../app/app.config';
import { Output, OutputsResponse } from '../../app/app.datatypes';
import { AddressModel } from '../../models/address.model';

@Injectable()
export class BackendApiProvider {

  constructor(
    public http: Http,
  ) {}

  getTransactions(addresses: AddressModel[]): Observable<any[]> {
    const firstAddresses = addresses.length > 20 ? addresses.slice(0, 19) : addresses;
    const url =
      Config.backendUrl +
      'transactions?addresses=' +
      firstAddresses.map((address) => address.address).join(',');
    return firstAddresses.length ? this.http.get(url).map((res: any) => res.json()) : Observable.of([]);
  }

  getOutputs(addresses: AddressModel[], max?: number): Observable<Output[]> {
    const firstAddresses = addresses.length > (max ? max : 20) ? addresses.slice(0, (max ? max : 20)) : addresses;
    const url = Config.backendUrl + 'outputs?addresses=' + firstAddresses.map((address) => address.address).join(',');
    return firstAddresses.length ? this.http.get(url).map((res: any) => {
      const response: OutputsResponse = res.json();
      response.head_outputs.forEach((output) => output.coins = parseFloat(output.coins));
      return response.head_outputs;
    }) : Observable.of([]);
  }
}
