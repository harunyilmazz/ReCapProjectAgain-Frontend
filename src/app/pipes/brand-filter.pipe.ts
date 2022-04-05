import { Pipe, PipeTransform } from '@angular/core';
import { CarDetail } from '../models/cardetails';

@Pipe({
  name: 'brandFilter'
})
export class BrandFilterPipe implements PipeTransform {

  transform(value: CarDetail[], brandFilterText: string): CarDetail[] {
    brandFilterText = brandFilterText?brandFilterText.toLocaleLowerCase():""
    return brandFilterText?value.filter((c:CarDetail)=>c.brandName.toLocaleLowerCase().indexOf(brandFilterText)!==-1):value
  }

}
