import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./components/auth.component').then((m) => m.AuthComponent),
  },
  {
    path: 'auth',
    loadComponent: () => import('./components/auth.component').then((m) => m.AuthComponent),
  },
];
