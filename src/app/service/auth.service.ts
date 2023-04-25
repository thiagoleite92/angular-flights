import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';
import { NotificationService } from './notification.service';
import { LoginResponse } from './types/login-response.type';

@Injectable()
export class AuthService extends HttpService {
  constructor(protected _http: HttpClient) {
    super(_http);
  }

  async login(url: string, credentials: any): Promise<LoginResponse> {
    return await this.post(url, credentials);
  }

  setLocalStorage(loginResponse: LoginResponse): void {
    localStorage.setItem('token', JSON.stringify(loginResponse.accessToken));
    localStorage.setItem('user', JSON.stringify(loginResponse.user));
    return;
  }
}
