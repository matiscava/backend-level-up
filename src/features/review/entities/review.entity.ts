import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../../../config/base/base.entity";
import { CustomerEntity } from "../../customer/entities/customer.entity";
import { ProductEntity } from "../../product/entities/product.entity";

@Entity({ name: "review" })
export class ReviewEntity extends BaseEntity {
  @Column({default: () => 'CURRENT_TIMESTAMP'})
  timestamp!: Date;

  @Column()
  review!: string;
  
  @Column("float",{precision: 6, scale: 2})
  stars!: number;

  @ManyToOne( () => CustomerEntity, (customer) => customer.reviews )
  @JoinColumn({ name: "customer_id" })
  customer!: CustomerEntity;

  @ManyToOne( () => ProductEntity, (product) => product.reviews )
  @JoinColumn({ name: "product_id" })
  product!: ProductEntity;
}