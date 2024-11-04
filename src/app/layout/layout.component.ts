import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { RouterLink, RouterOutlet } from '@angular/router';
import { Observable, map, shareReplay } from 'rxjs';
import { UserService } from '../shared/services/user.service';
import { UserType } from '../auth/models/user-type.enum';
import { MatDialog, MatDialogModule } from '@angular/material/dialog';
import { ApplyLeaveComponent } from '../shared/components/apply-leave/apply-leave.component';
import { RegisterComponent } from '../auth/components/register/register.component';

@Component({
  selector: 'app-layout',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    AsyncPipe,
    RouterOutlet,
    RouterLink,
    MatDialogModule,
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent {
  private breakpointObserver = inject(BreakpointObserver);
  private user = inject(UserService);
  readonly dialog = inject(MatDialog);

  firstName: string = this.user.getUser().firstName;
  userType: UserType = parseInt(this.user.getUser().userType);
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  sideBarLinks = [
    { name: 'Dashboard', route: '/dashboard' },
    { name: 'Leave Management', route: '/leave-management' },
  ];
  ngOnInit(): void {
    console.log(this.userType);
    if (this.userType === UserType.HOD) {
      this.sideBarLinks.splice(1, 0, {
        name: 'Staff Management',
        route: '/staff-management',
      });
    }
  }
  get isUserHOD(): boolean {
    return this.userType === UserType.HOD;
  }
  openDialog() {
    this.dialog.open(
      this.isUserHOD ? (RegisterComponent as any) : ApplyLeaveComponent,
      {
        data: {
          fromDialog: true,
          userType: 'Teacher',
          department: this.user.getUser().department,
        },
      }
    );
  }
}
