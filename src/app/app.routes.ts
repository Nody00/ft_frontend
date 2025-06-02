import { Routes } from '@angular/router';
import { Dashboard } from './dashboard/dashboard';

export const routes: Routes = [
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login').then((module) => module.Login),
  },
  {
    path: 'dashboard',
    component: Dashboard,
  },
];
