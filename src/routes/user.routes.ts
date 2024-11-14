import { Router, Request, Response, NextFunction } from "express";
import { AuthController } from "../controllers/AuthController";

export default class UserRouter {
  private router: Router;
  private authController: AuthController;
  constructor() {
    this.router = Router();
    this.authController = new AuthController();
  }

  attach() {
    return this.router
      .post("/register", this.register.bind(this))
      .post("/login", this.login.bind(this));
  }

  register(req: Request, res: Response, next: NextFunction) {
    return this.authController.register(req, res, next);
  }

  login(req: Request, res: Response, next: NextFunction) {
    return this.authController.login(req, res, next);
  }
}
