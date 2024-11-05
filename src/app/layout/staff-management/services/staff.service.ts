import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { User } from '../../../shared/models/user.interface';
import { HttpClient } from '@angular/common/http';
import { SnackBarService } from '../../../shared/services/snackbar.service';

@Injectable({
  providedIn: 'root',
})
export class StaffService {
  private http = inject(HttpClient);
  private snackbar = inject(SnackBarService);

  getTeacherForCurrentHod(department: string): Observable<User[]> {
    return this.http.post<User[]>('/hod/teachers', { department }).pipe(
      catchError((error: { message: string }) =>
        throwError(() => {
          this.snackbar.open({
            type: 'There was some error while fetching the teachers',
            actionText: 'X',
          });
          return error;
        })
      )
    );
  }
  deleteTeacher(id: number) {
    return this.http.delete(`/hod/teacher/${id}`).pipe(
      catchError((error: { message: string }) =>
        throwError(() => {
          this.snackbar.open({
            type: 'There was some error while deleting the teacher',
            actionText: 'X',
          });
          return error;
        })
      )
    );
  }
}
