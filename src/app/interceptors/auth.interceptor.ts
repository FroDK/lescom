import {
  HttpErrorResponse,
  HttpEvent,
  HttpHandlerFn,
  HttpInterceptorFn,
  HttpRequest,
} from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, throwError } from 'rxjs';
import { catchError } from 'rxjs/operators';

import { AuthService } from '../services/auth.service';

export const authInterceptor: HttpInterceptorFn = (
  req: HttpRequest<unknown>,
  next: HttpHandlerFn,
): Observable<HttpEvent<unknown>> => {
  const authService = inject(AuthService);
  const router = inject(Router);

  // Skip interceptor for auth endpoints to avoid circular dependency
  const isAuthEndpoint =
    req.url.includes('/auth/sign-in') ||
    req.url.includes('/auth/sign-up') ||
    req.url.includes('/auth/telegram');

  if (isAuthEndpoint) {
    return next(req);
  }

  // Get authorization header from auth service
  const authHeader = authService.getAuthorizationHeader();

  // Clone request and add authorization header if available
  const authReq = authHeader
    ? req.clone({
        setHeaders: {
          Authorization: authHeader,
        },
      })
    : req;

  // Handle the request and catch 401 errors
  return next(authReq).pipe(
    catchError((error: HttpErrorResponse) => {
      if (error.status === 401) {
        // Unauthorized - clear auth and redirect to login
        authService.logout();
        // eslint-disable-next-line no-void
        void router.navigate(['/auth']);
      }
      return throwError(() => error);
    }),
  );
};
