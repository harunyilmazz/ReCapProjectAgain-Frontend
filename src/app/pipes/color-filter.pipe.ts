import { Pipe, PipeTransform } from '@angular/core';
import { Color } from '../models/colors';

@Pipe({
  name: 'colorFilter'
})
export class ColorFilterPipe implements PipeTransform {

  transform(value: Color[], colorFilterText: string): Color[] {
    colorFilterText = colorFilterText?colorFilterText.toLocaleLowerCase():""
    return colorFilterText?value.filter((c:Color)=>c.colorName.toLocaleLowerCase().indexOf(colorFilterText)!==-1):value
  }

}
