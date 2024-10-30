import { Component, inject } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { markAllAsTouched } from '../../../shared/helpers';
import { AuthService } from '../../services/auth.service';
import { SnackBarService } from '../../../shared/services/snackbar.service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    RouterLink,
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  authService = inject(AuthService);
  snackbar = inject(SnackBarService);
  router = inject(Router);

  form = new FormGroup({
    username: new FormControl('', {
      validators: [Validators.required],
    }),
    password: new FormControl('', {
      validators: [Validators.required, Validators.minLength(6)],
    }),
  });
  onLogin() {
    if (this.form.invalid) {
      markAllAsTouched(this.form);
      return;
    }
    this.authService
      .login(this.username.value!, this.password.value!)
      .subscribe((user) => {
        console.log('User logged in', user);
        this.snackbar.open({
          type: 'User logged in successfully',
          actionText: 'X',
        });
        this.router.navigate(['']);
      });
  }
  get isUsernameInvalid() {
    return (
      this.form.controls.username.touched &&
      this.form.controls.username.invalid &&
      this.form.controls.username.dirty
    );
  }
  get isPasswordInvalid() {
    return (
      this.form.controls.password.touched &&
      this.form.controls.password.invalid &&
      this.form.controls.password.dirty
    );
  }
  get username() {
    return this.form.controls.username;
  }
  get password() {
    return this.form.controls.password;
  }
}
