import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import PropertyModel from "../models/property.model";
import UserModel from "../models/users.model";

interface _Request extends Request {
  user?: any;
}

const fetchDashboard = asyncHandler(async (req: _Request, res: Response) => {
  // properties
  // favorites
  // reviews
  // pending
  const userId = req.user._id;
  const propertiesCount: any = await PropertyModel.find({
    author: userId,
  }).countDocuments();

  const userDoc: any = await UserModel.findById(userId).select("favorites");
  const favoritesCount = userDoc.favorites.length;

  const reviewsCount: any = Math.floor(Math.random() * 90);
  const pendingPropertiesCount: any = Math.floor(Math.random() * 90);

  res.json({
    propertiesCount,
    favoritesCount,
    reviewsCount,
    pendingPropertiesCount,
  });
});

const propertiesAnalysis = asyncHandler(
  async (req: _Request, res: Response, next: NextFunction) => {
    const userId = req.user._id;
    const analysis: any = await PropertyModel.aggregate([
      { $match: { author: userId } },
      {
        $facet: {
          priceDistribution: [
            {
              $bucket: {
                groupBy: "$price.amount",
                boundaries: [
                  0, 50000, 100000, 150000, 200000, 250000, 300000, 350000,
                  400000, 450000, 500000, 1000000,
                ],
                default: "500000+",
                output: {
                  count: { $sum: 1 },
                },
              },
            },
          ],
          propertyTypeDistribution: [
            {
              $group: {
                _id: "$propertyType",
                count: { $sum: 1 },
              },
            },
          ],
          propertyStatusDistribution: [
            {
              $group: {
                _id: "$propertyStatus",
                count: { $sum: 1 },
              },
            },
          ],
          locationDistribution: [
            {
              $group: {
                _id: "$location.city",
                count: { $sum: 1 },
              },
            },
          ],
        },
      },
    ]);

    const propertiesByMonth = await PropertyModel.aggregate([
      { $match: { author: userId } },
      {
        $group: {
          _id: { $month: "$createdAt" },
          count: { $sum: 1 },
        },
      },
      {
        $sort: { _id: 1 },
      },
    ]);

    // Initialize months array with 0 counts
    const months = Array.from({ length: 12 }, (_, i) => ({
      month: i + 1,
      count: 0,
    }));

    // Merge the aggregated results with the months array
    propertiesByMonth.forEach((item) => {
      months[item._id - 1].count = item.count;
    });

    res.json({ ...analysis[0], ...{ propertiesByMonth: months } });
  }
);

const fetchAllUsers = asyncHandler(async (req: _Request, res: Response) => {
  const page: number = Number(req.query.page) || 1;
  const limit: number = Number(req.query.limit) || 10;

  const users = await UserModel.find()
    .select("+role")
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 });

  const count = await UserModel.find().countDocuments();

  res.json({
    users,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
    totalCount: count,
  });
});

const deleteUser = asyncHandler(async (req: _Request, res: Response) => {
  const userId = req.params.userId;

  if (userId.toString() === req.user._id.toString()) {
    res.status(400);
    throw new Error("You can't delete yourself");
  }

  const userDoc: any = await UserModel.findByIdAndDelete(userId, { new: true });
  const userProperties: string[] = userDoc?.properties;

  const deletedMany = await PropertyModel.deleteMany({
    _id: { $in: userProperties },
  });

  res.json({ message: `${userDoc.role || "User"} deleted Successfully` });
});

const userController = {
  fetchDashboard,
  propertiesAnalysis,
  fetchAllUsers,
  deleteUser,
};
export default userController;
