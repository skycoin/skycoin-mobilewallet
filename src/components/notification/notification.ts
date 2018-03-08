import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'notification',
  templateUrl: 'notification.html',
})
export class NotificationComponent {
  @Input() text: string;
  @Input() color: string;
  @Output() action = new EventEmitter();

  onClick() {
    this.action.emit();
  }
}
