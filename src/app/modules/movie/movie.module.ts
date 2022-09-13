import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { InputTextModule } from 'primeng/inputtext';
import { PaginatorModule } from 'primeng/paginator';
import { RatingModule } from 'primeng/rating';
import { ToastModule } from 'primeng/toast';
import { TooltipModule } from 'primeng/tooltip';

import { SharedPipesModule } from '../shared-pipes/shared-pipes.module';
import { MovieRoutingModule } from './movie-routing.module';
import { CategoriesModularComponent } from './pages/categories-modular/categories-modular.component';
import { MovieIdComponent } from './pages/movie-id/movie-id.component';


@NgModule({
  declarations: [
    CategoriesModularComponent,
    MovieIdComponent
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
    SharedPipesModule,
    InputTextModule,
    FormsModule,
    ReactiveFormsModule
  ]
})
export class MovieModule { }
