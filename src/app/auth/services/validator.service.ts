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
  confirmPasswordValidator(control: AbstractControl): ValidationErrors | null {
    const matched: boolean =
      control.get('password')?.value === control.get('confirmPassword')?.value;
    if (matched) {
      return null;
    } else {
      control.get('confirmPassword')?.setErrors({ passwordsDoNotMatch: true });
    }
    return matched ? null : { passwordsDoNotMatch: true };
  }
}
