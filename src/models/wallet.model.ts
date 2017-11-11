import { AddressModel } from './address.model';

export class WalletModel {
  balance: number;
  hours: number;
  label: string;
  seed: string;
  entries: AddressModel[];
}
