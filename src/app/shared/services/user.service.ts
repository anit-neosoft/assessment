import { inject, Injectable } from '@angular/core';
import { User, UserWithToken } from '../models/user.interface';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user = new BehaviorSubject<UserWithToken | undefined>(undefined);
  private http = inject(HttpClient);
  constructor() {
    // Load user from localStorage on initialization
    const userData = localStorage.getItem('user');
    if (userData) {
      this.user.next(JSON.parse(userData));
    }
  }

  setUser(user: UserWithToken) {
    this.user.next(user);
  }
  getUser() {
    return (this.user.value ||
      JSON.parse(localStorage.getItem('user') || 'null')) as UserWithToken;
  }
  getUserId(id: string) {
    return this.http.get<User>(`/users/${id}`);
  }
  logout() {
    this.user.next(undefined);
    localStorage.removeItem('user');
  }
}
