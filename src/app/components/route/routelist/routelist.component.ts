import { Component, Input, OnInit } from '@angular/core';
import { RouteService } from '../route.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth.service';

@Component({
  selector: 'app-routelist',
  templateUrl: './routelist.component.html',
  styleUrls: ['./routelist.component.scss'],
})
export class RoutelistComponent implements OnInit {
  @Input() public isAdmin = false;
  public data?: any | [] = [];
  public columns?: string[];
  public showModal = false;
  public routeId = '';

  constructor(
    private routeService: RouteService,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.isAdmin = this.authService.isAdmin();
    this.fetchRoutes();
  }

  async fetchRoutes(): Promise<any> {
    try {
      this.data = await this.routeService.getRoutes();

      this.columns = Object.keys(this.data[0]);

      if (!this.isAdmin) {
        this.columns.splice(0, 1);
      } else {
        this.columns.splice(0, 1, 'Ações');
      }
    } catch (error) {
      console.log('oi');
    }
  }

  handleEdit(id: string) {
    this.router.navigateByUrl(`/rotas/editar/${id}`);
  }

  openModal(id: string) {
    this.routeId = id;
    this.showModal = true;
  }

  closeModal() {
    this.routeId = '';
    this.showModal = false;
  }

  deleteRoute() {
    this.routeService.deleteRoute(this.routeId);
  }
}
