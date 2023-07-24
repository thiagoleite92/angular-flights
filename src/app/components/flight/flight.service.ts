import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { Flight } from './types/flight-details.type';

@Injectable()
export class FlightService extends HttpService {
  private flightURL = '/flight';

  constructor(protected _http: HttpClient) {
    super(_http);
  }

  async getFlights(): Promise<Flight[]> {
    return await this.get(this.flightURL);
  }

  async deleteFlight(flightId: string): Promise<void> {
    await this.delete(this.flightURL, flightId);

    return;
  }
}
