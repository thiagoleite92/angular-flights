import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AuthGuard } from './service/auth.guard';
import { ServiceModule } from './service/service.module';

const routes: Routes = [
  { path: '', redirectTo: 'login', pathMatch: 'full' },
  {
    path: 'login',
    loadChildren: async () => {
      const m = await import('./pages/login/login.module');
      return m.LoginModule;
    },
  },
  {
    canActivate: [AuthGuard],
    path: '',
    loadChildren: async () => {
      const m = await import('./private/private.module');
      return m.AdminModule;
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ServiceModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
