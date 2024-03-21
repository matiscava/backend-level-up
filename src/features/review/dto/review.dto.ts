import { IsNotEmpty } from "class-validator";
import { BaseDTO } from "../../../config/base/base.dto";
import { CustomerEntity } from "../../customer/entities/customer.entity";
import { ProductEntity } from "../../product/entities/product.entity";

export class ReviewDTO extends BaseDTO {
  @IsNotEmpty()
  timestamp!: Date;

  @IsNotEmpty()
  review!: string;

  @IsNotEmpty()
  stars!: number;

  @IsNotEmpty()
  customer!: CustomerEntity;

  @IsNotEmpty()
  product!: ProductEntity;
}