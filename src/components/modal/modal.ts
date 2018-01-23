import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'modal',
  templateUrl: 'modal.html',
})
export class ModalComponent {
  @Input() header: string;
  @Input() footer: boolean;
  @Output() close = new EventEmitter();

  cancelAction() {
    this.close.emit();
  }
}
