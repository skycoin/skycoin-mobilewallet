import { Pipe, PipeTransform } from '@angular/core';
import { Wallet } from '../../models/wallet.model';

@Pipe({
  name: 'walletOption',
})
export class WalletOptionPipe implements PipeTransform {
  transform(wallet: Wallet) {
    // const balance = wallet.balance ? wallet.balance : 0;
    // return wallet.label + ` (${balance})`;
    return wallet.label;
  }
}
