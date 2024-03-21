import { SharedMiddleware } from "../../shared/middleware/shared.middleware";
import { BaseRouter } from "../../shared/router/router";
import { AuthController } from "./controllers/auth.controller";

export class AuthRouter extends BaseRouter<AuthController, SharedMiddleware> {
  constructor() {
    super(AuthController,SharedMiddleware);
  }

  routes(): void {
    this.router.post("/login", (req,res) => this.controller.login(req,res));
    this.router.post("/register", )
  }
}