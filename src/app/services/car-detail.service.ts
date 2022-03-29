import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CarDetail } from '../models/cardetails';
import { ListResponseModel } from '../models/listResponseModel';

@Injectable({
  providedIn: 'root'
})
export class CarDetailService {
  apiUrl="https://localhost:44389/api/cars/getcardetails"
  constructor(private httpClient:HttpClient) { }

  getCarDetails():Observable<ListResponseModel<CarDetail>>{
    return this.httpClient.get<ListResponseModel<CarDetail>>(this.apiUrl);
  }
}
