import { inject, Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { UserType } from '../../auth/models/user-type.enum';
import { UserService } from '../services/user.service';

@Injectable({
  providedIn: 'root',
})
export class TeachersGuard implements CanActivate {
  private userService = inject(UserService);
  private router = inject(Router);

  canActivate(): boolean {
    const user = this.userService.getUser();
    if (parseInt(user.userType) === UserType.HOD) {
      return true;
    } else {
      this.router.navigate(['/dashboard']);
      return false;
    }
  }
}
