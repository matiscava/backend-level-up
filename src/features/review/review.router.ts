import { BaseRouter } from "../../shared/router/router";
import { ReviewController } from "./controllers/review.controller";
import { ReviewMiddleware } from "./middlewares/review.middleware";

export class ReviewRouter extends BaseRouter<ReviewController, ReviewMiddleware> {
  constructor(){
    super(ReviewController, ReviewMiddleware);
  }

  routes(): void {
    this.router.get('/review', (req,res) => this.controller.getAll(req,res));
    this.router.get('/review/:id', (req,res) => this.controller.getById(req,res));
    this.router.post(
      '/review',
      (req,res,next) => [ this.middleware.validator(req,res,next), ],
      (req,res) => this.controller.create(req,res)
      );
    this.router.put('/review/:id', (req,res) => this.controller.update(req,res));
    this.router.delete(
        '/review/:id',
        this.middleware.passAuth('jwt'),
        (req,res,next) => [ this.middleware.checkCustomerRole(req,res,next), ],
      (req,res) => this.controller.delete(req,res)
    );
  }

}