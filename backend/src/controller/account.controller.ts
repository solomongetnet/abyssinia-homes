import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import bcrypt from "bcryptjs";
import UserModel from "../models/users.model";

interface _Request extends Request {
  user?: any;
}

const fetchMyAccount = asyncHandler(async (req: _Request, res: Response) => {
  res.json(req.user);
});

const changePassword = asyncHandler(
  async (req: _Request, res: Response, next: NextFunction) => {
    const authUserInfo = req.user;

    if (!req.body.oldPassword) {
      res.status(400).json({ message: "Old password is required!" });
      return;
    }

    const userDoc: any = await UserModel.findById(authUserInfo._id, "password");

    const passisValid = bcrypt.compareSync(
      req.body.oldPassword,
      userDoc?.password
    );

    if (!passisValid) {
      res.status(400).json({ message: "Old password is incorrect" });
      return;
    }

    const isSamePass = bcrypt.compareSync(
      req.body.newPassword,
      userDoc.password
    );

    if (isSamePass) {
      res.status(400).json({
        message:
          "Your new password is same to your old password please make change on your new password",
      });
      return;
    }
    const salt = bcrypt?.genSaltSync(10);

    const hashPass = bcrypt.hashSync(req.body.newPassword, salt);

    await UserModel.findByIdAndUpdate(authUserInfo._id, {
      $set: { password: hashPass },
    });
    res.json({ status: "success", message: "Password Change Successull" });
  }
);

const accountController = {
  fetchMyAccount,
  changePassword,
};
export default accountController;
