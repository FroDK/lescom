/* global localStorage */
import { isPlatformBrowser } from '@angular/common';
import { Inject, Injectable, PLATFORM_ID, inject, signal } from '@angular/core';
import { Router } from '@angular/router';
import { Observable, catchError, of, tap, throwError } from 'rxjs';

import { UserAuthorize } from '../api/models/user-authorize';
import { AuthentificateService } from '../api/services/authentificate.service';
import { UsersService } from '../api/services/users.service';

export interface AuthResponse {
  access_token: string;
  token_type: string;
}

export interface UserData {
  id?: number;
  roles?: number[];
}

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private authentificateService = inject(AuthentificateService);

  private usersService = inject(UsersService);

  private router = inject(Router);

  private isBrowser: boolean;

  private readonly ACCESS_TOKEN_KEY = 'access_token';

  private readonly TOKEN_TYPE_KEY = 'token_type';

  private readonly USER_ROLES_KEY = 'user_roles';

  private readonly USER_ID_KEY = 'user_id';

  constructor(@Inject(PLATFORM_ID) platformId: object) {
    this.isBrowser = isPlatformBrowser(platformId);
  }

  private isAuthenticatedSignal = signal<boolean>(this.hasValidToken());

  private userRolesSignal = signal<number[]>(this.getStoredRoles());

  get isAuthenticated() {
    return this.isAuthenticatedSignal();
  }

  get userRoles() {
    return this.userRolesSignal();
  }

  login(credentials: UserAuthorize): Observable<AuthResponse & { user_id?: number }> {
    return this.authentificateService.authorizeUserAuthSignInPost({ body: credentials }).pipe(
      tap((response: AuthResponse) => {
        this.storeTokens(response);
        this.isAuthenticatedSignal.set(true);

        // Extract user ID from token if available (JWT decode would go here)
        // For now, we'll need to get user info from a separate endpoint
        // or parse the JWT token if it contains user ID

        // Attempt to get user roles if we have user ID
        // This would require either:
        // 1. Decoding JWT to get user ID
        // 2. Having a separate endpoint to get current user info
        // 3. Including roles in the auth response

        // For now, store empty roles - they can be loaded separately
        this.storeRoles([]);
      }),
      catchError((error) => {
        this.clearAuth();
        // eslint-disable-next-line @typescript-eslint/no-unsafe-return
        return throwError(() => error);
      }),
    );
  }

  logout(): void {
    this.clearAuth();
    // eslint-disable-next-line @typescript-eslint/no-floating-promises
    this.router.navigate(['/auth']);
  }

  getAccessToken(): string | null {
    return this.isBrowser ? localStorage.getItem(this.ACCESS_TOKEN_KEY) : null;
  }

  getTokenType(): string | null {
    return this.isBrowser ? localStorage.getItem(this.TOKEN_TYPE_KEY) : null;
  }

  getAuthorizationHeader(): string | null {
    const token = this.getAccessToken();
    const tokenType = this.getTokenType();
    return token && tokenType ? `${tokenType} ${token}` : null;
  }

  hasRole(roleId: number): boolean {
    return this.userRolesSignal().includes(roleId);
  }

  hasAnyRole(roleIds: number[]): boolean {
    return roleIds.some((roleId) => this.hasRole(roleId));
  }

  hasAllRoles(roleIds: number[]): boolean {
    return roleIds.every((roleId) => this.hasRole(roleId));
  }

  getUserId(): number | null {
    if (!this.isBrowser) return null;
    const id = localStorage.getItem(this.USER_ID_KEY);
    return id ? parseInt(id, 10) : null;
  }

  loadUserProfile(userId: number): Observable<{ roles?: Array<{ id: number } | number> } | null> {
    return this.usersService.profileUserUsersIdGet({ id: userId }).pipe(
      tap((userProfile: { roles?: Array<{ id: number } | number> }) => {
        // Assuming the profile contains roles array
        if (userProfile.roles && Array.isArray(userProfile.roles)) {
          const roleIds = userProfile.roles.map((role) =>
            typeof role === 'object' && role !== null && 'id' in role ? role.id : role,
          );
          this.storeRoles(roleIds);
          this.userRolesSignal.set(roleIds);
        }
      }),
      catchError((error) => {
        console.error('Failed to load user profile:', error);
        return of(null);
      }),
    );
  }

  private storeTokens(response: AuthResponse): void {
    if (this.isBrowser) {
      localStorage.setItem(this.ACCESS_TOKEN_KEY, response.access_token);
      localStorage.setItem(this.TOKEN_TYPE_KEY, response.token_type);
    }
  }

  private storeRoles(roles: number[]): void {
    if (this.isBrowser) {
      localStorage.setItem(this.USER_ROLES_KEY, JSON.stringify(roles));
    }
    this.userRolesSignal.set(roles);
  }

  private getStoredRoles(): number[] {
    if (!this.isBrowser) return [];
    const rolesStr = localStorage.getItem(this.USER_ROLES_KEY);
    try {
      // eslint-disable-next-line @typescript-eslint/no-unsafe-return
      return rolesStr ? JSON.parse(rolesStr) : [];
    } catch {
      return [];
    }
  }

  private hasValidToken(): boolean {
    return !!this.getAccessToken() && !!this.getTokenType();
  }

  private clearAuth(): void {
    if (this.isBrowser) {
      localStorage.removeItem(this.ACCESS_TOKEN_KEY);
      localStorage.removeItem(this.TOKEN_TYPE_KEY);
      localStorage.removeItem(this.USER_ROLES_KEY);
      localStorage.removeItem(this.USER_ID_KEY);
    }
    this.isAuthenticatedSignal.set(false);
    this.userRolesSignal.set([]);
  }

  storeUserId(userId: number): void {
    if (this.isBrowser) {
      localStorage.setItem(this.USER_ID_KEY, userId.toString());
    }
  }
}
