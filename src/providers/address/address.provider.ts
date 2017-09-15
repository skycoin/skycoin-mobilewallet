import { Injectable } from '@angular/core';
import { LocalApiProvider } from '../local-api/local-api.provider';
import 'rxjs/add/operator/map';
import { AddressModel } from '../../models/address.model';
import { WalletModel } from '../../models/wallet.model';

@Injectable()
export class AddressProvider {

  constructor(
    private local: LocalApiProvider,
  ) {}

  create(wallet: WalletModel) {
    let count = wallet.entries ? wallet.entries.length : 0;
    return this.local.getAddresses(wallet.seed, count + 1);
  }

  getBalance(address: AddressModel) {
    // TODO: fix this
    return this.local.getBalances("addresses");
  }
}
