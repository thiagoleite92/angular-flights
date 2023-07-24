import { Injectable, OnInit } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from './types/login-response.type';
import { Router } from '@angular/router';
import { UserInfo } from './types/user-info.type';
import { BehaviorSubject } from 'rxjs';

@Injectable()
export class AuthService extends HttpService {
  userInfo?: UserInfo;

  private user = new BehaviorSubject({
    actualLocation: '',
    email: '',
    id: '',
    isAvailable: true,
    name: '',
    role: 'PILOT',
    flightExp: 0,
  });

  currentUser = this.user.asObservable();

  constructor(protected _http: HttpClient, private router: Router) {
    super(_http);
  }

  updateUser(user: UserInfo): void {
    this.user.next(user);
  }

  isAdmin(): boolean {
    const user = JSON.parse(localStorage.getItem('user') ?? '');

    return user?.role === 'ADMIN';
  }

  async login(
    url: string,
    credentials: { login: string; password: string }
  ): Promise<LoginResponse> {
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

  getUserInfo(): UserInfo {
    const user = JSON.parse(localStorage.getItem('user') ?? '');

    return user
      ? (this.userInfo = user)
      : (this.userInfo = {
          actualLocation: '',
          email: '',
          id: '',
          isAvailable: true,
          name: '',
          role: 'PILOT',
          flightExp: 0,
        });
  }
}
