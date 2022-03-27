import { CarDetail } from "./cardetails";
import { ResponseModel } from "./responseModel";

export interface CarDetailResponseModel extends ResponseModel{
    data:CarDetail[]
}