import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { User } from '../../types/models';
import { Router } from '@angular/router';
import { catchError, tap, throwError } from 'rxjs';

interface LoginResponse {
  user: User;
  access_token: string;
  refresh_token: string;
}

@Injectable({ providedIn: 'root' })
export class AuthService {
  router = inject(Router);
  httpClient = inject(HttpClient);
  user = signal<User | null>(null);
  token = signal<string | null>(null);

  login(email: string, password: string) {
    return this.httpClient
      .post<LoginResponse>('http://localhost:3000/auth/sign-in', {
        email,
        password,
      })
      .pipe(
        tap((response) => {
          this.user.set(response.user);
          this.token.set(response.access_token);
          // Optionally, store token in localStorage/sessionStorage
          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('refresh_token', response.refresh_token);
          // console.log('Login successful:', this.user, this.token);
          // Navigate to a dashboard or home page on success
          this.router.navigate(['/dashboard']); // Adjust route as needed
        }),
        catchError((error) => {
          console.error(error);

          return throwError(() => new Error('Login failed!'));
        })
      );
  }

  refresh(token: string) {
    return this.httpClient
      .post<LoginResponse>('http://localhost:3000/auth/refresh-token', {
        refreshToken: token,
      })
      .pipe(
        tap((response) => {
          this.user.set(response.user);
          this.token.set(response.access_token);
          // Optionally, store token in localStorage/sessionStorage
          localStorage.setItem('access_token', response.access_token);
          localStorage.setItem('refresh_token', response.refresh_token);
        }),
        catchError((error) => {
          console.error(error);

          return throwError(() => new Error('Refresh failed!'));
        })
      );
  }
}
