import { Express } from "express";

// routes import
import UserRouter from "./user.routes";

class RoutesLoader {
  app: Express;
  userRouter: UserRouter;

  constructor(app: Express) {
    this.app = app;
    this.userRouter = new UserRouter();
    this.loadRoutes();
  }
  loadRoutes() {
    this.app.use("/api/v1/user", this.userRouter.attach());
  }
}

export default (app: Express) => new RoutesLoader(app);
