import passport from "passport";
import { HttpResponse } from "../response/http.response";
import { NextFunction, Request, Response } from "express";
import { UserEntity } from "../../features/user/entities/user.entity";
import { RoleType } from "../enums/role-type.enum";
import { ReqExt } from "../../features/auth/interfaces/req-ext.interface";

export class SharedMiddleware {
  
  constructor(
    public httpResponse: HttpResponse = new HttpResponse(),
  ) {}

  passAuth(type: string) {
    return passport.authenticate(type, {session: false});
  }

  checkCustomerRole(req:Request, res:Response, next:NextFunction) {
    const user = req.user as UserEntity;
    user.role !== RoleType.CUSTOMER
      ? this.httpResponse.Unauthorized(res, "Permission denied")
      : next();
  }

  checkAdminRole(req:ReqExt, res:Response, next:NextFunction) {
    console.log(req);
    
    const user = req.user as UserEntity;
    console.log(`req.user: ${req.user}`);
    
    user.role !== RoleType.ADMIN
      ? this.httpResponse.Unauthorized(res, "Permission denied")
      : next();
  }

}