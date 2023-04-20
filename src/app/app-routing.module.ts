import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

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
    path: 'cadastro',
    loadChildren: async () => {
      const m = await import('./pages/cadastro/cadastro.module');
      return m.CadastroModule;
    },
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
