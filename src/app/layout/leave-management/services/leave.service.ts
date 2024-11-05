import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, Observable, throwError } from 'rxjs';
import { SnackBarService } from '../../../shared/services/snackbar.service';
import { ApplyLeave } from '../../../shared/components/apply-leave/models/apply-leave';

@Injectable({
  providedIn: 'root',
})
export class LeaveService {
  private http = inject(HttpClient);
  private snackbar = inject(SnackBarService);

  getLeaveManagementDetailForHod(department: string): Observable<ApplyLeave[]> {
    return this.http
      .post<ApplyLeave[]>('/leave-management/hod', { department })
      .pipe(
        catchError((error: { message: string }) =>
          throwError(() => {
            this.snackbar.open({
              type: 'There was some error while fetching the details of leave management',
              actionText: 'X',
            });
            return error;
          })
        )
      );
  }
  approveLeave(id: number): Observable<{ message: string }> {
    return this.http
      .post<{ message: string }>('/leave-management/approve', { id })
      .pipe(
        catchError((error: { message: string }) =>
          throwError(() => {
            this.snackbar.open({
              type: 'There was some error while approving the leave',
              actionText: 'X',
            });
            return error;
          })
        )
      );
  }
  rejectLeave(id: number): Observable<{ message: string }> {
    return this.http
      .post<{ message: string }>('/leave-management/reject', { id })
      .pipe(
        catchError((error: { message: string }) =>
          throwError(() => {
            this.snackbar.open({
              type: 'There was some error while rejecting the leave',
              actionText: 'X',
            });
            return error;
          })
        )
      );
  }
  getLeaveManagementDetailForTeacher(id: number): Observable<ApplyLeave[]> {
    return this.http
      .post<ApplyLeave[]>('/leave-management/teacher', { id })
      .pipe(
        catchError((error: { message: string }) =>
          throwError(() => {
            this.snackbar.open({
              type: 'There was some error while fetching the details of leave management',
              actionText: 'X',
            });
            return error;
          })
        )
      );
  }
}
