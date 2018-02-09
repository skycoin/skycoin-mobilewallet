import { Component, OnDestroy, OnInit } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { PriceService } from '../../providers/price/price.service';
import { WalletProvider } from '../../providers/wallet/wallet.provider';

@Component({
  selector: 'page-transactions',
  templateUrl: 'transactions.html',
})
export class TransactionsPage implements OnInit, OnDestroy {
  transactions: any[];
  transaction: any;
  price: number;
  priceSubscription: Subscription;
  showConfirm: boolean;

  constructor(
    private view: ViewController,
    private walletService: WalletProvider,
    private priceService: PriceService,
  ) {}

  ngOnInit() {
    this.priceSubscription = this.priceService.price.subscribe(price => {
      this.price = price;
    });
    this.walletService
      .history()
      .subscribe(
        transactions =>
          (this.transactions = this.mapTransactions(transactions)),
      );
  }

  ngOnDestroy() {
    this.priceSubscription.unsubscribe();
  }

  showTransaction(transaction: any) {
    this.transaction = transaction;
    this.showConfirm = true;
  }

  closeModal() {
    this.showConfirm = false;
  }

  cancel() {
    this.view.dismiss();
  }

  private mapTransactions(transactions) {
    return transactions.map(transaction => {
      transaction.amount = transaction.outputs
        .map(output => (output.coins >= 0 ? output.coins : 0))
        .reduce((a, b) => a + parseInt(b, 10), 0);
      return transaction;
    });
  }
}
