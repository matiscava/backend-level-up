import { IsNotEmpty, IsOptional } from "class-validator"
import { BaseDTO } from "../../../config/base/base.dto"
import { CustomerEntity } from "../entities/customer.entity";
import { PaymentMethodType } from "../../../shared/enums/payment-method-type.enum";

export class PaymentMethodDTO extends BaseDTO {
  @IsNotEmpty()
  name!: string;

  @IsNotEmpty()
  type!: PaymentMethodType;

  @IsOptional()
  cardNumber?: number;

  @IsOptional()
  securityNumber?: number;

  @IsOptional()
  alias?: string;

  @IsNotEmpty()
  customer!: CustomerEntity;

}