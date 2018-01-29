import { Injectable } from '@angular/core';
import { Headers, Http } from '@angular/http';
import { Observable } from 'rxjs/Observable';
import { Address } from '../../models/address.model';
import { Transaction } from '../../models/transaction.model';

@Injectable()
export class ApiService {
  private url = 'http://127.0.0.1:6420/'; // production
  // private url = '/api/'; // test

  constructor(private http: Http) {}

  get(url, options = null) {
    return this.http
      .get(this.getUrl(url, options), this.getHeaders())
      .map((res: any) => res.json())
      .catch((error: any) => Observable.throw(error || 'Server error'));
  }

  getExplorerAddress(address: Address): Observable<Transaction[]> {
    return this.get('explorer/address', { address: address.address }).map(
      transactions =>
        transactions.map(transaction => ({
          addresses: [],
          balance: 0,
          block: transaction.status.block_seq,
          confirmed: transaction.status.confirmed,
          timestamp: transaction.timestamp,
          txid: transaction.txid,
          inputs: transaction.inputs,
          outputs: transaction.outputs,
        })),
    );
  }

  private getUrl(url, options = null) {
    return this.url + url + '?' + this.getQueryString(options);
  }

  private getHeaders() {
    const headers = new Headers();
    headers.append('Content-Type', 'application/x-www-form-urlencoded');
    return headers;
  }

  private getQueryString(parameters = null) {
    if (!parameters) {
      return '';
    }

    return Object.keys(parameters)
      .reduce((array, key) => {
        array.push(key + '=' + encodeURIComponent(parameters[key]));
        return array;
      }, [])
      .join('&');
  }
}
