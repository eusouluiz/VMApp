import { applicationConfig, Meta, moduleMetadata, StoryFn } from '@storybook/angular';
import { IonicModule } from '@ionic/angular';
import { FieldErrorMessageComponent } from '../field-error-message/field-error-message.component';
import { FieldPasswordComponent } from './field-password.component';
import { StorybookTranslateModule } from '../../../core/services/storybook-translations-loader/storybook-translations.module';
import { FormControl, FormGroup, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { importProvidersFrom } from '@angular/core';

export default {
  title: 'Shared/Field Password',
  component: FieldPasswordComponent,
  tags: ['autodocs'],
  decorators: [
    moduleMetadata({
      declarations: [FieldErrorMessageComponent],
      imports: [IonicModule.forRoot(), FormsModule, ReactiveFormsModule, StorybookTranslateModule],
    }),
    applicationConfig({
      providers: [importProvidersFrom([IonicModule.forRoot()])],
    }),
  ],
} as Meta;

const Template: StoryFn<FieldPasswordComponent> = (args: FieldPasswordComponent) => {
  const form: FormGroup = new FormGroup({
    password: new FormControl(),
  });

  return {
    component: FieldPasswordComponent,
    template: `
      <form [formGroup]="form">
      <app-field-password
        formControlName="password"
        [label]="label"
        [placeholder]="placeholder"
        [required]="required"
        [disabled]="disabled"
        [showValidationErrorMessage]="showValidationErrorMessage"
        [validatePasswordStrength]="validatePasswordStrength"
      >
      </app-field-password>
      </form>
    `,
    props: {
      ...args,
      form,
    },
  };
};

export const MinimalConfiguration = Template.bind({});
MinimalConfiguration.args = {
  label: 'Password',
};

export const FullConfiguration = Template.bind({});
FullConfiguration.args = {
  label: 'Password',
  placeholder: 'Type your password',
  required: true,
  disabled: false,
  showValidationErrorMessage: true,
  validatePasswordStrength: true,
};
