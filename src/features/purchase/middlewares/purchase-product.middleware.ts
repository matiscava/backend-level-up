import { NextFunction, Request, Response } from "express";
import { SharedMiddleware } from "../../../shared/middleware/shared.middleware";
import { validate } from "class-validator";
import { PurchaseProductDTO } from "../dto/purchase-product.dto";

export class PurchaseProductMiddleware extends SharedMiddleware {
  constructor() {
    super();
  }


  validator(req:Request, res:Response, next:NextFunction) {
    const { quantity, totalPrice, purchase, product } = req.body;

    const valid = new PurchaseProductDTO();
    valid.quantity = quantity;
    valid.totalPrice = totalPrice;
    valid.purchase = purchase;
    valid.product = product;

    validate(valid).then( (err) => {
      err.length 
        ? this.httpResponse.Error(res,err)
        : next();
    } );
  }
}