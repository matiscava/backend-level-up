import { BaseRouter } from "../../shared/router/router";
import { PurchaseController } from "./controllers/purchase.controller";
import { PurchaseMiddleware } from "./middlewares/purchase.middleware";

export class PurchaseRouter extends BaseRouter<PurchaseController, PurchaseMiddleware> {
  constructor(){
    super(PurchaseController, PurchaseMiddleware);
  }

  routes(): void {
    this.router.get('/pruchase', (req,res) => this.controller.getAll(req,res));
    this.router.get('/pruchase/:id', (req,res) => this.controller.getById(req,res));
    this.router.get('/pruchase/:id/purchase-product', (req,res) => this.controller.getWithProduct(req,res));
    this.router.post(
      '/pruchase',
      this.middleware.passAuth('jwt'),
      (req,res,next) => [ 
        this.middleware.validator(req,res,next), 
        this.middleware.checkCustomerRole(req,res,next)
      ],
      (req,res) => this.controller.create(req,res)
      );
    this.router.put(
      '/pruchase/:id',
      this.middleware.passAuth('jwt'),
      (req,res,next) => [ this.middleware.checkCustomerRole(req,res,next) ],
      (req,res) => this.controller.update(req,res)
    );
    this.router.delete(
        '/pruchase/:id',
        this.middleware.passAuth('jwt'),
        (req,res,next) => [ this.middleware.checkCustomerRole(req,res,next), ],
      (req,res) => this.controller.delete(req,res)
    );
  }
}