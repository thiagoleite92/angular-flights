import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';

interface RoutesMap {
  [key: string]: boolean;
}

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public pageTitle?: string = '';
  public buttonText: string = '';
  public navigateUrl: string = '';
  public urlActive: string = '';

  public routes = [
    ['/admin/usuarios', 'Usuários'],
    ['/admin/rotas', 'Rotas'],
  ];

  routesMap: RoutesMap = {};

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map((result) => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router
  ) {}

  ngOnInit(): void {
    this.setNavigation(this.router.url);
  }

  setNavigation(pathname: string): void {
    if (pathname.includes('/registrar')) {
      const [, admin, name] = pathname.split('/');

      this.pageTitle = name;
      this.navigateUrl = `/${admin}/${name}`;
      this.buttonText = 'Voltar';

      return;
    }

    if (pathname.includes('/usuarios')) {
      this.pageTitle = 'Usuários';
      this.buttonText = 'Novo usuário';
      this.navigateUrl = '/admin/usuarios/registrar';

      return;
    }

    if (pathname.includes('/rotas')) {
      this.pageTitle = 'Rotas';
      this.buttonText = 'Nova rota';
      this.navigateUrl = '/admin/rotas/registrar';

      return;
    }
  }

  navigateTo(): void {
    this.router.navigateByUrl(this.navigateUrl);
    return;
  }
}
