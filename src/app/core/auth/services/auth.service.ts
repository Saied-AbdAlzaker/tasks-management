import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable, PLATFORM_ID, inject } from '@angular/core';
import { environment } from '../../../../environments/environment';
import { UserResponse } from '../model/user';
import { EMPTY, Observable } from 'rxjs';
import { jwtDecode } from 'jwt-decode';
import { isPlatformBrowser } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  private http = inject(HttpClient);
  private platformId: Object = inject(PLATFORM_ID);

  getToken(): string | null {
    if (!isPlatformBrowser(this.platformId)) {
      return null;
    }

    return localStorage.getItem('token');
  }

  decodedToken(): void {
    const token = this.getToken();
    if (token) {
      const decoded = jwtDecode(token);
      localStorage.setItem('USERINFO', JSON.stringify(decoded));
    }
  }

  signUp(data: any) {
    const headers = new HttpHeaders({
      apikey: environment.supabaseAnonKey,
      'Content-Type': 'application/json',
    });

    return this.http.post(`${environment.supabaseUrl}/auth/v1/signup`, data, {
      headers,
    });
  }

  signIn(data: any) {
    const headers = new HttpHeaders({
      apikey: environment.supabaseAnonKey,
      'Content-Type': 'application/json',
    });

    return this.http.post(
      `${environment.supabaseUrl}/auth/v1/token?grant_type=password`,
      data,
      {
        headers,
      },
    );
  }

  forgotPassword(email: string | null | undefined): Observable<any> {
    const headers = new HttpHeaders({
      apikey: environment.supabaseAnonKey,
      'Content-Type': 'application/json',
    });

    return this.http.post(
      `${environment.supabaseUrl}/auth/v1/recover`,
      { email },
      {
        headers,
      },
    );
  }

  updatePassword(password: string): Observable<any> {
    const headers = new HttpHeaders({
      apikey: environment.supabaseAnonKey,
      Authorization: `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json',
    });

    return this.http.put(
      `${environment.supabaseUrl}/auth/v1/user`,
      { password },
      {
        headers,
      },
    );
  }

  getUserInfo(): Observable<UserResponse> {
    if (!isPlatformBrowser(this.platformId)) {
      return EMPTY;
    }

    const headers = new HttpHeaders({
      apikey: environment.supabaseAnonKey,
      Authorization: `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json',
    });

    return this.http.get<UserResponse>(
      `${environment.supabaseUrl}/auth/v1/user`,
      { headers },
    );
  }

  logout() {
    const headers = new HttpHeaders({
      apikey: environment.supabaseAnonKey,
      Authorization: `Bearer ${this.getToken()}`,
      'Content-Type': 'application/json',
    });

    return this.http.post(
      `${environment.supabaseUrl}/auth/v1/logout`,
      {},
      {
        headers,
      },
    );
  }
}
