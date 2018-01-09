import { Component, OnInit } from '@angular/core';
import { BackendApiProvider } from '../../providers/backend-api/backend-api.provider';
import { WalletProvider } from '../../providers/wallet/wallet.provider';

@Component({
  selector: 'page-transactions',
  templateUrl: 'transactions.html',
})
export class TransactionsPage implements OnInit {

  transactions: any[];
  public iconDirection: string = 'left';

  constructor(
    private backend: BackendApiProvider,
    private wallet: WalletProvider,
  ) {}

  ngOnInit() {
    this.iconDirection = 'left';
    /* return this.wallet.addresses.first().subscribe(addresses => {
      this.backend.getTransactions(addresses).subscribe(transactions => {
        this.transactions = transactions;
      });
    }) */
    let transaction = [{
          "status": {
              "confirmed": true,
              "unconfirmed": false,
              "height": 1,
              "block_seq": 1178,
              "unknown": false
          },
          "txn": {
              "length": 183,
              "type": 0,
              "txid": "a6446654829a4a844add9f181949d12f8291fdd2c0fcb22200361e90e814e2d3",
              "inner_hash": "075f255d42ddd2fb228fe488b8b468526810db7a144aeed1fd091e3fd404626e",
              "timestamp": 1494275231,
              "sigs": [
                  "9b6fae9a70a42464dda089c943fafbf7bae8b8402e6bf4e4077553206eebc2ed4f7630bb1bd92505131cca5bf8bd82a44477ef53058e1995411bdbf1f5dfad1f00"
              ],
              "inputs": [
                  "5287f390628909dd8c25fad0feb37859c0c1ddcf90da0c040c837c89fefd9191"
              ],
              "outputs": [
                  {
                      "uxid": "70fa9dfb887f9ef55beb4e960f60e4703c56f98201acecf2cad729f5d7e84690",
                      "dst": "7cpQ7t3PZZXvjTst8G7Uvs7XH4LeM8fBPD",
                      "coins": "8.000000",
                      "hours": 931
                  }
              ]
          }
      },
      {
        "status": {
            "confirmed": true,
            "unconfirmed": false,
            "height": 1,
            "block_seq": 1178,
            "unknown": false
        },
        "txn": {
            "length": 183,
            "type": 0,
            "txid": "a6446654829a4a844add9f181949d12f8291fdd2c0fcb22200361e90e814e2d3",
            "inner_hash": "075f255d42ddd2fb228fe488b8b468526810db7a144aeed1fd091e3fd404626e",
            "timestamp": 1494275231,
            "sigs": [
                "9b6fae9a70a42464dda089c943fafbf7bae8b8402e6bf4e4077553206eebc2ed4f7630bb1bd92505131cca5bf8bd82a44477ef53058e1995411bdbf1f5dfad1f00"
            ],
            "inputs": [
                "5287f390628909dd8c25fad0feb37859c0c1ddcf90da0c040c837c89fefd9191"
            ],
            "outputs": [
                {
                    "uxid": "70fa9dfb887f9ef55beb4e960f60e4703c56f98201acecf2cad729f5d7e84690",
                    "dst": "7cpQ7t3PZZXvjTst8G7Uvs7XH4LeM8fBPD",
                    "coins": "8.000000",
                    "hours": 931
                }
            ]
        }
    },
    {
      "status": {
          "confirmed": true,
          "unconfirmed": false,
          "height": 1,
          "block_seq": 1178,
          "unknown": false
      },
      "txn": {
          "length": 183,
          "type": 0,
          "txid": "a6446654829a4a844add9f181949d12f8291fdd2c0fcb22200361e90e814e2d3",
          "inner_hash": "075f255d42ddd2fb228fe488b8b468526810db7a144aeed1fd091e3fd404626e",
          "timestamp": 1494275231,
          "sigs": [
              "9b6fae9a70a42464dda089c943fafbf7bae8b8402e6bf4e4077553206eebc2ed4f7630bb1bd92505131cca5bf8bd82a44477ef53058e1995411bdbf1f5dfad1f00"
          ],
          "inputs": [
              "5287f390628909dd8c25fad0feb37859c0c1ddcf90da0c040c837c89fefd9191"
          ],
          "outputs": [
              {
                  "uxid": "70fa9dfb887f9ef55beb4e960f60e4703c56f98201acecf2cad729f5d7e84690",
                  "dst": "7cpQ7t3PZZXvjTst8G7Uvs7XH4LeM8fBPD",
                  "coins": "8.000000",
                  "hours": 931
              }
          ]
      }
    }];

    this.transactions = transaction;
  }
}
