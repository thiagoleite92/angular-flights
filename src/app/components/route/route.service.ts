import { Injectable } from '@angular/core';
import { HttpService } from '../../service/http.service';
import { HttpClient } from '@angular/common/http';
import { SaveRoute } from './types/route-save.type';
import {
  RouteResponse,
  SingleRouteResponse,
} from './types/route-response.type';

@Injectable()
export class RouteService extends HttpService {
  private routeUrl = '/route';
  private flightUrl = '/flight';

  constructor(protected _http: HttpClient) {
    super(_http);
  }

  async deleteRoute(routeId: string): Promise<any> {
    return this.delete(this.routeUrl, routeId);
  }

  async saveFlight(routeId: string): Promise<void> {
    await this.post(this.flightUrl, { routeId });
    return;
  }

  async saveRoute(data: SaveRoute): Promise<any> {
    return this.post(this.routeUrl, data);
  }

  async getRoutes(
    userId?: string
  ): Promise<RouteResponse[] | SingleRouteResponse | []> {
    return userId
      ? this.get(`${this.routeUrl}/${userId ?? ''}`)
      : this.get(`${this.routeUrl}`);
  }

  async editRoute(routeId: string, data: SaveRoute): Promise<void> {
    return this.patch(`${this.routeUrl}/${routeId}`, data);
  }
}
