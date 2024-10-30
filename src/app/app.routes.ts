import { Routes } from '@angular/router';
import { LoginComponent } from './auth/components/login/login.component';
import { RegisterComponent } from './auth/components/register/register.component';
import { LayoutComponent } from './layout/layout.component';
import { DashboardComponent } from './layout/dashboard/dashboard.component';
import { LeaveManagementComponent } from './layout/leave-management/leave-management.component';
import { StaffManagementComponent } from './layout/staff-management/staff-management.component';
import { AuthGuard } from './auth/guards/auth.guard';

export const routes: Routes = [
  // {
  //   path: '',
  //   redirectTo: '/login',
  //   pathMatch: 'full',
  // },
  {
    path: 'login',
    component: LoginComponent,
  },
  {
    path: 'register',
    component: RegisterComponent,
  },
  {
    path: '',
    component: LayoutComponent,
    canActivate: [AuthGuard],
    children: [
      {
        path: '',
        component: DashboardComponent,
      },
      {
        path: 'staff-management',
        component: StaffManagementComponent,
      },
      {
        path: 'leave-management',
        component: LeaveManagementComponent,
      },
    ],
  },
];
