import { Component, Input } from '@angular/core';

@Component({
  selector: 'notification',
  templateUrl: 'notification.html',
})
export class NotificationComponent {
  @Input() text: string;
  @Input() color: string;
}
