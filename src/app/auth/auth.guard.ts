import { inject, Injectable } from '@angular/core';
import { AuthService } from './auth.service';
import {
  ActivatedRouteSnapshot,
  CanActivateFn,
  Router,
  RouterStateSnapshot,
} from '@angular/router';

@Injectable({ providedIn: 'root' })
class AuthGuard {
  authService = inject(AuthService);
  router = inject(Router);

  canActivate() {
    if (this.authService.user()?.id) {
      return true;
    } else {
      this.router.navigate(['/login']);
      return false;
    }
  }
}

export const canAccessPrivateRoutes: CanActivateFn = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  return inject(AuthGuard).canActivate();
};
