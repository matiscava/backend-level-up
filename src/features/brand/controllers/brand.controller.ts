import { Request, Response } from "express";
import { HttpResponse } from "../../../shared/response/http.response";
import { BrandService } from "../services/brand.service";

export class BrandController {

  constructor(
    private readonly brandService: BrandService = new BrandService(),
    private readonly httpResponse: HttpResponse = new HttpResponse(),
  ){}

  async getAll(req: Request, res:Response) {
    try {
      const data = await this.brandService.findAll();

      if(!data.length) return this.httpResponse.NotFound(res, "Data not found");

      return this.httpResponse.Ok(res,data);
    } catch (e) {
      this.httpResponse.Ok(res,e);
    }
  }
  
  async getById(req: Request, res:Response) {
    const { id } = req.params;
    try {
      const data = await this.brandService.findById(id);
      
      if(data == null) return this.httpResponse.NotFound(res, `No data found with ID: ${id}`);

      return this.httpResponse.Ok(res, data);
    } catch (e) {
      this.httpResponse.Error(res,e);
    }
  }

  async getWithProduct(req: Request, res:Response) {
    const { id } = req.params;
    try {
      const data = await this.brandService.findWithProduct(id);
      
      if(data == null) return this.httpResponse.NotFound(res, `No data found with ID: ${id}`);

      return this.httpResponse.Ok(res, data);
    } catch (e) {
      this.httpResponse.Error(res,e);
    }
  }
  
  async create(req: Request, res:Response) {
    try {
      const data = await this.brandService.create(req.body);
      if(!data) return this.httpResponse.NotFound(res, "No data found");

      
      return this.httpResponse.Ok(res, data);
    } catch (e) {
      console.log("Error al crear marca: ", e);
      
      this.httpResponse.Error(res,e);
    }
  }

  async update(req: Request, res:Response) {
    const { id } = req.params;
    try {
      const data = await this.brandService.update(id, req.body);
      
      if(!data.affected) return this.httpResponse.NotFound(res, "There was an error updating the data.");

      return this.httpResponse.Ok(res, data);
    } catch (e) {
      this.httpResponse.Error(res,e);
    }
  }

  async delete(req: Request, res:Response) {
    const { id } = req.params;
    try {
      const data = await this.brandService.delete(id);
      
      if(!data.affected) return this.httpResponse.NotFound(res, "There was an error deleting the data.");

      return this.httpResponse.Ok(res, data);
    } catch (e) {
      this.httpResponse.Error(res,e);
    }
  }

}