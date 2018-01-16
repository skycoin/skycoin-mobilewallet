import {Component, Input, OnDestroy, OnInit} from '@angular/core';
import {Subscription} from 'rxjs/Subscription';
import {PriceService} from './../../providers/price/price.service';
import {WalletProvider} from './../../providers/wallet/wallet.provider';

@Component({
  selector: 'app-header',
  templateUrl: 'header.html',
})
export class HeaderComponent implements OnInit, OnDestroy {
  @Input() title: string;
  @Input() coins: number;
  @Input() hours: number;

  private price: number;
  private priceSubscription: Subscription;
  private walletSubscription: Subscription;

  getBalance() {
    if (this.price === null) return 'loading..';
    const balance = Math.round(this.coins * this.price * 100) / 100;
    return '$' + balance.toFixed(2) + ' ($' + (Math.round(this.price * 100) / 100) + ')';
  }

  constructor(private priceService: PriceService,
              private walletService: WalletProvider) {
  }

  ngOnInit() {
    this.priceSubscription = this.priceService.price.subscribe((price) => this.price = price);
    this.walletSubscription = this.walletService.all().subscribe((wallets) => {
      this.coins = wallets.map((wallet) => wallet.balance >= 0 ? wallet.balance : 0).reduce((a, b) => a + b, 0);
      this.hours = wallets.map((wallet) => wallet.hours >= 0 ? wallet.hours : 0).reduce((a, b) => a + b, 0);;
    })
  }

  ngOnDestroy() {
    this.priceSubscription.unsubscribe();
    this.walletSubscription.unsubscribe();
  }
}
