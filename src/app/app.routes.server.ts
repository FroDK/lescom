import { RenderMode, ServerRoute } from '@angular/ssr';

export const serverRoutes: ServerRoute[] = [
  {
    path: '',
    renderMode: RenderMode.Server, // Redirect route - use SSR
  },
  {
    path: 'auth',
    renderMode: RenderMode.Prerender,
  },
  {
    path: 'dashboard',
    renderMode: RenderMode.Server, // Protected route - SSR
  },
  {
    path: 'admin',
    renderMode: RenderMode.Server, // Protected route - SSR
  },
];
