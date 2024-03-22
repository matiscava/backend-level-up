import { Request, Response } from "express";
import { SharedMiddleware } from "../../../shared/middleware/shared.middleware";
import { NextFunction } from "express-serve-static-core";
import { AddressDTO } from "../dto/address.dto";
import { validate } from "class-validator";

export class AddressMiddleware extends SharedMiddleware {
  constructor () {
    super();
  };

  validator(req:Request, res:Response, next:NextFunction) {
    const { name, street, city, state, postalCode, country, customer, isSelected } = req.body;

    const valid = new AddressDTO();
    valid.name = name;
    valid.street = street;
    valid.city = city;
    valid.state = state;
    valid.postalCode = postalCode;
    valid.country = country;
    valid.customer = customer;
    valid.isSelected = isSelected;

    validate(valid).then( (err) => {
      err.length 
        ? this.httpResponse.Error(res,err)
        : next();
    } );

  }

}