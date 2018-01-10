import { Component, OnInit } from "@angular/core";
import { WalletProvider } from "../../providers/wallet/wallet.provider";
import { ViewController } from "ionic-angular";

@Component({
  selector: "page-add-wallet",
  templateUrl: "add-wallet.html"
})
export class AddWalletPage implements OnInit {
  label: string;
  seed: string;

  constructor(private view: ViewController, private wallet: WalletProvider) {}

  ngOnInit() {
    this.generateSeed();
  }

  cancel() {
    this.view.dismiss();
  }

  create(wallet) {
    this.wallet.create(wallet.label, wallet.seed);
    this.view.dismiss();
  }

  generateSeed() {
    this.wallet.generateSeed().subscribe(seed => {
      this.seed = seed;
    });
  }
}
