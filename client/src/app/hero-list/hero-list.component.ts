import { Component, Output, EventEmitter } from '@angular/core';
import { HeroListService } from './hero-list.service';

@Component({
  selector: 'hero-list',
  templateUrl: './hero-list.component.html',
  styleUrls: ['./hero-list.component.scss']
})
export class HeroListComponent {
  @Output() event: EventEmitter<any> = new EventEmitter();
  heroes: Array<any> = [];

  constructor(private listServive: HeroListService) {
    this.heroes = listServive.fakeDatabase;
  }

  goToForm(hero?) {
    this.event.emit(hero);
  }

  deleteHero(index) {
    this.listServive.fakeDatabase.splice(index, 1);
    this.heroes = this.listServive.fakeDatabase;
  }
}
