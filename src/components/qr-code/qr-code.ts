import { Component, Input, OnInit, ViewChild } from '@angular/core';
import { AddressModel } from '../../models/address.model';

declare var QRCode: any;

@Component({
  selector: 'qr-code',
  templateUrl: 'qr-code.html',
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
    // tslint:disable-next-line:no-unused-expression
    new QRCode(this.qr.nativeElement, {
      colorDark: this.colordark,
      colorLight: this.colorlight,
      correctLevel: QRCode.CorrectLevel[this.level.toString()],
      height: this.size,
      text: this.address.address,
      useSVG: this.usesvg,
      width: this.size,
    });
  }
}
