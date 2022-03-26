import { Color } from "./colors";
import { ResponseModel } from "./responseModel";

export interface ColorResponseModel extends ResponseModel{
    data:Color[];
}