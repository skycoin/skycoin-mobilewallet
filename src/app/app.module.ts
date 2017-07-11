import { BrowserModule } from '@angular/platform-browser';
import { ErrorHandler, NgModule } from '@angular/core';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { MyApp } from './app.component';
import { WalletsPage } from '../pages/wallets/wallets';
import { ListPage } from '../pages/list/list';

import { File } from '@ionic-native/file';
import { NativeStorage } from '@ionic-native/native-storage';
import { StatusBar } from '@ionic-native/status-bar';
import { SplashScreen } from '@ionic-native/splash-screen';
import { LocalApiProvider } from '../providers/local-api/local-api';
import { WalletProvider } from '../providers/wallet/wallet';
import { IonicStorageModule } from '@ionic/storage';
import { StorageApiProvider } from '../providers/storage-api/storage-api';
import { AddressProvider } from '../providers/address/address';

@NgModule({
  declarations: [
    MyApp,
    WalletsPage,
    ListPage
  ],
  imports: [
    BrowserModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  bootstrap: [IonicApp],
  entryComponents: [
    MyApp,
    WalletsPage,
    ListPage
  ],
  providers: [
    File,
    NativeStorage,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    LocalApiProvider,
    WalletProvider,
    StorageApiProvider,
    AddressProvider
  ]
})
export class AppModule {}
