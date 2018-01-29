import { Address } from './address.model';

export class Wallet {
  label: string;
  seed: string;
  coins: number;
  hours: number;
  addresses: Address[];
  visible?: number;
  hideEmpty?: boolean;
  opened?: boolean;
}
