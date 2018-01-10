import { Component, Input, Output, EventEmitter } from "@angular/core";
import { FormBuilder, FormGroup, Validators } from "@angular/forms";

@Component({
  selector: "wallet-form",
  templateUrl: "wallet-form.html"
})
export class WalletFormComponent {
  form: FormGroup;

  @Input() label: string;
  @Input() seed: string;
  confirmSeed: string;

  @Output() create = new EventEmitter();
  @Output() cancel = new EventEmitter();

  constructor(fb: FormBuilder) {
    this.form = fb.group({
      label: ["", Validators.required],
      seed: ["", Validators.required],
      confirmSeed: ["", Validators.required]
    });
  }

  createWallet() {
    let wallet = {
      label: this.form.value.label,
      seed: this.form.value.seed
    };
    this.create.emit(wallet);
  }

  cancelAction() {
    this.cancel.emit();
  }

  validateSeed() {
    return (
      this.form.controls.seed.value &&
      this.form.controls.seed.value === this.form.controls.confirmSeed.value
    );
  }
}
