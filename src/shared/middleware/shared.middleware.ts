import passport from "passport";
import { HttpResponse } from "../response/http.response";
import { NextFunction, Request, Response } from "express";
import { UserEntity } from "../../features/user/entities/user.entity";
import { RoleType } from "../enums/role-type.enum";

export class SharedMiddleware {
  
  constructor(
    public httpResponse: HttpResponse = new HttpResponse(),
  ) {}

  passAuth(type: string) {
    return passport.authenticate(type, {session: false});
  }

  checkAdminRole(req:Request, res:Response, next:NextFunction) {
    const user = req.user! as UserEntity | undefined;

    if(!user) {
      return this.httpResponse.Unauthorized(res, "User not Authenticated")
    }

    if(user.role !== RoleType.ADMIN) {
      return this.httpResponse.Unauthorized(res, "Permisson deneid");
    } 
    
    return next();
  }

  checkCustomerRole(req: Request, res: Response, next: NextFunction) {
    const user = req.user! as UserEntity | undefined;

    if(!user) {
      return this.httpResponse.Unauthorized(res, "User not Authenticated")
    }

    if(user.role !== RoleType.CUSTOMER)  {
      return this.httpResponse.Unauthorized(res, "Permisson deneid");
    }
    
    return next();
  }

}