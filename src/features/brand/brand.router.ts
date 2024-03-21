import { BaseRouter } from "../../shared/router/router";
import { BrandController } from "./controllers/brand.controller";
import { BrandMiddleware } from "./middlewares/brand.middleware";

export class BrandRouter extends BaseRouter<BrandController,BrandMiddleware> {
  constructor() {
    super(BrandController, BrandMiddleware);
  }

  routes(): void {
    this.router.get('/brand', (req,res) => this.controller.getAll(req,res));
    this.router.get('/brand/:id', (req,res) => this.controller.getById(req,res));
    this.router.get('/brand/:id/products', (req,res) => this.controller.getWithProduct(req,res));
    this.router.post(
      '/brand',
      (req,res,next) => [ this.middleware.validator(req,res,next), ],
      (req,res) => this.controller.create(req,res)
      );
    this.router.put('/brand/:id', (req,res) => this.controller.update(req,res));
    this.router.delete(
        '/brand/:id',
        this.middleware.passAuth('jwt'),
        (req,res,next) => [ this.middleware.checkAdminRole(req,res,next), ],
      (req,res) => this.controller.delete(req,res)
    );
  }
}