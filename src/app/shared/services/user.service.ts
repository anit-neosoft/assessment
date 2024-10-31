import { inject, Injectable } from '@angular/core';
import { User } from '../models/user.interface';
import { HttpClient } from '@angular/common/http';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private user = new BehaviorSubject<User | undefined>(undefined);
  private http = inject(HttpClient);

  setUser(user: User) {
    this.user.next(user);
  }
  getUser() {
    return this.user.asObservable();
  }
  getUserId(id: string) {
    return this.http.get<User>(`/users/${id}`);
  }
}
