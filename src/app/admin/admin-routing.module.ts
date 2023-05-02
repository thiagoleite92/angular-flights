import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ListComponent } from '../components/list/list.component';
import { UserFormComponent } from '../components/user/user-form.component';

const routes: Routes = [
  {
    path: '',
    redirectTo: 'usuario',
    pathMatch: 'full',
  },
  {
    path: 'usuario',
    component: ListComponent,
  },
  {
    path: 'usuario/registrar',
    component: UserFormComponent,
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
})
export class AdminRoutingModule {}
