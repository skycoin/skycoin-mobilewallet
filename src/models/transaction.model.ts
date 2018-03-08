export class Transaction {
  addresses: string[];
  balance: number;
  block: number;
  confirmed: boolean;
  inputs: any[];
  outputs: any[];
  timestamp: number;
  txid: string;
}
