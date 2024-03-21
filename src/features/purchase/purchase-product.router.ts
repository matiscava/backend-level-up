import { BaseRouter } from "../../shared/router/router";
import { PurchaseProductController } from "./controllers/purchase-product.controller";
import { PurchaseProductMiddleware } from "./middlewares/purchase-product.middleware";

export class PuchaseProductRouter extends BaseRouter<PurchaseProductController, PurchaseProductMiddleware> {
  constructor(){
    super(PurchaseProductController, PurchaseProductMiddleware);
  }

  routes(): void {
    this.router.get('/pruchase-product', (req,res) => this.controller.getAll(req,res));
    this.router.get('/pruchase-product/:id', (req,res) => this.controller.getById(req,res));
    this.router.post(
      '/pruchase-product',
      (req,res,next) => [ 
        this.middleware.validator(req,res,next), 
        this.middleware.checkCustomerRole(req,res,next)
      ],
      (req,res) => this.controller.create(req,res)
      );
    this.router.put(
      '/pruchase-product/:id',
      (req,res,next) => [ this.middleware.checkCustomerRole(req,res,next) ],
      (req,res) => this.controller.update(req,res)
    );
    this.router.delete(
        '/pruchase-product/:id',
        this.middleware.passAuth('jwt'),
        (req,res,next) => [ this.middleware.checkCustomerRole(req,res,next), ],
      (req,res) => this.controller.delete(req,res)
    );
  }
}