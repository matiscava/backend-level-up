import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../../config/base/base.service";
import { CustomerDTO } from "../dto/customer.dto";
import { CustomerEntity } from "../entities/customer.entity";

export class CustomerService extends BaseService<CustomerEntity> {
  constructor() {
    super(CustomerEntity);
  }

  async findAll() : Promise<CustomerEntity[]> {
    return (await this.execRepository).find();
  }

  async findById( id: string ) : Promise<CustomerEntity | null> {
    return (await this.execRepository).findOneBy({id});
  }

  async findWitRelation( id:string ) : Promise<CustomerEntity | null> {
    return (await this.execRepository)
      .createQueryBuilder("customer")
      .leftJoinAndSelect('customer.addresses', 'address')
      .leftJoinAndSelect('customer.payment-method', 'payment-method')
      .where({id})
      .andWhere('address.isSelected = :isSelected', {isSelected : true})
      .andWhere('payment-method.isSelected = :isSelected', {isSelected : true})
      .getOne();
  }

  async create(body:CustomerDTO) : Promise<CustomerEntity> {
    return (await this.execRepository).save(body);
  }

  async update(id:string, infoUpdate:CustomerDTO): Promise<UpdateResult> {
    return (await this.execRepository).update(id,infoUpdate);
  }

  async delete(id:string) : Promise<DeleteResult> {
    return (await this.execRepository).delete({ id });
  }

}