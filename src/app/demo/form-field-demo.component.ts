import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormControl, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { FormFieldComponent } from '../ui';

@Component({
  selector: 'app-form-field-demo',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, FormFieldComponent],
  template: `
    <div class="container-lg p-8 space-y-8">
      <h1 class="text-2xl font-bold">Form Field Component Demo</h1>

      <form [formGroup]="demoForm" (ngSubmit)="onSubmit()" class="space-y-6 max-w-md">
        <!-- Email field with validation -->
        <app-form-field
          label="Email"
          hint="Enter your email address"
          type="email"
          placeholder="user@example.com"
          [required]="true"
          [control]="demoForm.get('email')"
          formControlName="email"
        >
        </app-form-field>

        <!-- Password field -->
        <app-form-field
          label="Password"
          type="password"
          placeholder="Enter your password"
          [showPasswordToggle]="true"
          [required]="true"
          [control]="demoForm.get('password')"
          formControlName="password"
        >
        </app-form-field>

        <!-- Name field with min length -->
        <app-form-field
          label="Full Name"
          hint="At least 2 characters"
          type="text"
          placeholder="John Doe"
          [required]="true"
          [control]="demoForm.get('name')"
          formControlName="name"
        >
        </app-form-field>

        <!-- Age field with number validation -->
        <app-form-field
          label="Age"
          type="number"
          placeholder="25"
          [control]="demoForm.get('age')"
          formControlName="age"
        >
        </app-form-field>

        <!-- Website field with URL pattern -->
        <app-form-field
          label="Website"
          hint="Optional: Enter your website URL"
          type="url"
          placeholder="https://example.com"
          [control]="demoForm.get('website')"
          formControlName="website"
        >
        </app-form-field>

        <div class="pt-4">
          <button type="submit" class="btn-primary" [disabled]="demoForm.invalid">
            Submit Form
          </button>

          <button type="button" class="btn-secondary ml-4" (click)="markAllAsTouched()">
            Show All Errors
          </button>
        </div>
      </form>

      <!-- Form state debug -->
      <div class="mt-8 p-4 bg-muted rounded-lg">
        <h3 class="font-semibold mb-2">Form State (Debug)</h3>
        <pre class="text-sm">{{ getFormState() | json }}</pre>
      </div>
    </div>
  `,
})
export class FormFieldDemoComponent {
  demoForm: FormGroup = new FormGroup({
    email: new FormControl('', [Validators.required, Validators.email]),
    password: new FormControl('', [Validators.required, Validators.minLength(6)]),
    name: new FormControl('', [Validators.required, Validators.minLength(2)]),
    age: new FormControl('', [Validators.min(18), Validators.max(100)]),
    website: new FormControl('', [Validators.pattern('^https?:\\/\\/.+\\..+$')]),
  });

  onSubmit(): void {
    if (this.demoForm.valid) {
      // eslint-disable-next-line no-console
      console.log('Form submitted:', this.demoForm.value);
      // eslint-disable-next-line no-alert, no-undef
      alert('Form submitted successfully!');
    } else {
      this.markAllAsTouched();
    }
  }

  markAllAsTouched(): void {
    this.demoForm.markAllAsTouched();
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

  private getFormErrors(): Record<string, unknown> {
    const errors: Record<string, unknown> = {};
    Object.keys(this.demoForm.controls).forEach((key) => {
      const control = this.demoForm.get(key);
      if (control?.errors) {
        errors[key] = control.errors;
      }
    });
    return errors;
  }
}
