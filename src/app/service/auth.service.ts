import { EventEmitter, Injectable, OnInit, Output } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from './types/login-response.type';
import { Router } from '@angular/router';

@Injectable()
export class AuthService extends HttpService {
  public role: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(protected _http: HttpClient, private router: Router) {
    super(_http);
  }

  isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('user') ?? '');

    return user?.role === 'ADMIN';
  }

  async login(url: string, credentials: any): Promise<LoginResponse> {
    return await this.post(url, credentials);
  }

  setUserAndToken(loginResponse: LoginResponse): void {
    localStorage.setItem('token', loginResponse.accessToken);
    localStorage.setItem('user', JSON.stringify(loginResponse.user));

    return;
  }

  isLoggedIn(): boolean | null {
    return !!localStorage.getItem('token');
  }

  logout(): void {
    localStorage.clear();
    this.router.navigateByUrl('/login');
  }
}
