import { inject } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

import { AuthService } from '../services/auth.service';

export interface AuthGuardData {
  requiredRoles?: number[];
  requireAllRoles?: boolean;
}

export const authGuard: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
): boolean => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Check if user is authenticated
  if (!authService.isAuthenticated) {
    // Store the attempted URL for redirecting after login
    // eslint-disable-next-line no-void
    void router.navigate(['/auth'], {
      queryParams: { returnUrl: state.url },
    });
    return false;
  }

  // Check role-based access if required
  const routeData = route.data as AuthGuardData;

  if (routeData.requiredRoles && routeData.requiredRoles.length > 0) {
    const hasAccess = routeData.requireAllRoles
      ? authService.hasAllRoles(routeData.requiredRoles)
      : authService.hasAnyRole(routeData.requiredRoles);

    if (!hasAccess) {
      // User doesn't have required roles - redirect to unauthorized page or home
      // eslint-disable-next-line no-void
      void router.navigate(['/']);
      return false;
    }
  }

  return true;
};

// Helper function to create guards with specific role requirements
export function createRoleGuard(requiredRoles: number[], requireAll = false): CanActivateFn {
  return (route: ActivatedRouteSnapshot, state: RouterStateSnapshot): boolean => {
    const authService = inject(AuthService);
    const router = inject(Router);

    if (!authService.isAuthenticated) {
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      router.navigate(['/auth'], {
        queryParams: { returnUrl: state.url },
      });
      return false;
    }

    const hasAccess = requireAll
      ? authService.hasAllRoles(requiredRoles)
      : authService.hasAnyRole(requiredRoles);

    if (!hasAccess) {
      // eslint-disable-next-line no-void
      void router.navigate(['/']);
      return false;
    }

    return true;
  };
}
