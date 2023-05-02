import { EventEmitter, Injectable, Output } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';
import { LoginResponse } from './types/login-response.type';

@Injectable()
export class AuthService extends HttpService {
  constructor(protected _http: HttpClient) {
    super(_http);
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
}
