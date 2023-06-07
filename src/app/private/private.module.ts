import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './private-routing.module';
import { SharedModule } from '../shared/shared.module';
import { ComponentModule } from '../components/component.module';

@NgModule({
  declarations: [],
  imports: [CommonModule, AdminRoutingModule, SharedModule, ComponentModule],
})
export class AdminModule {}
