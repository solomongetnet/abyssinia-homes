import crypto from "crypto";
import jwt from "jsonwebtoken";

const accessTokenSecret = process.env.ACCESS_TOKEN_SECRET!;
const refreshTokenSecret = process.env.REFRESH_TOKEN_SECRET!;

export const generateAccessToken = (
  payload: { userId: any; role: string },
  expiresIn?: string
) => {
  return jwt.sign(
    { userId: payload.userId, role: payload.role },
    accessTokenSecret,
    {
      expiresIn: expiresIn || "1m",
    }
  );
};

export const generateRefreshToken = (userId: string, expiresIn?: string) => {
  return jwt.sign({ userId }, refreshTokenSecret, {
    expiresIn: expiresIn || "30d",
  });
};

export const generateToken = (round?: number): string => {
  return crypto.randomBytes(round || 20).toString("hex");
};
