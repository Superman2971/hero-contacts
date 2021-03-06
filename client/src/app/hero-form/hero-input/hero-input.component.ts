import { Component, OnInit, Input, Output, EventEmitter, OnChanges, SimpleChanges, SimpleChange } from '@angular/core';

@Component({
  selector: 'hero-input',
  templateUrl: './hero-input.component.html',
  styleUrls: ['./hero-input.component.scss']
})
export class HeroInputComponent implements OnInit, OnChanges {
  @Input() placeholder;
  @Input() init;
  @Input() dirty;
  @Input() optional;
  @Input() email;
  @Input() numberType;
  @Input() minlength;
  @Input() maxlength;
  @Input() description;
  @Output() value: EventEmitter<string> = new EventEmitter();
  // ngModel for Input
  input;
  // variables
  focused;
  type;
  watchInitChange: boolean = true;
  // variables for custom validations
  emailValid;
  emailRegex;

  constructor() {}

  ngOnChanges(changes: SimpleChanges) {
    const init: SimpleChange = changes.init;
    if (this.watchInitChange) {
      if (init && init.currentValue) {
        this.input = init.currentValue;
      } else if (init && init.currentValue === '') {
        this.input = null;
        this.dirty = false;
      } else if (init) {
        this.input = null;
        this.dirty = false;
      }
    } else {
      this.watchInitChange = true;
    }
  }

  ngOnInit() {
    this.sendValue(this.init);
    // only create the email regex if this is an email input
    if (this.email) {
      /* tslint:disable */
      this.emailRegex = new RegExp(/^(([^<>()\[\]\\.,;:\s@']+(\.[^<>()\[\]\\.,;:\s@']+)*)|('.+'))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/);
      /* tslint:enable */
    }
    // set the input type
    this.getType();
  }

  getType() {
    if (this.numberType) {
      this.type = 'number';
    } else {
      this.type = 'text';
    }
  }

  sendValue(value) {
    let valid = true;
    // if not optional check against possible validators
    if (!this.optional && value) {
      // email validation
      if (this.email && this.emailRegex) {
        // check matches email valid regex
        this.emailValid = this.emailRegex.test(value);
        if (!this.emailValid) {
          valid = false;
        }
      }
      // minlength validation
      if (this.minlength && value.length < this.minlength) {
        valid = false;
      }
      // maxlength validation
      if (this.maxlength && value.length > this.maxlength) {
        valid = false;
      }
      // numbertype = change to number from string
      if (this.numberType) {
        value = Number(value);
      }
    }
    // finally if valid send the value otherwise send null
    if (valid) {
      this.value.emit(value);
    } else {
      this.watchInitChange = false; // because we don't need to watch for the change we are about to force to the parent component
      this.value.emit(null);
    }
  }
}
