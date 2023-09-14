import { Injectable } from '@angular/core';
import { CanActivate, Router } from '@angular/router';
import { AuthService } from './auth.service';

@Injectable({
  providedIn: 'root',
})
export class LoginGuard implements CanActivate {
  constructor(private authService: AuthService, private router: Router) {}

  canActivate(): boolean {
    if (this.authService.isAuthenticated()) {
      // If the user is authenticated, redirect to another page (e.g., tasks)
      this.router.navigate(['/tasks']);
      return false;
    }
    // Allow access to the login page for unauthenticated users
    return true;
  }
}
