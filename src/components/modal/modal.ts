import { Component, Input } from '@angular/core';

@Component({
  selector: 'modal',
  templateUrl: 'modal.html'
})
export class ModalComponent {
  @Input() header: string;
}
