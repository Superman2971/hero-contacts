import { Component, Input, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'hero-confirm-modal',
  templateUrl: './confirm-modal.component.html',
  styleUrls: ['./confirm-modal.component.scss']
})
export class ConfirmModalComponent {
  @Input() active;
  @Output() closed: EventEmitter<boolean> = new EventEmitter();
  @Input() question;
  @Output() response: EventEmitter<boolean> = new EventEmitter();

  constructor() {}

  close() {
    this.closed.emit(false);
  }

  submit(value) {
    this.active = false;
    this.closed.emit(false);
    this.response.emit(value);
  }
}
