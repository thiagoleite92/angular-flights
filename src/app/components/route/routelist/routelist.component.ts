import { Component, Input, OnInit } from '@angular/core';
import { RouteService } from '../route.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { NotificationService } from '../../../service/notification.service';
import { AllRoutes } from '../types/route-response.type';
import { FlightService } from '../../../service/flight.service';

@Component({
  selector: 'app-routelist',
  templateUrl: './routelist.component.html',
  styleUrls: ['./routelist.component.scss'],
})
export class RoutelistComponent implements OnInit {
  public isAdmin = true;
  public data?: any | [] = [];
  public columns?: string[];
  public showModal = false;
  public routeId = '';

  public dialogTitle = 'Essa ação é irreversível. Deseja continuar?';

  constructor(
    private routeService: RouteService,
    private router: Router,
    private authService: AuthService,
    private notification: NotificationService,
    private flightService: FlightService
  ) {}

  ngOnInit(): void {
    console.log(this.authService.isAdmin(), 'isadmi');

    if (!this.authService.isAdmin()) {
      this.dialogTitle = 'Confirma agendamento da rota?';
      this.isAdmin = false;
    }
    this.fetchRoutes();

    if (this.isAdmin) {
    }
  }

  async fetchRoutes(): Promise<any> {
    try {
      this.data = await this.routeService.getRoutes();

      if (!this.data.length) {
        this.columns = [];
        return;
      }

      if (this.data?.length) {
        this.columns = Object.keys(this.data[0]);
      }

      if (this.columns && this.isAdmin) {
        this.columns.splice(0, 1, 'Ações');
      }

      if (this.columns && !this.isAdmin) {
        this.columns.splice(0, 1, 'Aceitar');
      }

      console.log(this.data);
    } catch (error) {
      console.log(error);
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

  async deleteRoute(): Promise<void> {
    try {
      console.log('delete route');
      await this.routeService.deleteRoute(this.routeId);
      this.handleDeleteRoute(this.routeId);
      this.showModal = false;
    } catch (error) {}
  }

  handleDeleteRoute(routeId: string): void {
    const routeIndex = this.data.findIndex(
      (route: AllRoutes) => routeId === route.id
    );

    if (routeIndex >= 0) {
      this.data.splice(routeIndex, 1);
      this.notification.message({ message: 'Rota excluída.' });
    }

    if (!this.data.length) {
      this.columns = [];
      this.data = [];
    }
  }

  async confirmSchedule(): Promise<void> {
    try {
      await this.flightService.saveFlight(this.routeId);
    } catch (error: any) {
      const { statusCode, message } = error.error;

      if (statusCode === 400) {
        this.notification.message({
          message,
        });
        this.showModal = false;
      }
    }
  }
}
