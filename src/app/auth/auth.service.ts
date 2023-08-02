// auth/auth.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { AuthRequest } from './auth-models/auth-request.model';
import { AuthenticationResponse } from './auth-models/auth-response.model';
import { RegisterRequest } from './auth-models/register-request.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/auth'; // Replace with your backend API URL

  constructor(private http: HttpClient) {}

  register(request: RegisterRequest): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/register`, request);
  }

  login(request: AuthRequest): Observable<AuthenticationResponse> {
    return this.http.post<AuthenticationResponse>(`${this.baseUrl}/authenticate`, request);
  }

  logout(username: string): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/logout`, { username });
  }
}