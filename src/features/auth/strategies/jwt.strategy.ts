import { ExtractJwt, Strategy, StrategyOptions } from "passport-jwt";
import { AuthService } from "../services/auth.service";
import { UserService } from "../../user/services/user.service";
import { PayloadToken } from "../interfaces/auth.interface";

const authService: AuthService = new AuthService();
const userService: UserService = new UserService();

const options: StrategyOptions = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: authService.getEnvironment("JWT_SECRET") as string,
  ignoreExpiration: false,
};

const JwtStrategy:Strategy = new Strategy(options, async (payload:PayloadToken, done) => { 
  try {
    const user = await userService.findById(payload.id);
    if(user) {
      return done(null, user);
    }
    return done(null, false);
  } catch (e) {
    console.error(`Error en la estrategia de jwt-passport`);
    
  }
})

export { JwtStrategy };