import { Component,  Input, ElementRef, OnInit, ViewChild } from '@angular/core';
import { AddressModel } from '../../models/address.model';

declare var QRCode: any;

@Component({
  selector: 'qr-code',
  templateUrl: 'qr-code.html'
})
export class QrCodeComponent implements OnInit {
  @Input() address: AddressModel;
  @ViewChild('qr') qr: any;

  size: number = 300;
  level: string = 'M';
  colordark: string = '#000000';
  colorlight: string = '#ffffff';
  usesvg: boolean = false;

  ngOnInit() {
    new QRCode(this.qr.nativeElement, {
      text: this.address.address,
      width: this.size,
      height: this.size,
      colorDark: this.colordark,
      colorLight: this.colorlight,
      useSVG: this.usesvg,
      correctLevel: QRCode.CorrectLevel[this.level.toString()]
    });
  }
}
