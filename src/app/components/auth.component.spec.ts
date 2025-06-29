import { ComponentFixture, TestBed } from '@angular/core/testing';
import { ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { NoopAnimationsModule } from '@angular/platform-browser/animations';
import { By } from '@angular/platform-browser';
import { DebugElement } from '@angular/core';

import { AuthComponent } from './auth.component';

describe('AuthComponent', () => {
  let component: AuthComponent;
  let fixture: ComponentFixture<AuthComponent>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [
        AuthComponent,
        ReactiveFormsModule,
        MatFormFieldModule,
        MatInputModule,
        MatButtonModule,
        MatCardModule,
        MatIconModule,
        NoopAnimationsModule,
      ],
    }).compileComponents();

    fixture = TestBed.createComponent(AuthComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  describe('Component Initialization', () => {
    it('should create', () => {
      expect(component).toBeTruthy();
    });

    it('should initialize form with empty fields', () => {
      expect(component.authForm.get('login')?.value).toBe('');
      expect(component.authForm.get('password')?.value).toBe('');
    });

    it('should initialize form as invalid', () => {
      expect(component.authForm.invalid).toBe(true);
      expect(component.isFormInvalid).toBe(true);
      expect(component.isFormValid).toBe(false);
    });

    it('should initialize hidePassword as true', () => {
      expect(component.hidePassword).toBe(true);
    });
  });

  describe('Form Validation', () => {
    it('should require login field', () => {
      const loginControl = component.authForm.get('login');
      expect(loginControl?.hasError('required')).toBe(true);
    });

    it('should require password field', () => {
      const passwordControl = component.authForm.get('password');
      expect(passwordControl?.hasError('required')).toBe(true);
    });

    it('should be valid when both fields are filled', () => {
      component.authForm.patchValue({
        login: 'testuser',
        password: 'testpass',
      });
      expect(component.authForm.valid).toBe(true);
      expect(component.isFormValid).toBe(true);
      expect(component.isFormInvalid).toBe(false);
    });

    it('should be invalid when only login is filled', () => {
      component.authForm.patchValue({
        login: 'testuser',
        password: '',
      });
      expect(component.authForm.invalid).toBe(true);
    });

    it('should be invalid when only password is filled', () => {
      component.authForm.patchValue({
        login: '',
        password: 'testpass',
      });
      expect(component.authForm.invalid).toBe(true);
    });
  });

  describe('Error Handling', () => {
    it('should return true for isFieldRequired when field is required and touched', () => {
      const loginControl = component.authForm.get('login');
      loginControl?.markAsTouched();
      expect(component.isFieldRequired('login')).toBe(true);
    });

    it('should return false for isFieldRequired when field is not touched', () => {
      expect(component.isFieldRequired('login')).toBe(false);
    });

    it('should return correct error message for login', () => {
      const loginControl = component.authForm.get('login');
      loginControl?.markAsTouched();
      expect(component.getErrorMessage('login')).toBe('Login is required');
    });

    it('should return correct error message for password', () => {
      const passwordControl = component.authForm.get('password');
      passwordControl?.markAsTouched();
      expect(component.getErrorMessage('password')).toBe('Password is required');
    });

    it('should return empty string when field is valid', () => {
      component.authForm.patchValue({ login: 'testuser' });
      const loginControl = component.authForm.get('login');
      loginControl?.markAsTouched();
      expect(component.getErrorMessage('login')).toBe('');
    });
  });

  describe('Password Visibility Toggle', () => {
    it('should toggle hidePassword property', () => {
      expect(component.hidePassword).toBe(true);
      component.togglePasswordVisibility();
      expect(component.hidePassword).toBe(false);
      component.togglePasswordVisibility();
      expect(component.hidePassword).toBe(true);
    });

    it('should change password input type when toggled', () => {
      const passwordInput = fixture.debugElement.query(
        By.css('input[formControlName="password"]')
      );
      expect(passwordInput.nativeElement.type).toBe('password');

      component.togglePasswordVisibility();
      fixture.detectChanges();
      expect(passwordInput.nativeElement.type).toBe('text');
    });

    it('should change icon when password visibility is toggled', () => {
      const toggleButton = fixture.debugElement.query(
        By.css('button[matSuffix]')
      );
      const icon = toggleButton.query(By.css('mat-icon'));
      expect(icon.nativeElement.textContent.trim()).toBe('visibility_off');

      component.togglePasswordVisibility();
      fixture.detectChanges();
      expect(icon.nativeElement.textContent.trim()).toBe('visibility');
    });
  });

  describe('Form Submission', () => {
    it('should not submit when form is invalid', () => {
      spyOn(console, 'log');
      component.onSubmit();
      expect(console.log).not.toHaveBeenCalled();
    });

    it('should mark all fields as touched when submitting invalid form', () => {
      component.onSubmit();
      expect(component.authForm.get('login')?.touched).toBe(true);
      expect(component.authForm.get('password')?.touched).toBe(true);
    });

    it('should submit when form is valid', () => {
      spyOn(console, 'log');
      component.authForm.patchValue({
        login: 'testuser',
        password: 'testpass',
      });
      component.onSubmit();
      expect(console.log).toHaveBeenCalledWith('Form submitted with values:', {
        login: 'testuser',
        password: 'testpass',
      });
    });
  });

  describe('Form Controls Access', () => {
    it('should provide access to loginControl', () => {
      expect(component.loginControl).toBe(component.authForm.get('login'));
    });

    it('should provide access to passwordControl', () => {
      expect(component.passwordControl).toBe(component.authForm.get('password'));
    });
  });

  describe('User Interactions', () => {
    it('should type in login field', () => {
      const loginInput = fixture.debugElement.query(
        By.css('input[formControlName="login"]')
      );
      const inputElement = loginInput.nativeElement;

      inputElement.value = 'testuser';
      inputElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(component.authForm.get('login')?.value).toBe('testuser');
    });

    it('should type in password field', () => {
      const passwordInput = fixture.debugElement.query(
        By.css('input[formControlName="password"]')
      );
      const inputElement = passwordInput.nativeElement;

      inputElement.value = 'testpass';
      inputElement.dispatchEvent(new Event('input'));
      fixture.detectChanges();

      expect(component.authForm.get('password')?.value).toBe('testpass');
    });

    it('should enable submit button when form is valid', () => {
      const submitButton = fixture.debugElement.query(
        By.css('button[type="submit"]')
      );
      expect(submitButton.nativeElement.disabled).toBe(true);

      component.authForm.patchValue({
        login: 'testuser',
        password: 'testpass',
      });
      fixture.detectChanges();

      expect(submitButton.nativeElement.disabled).toBe(false);
    });

    it('should call onSubmit when submit button is clicked', () => {
      spyOn(component, 'onSubmit');
      component.authForm.patchValue({
        login: 'testuser',
        password: 'testpass',
      });
      fixture.detectChanges();

      const submitButton = fixture.debugElement.query(
        By.css('button[type="submit"]')
      );
      submitButton.nativeElement.click();

      expect(component.onSubmit).toHaveBeenCalled();
    });

    it('should call togglePasswordVisibility when visibility button is clicked', () => {
      spyOn(component, 'togglePasswordVisibility');
      const toggleButton = fixture.debugElement.query(
        By.css('button[matSuffix]')
      );
      toggleButton.nativeElement.click();

      expect(component.togglePasswordVisibility).toHaveBeenCalled();
    });
  });

  describe('Template Rendering', () => {
    it('should render login title', () => {
      const title = fixture.debugElement.query(By.css('.mat-mdc-card-title'));
      expect(title.nativeElement.textContent.trim()).toBe('Login');
    });

    it('should render login subtitle', () => {
      const subtitle = fixture.debugElement.query(By.css('.mat-mdc-card-subtitle'));
      expect(subtitle.nativeElement.textContent.trim()).toBe('Please enter your credentials');
    });

    it('should render login input field', () => {
      const loginField = fixture.debugElement.query(
        By.css('input[formControlName="login"]')
      );
      expect(loginField).toBeTruthy();
    });

    it('should render password input field', () => {
      const passwordField = fixture.debugElement.query(
        By.css('input[formControlName="password"]')
      );
      expect(passwordField).toBeTruthy();
    });

    it('should render submit button', () => {
      const submitButton = fixture.debugElement.query(
        By.css('button[type="submit"]')
      );
      expect(submitButton).toBeTruthy();
      expect(submitButton.nativeElement.textContent.trim()).toBe('Sign In');
    });

    it('should display error messages when fields are invalid and touched', () => {
      component.authForm.get('login')?.markAsTouched();
      component.authForm.get('password')?.markAsTouched();
      fixture.detectChanges();

      const errorMessages = fixture.debugElement.queryAll(By.css('mat-error'));
      expect(errorMessages.length).toBe(2);
      expect(errorMessages[0].nativeElement.textContent.trim()).toBe('Login is required');
      expect(errorMessages[1].nativeElement.textContent.trim()).toBe('Password is required');
    });
  });

  describe('Edge Cases', () => {
    it('should handle empty form submission gracefully', () => {
      spyOn(console, 'log');
      expect(() => component.onSubmit()).not.toThrow();
      expect(console.log).not.toHaveBeenCalled();
    });

    it('should handle partial form data correctly', () => {
      component.authForm.patchValue({ login: 'testuser' });
      expect(component.authForm.invalid).toBe(true);
      expect(component.isFieldRequired('password')).toBe(false); // not touched yet
    });

    it('should maintain form state after multiple interactions', () => {
      // Fill form
      component.authForm.patchValue({
        login: 'testuser',
        password: 'testpass',
      });
      expect(component.authForm.valid).toBe(true);

      // Clear one field
      component.authForm.patchValue({ password: '' });
      expect(component.authForm.invalid).toBe(true);

      // Refill
      component.authForm.patchValue({ password: 'newpass' });
      expect(component.authForm.valid).toBe(true);
    });
  });
});