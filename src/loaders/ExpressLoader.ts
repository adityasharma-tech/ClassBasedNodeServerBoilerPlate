import bodyParser from "body-parser";
import express, { NextFunction, Request, Response } from "express";
import path from "path";
import routes from "../routes";
import logger from "../services/Logger";
import config from "../config";
import { IncomingMessage, Server, ServerResponse } from "http";

export class ExpressLoader {
  server: Server<typeof IncomingMessage, typeof ServerResponse>;
  constructor() {
    const app = express();

    // Setup error handling, this must be after all other middleware
    app.use(ExpressLoader.errorHandler);

    // Serve static content
    app.use(express.static(path.join(__dirname, "uploads")));

    // Set up middleware
    app.use(
      bodyParser.urlencoded({
        extended: false,
        limit: "20mb",
      })
    );
    app.use(bodyParser.json({ limit: "20mb" }));

    // Pass app to routes
    routes(app);

    // Start application
    this.server = app.listen(config.port, () => {
      logger.info(`Express running, now listening on port ${config.port}`);
    });
  }

  get Server() {
    return this.server;
  }

  /**
   * @description Default error handler to be used with express
   * @param error Error object
   * @param req {object} Express req object
   * @param res {object} Express res object
   * @param next {function} Express next object
   * @returns {*}
   */
  static errorHandler(
    error: any,
    req: Request,
    res: Response,
    next: NextFunction
  ) {
    let parsedError;

    // Attempt to gracefully parse error object
    try {
      if (error && typeof error === "object") {
        parsedError = JSON.stringify(error);
      } else {
        parsedError = error;
      }
    } catch (e) {
      logger.error(e);
    }

    // Log the original error
    logger.error(parsedError);

    // If response is already sent, don't attempt to respond to client
    if (res.headersSent) {
      return next(error);
    }

    res.status(400).json({
      success: false,
      error,
    });
  }
}
