import { IsNotEmpty } from "class-validator";
import { BaseDTO } from "../../../config/base/base.dto";
import { CustomerEntity } from "../entities/customer.entity";

export class AddressDTO extends BaseDTO {

  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  street!: string;

  @IsNotEmpty()
  city!: string;

  @IsNotEmpty()
  state!: string;

  @IsNotEmpty()
  postalCode!: number;

  @IsNotEmpty()
  country!: string;

  @IsNotEmpty()
  customer!: CustomerEntity;

  @IsNotEmpty()
  isSelected!: boolean;
}