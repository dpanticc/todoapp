import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  loading = false;
  error = '';

  constructor(private formBuilder: FormBuilder, private authService: AuthService, private router: Router) {}

  ngOnInit() {
    this.registerForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required],
    });
  }

  get f() {
    return this.registerForm.controls;
  }

  onRegisterSubmit() {
    this.error = '';
    this.loading = true;

    if (this.registerForm.invalid) {
      this.loading = false;
      return;
    }

    const username = this.registerForm.get('username')?.value;
    const email = this.registerForm.get('email')?.value;
    const password = this.registerForm.get('password')?.value;

    this.authService.register({ username, email, password }).subscribe(
      () => {
        console.log('Registration successful');
        // Handle successful registration, e.g., show success message or navigate to login page
        this.router.navigate(['/login']); // Navigate to the login page after successful registration
      },
      (error) => {
        console.error('Registration error:', error);
        this.error = 'Registration failed';
        this.loading = false;
      }
    );
  }

  showLoginForm() {
    // Implement logic to navigate to the login page
    this.router.navigate(['/login']);
  }
}