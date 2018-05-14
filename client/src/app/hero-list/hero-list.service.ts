import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

@Injectable()
export class HeroListService {
  public fakeDatabase = [{
    name: {
      first: 'Clark',
      last: 'Kent'
    },
    age: 43,
    email: 'kentfarms@yahoo.com',
    faveFood: 'Salad, no dressing'
  }, {
    name: {
      first: 'Bruce',
      last: 'Wayne'
    },
    age: 46,
    email: 'masterbruce@gmail.com',
    faveFood: 'Protein Shakes'
  }, {
    name: {
      first: 'Bruce',
      last: 'Banner'
    },
    age: 34,
    email: 'greenmachine@hotmail.com',
    faveFood: 'french fries'
  }, {
    name: {
      first: 'Peter',
      last: 'Parker'
    },
    age: 24,
    email: 'parkerphotography@dailybugle.com',
    faveFood: 'pizza'
  }, {
    name: {
      first: 'Tony',
      last: 'Stark'
    },
    age: 37,
    email: 'tony@starkenterprise.com',
    faveFood: 'BK Whopper'
  }];

  public listChanges: Subject<any> = new Subject();

  public listChange() {
    this.listChanges.next(this.fakeDatabase);
  }
}
