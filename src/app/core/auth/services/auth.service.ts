import { HttpClient, HttpHeaders } from '@angular/common/http';
import {
  Injectable,
  PLATFORM_ID,
  WritableSignal,
  inject,
  signal,
} from '@angular/core';
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
  user: WritableSignal<any> = signal(null);

  constructor() {
    if (isPlatformBrowser(this.platformId)) {
      if (localStorage.getItem('token') !== null) {
        this.userInfo();
      }
    }
  }

  userInfo() {
    const token = localStorage.getItem('token') || '';
    const decoded = jwtDecode(token);
    this.user.set(decoded);
  }

  signUp(data: any) {
    return this.http.post(`${environment.supabaseUrl}/auth/v1/signup`, data);
  }

  signIn(data: any) {
    return this.http.post(
      `${environment.supabaseUrl}/auth/v1/token?grant_type=password`,
      data,
    );
  }

  forgotPassword(email: string | null | undefined): Observable<any> {
    return this.http.post(`${environment.supabaseUrl}/auth/v1/recover`, {
      email,
    });
  }

  updatePassword(password: string): Observable<any> {
    return this.http.put(`${environment.supabaseUrl}/auth/v1/user`, {
      password,
    });
  }

  getUserInfo(): Observable<UserResponse> {
    if (!isPlatformBrowser(this.platformId)) {
      return EMPTY;
    }

    return this.http.get<UserResponse>(
      `${environment.supabaseUrl}/auth/v1/user`,
    );
  }

  logout() {
    return this.http.post(`${environment.supabaseUrl}/auth/v1/logout`, {});
  }
}
