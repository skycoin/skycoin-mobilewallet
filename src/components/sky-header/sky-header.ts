import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sky-header',
  templateUrl: 'sky-header.html',
})
export class SkyHeaderComponent implements OnInit {
  @Input() title: string;
  @Input() sky: number;
  @Input() money: number;
  @Input() sec_money: number;
  @Input() hours: number;

  ngOnInit() {
    this.title = this.title || 'Skycoin';
    this.sky = this.sky || 0;
    this.money = this.money || 0;
    this.sec_money = this.sec_money || 0;
    this.hours = this.hours || 0;
  }
}
