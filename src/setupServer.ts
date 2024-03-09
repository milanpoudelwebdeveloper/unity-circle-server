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
import { config } from "./config";
import { Server } from "socket.io";
import { createAdapter } from "@socket.io/redis-adapter";
import { createClient } from "redis";
import applicationRoutes from "./routes";

const SERVER_PORT = 5000;

export const setUpServer = (app: Application) => {
  app.use(
    cookieSession({
      name: "session",
      keys: [config.secretKeyOne!, config.secretKeyTwo!],
      maxAge: 24 * 60 * 60 * 1000,
      secure: config.env !== "production",
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
  applicationRoutes(app);
  const io = new Server(http.createServer(app), {
    cors: {
      origin: config.clientUrl,
      methods: ["GET", "POST", "PUT", "DELETE"],
    },
  });
  const pubClient = createClient({
    url: config.redisHost,
  });
  const subClient = pubClient.duplicate();
  io.adapter(createAdapter(pubClient, subClient));
  io.listen(3000);
  app.listen(SERVER_PORT, () => {
    console.log(`Server is running on port ${SERVER_PORT}`);
  });
};
