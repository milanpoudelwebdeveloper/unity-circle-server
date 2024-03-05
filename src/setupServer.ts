import {
  Application,
  json,
  urlencoded,
  Response,
  Request,
  NextFunction,
} from "express";
import http from "http";
import hpp from "hpp";
import cors from "cors";
import helmet from "helmet";
import cookieSession from "cookie-session";
import HTTP_STATUS from "http-status-codes";
import compression from "compression";
import "express-async-errors";

const SERVER_PORT = 5000;

export const setUpServer = (app: Application) => {
  app.use(
    cookieSession({
      name: "session",
      keys: ["key1", "key2"],
      maxAge: 24 * 60 * 60 * 1000,
      secure: false,
    })
  );
  app.use(
    cors({
      origin: "*",
      credentials: true,
      optionsSuccessStatus: 200,
      methods: ["GET", "POST", "PUT", "DELETE"],
    })
  );
  app.use(hpp());
  app.use(helmet());
  app.use(compression());
  app.use(
    json({
      limit: "50mb",
    })
  );
  app.use(urlencoded({ extended: true }));
  app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port ${SERVER_PORT}`);
  });
};
