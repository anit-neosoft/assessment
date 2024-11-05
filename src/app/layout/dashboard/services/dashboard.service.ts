import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { catchError, throwError } from 'rxjs';
import { SnackBarService } from '../../../shared/services/snackbar.service';
import {
  HodStatCardData,
  StaffStatCardData,
} from '../models/dashboard-data.model';

@Injectable({
  providedIn: 'root',
})
export class DashboardService {
  private http = inject(HttpClient);
  private snackbar = inject(SnackBarService);

  getHodDashboardData(id: number) {
    return this.http.post<HodStatCardData>('/hod/dashboard', { id }).pipe(
      catchError((error: { message: string }) =>
        throwError(() => {
          this.snackbar.open({
            type: 'There was some error while fetching data',
            actionText: 'X',
          });
          return error;
        })
      )
    );
  }
  getTeacherDashboardData(id: number) {
    return this.http.post<StaffStatCardData>('/teacher/dashboard', { id }).pipe(
      catchError((error: { message: string }) =>
        throwError(() => {
          this.snackbar.open({
            type: 'There was some error while fetching data',
            actionText: 'X',
          });
          return error;
        })
      )
    );
  }
}
