import { Request, Response } from "express";
import { HttpResponse } from "../../../shared/response/http.response";
import { PurchaseProductService } from "../services/purchase-product.service";

export class PurchaseProductController {
  constructor(
    private readonly puchaseProductService: PurchaseProductService = new PurchaseProductService(),
    private readonly httpResponse: HttpResponse = new HttpResponse(),
  ){};

  
  async getAll(req: Request, res:Response) {
    try {
      const data = await this.puchaseProductService.findAll();
      
      if(!data.length) return this.httpResponse.NotFound(res, "No data found");

      return this.httpResponse.Ok(res, data);
    } catch (e) {
      this.httpResponse.Error(res,e);
    }
  }

  async getById(req: Request, res:Response) {
    const { id } = req.params;
    try {
      const data = await this.puchaseProductService.findById(id);
      
      if(data == null) return this.httpResponse.NotFound(res, `No data found with ID: ${id}`);

      return this.httpResponse.Ok(res, data);
    } catch (e) {
      this.httpResponse.Error(res,e);
    }
  }
  
  async create(req: Request, res:Response) {
    try {
      const data = await this.puchaseProductService.create(req.body);
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      this.httpResponse.Error(res,e);
    }
  }

  async update(req: Request, res:Response) {
    const { id } = req.params;
    try {
      const data = await this.puchaseProductService.update(id, req.body);
      
      if(!data.affected) return this.httpResponse.NotFound(res, "There was an error updating the data.");

      return this.httpResponse.Ok(res, data);
    } catch (e) {
      this.httpResponse.Error(res,e);
    }
  }

  async delete(req: Request, res:Response) {
    const { id } = req.params;
    try {
      const data = await this.puchaseProductService.delete(id);
      
      if(!data.affected) return this.httpResponse.NotFound(res, "There was an error deleting the data.");

      return this.httpResponse.Ok(res, data);
    } catch (e) {
      this.httpResponse.Error(res,e);
    }
  }
}