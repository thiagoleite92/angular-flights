import { Injectable } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { HttpClient } from '@angular/common/http';

@Injectable()
export class RouteService extends HttpService {
  private routeUrl = '/route';
  private flightUrl = '/flight';

  constructor(protected _http: HttpClient) {
    super(_http);
  }

  async getRoutes(): Promise<any> {
    return this.get(this.routeUrl);
  }

  async deleteRoute(routeId: string): Promise<any> {
    return this.delete(this.routeUrl, routeId);
  }

  async saveFlight(routeId: string): Promise<void> {
    await this.post(this.flightUrl, { routeId });
    return;
  }
}
