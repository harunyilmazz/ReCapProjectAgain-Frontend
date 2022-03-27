import { RentalDetail } from "./rentaldetails";
import { ResponseModel } from "./responseModel";

export interface RentalDetailResponseModel extends ResponseModel{
    data:RentalDetail[];
}