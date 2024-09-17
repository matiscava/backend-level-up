import { BaseRouter } from "../../shared/router/router";
import { ProductController } from "./controllers/product.controller";
import { ProdructMiddleware } from "./middlewares/product.middleware";

export class ProductRouter extends BaseRouter<ProductController, ProdructMiddleware> {
  constructor() {
    super(ProductController, ProdructMiddleware);
  }

  routes(): void {
    this.router.get('/product', (req,res) => this.controller.getAll(req,res));
    this.router.get('/product/:id', (req,res) => this.controller.getById(req,res));
    this.router.get('/product/search', (req,res) => this.controller.getByName(req,res));
    this.router.get('/product/:id/reviews', (req,res) => this.controller.getByIdWithReviews(req,res))
    this.router.post(
      '/product', 
      this.middleware.passAuth("jwt"),
      (req, res, next) => [ 
        this.middleware.checkAdminRole(req,res,next),
        this.middleware.validator(req,res,next) 
      ],
      (req,res) => this.controller.create(req,res)
    );
    this.router.put(
      '/product/:id',
      this.middleware.passAuth("jwt"),
      (req, res, next) => [ 
        this.middleware.checkAdminRole(req,res,next),
      ],
      (req,res) => this.controller.update(req,res)
    );
    this.router.delete(
      '/product/:id',
      this.middleware.passAuth("jwt"),
      (req, res, next) => [ 
        this.middleware.checkAdminRole(req,res,next),
      ],
      (req,res) => this.controller.delete(req,res)
    );

  }
}