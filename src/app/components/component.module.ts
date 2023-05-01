import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { SharedModule } from '../shared/shared.module';
import { UserComponent } from './user/user.component';

@NgModule({
  declarations: [UserComponent],
  imports: [CommonModule, SharedModule],
  exports: [UserComponent],
})
export class ComponentModule {}
