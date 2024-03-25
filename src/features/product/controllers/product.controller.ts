import { Request, Response } from "express";
import { HttpResponse } from "../../../shared/response/http.response";
import { ProductService } from "../services/product.service";

export class ProductController {
  constructor (
    private readonly productService : ProductService = new ProductService(),
    private readonly httpResponse : HttpResponse = new HttpResponse()
  ) {}

  async getAll(req: Request, res:Response) {
    try {
      const data = await this.productService.findAll();      

      if(!data.length) return this.httpResponse.NotFound(res, "Data not found");

      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      this.httpResponse.Error(res,e);
    }
  }

  async getById(req: Request, res:Response) {
    const { id } = req.params;
    try {
      const data = await this.productService.findById(id);

      if(data == null) return this.httpResponse.NotFound(res, `No data found with ID: ${id}`);

      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      this.httpResponse.Error(res,e);
    }
  }

  async getByName(req: Request, res:Response) {
    const { search } = req.query;
    try {
      if(search !== undefined) {
        const data = await this.productService.findByName(search);
  
        if(!data) return this.httpResponse.NotFound(res, 'Data not found');
  
        return this.httpResponse.Ok(res, data);
      }
    } catch (e) {
      console.error(e);
      this.httpResponse.Error(res,e);
    }
  }

  async getByIdWithReviews(req:Request, res:Response) {
    const { id } = req.params;
    try {
      const data = await this.productService.findWithReviews(id);

      if(!data) return this.httpResponse.NotFound(res, 'Data not found');

      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.error(e);
      this.httpResponse.Error(res,e);
    }
  }

  
  async create(req: Request, res:Response) {
    try {
      const data = await this.productService.create(req.body);

      if(!data) {
        return this.httpResponse.NotFound(res, "Error when creating data.");
      }

      return this.httpResponse.Ok(res, data);
    } catch (e) {
      this.httpResponse.Error(res,e);
    }
  }

  async update(req: Request, res:Response) {
    const { id } = req.params;
    try {
      const data = await this.productService.update(id, req.body);
      
      if(!data.affected) return this.httpResponse.NotFound(res, "There was an error updating the data.");

      return this.httpResponse.Ok(res, data);
    } catch (e) {
      this.httpResponse.Error(res,e);
    }
  }

  async delete(req: Request, res:Response) {
    const { id } = req.params;
    try {
      const data = await this.productService.delete(id);
      
      if(!data.affected) return this.httpResponse.NotFound(res, "There was an error deleting the data.");

      return this.httpResponse.Ok(res, data);
    } catch (e) {
      this.httpResponse.Error(res,e);
    }
  }
}