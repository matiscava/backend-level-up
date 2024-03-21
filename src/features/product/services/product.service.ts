import QueryString from "qs";
import { BaseService } from "../../../config/base/base.service";
import { ProductEntity } from "../entities/product.entity";
import { ProductDTO } from "../dto/product.dto";
import { DeleteResult, UpdateResult } from "typeorm";

export class ProductService extends BaseService<ProductEntity> {
  constructor() {
    super(ProductEntity);
  }

  async findAll() : Promise<ProductEntity[]> {
    return (await this.execRepository).find();
  }

  async findById(id:string) : Promise<ProductEntity | null> {
    return (await this.execRepository).findOneBy({id});    
  }

  async findByName(productName: | string | string[] | QueryString.ParsedQs | QueryString.ParsedQs[] ) : Promise<ProductEntity[] | []> {
    return (await this.execRepository)
      .createQueryBuilder("product")
      .where("product.name like :productName", {productName: `%${productName}%`})
      .getMany();
  }

  async findWithReviews(id:string) : Promise<ProductEntity | null> {
    return (await this.execRepository)
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.reviews', 'review')
      .where('product.id = :id', { id })
      .getOne();
  }
  
  async create(body: ProductDTO) : Promise<ProductEntity> {
    return (await this.execRepository).save(body);
  }

  async update(id:string, infoUpdate:ProductDTO) : Promise<UpdateResult> {
    return (await this.execRepository).update(id,infoUpdate);
  }

  async delete(id:string) : Promise<DeleteResult> {
    return (await this.execRepository).delete({id});
  }
}