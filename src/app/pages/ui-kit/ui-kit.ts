import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import {
  AbstractControl,
  FormBuilder,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  Validators,
} from '@angular/forms';
import {
  BadgeComponent,
  ButtonDirective,
  FormFieldComponent,
  InputComponent,
  StackDirective,
} from '@ui';

@Component({
  selector: 'app-ui-kit',
  imports: [
    CommonModule,
    ReactiveFormsModule,
    BadgeComponent,
    ButtonDirective,
    StackDirective,
    InputComponent,
    FormFieldComponent,
  ],
  templateUrl: './ui-kit.html',
  styles: ``,
})
export class UiKitComponent {
  private fb = inject(FormBuilder);

  // Demo states for showcase
  inputValue = signal('');

  passwordValue = signal('');

  searchValue = signal('');

  isLoading = signal(false);

  hasError = signal(false);

  hasSuccess = signal(false);

  // Form field demo
  demoForm: FormGroup = this.fb.group({
    email: ['', [Validators.required, Validators.email]],
    password: ['', [Validators.required, Validators.minLength(6)]],
    name: ['', [Validators.required, Validators.minLength(2)]],
    age: [
      '',
      [
        (control: AbstractControl): ValidationErrors | null => Validators.min(18)(control),
        (control: AbstractControl): ValidationErrors | null => Validators.max(100)(control),
      ],
    ],
    website: ['', [Validators.pattern('^https?:\\/\\/.+\\..+$')]],
  });

  // Demo methods for showcasing components
  onInputChange(value: string) {
    this.inputValue.set(value);
  }

  onPasswordChange(value: string) {
    this.passwordValue.set(value);
  }

  onSearchChange(value: string) {
    this.searchValue.set(value);
  }

  toggleLoading() {
    this.isLoading.set(!this.isLoading());
  }

  toggleError() {
    this.hasError.update((value) => !value);
    if (this.hasError()) this.hasSuccess.set(false);
  }

  toggleSuccess() {
    this.hasSuccess.update((value) => !value);
    if (this.hasSuccess()) this.hasError.set(false);
  }

  clearAll() {
    this.inputValue.set('');
    this.passwordValue.set('');
    this.searchValue.set('');
  }

  // Form field demo methods
  onFormSubmit(): void {
    if (this.demoForm.valid) {
      // eslint-disable-next-line no-console
      console.log('Form submitted:', this.demoForm.value);
    } else {
      this.markAllAsTouched();
    }
  }

  markAllAsTouched(): void {
    this.demoForm.markAllAsTouched();
  }

  resetForm(): void {
    this.demoForm.reset();
  }

  getFormState(): Record<string, unknown> {
    return {
      valid: this.demoForm.valid,
      invalid: this.demoForm.invalid,
      touched: this.demoForm.touched,
      dirty: this.demoForm.dirty,
      value: this.demoForm.value,
      errors: this.getFormErrors(),
    };
  }

  getFormErrors(): Record<string, unknown> {
    const errors: Record<string, unknown> = {};
    Object.keys(this.demoForm.controls).forEach((key) => {
      const control = this.demoForm.get(key);
      if (control?.errors) {
        errors[key] = control.errors;
      }
    });
    return errors;
  }

  get objectKeys() {
    return Object;
  }
}
