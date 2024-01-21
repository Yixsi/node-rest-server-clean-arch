import { Router } from "express";

export class AuthRoutes {
  static get routes(): Router {
    // use static method if we don't have to do DI (Dependency Injection)
    const router = Router();

    router.post("/login", (req, res) => {
      res.json("Login");
    });

    router.post("/register", (req, res) => {
      res.json("Register");
    });

    return router;
  }
}
