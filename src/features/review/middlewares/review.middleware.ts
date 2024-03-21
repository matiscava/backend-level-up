import { NextFunction, Request, Response } from "express";
import { SharedMiddleware } from "../../../shared/middleware/shared.middleware";
import { ReviewDTO } from "../dto/review.dto";
import { validate } from "class-validator";

export class ReviewMiddleware extends SharedMiddleware {
  constructor(){
    super();
  }

  validator(req:Request, res:Response, next:NextFunction) {
    const { customer, product, review, stars, timestamp } = req.body;

    const valid = new ReviewDTO();
    valid.customer = customer;
    valid.product = product;
    valid.review = review;
    valid.stars = stars;
    valid.timestamp = timestamp;

    validate(valid).then( (err) => {
      err.length
        ? this.httpResponse.Error(res,err)
        : next();
    } );

  }
}