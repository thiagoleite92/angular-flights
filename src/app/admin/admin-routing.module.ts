import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFormComponent } from '../components/user/userform/user-form.component';
import { UserlistComponent } from '../components/user/userlist/userlist.component';
import { RoutelistComponent } from '../components/route/routelist/routelist.component';

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
    component: UserFormComponent,
  },
  {
    path: 'voos',
    component: UserlistComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
