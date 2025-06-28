import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: '/ui-kit',
    pathMatch: 'full',
  },
  {
    path: 'ui-kit',
    loadComponent: () => import('./pages/ui-kit/ui-kit').then((m) => m.UiKitComponent),
  },
];
