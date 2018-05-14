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
  hovering: boolean = false;
  dragResults: string = 'Drop Zone';
  worthy: boolean = false;

  constructor(private formService: HeroFormService) {}

  ngOnChanges(changes: SimpleChanges) {
    this.dirtyForm = false; // reset form when the Input changes
    const form: SimpleChange = changes.form;
    if (form && !form.currentValue) {
      this.form = this.emptyForm;
    }
  }

  drag(ev) {
    ev.dataTransfer.setData('text', ev.target.id);
  }

  overDrop(ev) {
    ev.preventDefault(); // required: You must cancel the default action for ondragenter and ondragover in order for ondrop to fire
    this.hovering = true;
  }

  dragEnd(ev) {
    this.hovering = false; // added drag end to help with the hovering effect
  }

  leaveDrop(ev) {
    this.hovering = false; // added drag leave to help with the hovering effect
  }

  droppedIcon(ev) {
    ev.preventDefault();
    const data = ev.dataTransfer.getData('text');
    this.hovering = false;
    // Check what the drag result was
    if (data === 'Mjolnir') {
      this.worthy = true;
    } else if (data === 'Iron Man') {
      this.dragResults = 'You have excellent taste!';
    } else if (data === 'Captain America') {
      this.dragResults = 'Are you serious!? He is the worst!';
    } else if (data === 'The Hulk') {
      this.dragResults = 'The Green Machine! But incorrect.';
    } else {
      this.dragResults = 'What was that?!';
    }
  }

  formCompleteCheck(form) {
    if (form.name && form.name.first && form.name.last && form.email && form.age && form.faveFood && this.worthy) {
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
