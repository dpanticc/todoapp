import { Component } from '@angular/core';
import { AuthService } from '../auth/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  templateUrl: './navbar.component.html',
  styleUrls: ['./navbar.component.css']
})


export class NavbarComponent {

  loggedInUsername: string | null = null;


  constructor(private authService: AuthService, private router: Router) {}

  ngOnInit() {
  }
  
  logout() {
    const loggedInUser = this.authService.getCurrentLoggedInUser();
    
    if (loggedInUser !== null) {
      this.authService.logout(loggedInUser).subscribe(() => {
        // You can also clear the loggedInUser here if needed
      });
    } else {
      console.warn('User is not authenticated. Cannot log out.');
    }
  }

  isTasksPage(): boolean {
    return this.router.url === '/tasks';
  }

}
