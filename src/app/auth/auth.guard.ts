import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';
import { catchError, map, Observable, of } from 'rxjs';

@Injectable({ providedIn: 'root' })
class AuthGuard {
  authService = inject(AuthService);
  router = inject(Router);

  canActivate(): Observable<boolean> {
    if (this.authService.token()) {
      return of(true);
    }
    const refreshToken = localStorage.getItem('refresh_token');

    if (!refreshToken) {
      this.router.navigate(['/login']);
      return of(false);
    }

    return this.authService.refresh(refreshToken).pipe(
      map((response) => {
        if (response.access_token) {
          return true;
        } else {
          this.router.navigate(['/login']);
          return false;
        }
      }),
      catchError((err) => {
        console.error('Refresh token error:', err);
        this.router.navigate(['/login']);
        return of(false); // On error, navigate and return false
      })
    );
  }
}

export const canAccessPrivateRoutes: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(AuthGuard).canActivate();
};
