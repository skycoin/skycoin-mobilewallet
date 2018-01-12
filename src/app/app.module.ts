import { ErrorHandler, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { IonicApp, IonicErrorHandler, IonicModule } from 'ionic-angular';

import { WalletsPage } from '../pages/wallets/wallets';
import { MyApp } from './app.component';

import { ReactiveFormsModule } from '@angular/forms';
import { HttpModule } from '@angular/http';
import { Clipboard } from '@ionic-native/clipboard';
import { File } from '@ionic-native/file';
import { NativeStorage } from '@ionic-native/native-storage';
import { SecureStorage } from '@ionic-native/secure-storage';
import { SplashScreen } from '@ionic-native/splash-screen';
import { StatusBar } from '@ionic-native/status-bar';
import { IonicStorageModule } from '@ionic/storage';
import { BalanceComponent } from '../components/balance/balance';
import { ModalComponent } from '../components/modal/modal';
import { QrCodeComponent } from '../components/qr-code/qr-code';
import { TabsComponent } from '../components/tabs/tabs';
import { CounttoDirective } from '../directives/countto/countto';
import { AddWalletPage } from '../pages/add-wallet/add-wallet';
import { DisclaimerPage } from '../pages/disclaimer/disclaimer';
import { LoadWalletPage } from '../pages/load-wallet/load-wallet';
import { PincodePage } from '../pages/pincode/pincode';
import { SendSkycoinPage } from '../pages/send-skycoin/send-skycoin';
import { TransactionsPage } from '../pages/transactions/transactions';
import { WalletDetailPage } from '../pages/wallet-detail/wallet-detail';
import { AddressPipe } from '../pipes/address/address';
import { SkyPipe } from '../pipes/sky/sky.pipe';
import { WalletOptionPipe } from '../pipes/wallet-option/wallet-option';
import { BackendApiProvider } from '../providers/backend-api/backend-api.provider';
import { LocalApiProvider } from '../providers/local-api/local-api.provider';
import { SecureStorageProvider } from '../providers/secure-storage/secure-storage';
import { StorageApiProvider } from '../providers/storage-api/storage-api.provider';
import { WalletProvider } from '../providers/wallet/wallet.provider';
import { SkyButtonComponent } from '../components/sky-button/sky-button';

@NgModule({
  declarations: [
    MyApp,
    AddWalletPage,
    DisclaimerPage,
    LoadWalletPage,
    PincodePage,
    SendSkycoinPage,
    TransactionsPage,
    WalletDetailPage,
    WalletsPage,
    BalanceComponent,
    ModalComponent,
    QrCodeComponent,
    TabsComponent,
    CounttoDirective,
    SkyPipe,
    WalletOptionPipe,
    AddressPipe,
    SkyButtonComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    ReactiveFormsModule,
    IonicModule.forRoot(MyApp),
    IonicStorageModule.forRoot(),
  ],
  // tslint:disable-next-line:object-literal-sort-keys
  bootstrap: [IonicApp],
  entryComponents: [
    AddWalletPage,
    DisclaimerPage,
    LoadWalletPage,
    MyApp,
    PincodePage,
    SendSkycoinPage,
    TransactionsPage,
    WalletDetailPage,
    WalletsPage,
  ],
  providers: [
    File,
    NativeStorage,
    StatusBar,
    SplashScreen,
    {provide: ErrorHandler, useClass: IonicErrorHandler},
    BackendApiProvider,
    LocalApiProvider,
    WalletProvider,
    StorageApiProvider,
    SecureStorage,
    SecureStorageProvider,
    Clipboard,
  ],
})
export class AppModule {}
