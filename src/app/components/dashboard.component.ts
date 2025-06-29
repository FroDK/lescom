import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatIconModule } from '@angular/material/icon';
import { MatToolbarModule } from '@angular/material/toolbar';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-dashboard',
  imports: [MatButtonModule, MatCardModule, MatIconModule, MatToolbarModule],
  template: `
    <mat-toolbar color="primary">
      <span>Dashboard</span>
      <span class="toolbar-spacer"></span>
      <button mat-icon-button (click)="logout()">
        <mat-icon>logout</mat-icon>
      </button>
    </mat-toolbar>

    <div class="dashboard-container">
      <mat-card class="welcome-card">
        <mat-card-header>
          <mat-card-title>Welcome to Dashboard</mat-card-title>
          <mat-card-subtitle>You are successfully authenticated</mat-card-subtitle>
        </mat-card-header>
        <mat-card-content>
          <p>This is a protected route. Only authenticated users can access this page.</p>

          @if (userRoles.length > 0) {
            <div class="roles-section">
              <h3>Your Roles:</h3>
              <ul>
                @for (role of userRoles; track role) {
                  <li>Role ID: {{ role }}</li>
                }
              </ul>
            </div>
          } @else {
            <p class="no-roles">No roles assigned yet.</p>
          }
        </mat-card-content>
        <mat-card-actions>
          <button mat-raised-button color="warn" (click)="logout()">
            <mat-icon>logout</mat-icon>
            Logout
          </button>
        </mat-card-actions>
      </mat-card>
    </div>
  `,
  styles: [
    `
      .toolbar-spacer {
        flex: 1 1 auto;
      }

      .dashboard-container {
        padding: 2rem;
        max-width: 800px;
        margin: 0 auto;
      }

      .welcome-card {
        margin-top: 2rem;
        box-shadow: 0 4px 12px var(--organic-shadow);
      }

      .roles-section {
        margin-top: 1rem;
        padding: 1rem;
        background: var(--morning-mist);
        border-radius: 8px;
      }

      .roles-section h3 {
        margin: 0 0 0.5rem 0;
        color: var(--mat-sys-primary);
      }

      .roles-section ul {
        margin: 0;
        padding-left: 1.5rem;
      }

      .no-roles {
        color: var(--mat-sys-on-surface-variant);
        font-style: italic;
      }

      mat-card-actions {
        padding: 1rem;
      }
    `,
  ],
})
export class DashboardComponent {
  private authService = inject(AuthService);

  private router = inject(Router);

  get userRoles(): number[] {
    return this.authService.userRoles;
  }

  logout(): void {
    this.authService.logout();
  }
}
