import { NextFunction, Request, Response } from "express";
import { SharedMiddleware } from "../../../shared/middleware/shared.middleware";
import { CategoryDTO } from "../dto/category.dto";
import { validate } from "class-validator";

export class CategoryMiddleware extends SharedMiddleware {
  constructor(){
    super();
  }

  validator(req: Request, res:Response, next:NextFunction) {
    const { name, image } = req.body;

    const valid = new CategoryDTO();
    valid.name = name;
    valid.image = image;

    validate(valid).then( (err) => {
      err.length 
        ? this.httpResponse.Error(res,err)
        : next();
    } );

  }
}