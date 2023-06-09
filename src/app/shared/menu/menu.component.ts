import { Component, OnInit } from '@angular/core';
import { BreakpointObserver, Breakpoints } from '@angular/cdk/layout';
import { Observable } from 'rxjs';
import { map, shareReplay } from 'rxjs/operators';
import { Router } from '@angular/router';
import { capitalizeFirstLetter } from '../../../utils/stringUtils';
import { AuthService } from '../../service/auth.service';

@Component({
  selector: 'app-menu',
  templateUrl: './menu.component.html',
  styleUrls: ['./menu.component.scss'],
})
export class MenuComponent implements OnInit {
  public pageTitle?: string = '';
  public buttonText = '';
  public navigateUrl = '';
  public urlActive = '';
  public isAdmin = false;
  public userInfo?: any;
  public showUserInfo = false;

  public routes = [
    ['/usuarios', 'Usuários'],
    ['/rotas', 'Rotas'],
    ['/agendamentos', 'Agendamentos'],
  ];

  isHandset$: Observable<boolean> = this.breakpointObserver
    .observe(Breakpoints.Handset)
    .pipe(
      map(result => result.matches),
      shareReplay()
    );

  constructor(
    private breakpointObserver: BreakpointObserver,
    private router: Router,
    private authService: AuthService
  ) {}

  ngOnInit(): void {
    this.setNavigation(this.router.url);
    this.isAdmin = this.authService.isAdmin();
    this.authService.updateUser(this.authService.getUserInfo());
    this.authService.currentUser.subscribe(user => (this.userInfo = user));
  }

  setNavigation(pathname: string): void {
    const [, name] = pathname.split('/');
    const nameCapitalized = capitalizeFirstLetter(name);

    if (pathname.includes('/registrar')) {
      this.pageTitle = nameCapitalized;
      this.navigateUrl = `/${name}`;
      this.buttonText = 'Voltar';

      return;
    }

    if (pathname.includes('/rotas/editar')) {
      this.pageTitle = nameCapitalized;
      (this.buttonText = 'Voltar'), (this.navigateUrl = `/${name}`);

      return;
    }

    if (pathname.includes('/usuarios/editar')) {
      this.pageTitle = nameCapitalized;
      (this.buttonText = 'Voltar'), (this.navigateUrl = `/${name}`);

      return;
    }

    if (pathname.includes('/usuarios')) {
      this.pageTitle = nameCapitalized;
      this.buttonText = 'Novo usuário';
      this.navigateUrl = '/usuarios/registrar';

      return;
    }

    if (pathname.includes('/rotas')) {
      this.pageTitle = nameCapitalized;
      this.buttonText = 'Nova rota';
      this.navigateUrl = '/rotas/registrar';

      return;
    }
  }

  navigateTo(): void {
    this.router.navigateByUrl(this.navigateUrl);
    return;
  }

  logout(): void {
    this.authService.logout();
  }

  setUserInfo(): void {
    this.showUserInfo = !this.showUserInfo;
  }
}
