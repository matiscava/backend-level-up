import { IsNotEmpty } from "class-validator";
import { BaseDTO } from "../../../config/base/base.dto";

export class BrandDTO extends BaseDTO {
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  image!: string;
}