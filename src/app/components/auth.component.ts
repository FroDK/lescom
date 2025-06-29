import { Component, inject, signal } from '@angular/core';
import { FormBuilder, FormGroup, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBar, MatSnackBarModule } from '@angular/material/snack-bar';
import { ActivatedRoute, Router } from '@angular/router';
import { UserAuthorize } from '../api/models/user-authorize';
import { AuthResponse, AuthService } from '../services/auth.service';

@Component({
  selector: 'app-auth',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    MatCardModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
  ],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss'],
})
export class AuthComponent {
  private fb = inject(FormBuilder);

  private authService = inject(AuthService);

  private router = inject(Router);

  private route = inject(ActivatedRoute);

  private snackBar = inject(MatSnackBar);

  authForm: FormGroup;

  hidePassword = true;

  isLoading = signal(false);

  private returnUrl: string;

  constructor() {
    this.authForm = this.fb.group({
      login: ['', Validators.required],
      password: ['', Validators.required],
    });

    // Get return url from route parameters or default to '/'
    // eslint-disable-next-line dot-notation
    this.returnUrl = (this.route.snapshot.queryParams['returnUrl'] as string) || '/';

    // If already authenticated, redirect
    if (this.authService.isAuthenticated) {
      // eslint-disable-next-line no-void
      void this.router.navigate([this.returnUrl]);
    }
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
    if (this.authForm.valid && !this.isLoading()) {
      this.isLoading.set(true);
      const credentials: UserAuthorize = this.authForm.value as UserAuthorize;

      this.authService.login(credentials).subscribe({
        next: (response: AuthResponse & { user_id?: number }) => {
          // If the response includes user ID, store it and load profile
          if (response.user_id) {
            this.authService.storeUserId(response.user_id);
            // Load user profile to get roles
            this.authService.loadUserProfile(response.user_id).subscribe({
              complete: () => {
                this.navigateToReturnUrl();
              },
            });
          } else {
            // Navigate without loading profile
            this.navigateToReturnUrl();
          }
        },
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        error: (error: any) => {
          this.isLoading.set(false);
          let errorMessage = 'Login failed. Please check your credentials.';

          // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          if (error.status === 401) {
            errorMessage = 'Invalid login or password.';
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          } else if (error.status === 0) {
            errorMessage = 'Unable to connect to server. Please try again later.';
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
          } else if (error.error?.detail) {
            // eslint-disable-next-line @typescript-eslint/no-unsafe-member-access
            errorMessage = error.error.detail as string;
          }

          this.snackBar.open(errorMessage, 'Close', {
            duration: 5000,
            horizontalPosition: 'center',
            verticalPosition: 'top',
          });
        },
      });
    } else {
      // Mark all fields as touched to show validation errors
      Object.keys(this.authForm.controls).forEach((key) => {
        this.authForm.get(key)?.markAsTouched();
      });
    }
  }

  private navigateToReturnUrl(): void {
    this.isLoading.set(false);
    this.snackBar.open('Login successful!', 'Close', {
      duration: 3000,
      horizontalPosition: 'center',
      verticalPosition: 'top',
    });
    // eslint-disable-next-line no-void
    void this.router.navigate([this.returnUrl]);
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
