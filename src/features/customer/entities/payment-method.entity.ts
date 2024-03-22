import { Column, Entity, JoinColumn, ManyToOne } from "typeorm";
import { BaseEntity } from "../../../config/base/base.entity";
import { PaymentMethodType } from "../../../shared/enums/payment-method-type.enum";
import { CustomerEntity } from "./customer.entity";

@Entity({name: "payment-method"})
export class PaymentMethodEntity extends BaseEntity {
  @Column()
  name!: string;

  @Column({ type: "enum", enum: PaymentMethodType})
  type!: PaymentMethodType; 

  @Column()
  cardNumber?: number;

  @Column()
  securityNumber?: number;

  @Column()
  alias?: string;

  @Column()
  isSelected!: boolean;

  @ManyToOne(() => CustomerEntity, (customer) => customer.paymentMethods )
  @JoinColumn({ name: "customer_id" })
  customer!: CustomerEntity;

}