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
    let heroListAsArray
    listServive.getDatabase().subscribe((res) => {
      if (res) {
        heroListAsArray = Object.keys(res).map((prop) => res[prop]);
      } else {
        heroListAsArray = [];
      }
      console.log('get database response:', res, ' then changed to: ', heroListAsArray);
      this.heroes = heroListAsArray;
      this.listServive.database = heroListAsArray;
      this.listServive.listChange();
    });
  }

  goToForm(hero?) {
    this.event.emit(hero);
  }

  deleteHero(index) {
    this.listServive.database.splice(index, 1);
    this.heroes = this.listServive.database;
    this.listServive.listChange();
  }
}
