import { Component, inject } from '@angular/core';
import { MtxGridColumn, MtxGridModule } from '@ng-matero/extensions/grid';
import { UserType } from '../../auth/models/user-type.enum';
import { UserService } from '../../shared/services/user.service';

@Component({
  selector: 'app-staff-management',
  standalone: true,
  imports: [MtxGridModule],
  templateUrl: './staff-management.component.html',
  styleUrl: './staff-management.component.scss',
})
export class StaffManagementComponent {
  private user = inject(UserService);
  columns: MtxGridColumn[] = [
    { header: 'Sr.No.', field: 'sr-no', showExpand: true },
    {
      header: 'Employee Name',
      field: 'name',
      hide: this.userType === UserType.Teacher,
    },
    {
      header: 'Email',
      field: 'email',
      hide: this.userType === UserType.Teacher,
    },
    { header: 'From Date', field: 'from' },
    { header: 'To Date', field: 'to-date' },
    { header: 'Reason', field: 'reason' },
    { header: 'Status', field: 'status', hide: this.userType === UserType.HOD },
    {
      header: 'Action',
      field: 'action',
      type: 'button',
      buttons: [
        {
          type: 'icon',
          text: 'View',
          icon: 'view',
          tooltip: 'View',
          click: (record) => {
            console.log('View', record);
          },
        },
      ],
      hide: this.userType === UserType.HOD,
    },
  ];
  get userType() {
    return parseInt(this.user.getUser().userType);
  }
}
