import { NextFunction, Request, Response } from "express";
import { SharedMiddleware } from "../../shared/middleware/shared.middleware";
import { verifyToken } from "../../shared/utils/jwt.handle";

export class AuthMiddleware extends SharedMiddleware {
  constructor(){
    super();
  }

  checkJwt = (req: Request, res: Response, next:NextFunction) => {
    try {
      const jwtByUser = req.headers.authorization || null;
      const jwt = jwtByUser?.split(' ').pop();
      console.log(`jwt: ${jwt}`);
      console.log(`jwtByUser: ${jwtByUser}`);

      next();
    } catch (e) {
      console.error(e);
      this.httpResponse.Error(res,e);
      
    }
  }
}