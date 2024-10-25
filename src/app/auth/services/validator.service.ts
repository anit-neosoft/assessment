import { Injectable } from '@angular/core';
import {
  AbstractControl,
  FormGroup,
  ValidationErrors,
  ValidatorFn,
} from '@angular/forms';

@Injectable({
  providedIn: 'root',
})
export class ValidatorService {
  constructor() {}
  confirmPasswordValidator(): ValidatorFn {
    return (control: AbstractControl): ValidationErrors | null => {
      const group = control as FormGroup;
      const password = group.value.password;
      const confirmPassword = group.value.confirmPassword;
      console.log(password, confirmPassword);
      if (!password || !confirmPassword) {
        return null;
      }
      let abc = password === confirmPassword;
      console.log('===>', abc);
      return password === confirmPassword
        ? null
        : { passwordsDoNotMatch: true };
    };
  }
}
