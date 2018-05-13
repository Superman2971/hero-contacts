import { Component, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { HeroFormService } from './hero-form.service';

@Component({
  selector: 'hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss']
})
export class HeroFormComponent implements OnChanges {
  @Input() form;
  dirtyForm = false;
  emptyForm = {
    name: {
      first: null,
      last: null
    },
    email: null,
    age: null,
    faveFood: null
  };

  constructor(private formService: HeroFormService) {}

  ngOnChanges(changes: SimpleChanges) {
    this.dirtyForm = false; // reset form when the Input changes
    const form: SimpleChange = changes.form;
    if (form && !form.currentValue) {
      this.form = this.emptyForm;
    }
  }

  formCompleteCheck(form) {
    if (form.name && form.name.first && form.name.last && form.email && form.age && form.faveFood) {
      return true;
    } else {
      return false;
    }
  }

  submit() {
    this.dirtyForm = true;
    console.log(this.form);
    if (this.formCompleteCheck(this.form)) {
      this.formService.postHero(this.form).subscribe((response) => {
        this.dirtyForm = false;
        this.form = this.emptyForm;
        console.log('API request: ', response);
      }, (error) => {
        console.log('API ERROR', error);
      });
    }
  }
}
