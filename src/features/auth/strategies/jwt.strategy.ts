import { AuthService } from "../services/auth.service";
import { ExtractJwt, Strategy as JwtStr, StrategyOptions } from "passport-jwt";
import { PayloadToken } from "../interfaces/auth.interface";
import { PassportUse } from "../../../shared/utils/passport.handle";

export class JwtStrategy extends AuthService {
  constructor() {
    super();
  }

  async validate(payload: PayloadToken, done: any) {
    return done(null, payload);
  }

  // get use() {
  //   return PassportUse<
  //     JwtStr, 
  //     StrategyOptions, 
  //     (payload: PayloadToken, done: any) => Promise<PayloadToken>
  //   >(
  //     "jwt", 
  //     JwtStr, 
  //     { 
  //       jwtFromRequest : ExtractJwt.fromAuthHeaderAsBearerToken(),
  //       secretOrKey: this.getEnvironment("JWT_SECRET"),
  //       ignoreExpiration: false,
  //     },
  //     this.validate
  //   );
  // }
}