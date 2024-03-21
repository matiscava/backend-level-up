import { NextFunction, Request, Response } from "express";
import { SharedMiddleware } from "../../../shared/middleware/shared.middleware";
import { PurchaseDTO } from "../dto/purchase.dto";
import { validate } from "class-validator";

export class PurchaseMiddleware extends SharedMiddleware{
  constructor( ){
    super();
  }

  validator( req:Request, res:Response, next:NextFunction ) {
    const {
      status, paymentMethod, customer, purchaseDate
    } = req.body;

    const valid = new PurchaseDTO();
    valid.status = status;
    valid.purchaseDate = purchaseDate;
    valid.paymentMethod = paymentMethod;
    valid.customer = customer;

    validate(valid).then( (err) => {
      err.length
        ? this.httpResponse.Error(res,err)
        : next();
    } );
  }

  
}