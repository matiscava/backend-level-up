import { IsNotEmpty } from "class-validator";
import { BaseDTO } from "../../../config/base/base.dto";

export class CategoryDTO extends BaseDTO {
  @IsNotEmpty()
  name!:string;

  @IsNotEmpty()
  image!:string;
}