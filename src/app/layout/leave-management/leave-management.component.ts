import { Component, inject } from '@angular/core';
import { MtxGridColumn, MtxGridModule } from '@ng-matero/extensions/grid';
import { UserService } from '../../shared/services/user.service';
import { UserType } from '../../auth/models/user-type.enum';

@Component({
  selector: 'app-leave-management',
  standalone: true,
  imports: [MtxGridModule],
  templateUrl: './leave-management.component.html',
  styleUrl: './leave-management.component.scss',
})
export class LeaveManagementComponent {
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
    { header: 'From Date', field: 'from-date' },
    { header: 'To Date', field: 'to-date' },
    { header: 'Reason', field: 'reason' },
    { header: 'Status', field: 'status', hide: this.userType === UserType.HOD },
    this.isUserTypeHod
      ? {
          header: 'Action',
          field: 'action',
          type: 'button',
          buttons: [
            {
              type: 'icon',
              text: 'Approve',
              icon: 'check',
              tooltip: 'Approve',
              click: (record) => {
                console.log('Approve', record);
              },
            },
            {
              type: 'icon',
              text: 'Reject',
              icon: 'close',
              tooltip: 'Reject',
              click: (record) => {
                console.log('Reject', record);
              },
            },
          ],
        }
      : {
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
        },
  ];
  get userType() {
    return parseInt(this.user.getUser().userType);
  }
  get isUserTypeHod() {
    return this.userType === UserType.HOD;
  }
}
