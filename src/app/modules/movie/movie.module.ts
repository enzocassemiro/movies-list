import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { PaginatorModule } from 'primeng/paginator';
import { RatingModule } from 'primeng/rating';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';

import { SharedPipesModule } from '../shared-pipes/shared-pipes.module';
import { MovieRoutingModule } from './movie-routing.module';
import { CategoriesModularComponent } from './pages/categories-modular/categories-modular.component';

@NgModule({
  declarations: [
    CategoriesModularComponent
  ],
  imports: [
    CommonModule,
    MovieRoutingModule,
    DropdownModule,
    FormsModule,
    RatingModule,
    TooltipModule,
    ButtonModule,
    PaginatorModule,
    ToastModule,
    SharedPipesModule
  ]
})
export class MovieModule { }
