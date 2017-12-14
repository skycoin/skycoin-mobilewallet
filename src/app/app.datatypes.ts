export interface Output {
  hash: string;
  src_txt: string;
  address: string;
  coins: number;
  hours: number;
}

export interface OutputsResponse {
  head_outputs: any[];
  outgoing_outputs: any[];
  incoming_outputs: any[];
}
