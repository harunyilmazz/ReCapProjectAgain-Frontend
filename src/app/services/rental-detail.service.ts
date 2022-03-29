import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { RentalDetail } from '../models/rentaldetails';

@Injectable({
  providedIn: 'root'
})
export class RentalDetailService {

  apiUrl="https://localhost:44389/api/rentals/getrentaldetails"
  constructor(private httpClient:HttpClient) { }

  getRentalDetails():Observable<ListResponseModel<RentalDetail>>{
    return this.httpClient.get<ListResponseModel<RentalDetail>>(this.apiUrl);
  }
}
