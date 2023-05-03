import { Injectable } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { HttpClient } from '@angular/common/http';
import { SaveUser } from './types/save-user.type';

@Injectable()
export class UserService extends HttpService {
  constructor(protected _http: HttpClient) {
    super(_http);
  }

  async saveUser(url: string, data: SaveUser): Promise<any> {
    await this.post(url, data);
    return;
  }
}
