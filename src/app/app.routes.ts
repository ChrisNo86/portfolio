import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    loadComponent: () => import('./features/home/home-page').then((m) => m.HomePage),
  },
  {
    path: 'legal-notice',
    loadComponent: () =>
      import('./features/legal/legal-notice-page').then((m) => m.LegalNoticePage),
  },
  {
    path: 'privacy-policy',
    loadComponent: () =>
      import('./features/legal/privacy-policy-page').then((m) => m.PrivacyPolicyPage),
  },
  { path: '**', redirectTo: '' },
];
