import { Pipe, PipeTransform } from '@angular/core';
import { WalletModel } from '../../models/wallet.model';

@Pipe({
  name: 'walletOption',
})
export class WalletOptionPipe implements PipeTransform {

  transform(wallet: WalletModel) {
    const balance = wallet.balance ? (wallet.balance / 1000000) : 0;
    return wallet.label + ` (${balance})`;
  }
}
