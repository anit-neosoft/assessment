import { UserWithToken } from '../../../models/user.interface';

export interface ApplyLeave {
  fromDate: string | null | undefined;
  toDate: string | null | undefined;
  reason: string | null | undefined;
  status: string;
  user: UserWithToken;
}
