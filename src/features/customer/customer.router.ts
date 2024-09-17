import { BaseRouter } from "../../shared/router/router";
import { CustomerController } from "./controllers/customer.controller";
import { CustomerMiddleware } from "./middlewares/customer.middleware";

export class CustomerRouter extends BaseRouter<CustomerController,CustomerMiddleware>{
  constructor(){
    super(CustomerController,CustomerMiddleware);
  }

  routes(): void {
    this.router.get('/customer', (req,res) => this.controller.getAll(req,res));
    this.router.get('/customer/:id', (req,res) => this.controller.getById(req,res));
    this.router.post(
      '/customer',
      this.middleware.passAuth('jwt'),
      (req,res,next) => [ 
        this.middleware.validator(req,res,next),
        this.middleware.checkAdminRole(req,res,next),
      ],
      (req,res) => this.controller.create(req,res)
    );
    this.router.put(
      '/customer/:id', 
      this.middleware.passAuth('jwt'),
      (req,res,next) => [ 
        this.middleware.checkCustomerRole(req,res,next),
      ],
      (req,res) => this.controller.update(req,res)
    );
    this.router.delete(
        '/customer/:id',
        this.middleware.passAuth('jwt'),
        (req,res,next) => [ this.middleware.checkAdminRole(req,res,next), ],
      (req,res) => this.controller.delete(req,res)
    );
  }
}