import { IsNotEmpty, IsOptional } from "class-validator";
import { BaseDTO } from "../../../config/base/base.dto";
import { CategoryEntity } from "../../category/entities/category.entity";
import { BrandEntity } from "../../brand/entities/brand.entity";

export class ProductDTO extends BaseDTO {
  
  @IsNotEmpty()
  title!: string;
  
  @IsNotEmpty()
  description!: string;
  
  @IsNotEmpty()
  stock!: number;
  
  @IsNotEmpty()
  price!: number;
  
  @IsOptional()
  salePrice?: number;
  
  @IsNotEmpty()
  image!: string;
  
  @IsNotEmpty()
  brand!: BrandEntity;
  
  @IsNotEmpty()
  category!: CategoryEntity;
}