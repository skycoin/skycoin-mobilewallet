import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'sky-button',
  templateUrl: 'sky-button.html',
})
export class SkyButtonComponent implements OnInit {
  @Input() text: string;
  @Input() className: string;

  constructor() {
    console.log('sky-button is ready!!!');
  }

  ngOnInit() {
    this.className = this.className || 'sky-primary';
  }
}
