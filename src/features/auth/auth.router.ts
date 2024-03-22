import { AuthController } from "./controllers/auth.controller";
import { BaseRouter } from "../../shared/router/router";
import { SharedMiddleware } from "../../shared/middleware/shared.middleware";


export class AuthRouter extends BaseRouter<AuthController, SharedMiddleware>{
  constructor() {
    super(AuthController, SharedMiddleware);
  }

  routes(): void {
    this.router.post('/signup', (req,res) => this.controller.signUp(req,res));
    this.router.post('/signin', (req,res) => this.controller.signIn(req,res));
  }
}