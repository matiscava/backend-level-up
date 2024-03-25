import { BaseRouter } from "../../shared/router/router";
import { CategoryController } from "./controllers/category.controller";
import { CategoryMiddleware } from "./middlewares/category.middleware";

export class CategoryRouter extends BaseRouter<CategoryController, CategoryMiddleware> {
  constructor() {
    super(CategoryController, CategoryMiddleware);
  }

  routes(): void {
    this.router.get('/category', (req,res) => this.controller.getAll(req,res));
    this.router.get('/category/:id', (req,res) => this.controller.getById(req,res));
    this.router.get('/category/:id/products', (req,res) => this.controller.getWithProduct(req,res));
    this.router.post(
      '/category',
      this.middleware.passAuth('jwt'),
      (req,res,next) => [ 
        this.middleware.checkAdminRole(req,res,next),
        this.middleware.validator(req,res,next),
      ],
      (req,res) => this.controller.create(req,res)
      );
    this.router.put(
      '/category/:id',
      this.middleware.passAuth('jwt'),
      (req,res,next) => [ 
        this.middleware.checkAdminRole(req,res,next),
      ],
      (req,res) => this.controller.update(req,res)
    );
    this.router.delete(
      '/category/:id',
      this.middleware.passAuth('jwt'),
      (req,res,next) => [ this.middleware.checkAdminRole(req,res,next), ],
      (req,res) => this.controller.delete(req,res)
    );
  }
}