import { Component, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { HeroFormService } from './hero-form.service';

@Component({
  selector: 'hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss']
})
export class HeroFormComponent implements OnChanges {
  @Input() form;
  disbaled = true;

  constructor(private formService: HeroFormService) {}

  ngOnChanges(changes: SimpleChanges) {
    const form: SimpleChange = changes.form;
    if (form && !form.currentValue) {
      this.form = {
        name: {
          first: null,
          last: null
        },
        email: null,
        age: null,
        faveFood: null
      };
    }
  }

  submit() {
    console.log(this.form);
    this.formService.postHero(this.form).subscribe((response) => {
      console.log('API request: ', response);
    }, (error) => {
      console.log('API ERROR', error);
    });
  }
}
