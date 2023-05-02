import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { LocationResponseType } from './types/location-response.type';

@Injectable()
export class LocationService {
  constructor(protected http: HttpClient) {}

  public get(): Promise<any> {
    return new Promise((resolve, reject) => {
      this.http
        .get<LocationResponseType[]>(
          'https://servicodados.ibge.gov.br/api/v1/localidades/estados?orderBy=nome'
        )
        .subscribe({
          next: (v) => resolve(v),
          error: (e) => reject(e),
        });
    });
  }
}
