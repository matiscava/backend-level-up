import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from "typeorm";
import { BaseEntity } from "../../../config/base/base.entity";
import { UserEntity } from "./user.entity";
import { PurchaseEntity } from "../../purchase/entities/purchase.entity";

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

  @ManyToOne( () => UserEntity, (user) => user.addresses )
  @JoinColumn({name: "user_id"})
  user!: UserEntity;

  @Column({default: true})
  isSelected!: boolean;

  @OneToMany( () => PurchaseEntity, (purchase) => purchase.address )
  purchases!: PurchaseEntity[];
}