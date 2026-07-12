import { isPlatformBrowser } from '@angular/common';
import { inject, PLATFORM_ID } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { AuthService } from '../../auth/services/auth.service';

export const userGuard: CanActivateFn = (route, state) => {
  let authService: AuthService = inject(AuthService);
  const router = inject(Router);

  if (authService.user() == null) {
    return true;
  }

  router.navigate(['/projects'])
  return false;

};
