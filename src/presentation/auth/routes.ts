import { Router } from "express";
import { AuthController } from "./controller";

export class AuthRoutes {
  static get routes(): Router {
    // use static method if we don't have to do DI (Dependency Injection)
    const router = Router();
    const controller = new AuthController();

    router.post("/register", controller.registerUser);

    router.post("/login", controller.loginUser);

    return router;
  }
}
