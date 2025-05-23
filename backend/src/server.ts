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
import fileUpload from "express-fileupload";

const server: Application = express();

// Middleware
server.use(express.static("public"));
server.use(helmet());
server.use(
  cors({
    origin: process.env.FRONTEND_URL,
    credentials: true,
  })
);
server.use(
  fileUpload({
    useTempFiles: true,
    tempFileDir: "/tmp/", // Use in-memory storage
  })
);
server.use(cookieParser());
server.use(express.json());

server.get("/", (req: Request, res: Response) => {
  res.json({
    message: "Server is running",
  });
});

// Custom Middlewares
server.use((req, res, next) => {
  console.log(req.url);
  next();
});
server.use(rootRouter);
server.use(notFound);
server.use(errorHandler);

const PORT = process.env.PORT;

server.listen(PORT, () => {
  console.log(`Server is runnig on http://localhost:${PORT}.`.bgBlue.white);
  // Connecting Database After Connection Of Server
  connectDB();
});
