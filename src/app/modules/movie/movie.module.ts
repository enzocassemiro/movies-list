import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ButtonModule } from 'primeng/button';
import { DropdownModule } from 'primeng/dropdown';
import { RatingModule } from 'primeng/rating';
import { TooltipModule } from 'primeng/tooltip';
import { ReduceNumberRatingPipe } from 'src/app/core/pipes/reduce-number-rating.pipe';
import { TransformNumberStringPipe } from 'src/app/core/pipes/transform-number-string.pipe';

import { MovieRoutingModule } from './movie-routing.module';
import { PopularComponent } from './pages/popular/popular.component';

@NgModule({
  declarations: [
    PopularComponent,
    TransformNumberStringPipe,
    ReduceNumberRatingPipe
  ],
  imports: [
    CommonModule,
    MovieRoutingModule,
    DropdownModule,
    FormsModule,
    RatingModule,
    TooltipModule,
    ButtonModule
  ]
})
export class MovieModule { }
