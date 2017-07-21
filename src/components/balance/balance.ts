import { Component, Input } from '@angular/core';

/**
 * Generated class for the BalanceComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'balance',
  templateUrl: 'balance.html'
})
export class BalanceComponent {
  @Input() amount: any;
  displayValue: number;
  initialValue: number = 0;
  timer: any;

  ngOnChanges() {
    if (this.amount != this.displayValue && !isNaN(this.amount)) {
      this.displayValue = this.initialValue;
      let increment = Math.abs(this.amount - this.initialValue) / (1000 / 60);
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
