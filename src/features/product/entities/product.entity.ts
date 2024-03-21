import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../../../config/base/base.entity";
import { CategoryEntity } from "../../category/entities/category.entity";
import { BrandEntity } from "../../brand/entities/brand.entity";
import { PurchaseProductEntity } from "../../purchase/entities/purchase-product.entity";
import { ReviewEntity } from "../../review/entities/review.entity";

@Entity({name: "product"})
export class ProductEntity extends BaseEntity {
  @Column()
  title!: string;
  
  @Column()
  description!: string;
  
  @Column()
  stock!: number;

  @Column()
  price!: number;

  @Column()
  salePrice?: number;

  @Column()
  image!: string;

  @ManyToOne( () => BrandEntity, (brand) => brand.products )
  @JoinColumn({name: "brand_id"})
  brand!: BrandEntity;

  @ManyToOne(() => CategoryEntity, (category) => category.products)
  @JoinColumn({name: "category_id"})
  category!: CategoryEntity;

  @OneToMany(() => ReviewEntity, (review) => review.product)
  reviews!: ReviewEntity[];

  @OneToMany(() => PurchaseProductEntity, (puchaseProduct) => puchaseProduct.product )
  purchaseProducts!: PurchaseProductEntity[]; 

}