import { Component, OnInit } from '@angular/core';
import { CarDetail } from 'src/app/models/cardetails';
import { CarDetailService } from 'src/app/services/car-detail.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  carDetails: CarDetail[] = [];
  dataLoaded = false;
  currentCar?:CarDetail;
  imgBaseUrl:string="https://localhost:44389/uploads/images/"; 
  
  constructor(private carDetailService: CarDetailService) {}

  ngOnInit(): void {
    this.getCarDetails();
  }

  getCarDetails() {
    this.carDetailService.getCarDetails().subscribe((response) => {
      this.carDetails = response.data;
      this.dataLoaded = true;
    });
  }

  getCurrentCarClass(carDetail:CarDetail){
    this.currentCar=carDetail;
  }

  setCurrentCarImageSrc(){
     return this.imgBaseUrl + this.currentCar?.carImagePath[0]
  }

  setCurrentCarImageAlt(){
    return this.currentCar?.carName
  }
  
}
