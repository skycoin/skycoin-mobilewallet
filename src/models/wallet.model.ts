import {AddressModel} from './address.model';

export class WalletModel {
  label: string;
  seed: string;
  entries: AddressModel[];
  balance?: number;
  hours?: number;
  visible?: boolean;
}

