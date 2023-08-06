import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable } from 'rxjs';
import { AuthRequest } from './auth-models/auth-request.model';
import { AuthenticationResponse } from './auth-models/auth-response.model';
import { RegisterRequest } from './auth-models/register-request.model';
import { tap, map, catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../task.model';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private baseUrl = 'http://localhost:8080/api/auth'; 
  private authTokenKey = 'access_token';
  private refreshTokenKey = 'refresh_token';
  private jwtHelper: JwtHelperService;
  public isRefreshing = false;
  private maxRefreshRetries = 3; // Set a reasonable maximum number of retries
  
  constructor(private http: HttpClient) {
    this.jwtHelper = new JwtHelperService();
  }

  register(request: RegisterRequest): Observable<void> {
    return this.http.post<void>(`${this.baseUrl}/register`, request);
  }

  login(request: AuthRequest): Observable<string> {
    return this.http.post<AuthenticationResponse>(`${this.baseUrl}/authenticate`, request).pipe(
      tap((response: AuthenticationResponse) => {
        this.setAuthToken(response.access_token); 
        this.setRefreshToken(response.refresh_token);
      }),
      map((response: AuthenticationResponse) => response.access_token)
    );
  }

  getCurrentUser(): Observable<User> {
    const authToken = this.getAuthToken();
      
    if (!authToken) {
      // No token, so return an empty observable or throw an error
      return throwError('No JWT token available.');
    }
  
    const decodedToken = this.jwtHelper.decodeToken(authToken);
  
    if (!decodedToken || !decodedToken.sub) {
      // Decoded token or user ID not available, so return an empty observable or throw an error
      return throwError('Invalid JWT token or user ID.');
    }
  
    const userId = decodedToken.sub;
  
    // Replace 'getUser' with the actual API endpoint to fetch user details
    return this.http.get<User>(`${this.baseUrl}/getUser`).pipe(
      catchError((error) => {
        // Handle errors if the user API endpoint request fails
        return throwError('Failed to fetch user details.');
      })
    );
  }
  refreshToken(attempt: number = 1): Observable<string> {
    const refreshToken = this.getRefreshToken();
    if (!refreshToken) {
      this.logoutUser(); // Logout the user if refresh token is not available
      return throwError('Refresh token not available.');
    }
  
    if (attempt > this.maxRefreshRetries) {
      this.logoutUser(); // Logout the user if max refresh retries exceeded
      return throwError('Max refresh retries exceeded');
    }
  
    return this.http.post<AuthenticationResponse>(`${this.baseUrl}/refresh-token`, { refreshToken }).pipe(
      tap((response: AuthenticationResponse) => {
        this.setAuthToken(response.access_token);
      }),
      map((response: AuthenticationResponse) => response.access_token),
      catchError((error) => {
        // Handle refresh token expiration or other errors
        // Retry the refreshToken, incrementing the attempt counter
        return this.refreshToken(attempt + 1).pipe(
          catchError((refreshError) => {
            // If refreshing fails, logout the user and throw the error
            this.logoutUser();
            return throwError(refreshError);
          })
        );
      })
    );
  }

  setAuthToken(token: string): void {
    console.log('Token set in local storage:', token);
    localStorage.setItem(this.authTokenKey, token);
  }

  getAuthToken(): string | null {
    const token = localStorage.getItem(this.authTokenKey);

    if (token && this.jwtHelper.isTokenExpired(token)) {
      // If token is expired, remove it from local storage
      this.removeTokens();
      return null;
    }

    console.log('Token retrieved from local storage:', token);
    return token;
  }

  setRefreshToken(refreshToken: string): void {
    localStorage.setItem(this.refreshTokenKey, refreshToken);
  }

  getRefreshToken(): string | null {
    return localStorage.getItem(this.refreshTokenKey);
  }

  removeTokens(): void {
    localStorage.removeItem(this.authTokenKey);
    localStorage.removeItem(this.refreshTokenKey);
  }

  public logoutUser(): void {
    this.removeTokens();
    // Perform any additional cleanup or logout-related tasks
  }
}
