import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../../../config/base/base.entity";
import { PurchaseEntity } from "./purchase.entity";
import { ProductEntity } from "../../product/entities/product.entity";

@Entity({name: 'purchase-product'})
export class PurchaseProductEntity extends BaseEntity {
  
  @Column()
  quantity!: number;

  @Column()
  totalPrice!: number;

  @ManyToOne( () => PurchaseEntity, (purchase) => purchase.puchasePorducts )
  @JoinColumn({name: "puchase_id"})
  purchase!: PurchaseEntity;

  @ManyToOne( () => ProductEntity, (product) => product.purchaseProducts )
  @JoinColumn({ name: "product_id" })
  product!: ProductEntity;
}