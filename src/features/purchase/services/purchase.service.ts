import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../../config/base/base.service";
import { PurchaseDTO } from "../dto/purchase.dto";
import { PurchaseEntity } from "../entities/purchase.entity";

export class PurchaseService extends BaseService<PurchaseEntity> {
  constructor() {
    super(PurchaseEntity);
  }
  
  async findAll() : Promise<PurchaseEntity[]> {
    return (await this.execRepository).find();
  }

  async findById( id: string ) : Promise<PurchaseEntity | null> {
    return (await this.execRepository).findOneBy({id});
  }

  async findWithProduct(id:string) : Promise<PurchaseEntity | null> {
    return (await this.execRepository)
      .createQueryBuilder('purchase')
      .leftJoinAndSelect('puchase.purchase-product', 'purchase-product')
      .where({id})
      .getOne();
  }

  
  async create(body:PurchaseDTO) : Promise<PurchaseEntity> {
    const newPurchase = (await this.execRepository).create(body);
    let totalAmount = 0;
    
    newPurchase.puchasePorducts.map((purchaseProduct) => totalAmount += purchaseProduct.totalPrice);
    newPurchase.totalAmount = totalAmount;

    return (await this.execRepository).save(newPurchase);
  }

  async update(id:string, infoUpdate:PurchaseDTO): Promise<UpdateResult> {
    return (await this.execRepository).update(id,infoUpdate);
  }

  async delete(id:string) : Promise<DeleteResult> {
    return (await this.execRepository).delete({ id });
  }

}