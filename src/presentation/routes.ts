import { Router } from "express";
import { AuthRoutes } from "./auth/routes";

export class AppRoutes {
  static get routes(): Router {
    // use static method if we don't have to do DI (Dependency Injection)
    const router = Router();

    // Define main routes

    router.use("/api/auth", AuthRoutes.routes);
    // router.use("/api/user");

    return router;
  }
}
