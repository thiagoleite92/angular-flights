import { Inject, Injectable } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { HttpClient } from '@angular/common/http';
import { SaveUser } from './types/save-user.type';
import { AllUsers, OneUser } from './types/user-response.type';

@Injectable()
export class UserService extends HttpService {
  private userUrl = '/user';

  constructor(protected _http: HttpClient, @Inject('URL_API') _apiUrl: string) {
    super(_http, _apiUrl);
  }

  async saveUser(data: SaveUser): Promise<any> {
    await this.post(this.userUrl, data);
    return;
  }

  async getUsers(userId?: string): Promise<AllUsers[] | OneUser> {
    return userId
      ? this.get(`${this.userUrl}/${userId ?? ''}`)
      : this.get(`${this.userUrl}`);
  }

  async updateUserStatus(userId: string, isActive: boolean) {
    await this.patch(`${this.userUrl}/${userId}/status`, { isActive });
  }

  async deleteUser(userId: string): Promise<void> {
    await this.delete(this.userUrl, userId);
  }

  async updateUser(userId: string, data: SaveUser): Promise<void> {
    return this.patch(`${this.userUrl}/${userId}`, data);
  }
}
