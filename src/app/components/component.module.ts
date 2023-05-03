import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { ListComponent } from './list/list.component';
import { UserFormComponent } from './user/userform/user-form.component';
import { ServiceModule } from '../service/service.module';
import { UserService } from './user/user.service';

@NgModule({
  declarations: [UserFormComponent, ListComponent],
  imports: [CommonModule, SharedModule, ServiceModule],
  providers: [UserService],
})
export class ComponentModule {}
