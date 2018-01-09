import { Component, Input, Output, EventEmitter } from "@angular/core";

@Component({
  selector: "modal",
  templateUrl: "modal.html"
})
export class ModalComponent {
  @Input() header: string;
  @Input() color: string;
  @Output() close = new EventEmitter();

  closeModal() {
    this.close.emit();
  }
}
