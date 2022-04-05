import { Pipe, PipeTransform } from '@angular/core';
import { CarDetail } from '../models/cardetails';

@Pipe({
  name: 'colorFilter'
})
export class ColorFilterPipe implements PipeTransform {

  transform(value: CarDetail[], colorFilterText: string): CarDetail[] {
    colorFilterText = colorFilterText?colorFilterText.toLocaleLowerCase():""
    return colorFilterText?value.filter((c:CarDetail)=>c.colorName.toLocaleLowerCase().indexOf(colorFilterText)!==-1):value
  }

}
