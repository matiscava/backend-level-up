import { Request, Response } from "express";
import { HttpResponse } from "../../../shared/response/http.response";
import { AuthService } from "../services/auth.service";
import { UserEntity } from "../../user/entities/user.entity";

export class AuthController {
  constructor(
    private readonly httpResponse: HttpResponse = new HttpResponse(),
    private readonly authService: AuthService = new AuthService(),
  ){}

  async signUp(req:Request, res:Response) {
    const { email, password } = req.body;
    try {
      if( !email || !password ) return this.httpResponse.Error(res, "Please send your email and password");
      const data = await this.authService.signUp(req.body);
      if(data == null) this.httpResponse.Forbidden(res, `User with email: ${email} allready exists!`);
      this.httpResponse.Ok(res, data);
    } catch (e) {
      this.httpResponse.Error(res, e);
    } 
  }
  
  async signIn (req:Request, res:Response) {
    const { username, password } = req.body;
    try {
      if( !username || !password ) return this.httpResponse.Error(res, "Please send your email/usename and password");
      const data = await this.authService.signIn(username, password);
      const encode = await this.authService.generateJWT(data as UserEntity);

      if(!encode) return this.httpResponse.Unauthorized(res, "Permisson Deneid");
      
      res.header("Content-Type","application/json");
      res.cookie("accessToken", encode.accessToken, { maxAge: 60000 * 60 });
      res.write(JSON.stringify(encode));
      res.end()
    } catch (e) {
      this.httpResponse.Error(res, e);
    } 
  }
}