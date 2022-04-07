import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Brand } from 'src/app/models/brands';
import { CarDetail } from 'src/app/models/cardetails';
import { Color } from 'src/app/models/colors';
import { BrandService } from 'src/app/services/brand.service';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { ColorService } from 'src/app/services/color.service';

@Component({
  selector: 'app-car-detail',
  templateUrl: './car-detail.component.html',
  styleUrls: ['./car-detail.component.css'],
})
export class CarDetailComponent implements OnInit {
  carDetails: CarDetail[] = [];
  dataLoaded = false;
  currentCar: CarDetail;
  imgBaseUrl: string = 'https://localhost:44389/uploads/images/';
  carFilterText="";
  brands: Brand[]=[];
  colors: Color[]=[];
  selectedBrandId: number=0;
  selectedColorId: number=0;

  constructor(
    private carDetailService: CarDetailService,
    private activatedRoute: ActivatedRoute,
    private brandService: BrandService,
    private colorService: ColorService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"]){
        this.getCarsByBrand(params["brandId"])
      }else if(params["colorId"]){
        this.getCarsByColor(params["colorId"])
      }else{
        this.getCarDetails()
        this.getBrands()
        this.getColors()
      }
    })
  }

  filter(){
    if(this.selectedBrandId == 0 && this.selectedColorId == 0){
      this.getCarDetails()
    }
    else if(this.selectedBrandId == 0){
      this.getCarsByColor(this.selectedColorId)
    }
    else if(this.selectedColorId == 0){
      this.getCarsByBrand(this.selectedBrandId)
    }
    else{
      this.getCarDetailsByFilter(this.selectedBrandId,this.selectedColorId)
    }
  }

  clearFilter(){
    this.selectedBrandId = 0;
    this.selectedColorId = 0;
    this.getCarDetails()
  }

  getCarDetails() {
    this.carDetailService.getCarDetails().subscribe(response => {
      this.carDetails = response.data;
      this.dataLoaded = true;
    });
  }

  getBrands(){
    this.brandService.getBrands().subscribe(response=>{
      this.brands = response.data;
    })
  }

  getColors(){
    this.colorService.getColors().subscribe(response=>{
      this.colors = response.data;
    })
  }

  getCarsByBrand(brandId: number) {
    this.carDetailService.getCarsByBrand(brandId).subscribe(response => {
      this.carDetails = response.data;
      this.dataLoaded = true;
    });
  }

  getCarsByColor(colorId: number) {
    this.carDetailService.getCarsByColor(colorId).subscribe(response => {
      this.carDetails = response.data;
      this.dataLoaded = true;
    });
  }

  getCarDetailsByFilter(brandId:number,colorId:number){
    this.carDetailService.getCarDetailsByFilter(brandId,colorId).subscribe(response=>{
      this.carDetails = response.data;
    })
  }

  getCurrentCarClass(carDetail: CarDetail) {
    this.currentCar = carDetail;
  }

  setCurrentCarImageSrc() {
    return this.imgBaseUrl + this.currentCar.carImagePath[0];
  }

  setCurrentCarImageAlt() {
    return this.currentCar.carName
  }
}
