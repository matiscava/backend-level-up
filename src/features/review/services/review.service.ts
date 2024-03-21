import { DeleteResult, UpdateResult } from "typeorm";
import { BaseService } from "../../../config/base/base.service";
import { ReviewDTO } from "../dto/review.dto";
import { ReviewEntity } from "../entities/review.entity";

export class ReviewService extends BaseService<ReviewEntity> {
  constructor() {
    super(ReviewEntity);
  }

    
  async findAll() : Promise<ReviewEntity[]> {
    return (await this.execRepository).find();
  }

  async findById( id: string ) : Promise<ReviewEntity | null> {
    return (await this.execRepository).findOneBy({id});
  }
  
  async create(body:ReviewDTO) : Promise<ReviewEntity> {
    return (await this.execRepository).save(body);
  }

  async update(id:string, infoUpdate:ReviewDTO): Promise<UpdateResult> {
    return (await this.execRepository).update(id,infoUpdate);
  }

  async delete(id:string) : Promise<DeleteResult> {
    return (await this.execRepository).delete({ id });
  }
}