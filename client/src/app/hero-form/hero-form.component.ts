import { Component } from '@angular/core';
import { HeroFormService } from './hero-form.service';

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

  constructor(private formService: HeroFormService) {}

  submit() {
    console.log(this.form);
    this.formService.test().subscribe((response) => {
      console.log('API request: ', response);
    });
  }
}
