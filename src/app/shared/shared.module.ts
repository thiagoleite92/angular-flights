import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { InputComponent } from './input/input.component';
import { FormsModule } from '@angular/forms';
import { ButtonComponent } from './button/button.component';
import { MatIconModule } from '@angular/material/icon';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { MatSnackBarModule } from '@angular/material/snack-bar';
import { MenuComponent } from './menu/menu.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatListModule } from '@angular/material/list';
import { MatSelectModule } from '@angular/material/select';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { RouterModule } from '@angular/router';
import { IconComponent } from './icon/icon.component';
import { ToggleComponent } from './toggle/toggle.component';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { LoaderComponent } from './loader/loader.component';
import { ServiceModule } from '../service/service.module';
import { DialogComponent } from './dialog/dialog.component';
import { MAT_DATE_LOCALE, MatNativeDateModule } from '@angular/material/core';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { MatDialogModule } from '@angular/material/dialog';
import { NgxMaskModule } from 'ngx-mask';
import { MatPaginatorModule } from '@angular/material/paginator';

@NgModule({
  declarations: [
    InputComponent,
    ButtonComponent,
    MenuComponent,
    IconComponent,
    ToggleComponent,
    LoaderComponent,
    DialogComponent,
  ],
  imports: [
    RouterModule,
    ServiceModule,
    CommonModule,
    MatInputModule,
    MatButtonModule,
    FormsModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatSnackBarModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatSelectModule,
    MatCheckboxModule,
    MatIconModule,
    MatSlideToggleModule,
    MatNativeDateModule,
    MatDatepickerModule,
    MatDialogModule,
    MatPaginatorModule,
    NgxMaskModule.forRoot(),
  ],
  exports: [
    InputComponent,
    ButtonComponent,
    MenuComponent,
    IconComponent,
    ToggleComponent,
    LoaderComponent,
    DialogComponent,
  ],
  providers: [{ provide: MAT_DATE_LOCALE, useValue: 'pt-BR' }],
})
export class SharedModule {}
