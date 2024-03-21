import { IsNotEmpty, IsOptional } from "class-validator";
import { BaseDTO } from "../../../config/base/base.dto";
import { RoleType } from "../../../shared/enums/role-type.enum";
import { CustomerEntity } from "../../customer/entities/customer.entity";

export class UserDTO extends BaseDTO {
  @IsNotEmpty()
  name!: string;
  
  @IsNotEmpty()
  lastname!: string;
  
  @IsNotEmpty()
  username!: string;
  
  @IsNotEmpty()
  email!: string;
  
  @IsOptional()
  customer?: CustomerEntity;

  @IsNotEmpty()
  password!: string;
  
  @IsNotEmpty()
  phoneNumber!: string;

  @IsNotEmpty()
  role!: RoleType;
}

