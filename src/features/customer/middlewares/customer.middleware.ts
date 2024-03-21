import { Request, Response } from "express";
import { SharedMiddleware } from "../../../shared/middleware/shared.middleware";
import { CustomerService } from "../services/customer.service";
import { NextFunction } from "express-serve-static-core";
import { validate } from "class-validator";
import { CustomerDTO } from "../dto/customer.dto";

export class CustomerMiddleware extends SharedMiddleware{
  constructor( ){
    super();
  }

  validator(req:Request, res:Response, next:NextFunction) {
    const { dni, user } = req.body;

    const valid = new CustomerDTO();
    valid.dni = dni;
    valid.user = user;

    validate(valid).then( (err) => {
      err.length 
        ? this.httpResponse.Error(res,err)
        : next();
    } );
  }
}