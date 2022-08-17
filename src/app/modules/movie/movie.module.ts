import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { DropdownModule } from 'primeng/dropdown';

import { MovieRoutingModule } from './movie-routing.module';
import { PopularComponent } from './pages/popular/popular.component';



@NgModule({
  declarations: [
    PopularComponent
  ],
  imports: [
    CommonModule,
    MovieRoutingModule,
    DropdownModule,
    FormsModule
  ]
})
export class MovieModule { }
