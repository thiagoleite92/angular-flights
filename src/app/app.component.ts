import { Component, OnInit, Output } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  title = 'flights-angular';
  @Output() showMenu: boolean = false;

  constructor(private authService: AuthService, private route: Router) {}

  // ngOnInit(): void {
  //   if (this.authService.isLoggedIn()) {
  //     this.route.navigate(['/admin/usuario']);

  //     return;
  //   }
  // }
}
