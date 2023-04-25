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
    path: 'home',
    loadChildren: async () => {
      const m = await import('./pages/home/home.module');
      return m.HomeModule;
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes), ServiceModule],
  exports: [RouterModule],
})
export class AppRoutingModule {}
