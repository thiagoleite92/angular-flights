import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { HttpService } from './http.service';
import { NotificationService } from './notification.service';
import { AuthGuard } from './auth.guard';
import { LocationService } from './location.service';
import { RequestInterceptor } from './request-interceptor.service';
import { HTTP_INTERCEPTORS } from '@angular/common/http';
import { FlightService } from './flight.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [
    HttpService,
    AuthService,
    NotificationService,
    AuthGuard,
    LocationService,
    RequestInterceptor,
    {
      provide: HTTP_INTERCEPTORS,
      useClass: RequestInterceptor,
      multi: true,
    },
    FlightService,
  ],
})
export class ServiceModule {}
