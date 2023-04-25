import { Component, OnInit } from '@angular/core';
import { AuthService } from './service/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent implements OnInit {
  title = 'flights-angular';

  constructor(private authService: AuthService, private route: Router) {}

  ngOnInit(): void {
    if (this.authService.isLoggedIn()) {
      this.route.navigate(['/home']);
      return;
    }
    return;
  }
}
