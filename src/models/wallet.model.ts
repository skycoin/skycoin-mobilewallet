import { AddressModel } from './address.model';
export class WalletModel {
  id: string;
  balance: number;
  entries: AddressModel[];
}
