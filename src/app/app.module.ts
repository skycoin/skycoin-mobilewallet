import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { WalletsPage } from '../pages/wallets/wallets';
import { ListPage } from '../pages/list/list';

import { File } from '@ionic-native/file';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LocalApiProvider } from '../providers/local-api/local-api';
import { WalletProvider } from '../providers/wallet/wallet';

@NgModule({
  declarations: [
    MyApp,
    WalletsPage,
    ListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WalletsPage,
    ListPage
  ],
  providers: [
    File,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocalApiProvider,
    WalletProvider
  ]
})
export class AppModule {}
