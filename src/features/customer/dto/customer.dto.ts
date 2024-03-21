import { IsNotEmpty } from "class-validator";
import { BaseDTO } from "../../../config/base/base.dto";
import { UserEntity } from "../../user/entities/user.entity";

export class CustomerDTO extends BaseDTO {
  @IsNotEmpty()
  dni!: number;

  @IsNotEmpty()
  user!: UserEntity;
}