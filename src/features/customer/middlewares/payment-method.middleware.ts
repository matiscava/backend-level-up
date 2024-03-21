import { NextFunction, Request, Response } from "express";
import { SharedMiddleware } from "../../../shared/middleware/shared.middleware";
import { PaymentMethodEntity } from "../entities/payment-method.entity";
import { validate } from "class-validator";

export class PaymentMethodMiddleware extends SharedMiddleware {
  constructor() {
    super();
  }

  validator( req:Request, res:Response, next:NextFunction ) {
    const { name, type, customer } = req.body;

    const valid = new PaymentMethodEntity();
    valid.name = name;
    valid.type = type;
    valid.customer = customer;

    validate(valid).then( (err) => {
      err.length
        ? this.httpResponse.Error(res,err)
        : next();
    } );
  }
}