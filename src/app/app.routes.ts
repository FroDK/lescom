import { Routes } from '@angular/router';
import { authGuard } from './guards/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/dashboard',
    pathMatch: 'full',
  },
  {
    path: 'auth',
    loadComponent: () => import('./components/auth.component').then((m) => m.AuthComponent),
  },
  {
    path: 'dashboard',
    loadComponent: () =>
      import('./components/dashboard.component').then((m) => m.DashboardComponent),
    canActivate: [authGuard],
  },
  {
    path: 'admin',
    loadComponent: () =>
      import('./components/dashboard.component').then((m) => m.DashboardComponent),
    canActivate: [authGuard],
    data: {
      requiredRoles: [1], // Example: Role ID 1 for admin
      requireAllRoles: false,
    },
  },
];
