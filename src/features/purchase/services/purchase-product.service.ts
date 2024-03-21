import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../../config/base/base.service";
import { PurchaseProductEntity } from "../entities/purchase-product.entity";
import { PurchaseProductDTO } from "../dto/purchase-product.dto";
import { ProductService } from "../../product/services/product.service";

export class PurchaseProductService extends BaseService<PurchaseProductEntity> {
  constructor(
    private readonly productService: ProductService = new ProductService(),
  ) {
    super(PurchaseProductEntity);
  }

  
  async findAll() : Promise<PurchaseProductEntity[]> {
    return (await this.execRepository).find();
  }

  async findById( id: string ) : Promise<PurchaseProductEntity | null> {
    return (await this.execRepository).findOneBy({id});
  }

  
  async create(body:PurchaseProductDTO) : Promise<PurchaseProductEntity> {
    const newPurchaseProduct = (await this.execRepository).create(body);
    const product = await this.productService.findById(newPurchaseProduct.product.id);
    newPurchaseProduct.totalPrice = product!.price * newPurchaseProduct.quantity;
    
    return (await this.execRepository).save(newPurchaseProduct);
  }

  async update(id:string, infoUpdate:PurchaseProductDTO): Promise<UpdateResult> {
    return (await this.execRepository).update(id,infoUpdate);
  }

  async delete(id:string) : Promise<DeleteResult> {
    return (await this.execRepository).delete({ id });
  }

}