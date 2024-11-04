import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
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
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatSelectModule } from '@angular/material/select';
import { markAllAsTouched } from '../../helpers';
import { provideNativeDateAdapter } from '@angular/material/core';
import { ApplyLeaveService } from './services/apply-leave.service';
import { UserService } from '../../services/user.service';
import { SnackBarService } from '../../services/snackbar.service';
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogRef,
  MatDialogTitle,
} from '@angular/material/dialog';
import { LeaveStatus } from './models/apply-leave';

@Component({
  selector: 'app-apply-leave',
  standalone: true,
  imports: [
    MatCardModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    MatButtonModule,
    CommonModule,
    MatDatepickerModule,
    MatDialogActions,
    MatDialogClose,
    MatDialogContent,
    MatDialogTitle,
  ],
  providers: [provideNativeDateAdapter()],
  templateUrl: './apply-leave.component.html',
  styleUrl: './apply-leave.component.scss',
})
export class ApplyLeaveComponent {
  private applyLeave = inject(ApplyLeaveService);
  private user = inject(UserService);
  private snackbar = inject(SnackBarService);
  private dialogRef = inject(MatDialogRef<ApplyLeaveComponent>);

  leaveForm = new FormGroup({
    fromDate: new FormControl('', [Validators.required]),
    toDate: new FormControl('', [Validators.required]),
    reason: new FormControl('', [Validators.required]),
  });

  onSubmit() {
    if (this.leaveForm.invalid) {
      markAllAsTouched(this.leaveForm);
      return;
    }
    this.applyLeave.applyLeave(this.createLeaveObject()).subscribe(() => {
      this.snackbar.open({
        type: 'Leave applied successfully',
        actionText: 'X',
      });
      this.dialogRef.close();
    });
    console.log(this.leaveForm.value);
  }
  createLeaveObject() {
    return {
      fromDate: this.leaveForm.controls.fromDate.value || '',
      toDate: this.leaveForm.controls.toDate.value || '',
      reason: this.leaveForm.controls.reason.value || '',
      status: LeaveStatus.Pending,
      userId: this.user.getUser().id,
      department: this.user.getUser().department,
    };
  }
  onCancelClick() {
    this.dialogRef.close();
  }
}
