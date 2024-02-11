import { Request, Response, NextFunction } from "express";

export class AuthMiddleware {
  static validateJwt(req: Request, res: Response, next: NextFunction) {
    console.log("Passed through middleware validation");

    next();
  }
}
