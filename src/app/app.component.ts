import { Component, ViewChild } from '@angular/core';
import { Nav, Platform } from 'ionic-angular';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';

import { WalletsPage } from '../pages/wallets/wallets';
import { PincodePage } from '../pages/pincode/pincode';
import { SecureStorageProvider } from '../providers/secure-storage/secure-storage';

@Component({
  templateUrl: 'app.html'
})
export class MyApp {
  @ViewChild(Nav) nav: Nav;

  // rootPage: any = WalletsPage;
  rootPage: any = PincodePage;

  pages: Array<{title: string, component: any}>;

  constructor(
    public platform: Platform,
    public splashScreen: SplashScreen,
    public statusBar: StatusBar,
  ) {
    this.initializeApp();

    this.pages = [
      { title: 'Wallets', component: WalletsPage },
    ];
  }

  initializeApp() {
    this.platform.ready().then(() => {
      this.statusBar.styleDefault();
      this.splashScreen.hide();
    });
  }

  openPage(page) {
    this.nav.setRoot(page.component);
  }
}
