import * as dotenv from "dotenv";
import { DataSource, DataSourceOptions } from "typeorm";
import { AppDataSource } from "./data.source";

export abstract class ConfigServer {
  constructor(){
    const nodeNameEnv = this.createPathEnv(this.nodeEnv);
    dotenv.config({
      path: nodeNameEnv,
    });
  }

  public getEnvironment(k:string) : string|undefined {
    console.log('process.env', process.env[k]);
    
    return process.env[k];
  }

  public getNumberEnv(k:string) : number {
    
    return Number(this.getEnvironment(k));
  }

  public get nodeEnv() : string {
    return this.getEnvironment("NODE_ENV")?.trim() || '';
  }

  public createPathEnv(path:string) : string {
    const arrEnv : Array<string> = ['env'];
    
    if(path.length) {
      const stringToArray = path.split('.');
      arrEnv.unshift(...stringToArray);
    }
    
    
    return `.${arrEnv.join('.')}`;
  }

  get initConnect() : Promise<DataSource> {
    return AppDataSource.initialize();
  }
}