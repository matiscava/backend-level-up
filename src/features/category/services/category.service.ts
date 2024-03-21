import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../../config/base/base.service";
import { CategoryDTO } from "../dto/category.dto";
import { CategoryEntity } from "../entities/category.entity";

export class CategoryService extends BaseService<CategoryEntity> {
  constructor() {
    super(CategoryEntity);
  }

  async findAll() : Promise <CategoryEntity[]> {
    return (await this.execRepository).find();
  } 

  async findById(id:string) : Promise<CategoryEntity | null> {
    return (await this.execRepository).findOneBy({id});
  } 

  async findWithProduct(id:string) : Promise<CategoryEntity | null> {
    return (await this.execRepository)
      .createQueryBuilder('category')
      .leftJoinAndSelect('category.products', 'products')
      .where({ id})
      .getOne();
  }

  async create(body:CategoryDTO) : Promise<CategoryEntity> {
    return (await this.execRepository).save(body);
  }

  async update(id:string, infoUpdate:CategoryDTO): Promise<UpdateResult> {
    return (await this.execRepository).update(id,infoUpdate);
  }

  async delete(id:string) : Promise<DeleteResult> {
    return (await this.execRepository).delete({ id });
  }
}