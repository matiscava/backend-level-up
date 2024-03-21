import { BaseRouter } from "../../shared/router/router";
import { UserController } from "./controllers/user.controller";
import { UserMiddleware } from "./middlewares/user.middleware";

export class UserRouter extends BaseRouter<UserController, UserMiddleware> {
  constructor() {
    super(UserController, UserMiddleware);
  }

  routes(): void {
    this.router.get('/user', (req,res) => this.controller.getAll(req,res));
    this.router.get('/user/:id', (req,res) => this.controller.getById(req,res));
    this.router.get('/user/relation/:id', (req,res) => this.controller.getWithRelationById(req,res));
    this.router.post(
      '/user',
      (req,res,next) => [ this.middleware.validator(req,res,next), ],
      (req,res) => this.controller.create(req,res)
      );
    this.router.put('/user/:id', (req,res) => this.controller.update(req,res));
    this.router.delete(
        '/user/:id',
        this.middleware.passAuth('jwt'),
        (req,res,next) => [ this.middleware.checkAdminRole(req,res,next), ],
      (req,res) => this.controller.delete(req,res)
    );
  }
}