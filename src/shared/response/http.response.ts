import { Response } from "express";
import { HttpStatus } from "../enums/http-status.enum";

export class HttpResponse {
  Ok ( res: Response, data?: any ) : Response {
    return res.status(HttpStatus.OK).json({
      status: HttpStatus.OK,
      statusMsg: "Success",
      data: data,
    });
  }

  NotFound( res: Response, data?: any ) : Response {
    return res.status(HttpStatus.NOT_FOUND).json({
      status: HttpStatus.NOT_FOUND,
      statusMsg: "Not Found",
      data: data,
    }); 
  }

  Unauthorized( res: Response, data?: any ) : Response {
    return res.status(HttpStatus.UNAUTHORIZED).json({
      status: HttpStatus.UNAUTHORIZED,
      statusMsg: "Unauthorized",
      data: data,
    }); 
  }

  Forbidden( res: Response, data?: any ) : Response {
    return res.status(HttpStatus.FORBIDDEN).json({
      status: HttpStatus.FORBIDDEN,
      statusMsg: "Forbidden",
      data: data,
    }); 
  }

  Error( res: Response, data?: any ) : Response {
    return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
      status: HttpStatus.INTERNAL_SERVER_ERROR,
      statusMsg: "Internal Server Error",
      data: data,
    }); 
  }
}