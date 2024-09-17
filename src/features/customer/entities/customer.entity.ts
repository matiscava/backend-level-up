import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { BaseEntity } from "../../../config/base/base.entity";
import { UserEntity } from "../../user/entities/user.entity";
import { PurchaseEntity } from "../../purchase/entities/purchase.entity";
import { PaymentMethodEntity } from "./payment-method.entity";
import { ReviewEntity } from "../../review/entities/review.entity";
import { AddressEntity } from "./address.entity";

@Entity({name: 'customer'})
export class CustomerEntity extends BaseEntity {
  @Column()
  dni!: number;

  @OneToOne( () => UserEntity, (user) => user.customer )
  @JoinColumn({name: "user_id"})
  user!: UserEntity;
  
  @OneToMany(() => PurchaseEntity, (purchase) => purchase.customer)
  purchases!: PurchaseEntity[];

  @OneToMany(() => PaymentMethodEntity, (paymentMethod) => paymentMethod.customer)
  paymentMethods!: PaymentMethodEntity[];

  @OneToMany(() => ReviewEntity, (review) => review.customer)
  reviews!: ReviewEntity[];

  @OneToMany(() => AddressEntity, (address) => address.customer)
  addresses!: AddressEntity[];
}