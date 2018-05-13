import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class NavigationService {
  public navigate: Subject<any> = new Subject<any>();

  public changePage(index) {
    this.navigate.next(index);
  }
}

