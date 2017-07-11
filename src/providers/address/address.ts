import { Injectable } from '@angular/core';
import { LocalApiProvider } from '../local-api/local-api';
import 'rxjs/add/operator/map';

@Injectable()
export class AddressProvider {

  constructor(
    private local: LocalApiProvider,
  ) {}

  create(wallet: any) {
    wallet.addresses = wallet.addresses ? wallet.addresses : [];
    let index = 0;

    wallet.addresses.forEach(address => {
      if (address.index === index) {
        index++;
      }
    });

    return this.local.createAddress(wallet.seed, index)
      .map(address => JSON.parse(address).addresses[0]);
  }
}
