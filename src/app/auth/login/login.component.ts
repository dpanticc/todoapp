import { Component, OnInit, ViewEncapsulation } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router'; // Import the Router

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css'],
  encapsulation: ViewEncapsulation.None,
})
export class LoginComponent implements OnInit {
  loginForm!: FormGroup;
  loading = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder,
    private authService: AuthService,
    private router: Router
  ) {}

  ngOnInit() {
    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required],
    });
  }

  onLoginSubmit() {
    this.error = '';

    if (this.loginForm.invalid) {
      return;
    }

    const username = this.loginForm.get('username')?.value;
    const password = this.loginForm.get('password')?.value;

    this.authService.login({ username, password }).subscribe(
      () => {
        console.log('Login successful');
        // Handle successful login, e.g., redirect to the task manager page
      },
      (error) => {
        console.error('Login error:', error);
        this.error = 'Invalid credentials';
      }
    );
  }

  showRegisterForm() {
    // Implement logic to navigate to the register page
    this.router.navigate(['/register']);
  }
}