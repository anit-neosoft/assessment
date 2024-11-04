import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { UserService } from '../../../services/user.service';
import { catchError, throwError } from 'rxjs';
import { SnackBarService } from '../../../services/snackbar.service';
import { ApplyLeave } from '../models/apply-leave';
@Injectable({
  providedIn: 'root',
})
export class ApplyLeaveService {
  private http = inject(HttpClient);
  private user = inject(UserService);
  private snackbar = inject(SnackBarService);
  applyLeave(leave: ApplyLeave) {
    return this.http.post<{ message: string }>('/apply-leave', leave).pipe(
      catchError((error: { message: string }) =>
        throwError(() => {
          this.snackbar.open({
            type: 'There was some error while applying the leave',
            actionText: 'X',
          });
          return error;
        })
      )
    );
  }
}
