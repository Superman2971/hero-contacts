import { Component, Input, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';
import { HeroFormService } from './hero-form.service';
import { HeroListService } from '../hero-list/hero-list.service';
import { NavigationService } from '../hero-navbar/navigation.service';

@Component({
  selector: 'hero-form',
  templateUrl: './hero-form.component.html',
  styleUrls: ['./hero-form.component.scss']
})
export class HeroFormComponent implements OnChanges {
  @Input() form;
  dirtyForm = false;
  hovering: boolean = false;
  dragResults: string = 'Drop Zone';
  worthy: boolean = false;
  mobile: boolean = false;

  constructor(
    private formService: HeroFormService,
    private listService: HeroListService,
    private navService: NavigationService
  ) {
    // Simple method using navigator to detect if we are on mobile/tablet device
    if ( navigator.userAgent.match(/Android/i)
      || navigator.userAgent.match(/webOS/i)
      || navigator.userAgent.match(/iPhone/i)
      || navigator.userAgent.match(/iPad/i)
      || navigator.userAgent.match(/iPod/i)
      || navigator.userAgent.match(/BlackBerry/i)
      || navigator.userAgent.match(/Windows Phone/i)
    ) {
      this.mobile = true;
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    this.dirtyForm = false; // reset form when the Input changes
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
    this.checkIfWorth(data);
  }

  checkIfWorth(data) {
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
    if (this.formCompleteCheck(this.form)) {
      this.formService.postHero(this.form).subscribe((response) => {
        this.dirtyForm = false;
        this.form = {
          name: {
            first: null,
            last: null
          },
          email: null,
          age: null,
          faveFood: null
        };
        this.worthy = false;
        if (response.status === 'success') {
          const responseDataAsArray = Object.keys(response.data).map((prop) => response.data[prop]);
          this.listService.database = responseDataAsArray;
          this.listService.listChange();
          this.navService.changePage(1);
        }
      }, (error) => {
        this.worthy = false;
      });
    }
  }
}
