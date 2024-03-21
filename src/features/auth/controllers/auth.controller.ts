import { Request, Response } from "express";
import { HttpResponse } from "../../../shared/response/http.response";
import { AuthService } from "../services/auth.service";
import { UserEntity } from "../../user/entities/user.entity";

export class AuthController {
  constructor(
    private readonly authService: AuthService = new AuthService(),
    private readonly httpResponse : HttpResponse = new HttpResponse(),
  ) { 
  };

  async login(req:Request, res:Response	) {
    try {
      const {username, password} = req.body;

      const encodeUser = await this.authService.validateUser(username,password) as UserEntity;

      const encode = await this.authService.generateJWT(encodeUser);
      if(!encode) return this.httpResponse.Unauthorized(res, "Permission denied");

      res.header("Content-Type","application/json");
      res.cookie("accessToken", encode.accessToken, {maxAge: 60000 * 60});
      res.write(JSON.stringify(encode));
      res.end();

    } catch (e) {
      console.error(e);
      this.httpResponse.Error(res,e)
    }
  }
}