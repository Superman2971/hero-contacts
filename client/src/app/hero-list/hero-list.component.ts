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
  openModal: boolean = false;
  selectedHero: string;
  _heroListChangeSubscription;

  constructor(private listService: HeroListService) {
    listService.getDatabase().subscribe((res) => {
      this.modifyAndUpdateHeroes(res);
    });
    this._heroListChangeSubscription = this.listService.listChanges.subscribe((list) => {
      this.heroes = list;
    });
  }

  goToForm(hero?) {
    this.event.emit(hero);
  }

  deleteHero(modalResponse) {
    if (modalResponse && this.selectedHero) {
      this.listService.deleteHero(this.selectedHero).subscribe((response) => {
        if (response && response.status === 'success') {
          this.modifyAndUpdateHeroes(response.data);
        }
      });
    }
  }

  modifyAndUpdateHeroes(heroes) {
    let heroListAsArray;
    if (heroes) {
      heroListAsArray = Object.keys(heroes).map((prop) => heroes[prop]);
    } else {
      heroListAsArray = [];
    }
    this.heroes = heroListAsArray;
    this.listService.database = heroListAsArray;
    this.listService.listChange();
  }
}
