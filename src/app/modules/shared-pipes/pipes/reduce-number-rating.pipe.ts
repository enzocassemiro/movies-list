import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'reduceNumberRating'
})
export class ReduceNumberRatingPipe implements PipeTransform {

  transform(value: number): number {
    const newRating = Number((value/2).toFixed(1))
    return newRating;
  }

}
