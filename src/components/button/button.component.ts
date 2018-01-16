import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: 'button.component.html',
})

export class ButtonComponent {
  @Input() disabled: any;
  @Input() error: string;
  @Input() state: number;
  @Output() action = new EventEmitter();

  onClick() {
    if (this.disabled) {
      return;
    }
    this.action.emit();
  }
}
