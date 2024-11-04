export interface ApplyLeave {
  fromDate: string;
  toDate: string;
  reason: string;
  status: LeaveStatus;
  leaveId?: number;
  userId: number;
  department: string;
}
export enum LeaveStatus {
  Approved = 0,
  Rejected,
  Pending,
}
