import { Request, Response, NextFunction } from "express";
import jwt, { JwtPayload } from "jsonwebtoken";
import UserModel from "../models/users.model";

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET!;

export const authenticateToken = async (
  req: Request,
  res: Response,
  next: NextFunction
): Promise<void> => {
  // Geting token from authraiztion header or cookies 👇🏼
  const token = req.headers["authorization"]?.split(" ")[1];
  // req.cookies.token ||

  if (!token) {
    res.status(403).json({
      message: "Token not available please login again!",
    });
    return;
  }

  try {
    // Decodingtoken 👇🏼
    const decoded: any = jwt.verify(token, ACCESS_TOKEN_SECRET);
    delete decoded.iat;
    delete decoded.exp;

    // Get user profile then send to next middleware👇🏼
    const userId = decoded.userId;
    const userDoc = await UserModel.findById(userId).select(
      "+favorites -properties"
    );

    // Check user is available 👇🏼
    if (!userDoc) {
      res.status(401).json({ status: "error", message: "User not found" });
      return;
    }

    // @ts-ignore
    req.user = userDoc;
    next();
  } catch (error: any) {
    res.status(401).json({ message: "Please login", err: error?.message });
  }
};
