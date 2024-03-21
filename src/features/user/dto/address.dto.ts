import { IsNotEmpty } from "class-validator";
import { BaseDTO } from "../../../config/base/base.dto";
import { UserEntity } from "../entities/user.entity";
import { AddressEntity } from "../entities/address.entity";

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
  user!: UserEntity;

  @IsNotEmpty()
  isSelected!: boolean;
}