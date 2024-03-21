import { IsNotEmpty, IsOptional } from "class-validator";
import { BaseDTO } from "../../../config/base/base.dto";
import { PurchaseEntity } from "../entities/purchase.entity";
import { ProductEntity } from "../../product/entities/product.entity";

export class PurchaseProductDTO extends BaseDTO {
  
  @IsNotEmpty()
  quantity!: number;
  
  @IsOptional()
  totalPrice?: number;

  @IsOptional()
  purchase?: PurchaseEntity;

  @IsOptional()
  product?: ProductEntity;

}