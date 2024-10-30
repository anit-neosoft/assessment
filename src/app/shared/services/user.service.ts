import { inject, Injectable } from '@angular/core';
import { User, UserWithToken } from '../models/user.interface';
import { HttpClient } from '@angular/common/http';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user: User | undefined;
  private http = inject(HttpClient);

  setUser(user: User) {
    this.user = user;
  }

  getUser() {
    return this.user;
  }
  getUserId(id: string) {
    return this.http.get<User>(`/users/${id}`);
  }
}
