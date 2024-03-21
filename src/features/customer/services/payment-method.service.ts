import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../../config/base/base.service";
import { PaymentMethodDTO } from "../dto/payment-method.dto";
import { PaymentMethodEntity } from "../entities/payment-method.entity";

export class PaymentMethodService extends BaseService<PaymentMethodEntity> {
  constructor() {
    super(PaymentMethodEntity);
  }

  async findAll() : Promise<PaymentMethodEntity[]> {
    return (await this.execRepository).find();
  }

  async findById( id: string ) : Promise<PaymentMethodEntity | null> {
    return (await this.execRepository).findOneBy({id});
  }

  async findByCustomerId(customerId:string) : Promise<PaymentMethodEntity[]> {
    return (await this.execRepository)
      .createQueryBuilder('payment-method')
      .where('payment-method.customer_id = :customerId', {customerId})
      .getMany();
  }
  
  async create(body:PaymentMethodDTO) : Promise<PaymentMethodEntity> {
    return (await this.execRepository).save(body);
  }

  async update(id:string, infoUpdate:PaymentMethodDTO): Promise<UpdateResult> {
    return (await this.execRepository).update(id,infoUpdate);
  }

  async delete(id:string) : Promise<DeleteResult> {
    return (await this.execRepository).delete({ id });
  }
}