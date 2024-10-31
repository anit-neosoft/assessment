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
  ],
  templateUrl: './layout.component.html',
  styleUrl: './layout.component.scss',
})
export class LayoutComponent implements OnInit {
  private breakpointObserver = inject(BreakpointObserver);
  private user = inject(UserService);

  userName$: Observable<string> = this.user
    .getUser()
    .pipe(map((user) => user?.name || ''));
  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );
  userType!: string;
  sideBarLinks = [
    { name: 'Dashboard', route: '/dashboard' },
    { name: 'Leave Management', route: '/leave-management' },
  ];
  ngOnInit(): void {
    this.user.getUser().subscribe((user) => {
      if (user?.userType !== undefined) {
        this.userType = UserType[parseInt(user.userType)];
        if (this.userType === 'HOD') {
          this.sideBarLinks.splice(1, 0, {
            name: 'Staff Management',
            route: '/staff-management',
          });
        }
      }
    });
  }
}
