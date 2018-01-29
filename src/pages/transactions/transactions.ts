import { Component, OnDestroy, OnInit } from '@angular/core';
import { ViewController } from 'ionic-angular';
import { Subscription } from 'rxjs/Subscription';
import { ApiService } from '../../providers/backend-api/backend-api.provider';
import { PriceService } from '../../providers/price/price.service';
import { WalletProvider } from '../../providers/wallet/wallet.provider';

@Component({
  selector: 'page-transactions',
  templateUrl: 'transactions.html',
})
export class TransactionsPage implements OnInit, OnDestroy {
  transactions: any[];

  private price: number;
  private priceSubscription: Subscription;

  constructor(
    private view: ViewController,
    private walletService: WalletProvider,
    private priceService: PriceService,
  ) {}

  ngOnInit() {
    this.priceSubscription = this.priceService.price.subscribe(
      price => (this.price = price),
    );
    this.walletService
      .transactions()
      .subscribe(transactions => (this.transactions = transactions));
  }

  ngOnDestroy() {
    this.priceSubscription.unsubscribe();
  }

  showTransaction(transaction: any) {
    // const config = new MdDialogConfig();
    // config.width = '566px';
    // config.data = transaction;
    // this.dialog.open(TransactionDetailComponent, config).afterClosed().subscribe();
  }

  cancel() {
    this.view.dismiss();
  }
}
