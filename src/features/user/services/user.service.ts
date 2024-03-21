import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../../config/base/base.service";
import { RoleType } from "../../../shared/enums/role-type.enum";
import { encrypt } from "../../../shared/utils/bcrypt.handle";
import { UserDTO } from "../dto/user.dto";
import { UserEntity } from "../entities/user.entity";

export class UserService extends BaseService<UserEntity> {
  constructor() {
    super(UserEntity);
  }

  async findAll() : Promise<UserEntity[]> {
    return (await this.execRepository).find();
  }

  async findById( id: string ) : Promise<UserEntity | null> {
    return (await this.execRepository).findOneBy({id});
  }

  async findWithRole(id: string, role: RoleType) : Promise<UserEntity | null> {
    return (await this.execRepository)
      .createQueryBuilder('user')
      .where({ id })
      .andWhere({ role })
      .getOne()
  }
  
  async findByEmail(email:string) : Promise<UserEntity | null> {
    return (await this.execRepository)
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where({ email })
      .getOne();
  }
    
  async findByUsername(username:string) : Promise<UserEntity | null> {
    return (await this.execRepository)
      .createQueryBuilder('user')
      .addSelect('user.password')
      .where({ username })
      .getOne();
  }

  async findWithRelation(id:string) : Promise<UserEntity | null> {
    return (await this.execRepository)
      .createQueryBuilder('user')
      .leftJoinAndSelect('user.addresses', 'address')
      .leftJoinAndSelect('user.customer','customer')
      .where('user.id = :id', { id })
      .andWhere('address.isSelected = :isSelected', { isSelected: true })
      .getOne();
  }

  async create(body:UserDTO) : Promise<UserEntity> {
    const newUser = (await this.execRepository).create(body);
    const hash = await encrypt(newUser.password.trim());

    newUser.password = hash;

    return (await this.execRepository).save(newUser);
  }

  async update(id:string, infoUpdate:UserDTO): Promise<UpdateResult> {
    return (await this.execRepository).update(id,infoUpdate);
  }

  async delete(id:string) : Promise<DeleteResult> {
    return (await this.execRepository).delete({ id });
  }

}