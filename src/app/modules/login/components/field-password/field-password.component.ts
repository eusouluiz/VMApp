import { Component, EventEmitter, Input, OnInit, Optional, Output, Self, ViewChild } from '@angular/core';
import { Validators, ControlValueAccessor, NgControl } from '@angular/forms';

import { passwordStrengthValidator } from '../../../../core/validators/password-strength/password-strenght.validator';
import { IonInput } from '@ionic/angular';

@Component({
  selector: 'app-login-field-password',
  templateUrl: './field-password.component.html',
  styleUrls: ['./field-password.component.scss'],
})
export class LoginFieldPasswordComponent implements ControlValueAccessor, OnInit {
  @ViewChild('ionInput') ionInput: IonInput | undefined = undefined;

  @Input() label: string | undefined = undefined;

  @Input() placeholder: string | undefined = undefined;

  @Input() helperText: string | undefined = undefined;

  @Input() required = false;

  @Input() showValidationErrorMessage = true;

  @Input() validatePasswordStrength = false;

  @Output() enter = new EventEmitter();

  showPassword = false;

  value: string | null = null;

  isDisabled = false;

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

  togglePasswordVisibility() {
    this.showPassword = !this.showPassword;
  }

  // FORM CONTROL FUNCTIONS
  setValue($event: any) {
    this.value = $event.detail.value;
    this.updateChanges();
  }

  setFocus() {
    this.ionInput?.setFocus();
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

  setDisabledState(isDisabled: boolean) {
    this.isDisabled = isDisabled;
  }

  onKeyDown(event: KeyboardEvent) {
    if (event?.keyCode === 13 || event?.key === 'Enter') {
      this.enter.emit();
    }
  }

  // PRIVATE
  private getValidators() {
    const validators = [];

    if (this.validatePasswordStrength) {
      Validators.minLength(8);
      validators.push(passwordStrengthValidator());
    }

    return validators;
  }
}
