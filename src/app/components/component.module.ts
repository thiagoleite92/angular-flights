import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { UserFormComponent } from './user/userform/user-form.component';
import { ServiceModule } from '../service/service.module';
import { UserService } from './user/user.service';
import { UserlistComponent } from './user/userlist/userlist.component';
import { RouteService } from './route/route.service';
import { RoutelistComponent } from './route/routelist/routelist.component';
import { RouteformComponent } from './route/routeform/routeform.component';
import { FlightCardComponent } from './flight/flight-card/flight-card.component';
import { FlightBooksComponent } from './flight/flight-books/flight-books.component';
import { FlightService } from './flight/flight.service';

@NgModule({
  declarations: [
    UserFormComponent,
    UserlistComponent,
    RoutelistComponent,
    RouteformComponent,
    FlightCardComponent,
    FlightBooksComponent,
  ],
  imports: [CommonModule, SharedModule, ServiceModule],
  providers: [UserService, RouteService, FlightService],
})
export class ComponentModule {}
