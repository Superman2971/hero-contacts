import { Component } from '@angular/core';
import { NavigationService } from './hero-navbar/navigation.service';

@Component({
  selector: 'hero-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  page = 1;
  _navSubscription;

  constructor(private navService: NavigationService) {
    this._navSubscription = navService.navigate.subscribe((page: number) => {
      this.page = page;
    });
  }

  goToForm(evt) {
    console.log(evt);
    this.navService.changePage(2);
  }
}
