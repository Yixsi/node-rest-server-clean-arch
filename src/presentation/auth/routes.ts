import { Router } from "express";
import { AuthController } from "./controller";
import { AuthDatasourceImpl, AuthRepositoryImpl } from "../../infrastructure";
import { AuthMiddleware } from "../middlewares/auth.middleware";

export class AuthRoutes {
  static get routes(): Router {
    // use static method if we don't have to do DI (Dependency Injection)
    const router = Router();

    const datasource = new AuthDatasourceImpl(); // the DB we are using
    const authRepository = new AuthRepositoryImpl(datasource);
    const controller = new AuthController(authRepository);

    router.post("/register", controller.registerUser);
    router.post("/login", controller.loginUser);
    router.get("/", [AuthMiddleware.validateJwt], controller.getUsers);

    return router;
  }
}
