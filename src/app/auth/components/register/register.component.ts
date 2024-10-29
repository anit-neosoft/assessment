import { Component, inject, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { ValidatorService } from '../../services/validator.service';
import { CommonModule } from '@angular/common';
import { ActivatedRoute, Params, RouterModule } from '@angular/router';

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
    RouterModule,
  ],
  templateUrl: './register.component.html',
  styleUrl: './register.component.scss',
})
export class RegisterComponent implements OnInit {
  validator = inject(ValidatorService);
  activatedRoute = inject(ActivatedRoute);

  buttons = [
    { label: 'HOD', route: '/register?userType=HOD' },
    { label: 'Teacher', route: '/register?userType=Teacher' },
  ];

  queryParam: Params | null = null;

  form = new FormGroup({
    name: new FormGroup({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
    }),
    contact: new FormGroup({
      username: new FormControl('', [Validators.required]),
      email: new FormControl('', [Validators.required, Validators.email]),
      contactNumber: new FormControl('', [
        Validators.required,
        Validators.pattern('^[0-9]{10}$'),
      ]),
    }),
    department: new FormControl('', [Validators.required]),
    passwords: new FormGroup(
      {
        password: new FormControl('', [
          Validators.required,
          Validators.minLength(6),
        ]),
        confirmPassword: new FormControl('', [Validators.required]),
      },
      { validators: [this.validator.confirmPasswordValidator] }
    ),
    profileImage: new FormControl('', [Validators.required]),
  });
  srcResult: any;

  ngOnInit(): void {
    this.activatedRoute.queryParams.subscribe((params) => {
      console.log('Query params', params, !!this.userType);
      this.queryParam = params;
    });
  }

  onSubmit() {
    console.log(
      'Form submitted',
      // this.isConfirmPasswordInvalid,
      this.passwords.hasError('passwordsDoNotMatch')
    );

  }
  get userType() {
    return this.queryParam?.['userType'];
  }
  get name() {
    return this.form.controls.name as FormGroup;
  }

  get contact() {
    return this.form.controls.contact as FormGroup;
  }

  get passwords() {
    return this.form.controls.passwords as FormGroup;
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

  get isUsernameInvalid() {
    return (
      this.contact.controls['username'].touched &&
      this.contact.controls['username'].invalid &&
      this.contact.controls['username'].dirty
    );
  }

  get isEmailInvalid() {
    return (
      this.contact.controls['email'].touched &&
      this.contact.controls['email'].invalid &&
      this.contact.controls['email'].dirty
    );
  }

  get isContactNumberInvalid() {
    return (
      this.contact.controls['contactNumber'].touched &&
      this.contact.controls['contactNumber'].invalid &&
      this.contact.controls['contactNumber'].dirty
    );
  }

  get isDepartmentInvalid() {
    return (
      this.form.controls.department.touched &&
      this.form.controls.department.invalid &&
      this.form.controls.department.dirty
    );
  }

  get isPasswordInvalid() {
    return (
      this.passwords.controls['password'].touched &&
      this.passwords.controls['password'].invalid &&
      this.passwords.controls['password'].dirty
    );
  }

  get isConfirmPasswordInvalid() {
    return (
      this.passwords.controls['confirmPassword'].touched &&
      this.passwords.controls['confirmPassword'].dirty &&
      this.passwords.hasError('passwordsDoNotMatch')
    );
  }

  get isProfileImageInvalid() {
    return (
      this.form.controls.profileImage.touched &&
      this.form.controls.profileImage.invalid &&
      this.form.controls.profileImage.dirty
    );
  }
  onFileSelected() {
    const inputNode: any = document.querySelector('#file');

    if (typeof FileReader !== 'undefined') {
      const reader = new FileReader();

      reader.onload = (e: any) => {
        this.srcResult = e.target.result;
        this.form.controls.profileImage.setValue(this.srcResult);
      };

      reader.readAsArrayBuffer(inputNode.files[0]);
    }
  }
}
