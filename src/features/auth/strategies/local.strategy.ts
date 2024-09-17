import { Strategy, VerifyFunction } from "passport-local";
import { AuthService } from "../services/auth.service";

const authService: AuthService = new AuthService();

const LoginStrategy:Strategy = new Strategy({usernameField: "username", passwordField: "password"},async (username, password,done) => {
  const user = await authService.signIn(username,password);
  if(!user) {
    return done(null,false,{message: "Invalid username or password"})
  }

  return done(null, user);
});


export { LoginStrategy };