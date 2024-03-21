import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../../config/base/base.service";
import { BrandDTO } from "../dto/brand.dto";
import { BrandEntity } from "../entities/brand.entity";

export class BrandService extends BaseService<BrandEntity>{
  constructor() {
    super(BrandEntity);
  }

  async findAll() : Promise<BrandEntity[]> {
    return (await this.execRepository).find();
  }

  async findById(id:string) : Promise<BrandEntity | null> {
    return (await this.execRepository).findOneBy({id});
  }

  async findWithProduct(id:string) : Promise<BrandEntity | null> {
    return (await this.execRepository)
      .createQueryBuilder('brand')
      .leftJoinAndSelect('brand.products','products')
      .where({ id })
      .getOne();
  }

  async create(body:BrandDTO) : Promise<BrandEntity> {
    return (await this.execRepository).save(body);
  }

  async update(id:string, infoUpdate:BrandDTO): Promise<UpdateResult> {
    return (await this.execRepository).update(id,infoUpdate);
  }

  async delete(id:string) : Promise<DeleteResult> {
    return (await this.execRepository).delete({ id });
  }
  
}