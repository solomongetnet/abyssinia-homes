import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import UserModel from "../models/users.model";
import PropertyModel from "../models/property.model";

interface _Request extends Request {
  user?: any;
}

const addToFavorite = asyncHandler(async (req: _Request, res: Response) => {
  const userId = req.user._id;
  const user = await UserModel.findById(userId).select("+favorites");
  const property = await PropertyModel.findById(req.params.propertyId);

  if (!property) {
    res.status(404);
    throw new Error("Property not found");
  }
  if (!user?.favorites?.includes(req.params.propertyId)) {
    const result: any = await UserModel.findOneAndUpdate(
      userId,
      {
        $push: { favorites: property._id },
      },
      { new: true }
    );
    res.json({ message: "Added to favorite successfully" });
    return;
  }
  res.status(400).json({ message: "Added before" });
});

const removeFromFavorite = asyncHandler(
  async (req: _Request, res: Response) => {
    const userId = req.user._id;
    const user = await UserModel.findById(userId).select("+favorites");
    const propertyId = req.params.propertyId;

    if (user?.favorites?.includes(propertyId)) {
      await UserModel.findOneAndUpdate(userId, {
        $pull: { favorites: propertyId },
      });
      res.json({ message: "Removed from favorite successfully" });
      return;
    }
    res.json({ message: "Removed before" });
  }
);

const getFavoriteProperties = asyncHandler(
  async (req: _Request, res: Response) => {
    const page: number = Number(req.query.page) || 1;
    const limit: number = Number(req.query.limit) || 10;
    const UserDoc: any = await UserModel.findById(req.user._id).select(
      "favorites"
    );

    const favorites = await PropertyModel.find({
      _id: { $in: UserDoc.favorites },
    })
      .limit(limit * 1)
      .skip((page - 1) * limit);

    const count = await PropertyModel.find({
      _id: { $in: UserDoc.favorites },
    }).countDocuments();

    res.json({
      favorites,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalCount: count,
    });
  }
);

const favoriteController = {
  addToFavorite,
  removeFromFavorite,
  getFavoriteProperties,
};
export default favoriteController;
