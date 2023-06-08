import { RouteService } from '../route.service';
import { Router } from '@angular/router';
import { AuthService } from '../../../service/auth.service';
import { NotificationService } from '../../../service/notification.service';
import { UserInfo } from '../../../service/types/user-info.type';
import { RouteResponse } from '../types/route-response.type';
import { Component, OnInit } from '@angular/core';

interface Item extends RouteResponse {
  [key: string]: string;
}

@Component({
  selector: 'app-routelist',
  templateUrl: './routelist.component.html',
  styleUrls: ['./routelist.component.scss'],
})
export class RoutelistComponent implements OnInit {
  public isAdmin = true;
  public data?: Item[] | [];
  public columns?: string[];
  public showModal = false;
  public routeId = '';
  public userInfo: UserInfo | null = null;
  public link = '';

  public dialogTitle = 'Essa ação é irreversível. Deseja continuar?';

  constructor(
    private routeService: RouteService,
    private router: Router,
    private authService: AuthService,
    private notification: NotificationService
  ) {}

  ngOnInit(): void {
    this.userInfo = this.authService.getUserInfo() as UserInfo;

    if (this.userInfo?.role === 'PILOT') {
      console.log(this.link, 'dentro do if');
      this.dialogTitle = 'Confirma agendamento da rota?';
      this.isAdmin = false;
      this.link = `/agendamentos/piloto/${this.userInfo?.id}`;
    }
    this.fetchRoutes();
  }

  async fetchRoutes(): Promise<void> {
    try {
      this.data = await this.routeService.getRoutes();

      if (!this.data?.length) {
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

      return;
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
      await this.routeService.deleteRoute(this.routeId);
      this.handleDeleteRoute(this.routeId);
      this.showModal = false;
    } catch (error) {
      console.log(error);
    }
  }

  handleDeleteRoute(routeId: string): void {
    const routeIndex =
      this.data?.findIndex((route: RouteResponse) => routeId === route['id']) ??
      -1;

    if (routeIndex >= 0) {
      this.data?.splice(routeIndex, 1);
      this.notification.message({ message: 'Rota excluída.' });
    }

    if (!this.data?.length) {
      this.columns = [];
      this.data = [];
    }
  }

  async confirmSchedule(): Promise<void> {
    try {
      await this.routeService.saveFlight(this.routeId);
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

  createRouteNavegate(): void {
    this.router.navigateByUrl(`/rotas/registrar`);
  }

  isPilotAvaiable(): boolean {
    return (
      !this.userInfo?.isAvailable &&
      !!this.columns &&
      !!this.data?.length &&
      !this.isAdmin
    );
  }
}
