import { Component, OnDestroy } from '@angular/core';
import { NavigationService } from './navigation.service';

@Component({
  selector: 'hero-navbar',
  templateUrl: './hero-navbar.component.html',
  styleUrls: ['./hero-navbar.component.scss']
})
export class HeroNavbarComponent implements OnDestroy {
  selectedTab: number = 0;
  tabs = [{
    name: 'Overview',
    icon: 'cake'
  }, {
    name: 'List',
    icon: 'people'
  }, {
    name: 'Form',
    icon: 'person_add'
  }];
  _navSubscription;

  constructor(private navService: NavigationService) {
    this._navSubscription = navService.navigate.subscribe((page) => {
      this.selectedTab = page;
    });
  }

  tabSelect(index) {
    this.selectedTab = index;
    this.navService.changePage(index);
  }

  ngOnDestroy() {
    this._navSubscription.unsubscribe();
  }
}
