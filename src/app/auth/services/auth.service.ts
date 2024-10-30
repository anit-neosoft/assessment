import { HttpClient, HttpErrorResponse } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, tap, throwError } from 'rxjs';
import { UserType } from '../models/user-type.enum';
import {
  User,
  UserInput,
  UserWithToken,
} from '../../shared/models/user.interface';
import { SnackBarService } from '../../shared/services/snackbar.service';
import { UserService } from '../../shared/services/user.service';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private snackbar = inject(SnackBarService);
  private user = inject(UserService);

  isAuthenticated(): boolean {
    // Check if a token exists in local storage (or implement your logic)
    const token = localStorage.getItem('authToken');
    return !!token; // Return true if token exists, false otherwise
  }
  register(user: UserInput): Observable<{ message: string }> {
    return this.http.post<{ message: string }>('/users/register', user).pipe(
      catchError((error: { message: string }) =>
        throwError(() => {
          this.snackbar.open({
            type: 'There was some error while registering the user',
            actionText: 'X',
          });
          return error;
        })
      )
    );
  }
  login(username: string, password: string): Observable<User> {
    return this.http
      .post<UserWithToken>('/users/authenticate', { username, password })
      .pipe(
        tap((user: UserWithToken) => {
          localStorage.setItem('authToken', user.token);
          localStorage.setItem('id', user.id.toString());
          this.user.setUser(user);
        }),
        catchError((error: HttpErrorResponse) =>
          throwError(() => {
            this.snackbar.open({
              type: 'There was some error while logging in',
              actionText: 'X',
            });
            return error;
          })
        )
      );
  }

  logout(): void {
    localStorage.removeItem('authToken'); // Remove the token to log out
  }
}
