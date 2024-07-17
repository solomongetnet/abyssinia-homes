import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";

export const jsonParser = (name: string) => {
  return expressAsyncHandler(
    async (req: Request, res: Response, next: NextFunction) => {
      // Converting Incoming Data String to JSON data then send as a body using req.body
      const body = JSON.parse(req.body[name]);
      req.body = body;
      next();
    }
  );
};