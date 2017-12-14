import { Component, OnInit } from '@angular/core';
import { Storage } from '@ionic/storage';
import { NavController, Platform } from 'ionic-angular';
import { PincodePage } from '../pincode/pincode';

@Component({
  selector: 'page-disclaimer',
  templateUrl: 'disclaimer.html',
})
export class DisclaimerPage implements OnInit {

  disclaimerAccepted: boolean;
  showDisclaimer: boolean;

  constructor(
    private nav: NavController,
    private platform: Platform,
    private storage: Storage,
  ) {}

  ngOnInit() {
    this.platform.ready().then(() => {
      this.storage.get('disclaimer_accepted').then(data => {
        if (data) {
          this.nav.setRoot(PincodePage);
        } else {
          this.showDisclaimer = true;
        }
      })
    });
  }

  acceptDisclaimer() {
    this.storage.set('disclaimer_accepted', true).then(() => {
      this.nav.setRoot(PincodePage);
    })
  }
}
