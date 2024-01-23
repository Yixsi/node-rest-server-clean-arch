import express, { Router } from "express";

// Typing dependencies
interface Options {
  port?: number;
  routes: Router;
}

export class Server {
  public readonly app = express();

  // define class properties
  private readonly port: number;
  private readonly routes: Router;

  constructor(options: Options) {
    const { port = 3100, routes } = options; // get dependencies
    this.port = port;
    this.routes = routes;
  }

  async start() {
    //Middlewares

    // To parse the data
    this.app.use(express.json());
    this.app.use(express.urlencoded({ extended: true })); // x-www-form-urlencoded

    // Make server use the defined routes
    this.app.use(this.routes);

    this.app.listen(this.port, () => {
      console.log(`Server running on port ${this.port}`);
    });
  }
}
