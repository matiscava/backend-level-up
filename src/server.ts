import morgan from "morgan";
import express from "express";
import cors from "cors";
import passport from "passport";
import { ConfigServer } from "./config/config";
import "reflect-metadata";
import { DataSource } from "typeorm";
import { AuthRouter } from "./features/auth/auth.router";
import { BrandRouter } from "./features/brand/brand.router";
import { CategoryRouter } from "./features/category/category.router";
import { CustomerRouter } from "./features/customer/customer.router";
import { ProductRouter } from "./features/product/product.route";
import { PurchaseRouter } from "./features/purchase/purchase.router";
import { PuchaseProductRouter } from "./features/purchase/purchase-product.router";
import { ReviewRouter } from "./features/review/review.router";
import { UserRouter } from "./features/user/user.router";
import { AddressRouter } from "./features/customer/address.router";
import { JwtStrategy } from "./features/auth/strategies/jwt-passport.strategy";


class ServerLevelUp extends ConfigServer {
  public app: express.Application = express();
  private port: number = this.getNumberEnv('PORT');

  constructor() {
    super();
    this.app.use( express.json() );
    this.app.use( express.urlencoded({extended: true}) );

    // this.passportUse();
    this.dbConnect();

    this.app.use( morgan('dev') );
    this.app.use( cors({
      origin: true,
      methods: "GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS",
      credentials: true,
    }) );
    this.app.use(passport.initialize());
    passport.use(JwtStrategy);

    this.app.use('/api', this.routers() );
    this.listen();
  }

  routers(): Array<express.Router>{
    return [
      new AuthRouter().router,
      new AddressRouter().router,
      new BrandRouter().router,
      new CategoryRouter().router,
      new CustomerRouter().router,
      new ProductRouter().router,
      new PurchaseRouter().router,
      new PuchaseProductRouter().router,
      new ReviewRouter().router,
      new UserRouter().router,
    ];
  }

  // passportUse() {
  //   return [
  //   ];
  // }

  async dbConnect() : Promise<DataSource | void> {
    return this.initConnect.then( 
      () => console.log("Connect Success")
     ).catch( 
      (e) => console.error(e)
     );
  }

  public listen() {
    this.app.listen( 
      this.port,
      () => console.log(`Server listening on port => ${this.port} :: ENV = ${this.getEnvironment("ENV")}`)
    );
  }

};

new ServerLevelUp();