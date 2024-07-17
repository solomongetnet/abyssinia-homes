import {  Request, Response } from "express";
import asyncHandler from "express-async-handler";
import UserModel from "../models/users.model";
import PropertyModel from "../models/property.model";

interface _Request extends Request {
  user?: any;
}

const getAgents = asyncHandler(async (req: _Request, res: Response) => {
  const page: number = Number(req.query.page) || 1;
  const limit: number = Number(req.query.limit) || 10;
  const sort: any = Number(req.query.sort) || -1;
  const search: any = req.query.search || "";

  const agents: any = await UserModel.find({
    role: "agent",
    $or: [
      { email: { $regex: search, $options: "i" } },
      { username: { $regex: search, $options: "i" } },
      { fullName: { $regex: search, $options: "i" } },
    ],
  })
    .limit(limit)
    .skip((page - 1) * limit)
    .sort({ createdAt: sort });

  const count: number = await UserModel.find({
    role: "agent",
    $or: [
      { email: { $regex: search, $options: "i" } },
      { username: { $regex: search, $options: "i" } },
      { fullName: { $regex: search, $options: "i" } },
    ],
  }).countDocuments();

  res.json({
    agents,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
    totalCount: count,
  });
});

const getSingleAgent = asyncHandler(async (req: _Request, res: Response) => {
  const agentUsername = req.params.agentUsername;
  const agentData = await UserModel.findOne({
    username: agentUsername,
  }).populate("properties");
  if (!agentData) {
    res.status(404);
    throw new Error("We can't found this agent");
  }
  res.json(agentData);
});

const getAgentProperties = asyncHandler(
  async (req: _Request, res: Response) => {
    const agentUsername = req?.params.agentUsername;
    const agentDoc: any = await UserModel.findOne({
      username: agentUsername,
    }).select("_id");

    const properties: any = await PropertyModel.find({ author: agentDoc._id });
    res.json(properties);
  }
);
const getRecentAgents = asyncHandler(async (req: _Request, res: Response) => {
  const limit: number = Number(req.query.limit) || 5;

  const recentAgents = await UserModel.find({ role: "agent" })
    .sort({ createdAt: -1 })
    .limit(limit).select('fullName avatar email username properties ');

  res.json(recentAgents);
});
const agentController = {
  getAgents,
  getSingleAgent,
  getAgentProperties,
  getRecentAgents,
};
export default agentController;
