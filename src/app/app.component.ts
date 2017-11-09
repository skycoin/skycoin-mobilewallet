import { Component, ViewChild } from '@angular/core';
import { AlertController, Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { DisclaimerPage } from '../pages/disclaimer/disclaimer';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  rootPage: any = DisclaimerPage;

  constructor(
    public alert: AlertController,
    public platform: Platform,
    public splashScreen: SplashScreen,
    public statusBar: StatusBar,
  ) {
    this.initializeApp();
  }

  initializeApp() {
    this.platform.ready().then(() => {
      const alert = this.alert.create({
        title: 'Beta version',
        subTitle: `This is a beta version, it is not ready for production usage. Please report any bugs at https://github.com/skycoin/skycoin-mobilewallet.`,
        buttons: ['OK']
      });
      alert.present();

      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }
}
