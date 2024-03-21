import { Request } from "express";
import { JwtPayload } from "jsonwebtoken";

export interface ReqExt extends Request {
  user?: JwtPayload | {id: string};
}