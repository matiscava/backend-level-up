import { IsNotEmpty, IsOptional } from "class-validator";
import { BaseDTO } from "../../../config/base/base.dto";
import { PurchaseStatus } from "../../../shared/enums/purchase-status.enum";
import { CustomerEntity } from "../../customer/entities/customer.entity";

export class PurchaseDTO extends BaseDTO {
  
  @IsNotEmpty()
  status!: PurchaseStatus;
  
  @IsOptional()
  totalAmount?: number;

  @IsNotEmpty()
  purchaseDate!: Date;

  @IsOptional()
  deliveryDate?: Date;

  @IsNotEmpty()
  paymentMethod!: string;

  @IsNotEmpty()
  customer!: CustomerEntity;

}