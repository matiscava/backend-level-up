import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../../../config/base/base.entity";
import { UserEntity } from "../../user/entities/user.entity";
import { PurchaseEntity } from "../../purchase/entities/purchase.entity";
import { CustomerEntity } from "./customer.entity";

@Entity("address")
export class AddressEntity extends BaseEntity {
  
  @Column()
  name!: string;
  
  @Column()
  street!: string;

  @Column()
  city!: string;
  
  @Column()
  state!: string;
  
  @Column()
  postalCode!: number;
  
  @Column()
  country!: string;

  @ManyToOne( () => CustomerEntity, (customer) => customer.addresses )
  @JoinColumn({name: "customer_id"})
  customer!: CustomerEntity;

  @Column({default: true})
  isSelected!: boolean;

  @OneToMany( () => PurchaseEntity, (purchase) => purchase.address )
  purchases!: PurchaseEntity[];
}