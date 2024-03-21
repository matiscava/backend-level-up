import { Column, Entity, JoinColumn, OneToMany, OneToOne } from "typeorm";
import { BaseEntity } from "../../../config/base/base.entity";
import { AddressEntity } from "./address.entity";
import { RoleType } from "../../../shared/enums/role-type.enum";
import { Exclude } from "class-transformer";
import { CustomerEntity } from "../../customer/entities/customer.entity";

@Entity({name: "user"})
export class UserEntity extends BaseEntity {
  
  @Column()
  name!: string;
  
  @Column()
  lastname!: string;
  
  @Column()
  username!: string;
  
  @Column({unique: true})
  email!: string;
  
  @Column()
  phoneNumber!: string;

  @OneToOne( () => CustomerEntity, (customer) => customer.user )
  customer?: CustomerEntity; 

  @Exclude()
  @Column({select: false})
  password!: string;

  @OneToMany( () => AddressEntity, (address) => address.user )
  addresses!: AddressEntity[];   

  @Column({ type: "enum", enum: RoleType, nullable: false })
  role!: RoleType;
}