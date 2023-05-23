import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from '../components/list/list.component';
import { UserFormComponent } from '../components/user/userform/user-form.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'usuarios',
    pathMatch: 'full',
  },
  {
    path: 'usuarios',
    component: ListComponent,
  },
  {
    path: 'usuarios/registrar',
    component: UserFormComponent,
  },
  {
    path: 'rotas',
    component: ListComponent,
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
