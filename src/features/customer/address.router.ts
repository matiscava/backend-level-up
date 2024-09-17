import { BaseRouter } from "../../shared/router/router";
import { AddressController } from "./controllers/address.controller";
import { AddressMiddleware } from "./middlewares/address.middleware";

export class AddressRouter extends BaseRouter<AddressController, AddressMiddleware> {
  constructor() {
    super(AddressController,AddressMiddleware);
  }

  routes(): void {
    this.router.get('/address', (req,res) => this.controller.getAll(req,res));
    this.router.get('/address/:id', (req,res) => this.controller.getById(req,res));
    this.router.get('/address/customer/:customerId', (req,res) => this.controller.getByCustomerId(req,res));
    this.router.post(
      '/address',
      (req,res,next) => [ 
        this.middleware.validator(req,res,next), 
        this.middleware.checkCustomerRole(req,res,next),
      ],
      (req,res) => this.controller.create(req,res)
      );
    this.router.put(
      '/address/:id', 
      (req,res,next) => [this.middleware.checkCustomerRole(req,res,next)],
      (req,res) => this.controller.update(req,res)
    );
    this.router.delete(
        '/address/:id',
        this.middleware.passAuth('jwt'),
        (req,res,next) => [ this.middleware.checkCustomerRole(req,res,next), ],
      (req,res) => this.controller.delete(req,res)
    );
  }
} 