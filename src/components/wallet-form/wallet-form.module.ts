import { NgModule } from '@angular/core';
import { IonicModule } from 'ionic-angular';
import { WalletFormComponent } from './wallet-form';

@NgModule({
  declarations: [
    WalletFormComponent,
  ],
  imports: [
    IonicModule,
  ],
  exports: [
    WalletFormComponent
  ]
})
export class WalletFormComponentModule {}
