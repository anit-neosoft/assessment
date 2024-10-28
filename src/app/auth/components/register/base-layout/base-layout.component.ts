import { Component } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-base-layout',
  standalone: true,
  imports: [RouterOutlet, MatCardModule],
  templateUrl: './base-layout.component.html',
  styleUrl: './base-layout.component.scss',
})
export class BaseLayoutComponent {
  buttons = [
    { label: 'HOD', route: '/register?userType=HOD' },
    { label: 'Teacher', route: '/register?userType=Teacher' },
  ];
}
