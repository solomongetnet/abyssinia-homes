import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import UserModel from "../models/users.model";
import { unlink } from "fs/promises";
import { extractPublicIdFromUrl, uploader } from "../helper/cloudinary";
import cloudinary from "../config/cloudinary";

interface _Request extends Request {
  user?: any;
}

const updateAvatar = asyncHandler(async (req: _Request, res: Response) => {
  const userId = req.user._id;
  // remove avatar is user have avatar before
  if (!!req.user.avatar) {
    const publicId: any = extractPublicIdFromUrl(req.user.avatar, "avatar");
    await cloudinary.api.delete_resources(publicId);
  }

  // get path from request then upload using custom function the get newPath from cloudinary
  const path: any = req.file?.path;
  const newPath = await uploader(path, "avatar");

  // Remove from this server after uploaded on cloudinary
  await unlink(path);
  await UserModel.findByIdAndUpdate(userId, { avatar: newPath.secure_url });
  res.json({ message: "Avatar Updated Successfully" });
});

const removeAvatar = asyncHandler(async (req: _Request, res: Response) => {
  const userId = req.user._id;

  if (!req.user.avatar) {
    res.status(400);
    throw new Error("There is no avatar to remove!");
  }
  // Extract public key from scure url and delete avatar
  const publicId: any = extractPublicIdFromUrl(req.user.avatar, "avatar");
  await cloudinary.uploader.destroy(publicId);

  await UserModel.findByIdAndUpdate(userId, { avatar: "" });
  res.json({ message: "Avatar removed successfully" });
});

const updateInformation = asyncHandler(async (req: _Request, res: Response) => {
  if (!req.body?.fullName || !req.body?.phoneNumber || !req.body?.username) {
    res.status(400);
    throw new Error("Invalid Request");
  }

  const userDoc: any = await UserModel.find({
    username: req.body.username,
  });

  await UserModel.findByIdAndUpdate(
    req?.user._id,
    {
      ...req.body,
    },
    { new: true }
  );

  res.json({ message: "Information Updated Successfull" });
});

const updateEmail = asyncHandler(async (req: _Request, res: Response) => {
  const userId = req.user._id;

  const newEmail = req.body.email;
  const oldEmail = req.user.email;

  if (!newEmail) {
    res.status(400);
    throw new Error("Email Address Is Required");
  }

  if (newEmail === oldEmail) {
    res.status(400);
    throw new Error("Please Make Change");
  }

  const isEmailTaken: any = await UserModel.findOne({
    email: newEmail,
  });

  if (isEmailTaken) {
    res.status(409);
    throw new Error("Email Already Taken Please Make Change");
  }

  const updated = await UserModel.findByIdAndUpdate(
    userId,
    {
      $set: { email: newEmail },
    },
    { new: true }
  );

  res.json({ message: "Email Updated Successfull" });
});

const updateSocialMedia = asyncHandler(async (req: _Request, res: Response) => {
  await UserModel.findByIdAndUpdate(req.user._id, {
    socialMedia: { ...req.body },
  });
  res.json({ message: "Social Media Updated Successfull" });
});

const profileController = {
  updateAvatar,
  removeAvatar,
  updateSocialMedia,
  updateEmail,
  updateInformation,
};
export default profileController;
