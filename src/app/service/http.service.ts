import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable()
export class HttpService {
  private baseURL = 'http://localhost:5200/api';

  constructor(protected http: HttpClient) {}

  public patch(url: string, id: string, body: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.patch(`${this.mountUrl(url)}/${id}/status`, body).subscribe({
        next: (v) => resolve(v),
        error: (e) => reject(e),
      });
    });
  }

  public post(url: string, body: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.mountUrl(url), body).subscribe({
        next: (v) => resolve(v),
        error: (e) => reject(e),
      });
    });
  }

  public get(url: string, userId?: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.mountUrl(`${url}/${userId ?? ''}`)).subscribe({
        next: (v) => resolve(v),
        error: (e) => reject(e),
      });
    });
  }

  public delete(url: string, userId: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.delete(this.mountUrl(`${url}/${userId}`)).subscribe({
        next: (v) => resolve(v),
        error: (e) => reject(e),
      });
    });
  }

  private mountUrl(endpoint: string): string {
    return `${this.baseURL}${endpoint}`;
  }
}
