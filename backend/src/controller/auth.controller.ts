import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import UserModel from "../models/users.model";
import {
  generateAccessToken,
  generateRefreshToken,
  generateToken,
} from "../utils/token";
import bcrypt from "bcryptjs";
import jwt from "jsonwebtoken";
import { sendPasswordResetEmail } from "../helper/send-password-reset-email";

const register = asyncHandler(async (req: Request, res: Response) => {
  const { username, fullName, password, email, phoneNumber } = req.body;

  // Check If Request Is invalid
  if (!username || !fullName || !password || !email || !phoneNumber) {
    res.status(400);
    throw new Error("Invalid Request");
  }

  // Check If Username Was Taken
  const isUsernameTaken = await UserModel.exists({ username });
  if (isUsernameTaken) {
    res.status(400);
    throw new Error("Username Is Aleardy Taken");
  }

  // Check If Email Was Taken
  const isEmailTaken = await UserModel.exists({ email });
  if (isEmailTaken) {
    res.status(400);
    throw new Error("This Email Is Aleardy Registerd");
  }

  // Check If Phone Number Was Taken
  const isPhoneNumberTaken = await UserModel.exists({ phoneNumber });
  if (isPhoneNumberTaken) {
    res.status(400);
    throw new Error("This Phone number Is Aleardy Registerd");
  }

  // Hashing Password
  const salt = bcrypt?.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(password, salt);

  const newUser = await UserModel.create({
    ...req.body,
    password: hashedPassword,
    role: req.body.role || "user",
  });

  if (!newUser) {
    throw new Error("Something Went Wrong Please Try Again");
  }

  res.status(201).json({ message: "Your Account Created Successfully" });
});

const login = asyncHandler(async (req: Request, res: Response) => {
  const { email, password } = req.body;

  // Check If Request Is Valid
  if (!email || !password) {
    res.status(400);
    throw new Error("Invalid Request");
  }

  // Know If User Is Exists
  // If User exists Retriev User Doc
  const UserDoc: any = await UserModel.findOne({ email }, "role email password");
  if (!UserDoc) {
    res.status(404);
    throw new Error("Email or Passowrd are wrong");
  }

  // Check If Requested Password is correct
  const hashedPass = UserDoc?.password;
  const isPassOk = bcrypt.compareSync(req.body.password, hashedPass);

  if (!isPassOk) {
    res.status(400);
    throw new Error("Email or Passowrd are wrong");
  }

  // Generate Token then Send Refresh Token Via Cookie and send  accessToken as a response
  const refreshToken = generateRefreshToken(UserDoc._id);
  const accessToken = generateAccessToken({
    userId: UserDoc._id,
    role: UserDoc.role,
  });

  // Set refresh token as a HTTP-only cookie
  res
    .cookie("refreshToken", refreshToken, {
      httpOnly: true,
      path: "/",
      secure: process.env.NODE_ENV === "production",
      sameSite: "lax",
      maxAge: 30 * 24 * 60 * 60 * 1000, //30 days
    })
    .json({ token: accessToken, message: "Login Successfully" });
});

const refreshToken = asyncHandler(async (req: Request, res: Response) => {
  // Get refresh token from httpOnly Cookie and check it is available
  const _refreshToken = req.cookies.refreshToken;
  if (!_refreshToken) {
    res.status(401);
    return;
  }

  // Decoded the resfresh token to get result
  const decoded: any = jwt.verify(
    _refreshToken,
    process.env.REFRESH_TOKEN_SECRET as string
  );

  const userDoc = await UserModel.findById(decoded?.userId).select('role');
  if (!userDoc) {
    res.status(401);
    throw new Error("Can't find this account");
  }

  // Generate new accessToke then send for the client in as a json
  const accessToken = generateAccessToken({
    userId: decoded.userId,
    role: userDoc.role,
  });
  res.json({ token: accessToken });
});

const logout = asyncHandler(async (req: Request, res: Response) => {
  res.clearCookie("refreshToken").json({ message: "Logout Successfull" });
});

const forgotPassword = asyncHandler(async (req: Request, res: Response) => {
  const email = req.body.email;

  if (!email) {
    res.status(400);
    throw new Error("Email is requried");
  }

  const user: any = await UserModel.findOne({ email });
  if (!user) {
    res.status(404);
    throw new Error("User by this email not found");
  }

  // Generate reset token and expiry
  const resetToken = generateToken(40);

  user.resetToken = resetToken;
  user.resetTokenExpiry = new Date(Date.now() + 3600000); // 1 hour

  await user.save();

  // Send email with password reset link
  try {
    await sendPasswordResetEmail(user.email, resetToken, user.fullName);
    res.json({ message: "Password reset link sent to gmail" });
  } catch (err) {
    res.status(500).json({ message: "Some error occured please try again" });
  }
});

const resetPassword = asyncHandler(async (req: Request, res: Response) => {
  const newPassword = req.body.newPassword;
  const resetToken = req.params.resetToken;

  if (!newPassword) {
    res.status(400);
    throw new Error("New password is required!");
  }

  if (!resetToken) {
    res.status(400);
    throw new Error("Invaild request");
  }

  // Check token is expire and if it is available
  const user = await UserModel.findOne({
    resetToken,
    resetTokenExpiry: { $gt: Date.now() },
  });

  if (!user) {
    res.status(400);
    throw new Error("Reset token is invalid or has expired please try again");
  }

  // Hashing password
  const salt = bcrypt?.genSaltSync(10);
  const hashedPassword = bcrypt.hashSync(newPassword, salt);

  // Update user's password andd remove resetToken from user document
  user.password = hashedPassword;
  user.resetToken = undefined;
  user.resetTokenExpiry = undefined;

  await user.save();
  res.status(200).json({ message: "Password reset successfully" });
});

const authController = {
  register,
  login,
  refreshToken,
  logout,
  forgotPassword,
  resetPassword,
};
export default authController;
