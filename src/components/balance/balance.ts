import { Component, Input } from '@angular/core';

@Component({
  selector: 'balance',
  templateUrl: 'balance.html',
})
export class BalanceComponent {
  @Input() amount: any;
  displayValue: number;
  initialValue: number = 0;
  timer: any;

  ngOnChanges() {
    if (this.amount !== this.displayValue && !isNaN(this.amount)) {
      this.displayValue = this.initialValue;
      const increment = Math.abs(this.amount - this.initialValue) / (1000 / 60);
      this.timer = setInterval(() => {
        if (this.amount < this.initialValue) {
          if (this.displayValue <= this.amount) {
            clearInterval(this.timer);
            this.displayValue = this.amount;
          } else {
            this.displayValue -= increment;
          }
        } else {
          if (this.displayValue >= this.amount) {
            clearInterval(this.timer);
            this.displayValue = this.amount;
          } else {
            this.displayValue += increment;
          }
        }
      }, 60);
    }
  }
}
