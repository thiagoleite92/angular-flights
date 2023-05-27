import { Component } from '@angular/core';
import { RouteService } from '../route.service';

@Component({
  selector: 'app-router-list',
  templateUrl: './router-list.component.html',
  styleUrls: ['./router-list.component.scss'],
})
export class RouterListComponent {
  public data?: any;
  public columns?: any;

  constructor(private routeService: RouteService) {}

  ngOnInit() {
    this.fetchRoutes();
  }

  async fetchRoutes() {
    console.log('oi');

    try {
      const listResponse = await this.routeService.getRoutes();

      this.data = listResponse;

      this.columns = Object.keys(this.data[0]);

      this.columns.splice(0, 1, 'Ações');
    } catch (error) {
      console.log('oi');
    }
  }
}
