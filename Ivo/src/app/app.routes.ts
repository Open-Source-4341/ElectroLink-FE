import { Routes } from '@angular/router';
import { ProfileViewComponent } from './pages/profile/components/profile-view/profile-view.component';
import { DashboardViewComponent } from './pages/dashboard/components/dashboard-view/dashboard-view.component';
import { ScheduleViewComponent } from './pages/schedule/components/schedule-view/schedule-view.component';
import { InventoryViewComponent } from './pages/inventory/components/inventory-view/inventory-view.component';
import { CreateScheduleComponent } from './pages/schedule/components/create-schedule/create-schedule.component';
import { EditScheduleComponent } from './pages/schedule/components/edit-schedule/edit-schedule.component';
import { CreateInventoryComponent } from './pages/inventory/components/create-inventory/create-inventory.component';
import { EditInventoryComponent } from './pages/inventory/components/edit-inventory/edit-inventory.component';

export const routes: Routes = [
  { path: 'dashboard', component: DashboardViewComponent },
  { path: 'profile', component: ProfileViewComponent },
  {path: 'schedule', component: ScheduleViewComponent},
  {path: 'inventory', component: InventoryViewComponent},
  { path: 'schedule/create', component: CreateScheduleComponent },
  {path: 'schedule/edit/:id',component: EditScheduleComponent},
  { path: 'inventory/create', component: CreateInventoryComponent },
  { path: 'inventory/edit/:id', component: EditInventoryComponent },
  { path: '', redirectTo: 'dashboard', pathMatch: 'full' },
  { path: '**', redirectTo: 'dashboard' }  // O una PageNotFound más adelante
];





