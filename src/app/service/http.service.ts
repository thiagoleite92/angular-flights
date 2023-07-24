import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';

@Injectable()
export class HttpService {
  constructor(
    protected http: HttpClient,
    @Inject('URL_API') private apiUrl: string
  ) {}

  public patch(url: string, body: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.patch(`${this.mountUrl(url)}`, body).subscribe({
        next: v => resolve(v),
        error: e => reject(e),
      });
    });
  }

  public post(url: string, body: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.mountUrl(url), body).subscribe({
        next: v => resolve(v),
        error: e => reject(e),
      });
    });
  }

  public get(url: string, id?: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.mountUrl(`${url}/${id ?? ''}`)).subscribe({
        next: v => resolve(v),
        error: e => reject(e),
      });
    });
  }

  public getWithQuery(url: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.get(this.mountUrl(`${url}`)).subscribe({
        next: v => resolve(v),
        error: e => reject(e),
      });
    });
  }

  public delete(url: string, id: string): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.delete(this.mountUrl(`${url}/${id}`)).subscribe({
        next: v => resolve(v),
        error: e => reject(e),
      });
    });
  }

  private mountUrl(endpoint: string): string {
    return `${this.apiUrl}${endpoint}`;
  }
}
