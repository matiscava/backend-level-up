import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../../../config/base/base.entity";
import { PurchaseStatus } from "../../../shared/enums/purchase-status.enum";
import { CustomerEntity } from "../../customer/entities/customer.entity";
import { AddressEntity } from "../../user/entities/address.entity";
import { PurchaseProductEntity } from "./purchase-product.entity";

@Entity({name: "purchase"})
export class PurchaseEntity extends BaseEntity {

  @Column({type: "enum", enum: PurchaseStatus})
  status!: PurchaseStatus;

  @Column()
  totalAmount!: number;

  @Column()
  purchaseDate!: Date;

  @Column()
  deliveryDate?: Date;

  @ManyToOne(() => CustomerEntity, (customer) => customer.purchases)
  @JoinColumn({name: "customer_id"})
  customer!: CustomerEntity;

  @Column()
  paymentMethod!: string;

  @ManyToOne(() => AddressEntity, (address) => address.purchases)
  @JoinColumn({name: "address_id"})
  address!: AddressEntity;

  @OneToMany(() => PurchaseProductEntity, (purchaseProduct) => purchaseProduct.purchase )
  puchasePorducts!: PurchaseProductEntity[];

}