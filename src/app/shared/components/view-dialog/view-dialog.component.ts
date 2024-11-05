import { Component, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import {
  MatDialogRef,
  MAT_DIALOG_DATA,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogTitle,
} from '@angular/material/dialog';

@Component({
  selector: 'app-view-dialog',
  standalone: true,
  imports: [
    MatButtonModule,
    MatDialogTitle,
    MatDialogContent,
    MatDialogActions,
    MatDialogClose,
  ],
  templateUrl: './view-dialog.component.html',
  styleUrl: './view-dialog.component.scss',
})
export class ViewDialogComponent {
  readonly dialogRef = inject(MatDialogRef<ViewDialogComponent>);
  readonly data = inject(MAT_DIALOG_DATA);

  dataKey = Object.keys(this.data);
}
