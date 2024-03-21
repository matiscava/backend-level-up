import { Column, Entity, OneToMany } from "typeorm";
import { BaseEntity } from "../../../config/base/base.entity";
import { ProductEntity } from "../../product/entities/product.entity";

@Entity({name: "category"})
export class CategoryEntity extends BaseEntity {
  
  @Column()
  name!: string;

  @Column()
  image!: string;

  @OneToMany(() => ProductEntity, (product) => product.category)
  products!: ProductEntity[];
}