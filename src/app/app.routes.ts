import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: 'technician-search',
    loadComponent: () =>
      import('./pages/dashboard/components/technician-search/technician-search.component')
        .then(m => m.TechnicianSearchComponent)
  },
  {
    path: 'technician/:id',
    loadComponent: () =>
      import('./pages/dashboard/components/technician-detail/technician-detail.component')
        .then(m => m.TechnicianDetailComponent)
  },
  {
    path: 'registro-tecnico',
    loadComponent: () =>
      import('./pages/dashboard/components/register-technician/register-technician.component')
        .then(m => m.RegisterTechnicianComponent)
  },

  { path: '', redirectTo: 'technician-search', pathMatch: 'full' },
  { path: '**', redirectTo: 'technician-search' }
];

