import { Component, OnInit } from '@angular/core';
import { BackendApiProvider } from '../../providers/backend-api/backend-api.provider';
import { WalletProvider } from '../../providers/wallet/wallet.provider';

@Component({
  selector: 'page-transactions',
  templateUrl: 'transactions.html',
})
export class TransactionsPage implements OnInit {

  transactions: any[];

  constructor(
    public backend: BackendApiProvider,
    public wallet: WalletProvider,
  ) {}

  ngOnInit() {
    return this.wallet.addresses.first().subscribe(addresses => {
      this.backend.getTransactions(addresses).subscribe(transactions => {
        console.log(transactions);
        this.transactions = transactions;
      });
    })
  }
}
