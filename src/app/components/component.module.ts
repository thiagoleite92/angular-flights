import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { ListComponent } from './list/list.component';
import { UserFormComponent } from './user/user-form.component';
import { UserService } from './user/user.service';

@NgModule({
  declarations: [UserFormComponent, ListComponent],
  imports: [CommonModule, SharedModule],
})
export class ComponentModule {}
