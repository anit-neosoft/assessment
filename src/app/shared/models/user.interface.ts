export interface UserInput {
  firstName: string;
  lastName: string;
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
