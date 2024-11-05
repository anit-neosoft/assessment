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
import { DashboardService } from './services/dashboard.service';

@Component({
  selector: 'app-dashboard',
  standalone: true,
  imports: [StatCardComponent],
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.scss',
})
export class DashboardComponent implements OnInit {
  private user = inject(UserService);
  private dashboardService = inject(DashboardService);

  statCards: { heading: string; value: number }[] = [];

  ngOnInit() {
    if (parseInt(this.userType) === UserType.HOD) {
      this.getHodStatCardData();
    } else {
      this.getStaffStatCardData();
    }
  }
  get userType() {
    return this.user.getUser().userType;
  }
  getHodStatCardData() {
    this.dashboardService
      .getHodDashboardData(this.user.getUser().id)
      .subscribe((data) => {
        this.statCards = [
          { heading: 'Total Staff Members', value: data.totalStaffMembers },
        ];
      });
  }
  getStaffStatCardData() {
    this.dashboardService
      .getTeacherDashboardData(this.user.getUser().id)
      .subscribe((data) => {
        this.statCards = [
          { heading: 'Total Leaves', value: data.totalLeaves },
          { heading: 'Total Approved', value: data.totalApprovedLeaves },
          { heading: 'Total Rejected Leaves', value: data.totalRejectedLeaves },
        ];
      });
  }
}
