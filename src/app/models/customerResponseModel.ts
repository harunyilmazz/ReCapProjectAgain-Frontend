import { Customer } from "./customers";
import { ResponseModel } from "./responseModel";

export interface CustomerResponseModel extends ResponseModel{
    data:Customer[];
}