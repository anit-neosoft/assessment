import { Component, inject, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { UserService } from './shared/services/user.service';
import { AuthService } from './auth/services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  private authService = inject(AuthService);
  private user = inject(UserService);

  ngOnInit() {
    if (this.authService.isAuthenticated()) {
      const id = localStorage.getItem('id');
      this.user.getUserId(id!).subscribe((user) => {
        console.log('User', user);
        this.user.setUser(user);
      });
    }
  }
}
