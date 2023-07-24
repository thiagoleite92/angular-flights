import { Inject, Injectable } from '@angular/core';
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

  constructor(protected _http: HttpClient, @Inject('URL_API') _apiUrl: string) {
    super(_http, _apiUrl);
  }

  async deleteRoute(routeId: string): Promise<{ message: string }> {
    return this.delete(this.routeUrl, routeId);
  }

  async saveFlight(routeId: string): Promise<void> {
    await this.post(this.flightUrl, { routeId });
    return;
  }

  async saveRoute(data: SaveRoute): Promise<{ message: string }> {
    return this.post(this.routeUrl, data);
  }

  async getRoutes(): Promise<RouteResponse[]> {
    return this.get(`${this.routeUrl}`);
  }

  async editRoute(routeId: string, data: SaveRoute): Promise<void> {
    return this.patch(`${this.routeUrl}/${routeId}`, data);
  }

  async getRouteById(routeId: string): Promise<SingleRouteResponse | null> {
    return this.get(`${this.routeUrl}/${routeId}`);
  }
}
