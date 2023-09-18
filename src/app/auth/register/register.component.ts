import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { AuthService } from '../auth.service';
import { Route, Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css'],
})
export class RegisterComponent implements OnInit {
  registerForm!: FormGroup;
  loading = false;
  error = '';

  constructor(
    private formBuilder: FormBuilder, 
    private authService: AuthService, 
    private router: Router
  ) {}

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

    const email = this.registerForm.get('email')?.value;
    if (!this.isValidEmail(email)) {
      this.error = 'Please enter a valid email address.';
      alert("Please enter a valid email address.");
      this.loading = false;
      return;
    }

    const username = this.registerForm.get('username')?.value;
    const password = this.registerForm.get('password')?.value;

    this.authService.register({ username, email, password }).subscribe(
      () => {
        console.log('Registration successful');
        alert("Registration has been successful")
        this.router.navigate(['/tasks']); 
      },
      (error) => {
        console.error('Registration error:', error);
        this.error = 'Registration failed';
        alert("Please, enter valid information")
        this.loading = false;
      }
    );
  }

  private isValidEmail(email: string): boolean {
    // Basic email validation (you can implement more complex validation if needed)
    return email.includes('@');
  }

  showLoginForm() {
    this.router.navigate(['/login']);
  }
}