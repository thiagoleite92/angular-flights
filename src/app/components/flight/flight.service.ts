import { HttpClient } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { Flight, FlightDetails } from './types/flight-details.type';

@Injectable()
export class FlightService extends HttpService {
  private flightURL = '/flight';

  constructor(protected _http: HttpClient, @Inject('URL_API') _apiUrl: string) {
    super(_http, _apiUrl);
  }

  async getFlights(query?: any): Promise<Flight[]> {
    return await this.getWithQuery(`${this.flightURL}?${query}`);
  }

  async deleteFlight(flightId: string): Promise<void> {
    await this.delete(this.flightURL, flightId);

    return;
  }

  async getFlightDetailsById(
    flightId: string | undefined
  ): Promise<FlightDetails> {
    return await this.get(`${this.flightURL}/${flightId}`);
  }
}
