import { Component, Input, Self, OnInit, Optional, Output, EventEmitter, ViewChild } from '@angular/core';
import { Validators, ControlValueAccessor, NgControl, ValidatorFn } from '@angular/forms';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-login-field-input',
  templateUrl: './field-input.component.html',
  styleUrls: ['./field-input.component.scss'],
})
export class LoginFieldInputComponent implements ControlValueAccessor, OnInit {
  @ViewChild('ionInput') ionInput: IonInput | undefined = undefined;

  @Input() type: 'text' | 'number' | 'email' = 'text';

  @Input() mask: 'phone' | 'zip-code' | 'svnr' = 'phone';

  @Input() label: string | undefined = undefined;

  @Input() placeholder: string | undefined = undefined;

  @Input() icon: string | undefined = undefined;

  @Input() helperText: string | undefined = undefined;

  @Input() required = false;

  @Input() showValidationErrorMessage = true;

  @Output() enter = new EventEmitter();

  value: string | undefined = undefined;

  onChange: (_: any) => void = () => {};

  onTouched: () => void = () => {};

  // eslint-disable-next-line @typescript-eslint/member-ordering
  constructor(@Self() @Optional() public ngControl: NgControl) {
    this.ngControl.valueAccessor = this;
  }

  ngOnInit() {
    const { control } = this.ngControl;

    let validators = this.getValidators();
    validators = control?.validator ? [control.validator, ...validators] : this.getValidators();

    control?.setValidators(validators);
    control?.updateValueAndValidity();
  }

  // FORM CONTROL FUNCTIONS
  setValue($event: any) {
    this.value = $event.detail.value;
    this.updateChanges();
  }

  updateChanges() {
    this.onChange(this.value);
  }

  writeValue(value: string): void {
    this.value = value;
    this.updateChanges();
  }

  registerOnChange(fn: any): void {
    this.onChange = fn;
  }

  registerOnTouched(fn: any): void {
    this.onTouched = fn;
  }

  setDisabled(state: boolean) {
    if (state) {
      this.ngControl.control?.enable();
      return;
    }

    this.ngControl.control?.disable();
  }

  setFocus() {
    this.ionInput?.setFocus();
  }

  onKeyDown(event: KeyboardEvent) {
    if (event?.keyCode === 13 || event?.key === 'Enter') {
      this.enter.emit();
    }
  }

  // PRIVATE
  private getValidators(): ValidatorFn[] {
    const validators = [];

    if (this.type === 'email') {
      validators.push(Validators.email);
    }

    if (this.type === 'number') {
      validators.push(Validators.pattern('^[0-9]*$'));
    }

    return validators;
  }
}
