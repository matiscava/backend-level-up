import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../../config/base/base.service";
import { AddressDTO } from "../dto/address.dto";
import { AddressEntity } from "../entities/address.entity";

export class AddressService extends BaseService<AddressEntity> {
  constructor() {
    super(AddressEntity);
  }

  async findAll() : Promise<AddressEntity[]> {
    return (await this.execRepository).find();
  }

  async findById(id:string) : Promise<AddressEntity | null> {
    return (await this.execRepository).findOneBy({ id });
  }

  async findByCustomerId(customerId:string) : Promise<AddressEntity[]> {
    return (await this.execRepository)
      .createQueryBuilder('address')
      .where('address.customer_id = :id', {id: customerId})
      .getMany();
  }

  async create(body:AddressDTO) : Promise< AddressEntity > {
    return (await this.execRepository).save(body);
  }

  async update(id:string, infoUpdate:AddressDTO) : Promise<UpdateResult> {
    return (await this.execRepository).update(id,infoUpdate);
  }

  async delete(id:string) : Promise<DeleteResult> {
    return (await this.execRepository).delete({id});
  }
}