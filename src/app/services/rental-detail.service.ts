import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ListResponseModel } from '../models/listResponseModel';
import { RentalDetail } from '../models/rentaldetails';
import { SingleResponseModel } from '../models/singleResponseModel';

@Injectable({
  providedIn: 'root'
})
export class RentalDetailService {

  apiUrl="https://localhost:44389/api/"
  constructor(private httpClient:HttpClient) { }

  getRentalDetails():Observable<ListResponseModel<RentalDetail>>{
    let newPath = this.apiUrl + "rentals/getrentaldetails"
    return this.httpClient.get<ListResponseModel<RentalDetail>>(newPath);
  }

  checkIfCanCarBeRentedBetweenSelectedDates(carId:number, rentDate:string, returnDate:string):Observable<SingleResponseModel<boolean>>{
    let newPath = this.apiUrl + "rentals/checkifcancarberentedbetweenselecteddates?carId=" + carId + "&rentDate=" + rentDate + "&returnDate=" + returnDate
    return this.httpClient.get<SingleResponseModel<boolean>>(newPath);
  }
}
