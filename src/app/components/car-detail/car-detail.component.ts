import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { Brand } from 'src/app/models/brands';
import { CarDetail } from 'src/app/models/cardetails';
import { Color } from 'src/app/models/colors';
import { BrandService } from 'src/app/services/brand.service';
import { CarDetailService } from 'src/app/services/car-detail.service';
import { ColorService } from 'src/app/services/color.service';
import { DateTimeService } from 'src/app/services/date-time.service';
import { RentalDetailService } from 'src/app/services/rental-detail.service';
import { SingleResponseModel } from 'src/app/models/singleResponseModel';

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
  selectedCarForRental: CarDetail;
  rentalDate: string;
  returnDate: string;

  validateRentalDates: boolean = false;
  rentalPeriod:number;
  rentalConfirmation: SingleResponseModel<boolean>;

  constructor(
    private carDetailService: CarDetailService,
    private activatedRoute: ActivatedRoute,
    private brandService: BrandService,
    private colorService: ColorService,
    private dateTimeService: DateTimeService,
    private rentalDetailService: RentalDetailService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe(params=>{
      if(params["brandId"]){
        this.getCarsByBrand(params["brandId"])
      }else if(params["colorId"]){
        this.getCarsByColor(params["colorId"])
      }else{
        this.rentalDate = undefined!
        this.returnDate = undefined!
        this.validateRentalDates = false
        this.rentalPeriod = undefined!
        this.rentalConfirmation = undefined!
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
    return this.currentCar.carName;
  }

  getSelectedCarForRental(carDetail:CarDetail){
    this.selectedCarForRental = carDetail;
  }

  getSelectedCarForRentalImageSrc(){
    return this.imgBaseUrl + this.selectedCarForRental.carImagePath[0];
  }

  getDateNow(){
    return this.dateTimeService.getDateNow();
  }

  addDayToDate(date:Date, addedDay:number){
    return this.dateTimeService.addDayToDate(date, addedDay);
  }

  convertStringToDate(dateString:string){
    return this.dateTimeService.convertStringToDate(dateString);
  }

  validateReservationDates(rentDate: string, returnDate: string) {
    if (!rentDate || !returnDate) {
      return;
    }
    let newRentDate = this.convertStringToDate(rentDate);
    let newReturnDate = this.convertStringToDate(returnDate);
    if (newRentDate >= newReturnDate) {
      this.validateRentalDates = false;
    } else {
      this.validateRentalDates = true;
    }
  }

  getRentalPeriod(rentDate: Date, returnDate: Date): number {
    return this.dateTimeService.getRentalPeriod(rentDate, returnDate);
  }

  calculateRentalPeriod() {
    this.rentalPeriod = this.getRentalPeriod(this.convertStringToDate(this.rentalDate), this.convertStringToDate(this.returnDate))
  }

  checkIfAnyReservationsBetweenSelectedDates(carId: number, rentalDate: string, returnDate: string) {
    if (!carId || !rentalDate || !returnDate) {
      return
    }
    this.validateReservationDates(rentalDate, returnDate);
    if (this.validateRentalDates === true) {
      this.rentalDetailService.checkIfCanCarBeRentedBetweenSelectedDates(carId, rentalDate, returnDate).subscribe(response => {
        this.rentalConfirmation = response;
      }, error => {
        this.rentalConfirmation = error.error;
      })
    }
  }

  goToPayment(){
    console.log("ödeme sistemine git")
  }
}
