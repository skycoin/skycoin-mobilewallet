import {Component, EventEmitter, Input, Output} from '@angular/core';

@Component({
  selector: 'app-button',
  templateUrl: 'button.component.html',
})

export class ButtonComponent {
  @Input() disabled: any;
  @Output() action = new EventEmitter();

  error: string;
  state: number;

  onClick() {
    if (this.disabled) {
      return;
    }
    this.action.emit();
  }

  setLoading() {
    this.state = 0;
  }

  setSuccess() {
    this.state = 1;
    setTimeout(() => this.state = null, 3000);
  }

  setError(error: any) {
    this.error = error['_body'];
    this.state = 2;
  }
}
