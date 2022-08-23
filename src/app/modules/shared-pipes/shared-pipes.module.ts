import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReduceNumberRatingPipe } from 'src/app/modules/shared-pipes/pipes/reduce-number-rating.pipe';
import { TransformNumberStringPipe } from 'src/app/modules/shared-pipes/pipes/transform-number-string.pipe';



@NgModule({
  declarations: [
    ReduceNumberRatingPipe,
    TransformNumberStringPipe],
  imports: [
    CommonModule
  ],
  exports: [
    ReduceNumberRatingPipe,
    TransformNumberStringPipe
  ]
})
export class SharedPipesModule { }
