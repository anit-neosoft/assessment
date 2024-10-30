import { UserType } from '../../auth/models/user-type.enum';

export interface UserInput {
  name: string;
  username: string;
  email: string;
  contact: number;
  department: string;
  password: string;
  profileImage?: string | null;
  userType: string;
}
export interface User extends UserInput {
  id: number;
}
export interface UserWithToken extends User {
  token: string;
}
export interface ApplyLeave {
  leaveType: string;
  fromDate: string;
  toDate: string;
  reason: string;
  status: string;
}
