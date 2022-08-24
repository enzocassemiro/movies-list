import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DialogModule } from 'primeng/dialog';
import { RatingModule } from 'primeng/rating';
import { TabViewModule } from 'primeng/tabview';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';

import { SharedPipesModule } from '../shared-pipes/shared-pipes.module';
import { ListComponent } from './pages/list/list.component';
import { UserRoutingModule } from './user-routing.module';

@NgModule({
  declarations: [
    ListComponent
  ],
  imports: [
    CommonModule,
    UserRoutingModule,
    TooltipModule,
    ButtonModule,
    RatingModule,
    FormsModule,
    SharedPipesModule,
    TabViewModule,
    DialogModule,
    ToastModule
  ]
})
export class UserModule { }
