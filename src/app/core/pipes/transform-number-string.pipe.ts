import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'transformNumberString'
})
export class TransformNumberStringPipe implements PipeTransform {

  transform(value: number): string {
    const newString = String(value); 
    return newString
  }

}
