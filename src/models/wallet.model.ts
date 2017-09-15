import { AddressModel } from './address.model';

export class WalletModel {
  label: string;
  seed: string;
  balance: number;
  entries: AddressModel[];
}
