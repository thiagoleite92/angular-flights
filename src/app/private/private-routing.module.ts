import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFormComponent } from '../components/user/userform/user-form.component';
import { UserlistComponent } from '../components/user/userlist/userlist.component';
import { RoutelistComponent } from '../components/route/routelist/routelist.component';
import { RouteformComponent } from '../components/route/routeform/routeform.component';
import { FlightDetailsComponent } from '../components/flight/flight-details/flight-details.component';
import { FlightBooksComponent } from '../components/flight/flight-books/flight-books.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'usuarios',
    pathMatch: 'full',
  },
  {
    path: 'usuarios',
    component: UserlistComponent,
  },
  {
    path: 'usuarios/registrar',
    component: UserFormComponent,
  },
  {
    path: 'usuarios/editar/:userId',
    component: UserFormComponent,
  },
  {
    path: 'rotas',
    component: RoutelistComponent,
  },
  {
    path: 'rotas/registrar',
    component: RouteformComponent,
  },
  {
    path: 'rotas/editar/:routeId',
    component: RouteformComponent,
  },
  {
    path: 'agendamentos',
    component: FlightBooksComponent,
  },
  { path: 'agendamentos/:flightId', component: FlightDetailsComponent },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
