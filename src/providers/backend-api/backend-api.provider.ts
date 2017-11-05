import { Injectable } from '@angular/core';
import { Http } from '@angular/http';
import { Config } from '../../app/app.config';
import { WalletProvider } from '../wallet/wallet.provider';
import { Observable } from 'rxjs/Observable';

@Injectable()
export class BackendApiProvider {

  constructor(
    public http: Http,
    public wallet: WalletProvider,
  ) {}

  getTransactions(): Observable<any[]> {
    return this.wallet.addresses.first().flatMap(addresses => {
      const url = Config.backendUrl + 'transactions?addresses=' + addresses.map(address => address.address).join(',');
      return this.http.get(url).map((res: any) => res.json());
    });
  }
}
