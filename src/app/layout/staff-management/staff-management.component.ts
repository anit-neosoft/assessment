import { Component, inject, OnInit } from '@angular/core';
import { MtxGridColumn, MtxGridModule } from '@ng-matero/extensions/grid';
import { UserType } from '../../auth/models/user-type.enum';
import { UserService } from '../../shared/services/user.service';
import { StaffService } from './services/staff.service';

@Component({
  selector: 'app-staff-management',
  standalone: true,
  imports: [MtxGridModule],
  templateUrl: './staff-management.component.html',
  styleUrl: './staff-management.component.scss',
})
export class StaffManagementComponent implements OnInit {
  private user = inject(UserService);
  private staffService = inject(StaffService);
  columns: MtxGridColumn[] = [
    { header: 'Sr.No.', field: 'srNo' },
    {
      header: 'Employee Name',
      field: 'name',
    },
    {
      header: 'Username',
      field: 'username',
    },
    { header: 'Email', field: 'email' },
    { header: 'Mobile', field: 'mobile' },
    {
      header: 'Action',
      field: 'action',
      type: 'button',
      buttons: [
        {
          type: 'icon',
          text: 'View',
          icon: 'visibility',
          tooltip: 'View',
          click: (record) => {
            console.log('View', record);
          },
        },
        {
          type: 'icon',
          text: 'Delete',
          icon: 'delete',
          tooltip: 'Delete',
          click: (record) => {
            console.log('Delete', record);
          },
        },
      ],
    },
  ];
  data: any;

  ngOnInit() {
    this.getTableDetailsForHod();
  }

  get userType() {
    return parseInt(this.user.getUser().userType);
  }

  getTableDetailsForHod() {
    this.staffService
      .getTeacherForCurrentHod(this.user.getUser().department)
      .subscribe((res) => {
        this.data = res;
        console.log('Response', res);
      });
  }
}
