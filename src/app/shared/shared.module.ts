import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { InputComponent } from './input/input.component';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from './button/button.component';

@NgModule({
  declarations: [InputComponent, ButtonComponent],
  imports: [CommonModule, MatInputModule, MatButtonModule, FormsModule],
  exports: [InputComponent, ButtonComponent],
})
export class SharedModule {}
