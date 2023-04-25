import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AuthService } from './auth.service';
import { HttpService } from './http.service';
import { NotificationService } from './notification.service';

@NgModule({
  declarations: [],
  imports: [CommonModule],
  providers: [HttpService, AuthService, NotificationService],
})
export class ServiceModule {}
