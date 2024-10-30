import { Injectable, TemplateRef, ComponentRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface SnackBarConfig {
  type: string;
  actionText?: string;
}

@Injectable({
  providedIn: 'root',
})
export class SnackBarService {
  constructor(private _snackBar: MatSnackBar) {}

  open(config: SnackBarConfig) {
    if (typeof config.type == 'string') {
      this._snackBar.open(<string>config.type, config.actionText || 'OKAY!', {
        duration: 5000,
      });
    }
  }
}
