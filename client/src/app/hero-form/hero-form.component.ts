import { Component } from '@angular/core';

@Component({
  selector: 'hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss']
})
export class HeroFormComponent {
  form = {
    first: null,
    last: null,
    email: null,
    age: null,
    faveFood: null
  };
  disbaled = true;

  constructor() {}

  submit() {
    console.log(this.form);
  }
}
