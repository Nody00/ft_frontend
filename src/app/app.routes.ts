import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';
import { canAccessPrivateRoutes } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login').then((module) => module.Login),
  },
  {
    path: '',
    children: [
      {
        path: 'dashboard',
        component: Dashboard,
      },
    ],
    canActivate: [canAccessPrivateRoutes],
  },
];
