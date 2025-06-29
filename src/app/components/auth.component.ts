import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';

interface AuthFormData {
  login: string;
  password: string;
}

@Component({
  selector: 'app-auth',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
  ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  private fb = inject(FormBuilder);

  authForm: FormGroup;

  hidePassword = true;

  constructor() {
    this.authForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  isFieldRequired(fieldName: string): boolean {
    const field = this.authForm.get(fieldName);
    return field ? field.hasError('required') && field.touched : false;
  }

  getErrorMessage(fieldName: string): string {
    if (this.isFieldRequired(fieldName)) {
      return `${fieldName.charAt(0).toUpperCase() + fieldName.slice(1)} is required`;
    }
    return '';
  }

  togglePasswordVisibility(): void {
    this.hidePassword = !this.hidePassword;
  }

  onSubmit(): void {
    if (this.authForm.valid) {
      const formData: AuthFormData = this.authForm.value as AuthFormData;
      // eslint-disable-next-line no-console
      console.log('Form submitted with values:', formData);
      // Here would be the actual authentication logic
      // For demo purposes, just log the values
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.authForm.controls).forEach((key) => {
        this.authForm.get(key)?.markAsTouched();
      });
    }
  }

  get isFormValid(): boolean {
    return this.authForm.valid;
  }

  get isFormInvalid(): boolean {
    return this.authForm.invalid;
  }

  get loginControl() {
    return this.authForm.get('login');
  }

  get passwordControl() {
    return this.authForm.get('password');
  }
}
