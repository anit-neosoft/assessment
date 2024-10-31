import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { UserService } from './services/user.service';
import { map } from 'rxjs';
import { UserType } from '../auth/models/user-type.enum';

export const TeachersGuard: CanActivateFn = (route, state) => {
  const userService = inject(UserService);
  const router = inject(Router);
  userService.getUser().subscribe((user) => {
    console.log(user);
    return false;
  });
  return true;
};
