import { Component, Input, OnInit } from '@angular/core';

/**
 * Generated class for the TxArrowIconComponent component.
 *
 * See https://angular.io/docs/ts/latest/api/core/index/ComponentMetadata-class.html
 * for more info on Angular Components.
 */
@Component({
  selector: 'tx-arrow-icon',
  templateUrl: 'tx-arrow-icon.html'
})
export class TxArrowIconComponent implements OnInit {

  @Input() iconDirection: string;
  iconSrc: string = '';
  constructor() {

  }

  ngOnInit(){
    switch (this.iconDirection){
      case 'left':{
        this.iconSrc = '/assets/img/send-black-reverse.png';
        break;
      }
      case 'right':{
        this.iconSrc = '/assets/img/send-black.png';
        break;
      }
      case 'pending':{
        this.iconSrc = '/assets/img/send-black-dif.png';
        break;
      }
    }
  }
}
