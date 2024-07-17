import { NextFunction, Request, Response } from "express";
import asyncHandler from "express-async-handler";
import PropertyModel from "../models/property.model";
import UserModel from "../models/users.model";

interface _Request extends Request {
  user?: any;
}

const fetchDashboard = asyncHandler(async (req: _Request, res: Response) => {
  const propertiesCount: any = await PropertyModel.find().countDocuments();

  const adminsCount: any = await UserModel.find({
    role: "admin",
  }).countDocuments();

  const agentsCount: any = await UserModel.find({
    role: "agent",
  }).countDocuments();

  const usersCount: any = await UserModel.find({
    role: "user",
  }).countDocuments();

  res.json({
    propertiesCount,
    adminsCount,
    usersCount,
    agentsCount,
  });
});

const propertiesAnalysis = asyncHandler(
  async (req: _Request, res: Response, next: NextFunction) => {
    const analysis: any = await PropertyModel.aggregate([
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

const adminController = {
  fetchDashboard,
  propertiesAnalysis,
};
export default adminController;
