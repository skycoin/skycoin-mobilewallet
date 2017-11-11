import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Config } from '../../app/app.config';
import { Observable } from 'rxjs/Observable';
import { AddressModel } from '../../models/address.model';
import { Output, OutputsResponse } from '../../app/app.datatypes';

@Injectable()
export class BackendApiProvider {

  constructor(
    public http: Http,
  ) {}

  getTransactions(addresses: AddressModel[]): Observable<any[]> {
    const firstAddresses = addresses.length > 20 ? addresses.slice(0, 19) : addresses;
    const url = Config.backendUrl + 'transactions?addresses=' + firstAddresses.map(address => address.address).join(',');
    return this.http.get(url).map((res: any) => res.json());
  }

  getOutputs(addresses: AddressModel[]): Observable<Output[]> {
    const firstAddresses = addresses.length > 20 ? addresses.slice(0, 19) : addresses;
    const url = Config.backendUrl + 'outputs?addresses=' + firstAddresses.map(address => address.address).join(',');
      return this.http.get(url).map((res: any) => {
        const response: OutputsResponse = res.json();
        response.head_outputs.forEach(output => output.coins = parseFloat(output.coins));
        return response.head_outputs;
      });
  }
}
