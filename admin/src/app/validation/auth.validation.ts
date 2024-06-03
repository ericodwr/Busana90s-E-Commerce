import { inject } from '@angular/core';
import { Route, Router, UrlSegment } from '@angular/router';
import { AuthService } from '../services/auth.service';

export const authValidation = (route: Route, segments: UrlSegment[]) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const profile = auth.getProfile();

  if (profile) {
    router.navigateByUrl('/dashboard');
  }

  return true;
};

export const authNonLoginValidation = (
  route: Route,
  segments: UrlSegment[]
) => {
  const auth = inject(AuthService);
  const router = inject(Router);
  const profile = auth.getProfile();

  if (!profile) {
    router.navigateByUrl('/login');
  }
  return true;
};
