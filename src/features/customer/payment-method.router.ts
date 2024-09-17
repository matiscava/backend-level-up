import { BaseRouter } from "../../shared/router/router";
import { PaymentMethodController } from "./controllers/payment-method.controller";
import { PaymentMethodMiddleware } from "./middlewares/payment-method.middleware";

export class PaymentMethodRouter extends BaseRouter<PaymentMethodController, PaymentMethodMiddleware> {
  constructor() {
    super(PaymentMethodController, PaymentMethodMiddleware);
  }

  routes(): void {
    this.router.get('/payment-method', (req,res) => this.controller.getAll(req,res));
    this.router.get('/payment-method/:id', (req,res) => this.controller.getById(req,res));
    this.router.get('/payment-method/customer/:customerId', (req,res) => this.controller.getByCustomerId(req,res));
    this.router.post(
      '/payment-method',
      this.middleware.passAuth('jwt'),
      (req,res,next) => [ 
        this.middleware.validator(req,res,next), 
        this.middleware.checkCustomerRole(req,res,next),
      ],
      (req,res) => this.controller.create(req,res)
      );
    this.router.put(
      '/payment-method/:id',
      this.middleware.passAuth('jwt'),
      (req,res,next) => [ this.middleware.checkCustomerRole(req,res,next), ],
      (req,res) => this.controller.update(req,res)
    );
    this.router.delete(
        '/payment-method/:id',
        this.middleware.passAuth('jwt'),
        (req,res,next) => [ this.middleware.checkCustomerRole(req,res,next), ],
      (req,res) => this.controller.delete(req,res)
    );
  }
} 