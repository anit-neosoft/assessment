import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private http: HttpClient) {}

  isAuthenticated(): boolean {
    // Check if a token exists in local storage (or implement your logic)
    const token = localStorage.getItem('authToken');
    return !!token; // Return true if token exists, false otherwise
  }

  // Implement login, logout, and token management
  // login({email,password}:{email:string; password:string}): void {
  //   // Do api call to /login and get the token
  //   if()
  //   localStorage.setItem('authToken', token); // Store the token
  // }
  register(): void {
    // Do api call to /register to register a new user
    this.http
      .post('http://localhost:3000/register', {
        name: 'Anit Singh',
        username: 'anitsingh367',
        email: 'anit.neosoftmail.com',
        contactNumber: '1234567890',
        department: 0,
        password: 'anitsingh',
        profileImage:
          'https://cloudflare-ipfs.com/ipfs/Qmd3W5DuhgHirLHGVixi6V76LhCkZUz6pnFt5AJBiyvHye/avatar/855.jpg',
      })
      .subscribe((data) => {
        console.log(data);
      });
  }

  logout(): void {
    localStorage.removeItem('authToken'); // Remove the token to log out
  }
  getAllUsers(): void {
    // Do api call to /users to get all users
  }
  getUserById(id: string): void {
    // Do api call to /users/:id to get user by id
  }
}
