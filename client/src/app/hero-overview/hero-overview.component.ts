import { Component, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'hero-overview',
  templateUrl: './hero-overview.component.html',
  styleUrls: ['./hero-overview.component.scss']
})
export class HeroOverviewComponent {
  @Output() event: EventEmitter<any> = new EventEmitter();

  constructor() {}

  goToPage(page) {
    this.event.emit(page);
  }
}
