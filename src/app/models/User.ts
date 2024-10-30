import { UserType } from '../auth/models/UserType.enum';

export interface UserInput {
  name: string;
  username: string;
  email: string;
  contact: number;
  department: string;
  password: string;
  profileImage?: string;
  userType: UserType;
}
export interface User extends UserInput {
  id: number;
}
export interface ApplyLeave {
  leaveType: string;
  fromDate: string;
  toDate: string;
  reason: string;
  status: string;
}
