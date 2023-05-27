import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { UserFormComponent } from './user/userform/user-form.component';
import { ServiceModule } from '../service/service.module';
import { UserService } from './user/user.service';
import { UserlistComponent } from './user/userlist/userlist.component';
import { RouterListComponent } from './route/router-list/router-list.component';
import { RouteService } from './route/route.service';

@NgModule({
  declarations: [UserFormComponent, UserlistComponent, RouterListComponent],
  imports: [CommonModule, SharedModule, ServiceModule],
  providers: [UserService, RouteService],
})
export class ComponentModule {}
