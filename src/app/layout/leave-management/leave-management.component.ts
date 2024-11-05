import { Component, inject, OnInit } from '@angular/core';
import { MtxGridColumn, MtxGridModule } from '@ng-matero/extensions/grid';
import { UserService } from '../../shared/services/user.service';
import { UserType } from '../../auth/models/user-type.enum';
import { LeaveService } from './services/leave.service';
import { ApplyLeave } from '../../shared/components/apply-leave/models/apply-leave';

@Component({
  selector: 'app-leave-management',
  standalone: true,
  imports: [MtxGridModule],
  templateUrl: './leave-management.component.html',
  styleUrl: './leave-management.component.scss',
})
export class LeaveManagementComponent implements OnInit {
  private user = inject(UserService);
  private leaveManagement = inject(LeaveService);

  data: ApplyLeave[] = [];
  columns: MtxGridColumn<ApplyLeave>[] = [
    { header: 'Sr.No.', field: 'srNo' },
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
    { header: 'From Date', field: 'fromDate' },
    { header: 'To Date', field: 'toDate' },
    { header: 'Reason', field: 'reason' },
    {
      header: 'Status',
      field: 'status',
      hide: this.userType === UserType.HOD,
      formatter: (data) =>
        data.status === 0
          ? 'Pending'
          : data.status === 1
          ? 'Approved'
          : 'Rejected',
    },
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
                this.approveLeave(record.leaveId!);
              },
            },
            {
              type: 'icon',
              text: 'Reject',
              icon: 'close',
              tooltip: 'Reject',
              click: (record) => {
                this.rejectLeave(record.leaveId!);
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
              icon: 'visibility',
              tooltip: 'View',
              click: (record) => {
                this.viewLeave(record);
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
  get userDepartment() {
    return this.user.getUser().department;
  }
  getTableDetailsForHod() {
    this.leaveManagement
      .getLeaveManagementDetailForHod(this.userDepartment)
      .subscribe((data) => {
        this.data = data;
        console.log(data);
      });
  }
  approveLeave(leaveId: number) {
    this.leaveManagement.approveLeave(leaveId).subscribe((data) => {
      console.log(data);
      this.getTableDetailsForHod();
    });
  }
  rejectLeave(leaveId: number) {
    this.leaveManagement.rejectLeave(leaveId).subscribe((data) => {
      console.log(data);
      this.getTableDetailsForHod();
    });
  }
  getTableDetailsForTeacher() {
    this.leaveManagement
      .getLeaveManagementDetailForTeacher(this.user.getUser().id)
      .subscribe((data) => {
        this.data = data;
        console.log(data);
      });
  }
  ngOnInit(): void {
    if (this.userType === UserType.HOD) {
      this.getTableDetailsForHod();
      return;
    }
    this.getTableDetailsForTeacher();
  }
  viewLeave(leaves: ApplyLeave) {
    console.log('View Leave', leaves);
  }
}
