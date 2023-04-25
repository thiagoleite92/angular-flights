import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';

@Injectable()
export class HttpService {
  private baseURL = 'http://localhost:5200/api';

  constructor(protected http: HttpClient) {}

  public post(url: string, body: any): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http.post(this.mountUrl(url), body).subscribe({
        next: (v) => resolve(v),
        error: (e) => reject(e),
      });
    });
  }

  public mountUrl(endpoint: string): string {
    return `${this.baseURL}${endpoint}`;
  }
}
