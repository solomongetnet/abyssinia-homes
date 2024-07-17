import { NextFunction, Request, Response } from "express";
import expressAsyncHandler from "express-async-handler";

interface _Request extends Request {
  user?: any;
}

type TRole = "agent" | "user" | "admin";

export const roleChecker = (roles?: TRole[], errorMessage?: string) => {
  return expressAsyncHandler(
    async (req: _Request, res: Response, next: NextFunction) => {
      if (roles) {
        if (!roles?.includes(req?.user.role)) {
          res.status(403);
          throw new Error(errorMessage || `Access denied`);
        }
        next();
      }
    }
  );
};
