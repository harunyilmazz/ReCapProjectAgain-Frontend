import { Pipe, PipeTransform } from '@angular/core';
import { CarDetail } from '../models/cardetails';

@Pipe({
  name: 'carFilter'
})
export class CarFilterPipe implements PipeTransform {

  transform(value: CarDetail[], carFilterText: string): CarDetail[] {
    carFilterText= carFilterText? carFilterText.toLocaleLowerCase():""
    return carFilterText?value.filter((c:CarDetail)=>c.carName.toLocaleLowerCase().indexOf(carFilterText)!==-1):value
  }

}
