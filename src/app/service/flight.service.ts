import { Injectable } from '@angular/core';
import { HttpService } from './http.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class FlightService extends HttpService {
  flightURL = '/flight';

  constructor(protected _http: HttpClient) {
    super(_http);
  }
}
