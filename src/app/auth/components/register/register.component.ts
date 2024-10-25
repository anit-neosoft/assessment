import { Component, inject, OnInit } from '@angular/core';
import {
  AbstractControl,
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  ValidationErrors,
  ValidatorFn,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ValidatorService } from '../../services/validator.service';
import { CommonModule, NgIf } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    CommonModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  constructor(private validator: ValidatorService) {}
  form!: FormGroup;
  ngOnInit(): void {
    this.form = new FormGroup({
      name: new FormGroup({
        firstName: new FormControl('', {
          validators: [Validators.required],
        }),
        lastName: new FormControl('', {
          validators: [Validators.required],
        }),
      }),
      designation: new FormControl<'teacher' | 'hod'>('teacher', {
        validators: [Validators.required],
      }),
      email: new FormControl('', {
        validators: [Validators.required, Validators.email],
      }),
      passwords: new FormGroup(
        {
          password: new FormControl('', {
            validators: [Validators.required, Validators.minLength(6)],
          }),
          confirmPassword: new FormControl('', {
            validators: [Validators.required],
            updateOn: 'blur',
          }),
        },
        { validators: [this.validator.confirmPasswordValidator] }
      ),
    });
  }
  // validator:any
  // private validator = inject(ValidatorService);

  onSubmit() {
    console.log(
      'Form submitted',
      // this.isConfirmPasswordInvalid,
      this.passwords.hasError('passwordsDoNotMatch')
    );
  }
  get passwords() {
    return this.form.controls['passwords'] as FormGroup;
  }
  get name() {
    return this.form.controls['name'] as FormGroup;
  }
  get isEmailInvalid() {
    return (
      this.form.controls['email'].touched &&
      this.form.controls['email'].invalid &&
      this.form.controls['email'].dirty
    );
  }
  get isPasswordInvalid() {
    return (
      this.passwords.controls['password'].touched &&
      this.passwords.controls['password'].invalid &&
      this.passwords.controls['password'].dirty
    );
  }
  get isFirstNameInvalid() {
    return (
      this.name.controls['firstName'].touched &&
      this.name.controls['firstName'].invalid &&
      this.name.controls['firstName'].dirty
    );
  }
  get isLastNameInvalid() {
    return (
      this.name.controls['lastName'].touched &&
      this.name.controls['lastName'].invalid &&
      this.name.controls['lastName'].dirty
    );
  }
  get isConfirmPasswordInvalid() {
    return (
      this.passwords.controls['confirmPassword'].touched &&
      this.passwords.controls['confirmPassword'].dirty &&
      this.passwords.hasError('passwordsDoNotMatch')
    );
  }
}
