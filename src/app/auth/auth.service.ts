import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { throwError, Observable, of } from 'rxjs';
import { AuthRequest } from './auth-models/auth-request.model';
import { AuthenticationResponse } from './auth-models/auth-response.model';
import { RegisterRequest } from './auth-models/register-request.model';
import { tap, map, catchError } from 'rxjs/operators';
import { JwtHelperService } from '@auth0/angular-jwt';
import { User } from '../task.model';
import { HttpErrorResponse } from '@angular/common/http'; // Add this import
import { Router } from '@angular/router';


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
  private loggedInUser: string | null = null; 

  
  constructor(private http: HttpClient,  private router: Router) {
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
        this.loggedInUser = request.username; // Set the loggedInUser
        localStorage.setItem('loggedInUser', this.loggedInUser);
        
      }),
      map((response: AuthenticationResponse) => response.access_token)
    );
  }

  logout(username: string): Observable<void> {
    const logoutRequest = { username };
    console.log('Logging out...');
  
    return this.http.post<void>(`${this.baseUrl}/logout`, logoutRequest).pipe(
      tap(() => {
        this.removeTokens(); // Remove tokens
        console.log('Logout successful');
        console.log('Local Storage after logout:', localStorage);
        this.loggedInUser = null; // Clear the loggedInUser when logging out
        localStorage.removeItem("loggedInUser")
      }),
      catchError((error) => {
        if (error instanceof HttpErrorResponse && error.status === 200) {
          // Consider a 200 status as a successful logout
          this.removeTokens(); // Remove tokens
          console.log('Logout successful');
          this.loggedInUser = null; // Clear the loggedInUser when logging out
          this.router.navigate(['/login']);
          localStorage.removeItem("loggedInUser")
          console.log('Local Storage after logout:', localStorage);
          return new Observable<void>(); // Return an empty observable of type void
        } else {
          console.error('Logout error:', error);
          // Handle logout error as needed
          return throwError('Logout failed');
        }
      })
    );
  }

  getCurrentUser(): Observable<User> {
    const authToken = this.getAuthToken();
      
    if (!authToken) {
      return throwError('No JWT token available.');
    }
  
    const decodedToken = this.jwtHelper.decodeToken(authToken);
  
    if (!decodedToken || !decodedToken.sub) {
      return throwError('Invalid JWT token or user ID.');
    }
  
    const userId = decodedToken.sub;
  
    return this.http.get<User>(`${this.baseUrl}/getUser`).pipe(
      catchError((error) => {
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

  getCurrentLoggedInUser(): string | null {
    return localStorage.getItem('loggedInUser');
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
  }
  
  isAuthenticated(): boolean {
    const authToken = this.getAuthToken();
    return !!authToken;
  }
  
}
