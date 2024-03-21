import { Request, Response } from "express";
import { SharedMiddleware } from "../../../shared/middleware/shared.middleware";
import { NextFunction } from "express-serve-static-core";
import { BrandDTO } from "../dto/brand.dto";
import { validate } from "class-validator";

export class BrandMiddleware extends SharedMiddleware {
  constructor() {
    super();
  }

  validator(req:Request, res:Response, next:NextFunction) {
    const { name, image } = req.body;

    const valid = new BrandDTO();
    valid.name = name;
    valid.image = image;

    validate(valid).then( (err) => {
      err.length 
        ? this.httpResponse.Error(res,err)
        : next();
    } );

  }
}