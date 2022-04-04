import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { CarDetail } from 'src/app/models/cardetails';
import { CarImage } from 'src/app/models/carImages';
import { CarDetailService } from 'src/app/services/car-detail.service';

@Component({
  selector: 'app-car-detail-page',
  templateUrl: './car-detail-page.component.html',
  styleUrls: ['./car-detail-page.component.css']
})
export class CarDetailPageComponent implements OnInit {
  carDetails: CarDetail[] = [];
  dataLoaded = false;
  carImages:string[];
  imgBaseUrl: string = 'https://localhost:44389/uploads/images/';

  constructor(private carDetailService:CarDetailService, private activatedRoute:ActivatedRoute) { }

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["carId"]){
        this.getCarDetailsByCarId(params["carId"])
      }
    });
  }

  getCarDetailsByCarId(carId:number){
    this.carDetailService.getCarDetailsByCarId(carId).subscribe(response=>{
      this.carDetails = response.data;
      this.carImages = this.carDetails[0].carImagePath;
      this.dataLoaded = true;
    })
  }

  getCurrentImageClass(image: string) {
    if (image == this.carImages[0]) {
      return 'carousel-item active';
    } else {
      return 'carousel-item';
    }
  }

  getButtonClass(image: string) {
    if (image == this.carImages[0]) {
      return 'active';
    } else {
      return '';
    }
  }

}
