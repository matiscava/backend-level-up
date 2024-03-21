import { NextFunction, Request, Response } from "express";
import { SharedMiddleware } from "../../../shared/middleware/shared.middleware";
import { UserDTO } from "../dto/user.dto";
import { validate } from "class-validator";

export class UserMiddleware extends SharedMiddleware {
  constructor() {
    super();
  };

  validator(req:Request, res:Response, next:NextFunction) {
    const {
      name, lastname, email, username, password,phoneNumber, role
    } = req.body;

    const valid = new UserDTO();
    valid.name = name;
    valid.lastname = lastname;
    valid.email = email;
    valid.username = username;
    valid.password = password;
    valid.phoneNumber = phoneNumber;
    valid.role = role;

    validate(valid).then( (err) => {
      err.length 
        ? this.httpResponse.Error(res,err)
        : next();
    } );

  }
}