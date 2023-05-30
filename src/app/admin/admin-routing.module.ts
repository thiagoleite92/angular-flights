import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { UserFormComponent } from '../components/user/userform/user-form.component';
import { UserlistComponent } from '../components/user/userlist/userlist.component';
import { RouterListComponent } from '../components/route/router-list/router-list.component';

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
    component: UserlistComponent,
  },
  {
    path: 'rotas/registrar',
    component: UserFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
