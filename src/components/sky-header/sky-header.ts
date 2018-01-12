import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sky-header',
  templateUrl: 'sky-header.html',
})
export class SkyHeaderComponent implements OnInit {
  @Input() title: string;
  @Input() hours: number;
  @Input() money: number;
  @Input() secMoney: number;
  @Input() sky: number;

  ngOnInit() {
    this.hours = this.hours || 0;
    this.money = this.money || 0;
    this.secMoney = this.secMoney || 0;
    this.sky = this.sky || 0;
    this.title = this.title || 'Skycoin';
  }
}
