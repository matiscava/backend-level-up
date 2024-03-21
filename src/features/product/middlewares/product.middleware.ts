import { Request, Response } from "express";
import { SharedMiddleware } from "../../../shared/middleware/shared.middleware";
import { NextFunction } from "express-serve-static-core";
import { ProductDTO } from "../dto/product.dto";
import { validate } from "class-validator";

export class ProdructMiddleware extends SharedMiddleware {
  constructor() {
    super();
  }

  validator(req:Request, res:Response, next:NextFunction) {
    const { title, description, stock, price, salePrice, image, brand, category } 
      = req.body;

    const valid = new ProductDTO();
    valid.title = title;
    valid.description = description;
    valid.stock = stock;
    valid.price = price;
    valid.salePrice = salePrice;
    valid.image = image;
    valid.brand = brand;
    valid.category = category;

    validate(valid).then( (err) => {
      err.length
        ? this.httpResponse.Error(res,err)
        : next();
    } );
  }
}