import express, { Request, Response, Application } from "express";
import helmet from "helmet";
import cors from "cors";
import "dotenv/config";
import "colors";
import errorHandler from "./middleware/error-handler";
import { notFound } from "./middleware/not-found";
import rootRouter from "./routes";
import connectDB from "./config/db";
import cookieParser from "cookie-parser";

const server: Application = express();

// Middleware
server.use(express.static("public"));
server.use(helmet());
server.use(
  cors({
    origin: [
      process.env.FRONTEND_URL as string,
      process.env.ADMIN_FRONTEND_URL as string,
    ],
    credentials: true,
  })
);
server.use(cookieParser());
server.use(express.json());

server.get("/", (req: Request, res: Response) => {
  res.send("Server Running");
});

// Custom Middlewares
server.use((req, res, next) => {
  console.log(req.url);
  next();
});
server.use(rootRouter);
server.use(notFound);
server.use(errorHandler);

const PORT = process.env.PORT

server.listen(PORT, () => {
  console.log(`Server is runnig on http://localhost:${PORT}.`.bgBlue.white);
  // Connecting Database After Connection Of Server
  connectDB();
});
