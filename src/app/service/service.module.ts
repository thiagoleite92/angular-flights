import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { HttpService } from './http.service';
import { NotificationService } from './notification.service';
import { AuthGuard } from './auth.guard';
import { LocationService } from './location.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    HttpService,
    AuthService,
    NotificationService,
    AuthGuard,
    LocationService,
  ],
})
export class ServiceModule {}
