import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'shortener'
})
export class ShortenerPipe implements PipeTransform {

  // This pipe checks if the value has number after separator
  transform(value: number): number {
    let changedValue!: any;
    if(value) {
      changedValue = value.toFixed(2);
      if(String(changedValue).indexOf(',00') > -1 || String(changedValue).indexOf('.00') > -1) {
        return +value.toFixed(0);
      }
      return +value.toFixed(2);
    }
    return 0;
  };

}
