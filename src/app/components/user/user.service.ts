import { Injectable } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { HttpClient } from '@angular/common/http';
import { SaveUser } from './types/save-user.type';
import { UserResponse } from './types/user-response.type';

@Injectable()
export class UserService extends HttpService {
  private userUrl = '/user';

  constructor(protected _http: HttpClient) {
    super(_http);
  }

  async saveUser(data: SaveUser): Promise<any> {
    await this.post(this.userUrl, data);
    return;
  }

  async getUsers(): Promise<any> {
    return this.get(this.userUrl);
  }

  async updateUserStatus(userId: string, isActive: boolean) {
    await this.patch(this.userUrl, userId, { isActive });
  }
}
