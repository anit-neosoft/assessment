import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { AsyncPipe } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatIconModule } from '@angular/material/icon';
import { MatMenuModule } from '@angular/material/menu';
import { StatCardComponent } from '../../shared/components/stat-card/stat-card.component';
import { UserService } from '../../shared/services/user.service';
import { UserType } from '../../auth/models/user-type.enum';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [
    AsyncPipe,
    MatGridListModule,
    MatMenuModule,
    MatIconModule,
    MatButtonModule,
    MatCardModule,
    StatCardComponent,
  ],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent {
  private user = inject(UserService);
  hodStatCards = ['Total Staff Members'];
  staffStatCards = [
    'Total Leaves',
    'Total Approved Leaves',
    'Total Rejected Leaves',
  ];
  userType: string = UserType[parseInt(this.user.getUser().userType)];

  // ngOnInit(): void {
  //   this.user.getUser().subscribe((user) => {
  //     if (user?.userType !== undefined) {
  //       this.userType = UserType[parseInt(user.userType)];
  //     }
  //   });
  // }
}
