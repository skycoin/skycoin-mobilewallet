import { Component, OnInit } from '@angular/core';
import { BackendApiProvider } from '../../providers/backend-api/backend-api.provider';

@Component({
  selector: 'page-transactions',
  templateUrl: 'transactions.html',
})
export class TransactionsPage implements OnInit {

  transactions: any[];

  constructor(
    public backend: BackendApiProvider,
  ) {}

  ngOnInit() {
    this.backend.getTransactions().subscribe(transactions => {
      console.log(transactions);
      this.transactions = transactions;
    })
  }
}
