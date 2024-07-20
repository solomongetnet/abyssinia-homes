import { Request, Response } from "express";
import asyncHandler from "express-async-handler";
import PropertyModel from "../models/property.model";
import { validateNewProperty } from "../validator/validate-new-property";
import { unlink } from "fs/promises";
import { extractPublicIdFromUrl, uploader } from "../helper/cloudinary";
import cloudinary from "../config/cloudinary";
import { imagesUrl } from "../utils/images";
import { IPropertyQuery } from "../interface/property.interface";
import UserModel from "../models/users.model";
// import geolib from "geolib";
const geolib = require("geolib");

interface _Request extends Request {
  user?: any;
}

const getProperties = asyncHandler(
  async (req: Request<{}, {}, {}, IPropertyQuery>, res: Response) => {
    const page: number = Number(req.query.page) || 1;
    const limit: number = Number(req.query.limit) || 10;
    const {
      propertyStatus,
      propertyType,
      minPrice,
      maxPrice,
      amenities,
      bedRooms,
      bathRooms,
      minSize,
      maxSize,
      location,
    } = req.query;

    // Build the query object
    let query: any = {};

    if (propertyStatus) query.propertyStatus = propertyStatus.toLowerCase();
    if (propertyType) query.propertyType = propertyType.toLowerCase();

    if (minPrice || maxPrice) {
      query["price.amount"] = {};
      if (minPrice) query["price.amount"].$gte = Number(minPrice);
      if (maxPrice) query["price.amount"].$lte = Number(maxPrice);
    }

    if (minSize || maxSize) {
      query.size = {};
      if (minSize) query.size.$gte = Number(minSize);
      if (maxSize) query.size.$lte = Number(maxSize);
    }

    let splitedLocation: any[] = location?.split(",") || [];
    if (splitedLocation && splitedLocation.length > 0) {
      query["$or"] = splitedLocation.map((loc) => ({
        $or: [
          { "location.city": { $regex: loc, $options: "i" } },
          { "location.country": { $regex: loc, $options: "i" } },
          { "location.subcity": { $regex: loc, $options: "i" } },
          { "location.zone": { $regex: loc, $options: "i" } },
          { "location.region": { $regex: loc, $options: "i" } },
          { "location.address": { $regex: loc, $options: "i" } },
          { "location.street": { $regex: loc, $options: "i" } },
          { "location.neighborhood": { $regex: loc, $options: "i" } },
        ],
      }));
    }

    if (amenities) query.amenities = { $all: amenities.split(",") };
    if (bedRooms) query.bedRooms = Number(bedRooms);
    if (bathRooms) query.bathRooms = Number(bathRooms);

    const properties = await PropertyModel.find(query)
      .limit(limit * 1)
      .skip((page - 1) * limit)
      .sort({ createdAt: -1 });

    const count = await PropertyModel.find(query).countDocuments();

    res.json({
      properties,
      totalPages: Math.ceil(count / limit),
      currentPage: page,
      totalCount: count,
    });
  }
);

const getFeaturesProperties = asyncHandler(
  async (req: Request, res: Response) => {
    const properties = await PropertyModel.find()
      .limit(8)
      .sort({ createdAt: -1 });

    res.json(properties);
  }
);

const getSingleProperty = asyncHandler(async (req: _Request, res: Response) => {
  const propertyId = req.params.id;
  const propertyData = await PropertyModel.findById(propertyId).populate({
    path: "author",
    select: "socialMedia fullName username properties phoneNumber avatar",
  });
  if (!propertyData) {
    res.status(404);
    throw new Error("We can't found this property");
  }
  res.json(propertyData);
});

const createProperty = asyncHandler(async (req: _Request, res: Response) => {
  // Checking if there is validation error
  const { error } = validateNewProperty(req.body);

  if (error) {
    res.status(400);
    throw new Error(error);
  }

  // Uploading images files on clodinary then get secure url;
  let files: any = req?.files?.images;
  if (!Array.isArray(files)) {
    files = [files]; // If only one file, make it an array
  }

  const uploadPromises = files.map((file: any) => {
    return uploader(file.tempFilePath, "property_images");
  });

  const results = await Promise.all(uploadPromises);
  const uploadedImages = results.map((result) => {
    return result.secure_url;
  });

  // // Creating new property data
  const createdProperty: any = await PropertyModel.create({
    author: req.user._id,
    ...req.body,
    images: uploadedImages,
  });

  // saving in to user schema
  await UserModel.findByIdAndUpdate(req?.user._id, {
    $push: { properties: createdProperty._id },
  });

  res.json({ message: "Created Successfull" });
});

const updateProperty = asyncHandler(async (req: _Request, res: Response) => {
  const data = req.body;
  const userId = req.user?._id;
  const propertyId = req.params.id;
  const propertyData = await PropertyModel.findOne({
    _id: propertyId,
    author: userId,
  });
  //check the user is author of the post
  if (!propertyData) {
    res.status(403);
    throw new Error("you can't access this property");
  }

  // Update the data
  const updated = await PropertyModel.findByIdAndUpdate(propertyId, data);
  console.log("Updated Data", updated);
  res.json({ message: "Updated Successfull" });
});

const deleteProperty = asyncHandler(async (req: _Request, res: Response) => {
  const userId = req.user._id;
  const propertyId = req.params.id;

  const propertyData: any = await PropertyModel.findById(propertyId);

  // Checking is the user is author of this data
  const isAuthor = userId.toString() === propertyData.author.toString();
  if (!isAuthor && req.user.role !== "admin") {
    res.status(403);
    throw new Error("You can't delete this property!");
  }

  const deletedProperty: any = await PropertyModel.findByIdAndDelete(
    propertyId
  );

  if (!deletedProperty) {
    throw new Error("Can't delete please try again");
  }

  // remove id from users favorite;
  await UserModel.updateMany(
    {
      favorites: propertyId,
    },
    { $pull: { favorites: propertyId } }
  );

  // remove property id from user properties;
  await UserModel.updateMany(
    {
      properties: propertyId,
    },
    { $pull: { properties: propertyId } }
  );

  // Removing deleted property images from cloudinary
  const images = deletedProperty?.images;
  const publicIds = [];
  for (let secureUrl of images) {
    const publicId: any = extractPublicIdFromUrl(secureUrl, "property_images");
    publicIds.push(publicId);
  }

  const result = await cloudinary.api.delete_resources(publicIds);
  res.json({ message: "Deleted Successfull" });
});

const getMyProperties = asyncHandler(async (req: _Request, res: Response) => {
  const page: number = Number(req.query.page) || 1;
  const limit: number = Number(req.query.limit) || 10;
  const userId = req.user._id;

  const properties = await PropertyModel.find({ author: userId })
    .limit(limit * 1)
    .skip((page - 1) * limit)
    .sort({ createdAt: -1 });

  const count = await PropertyModel.countDocuments({ author: userId });

  res.json({
    properties,
    totalPages: Math.ceil(count / limit),
    currentPage: page,
    totalCount: count,
  });
});

const getNearbyProperties = asyncHandler(
  async (req: _Request, res: Response) => {
    // Example coordinates of two points
    const userLat = Number(req.query.latitude);
    const userLng = Number(req.query.longitude);
    const maxDistanceInMeters = Number(req.query.maxDistance) || 5000; // Max distance in meters

    if (!userLat || !userLng) {
      res.status(400);
      throw new Error("Invalid Request");
    }

    // Fetch all properties from database
    const properties = await PropertyModel.find().lean();

    // Calculate distances and filter nearby properties (within 5 kilometers)
    // Calculate distances using geolib and filter nearby properties
    const nearbyProperties = properties.filter((property) => {
      const distance = geolib.getDistance(
        { latitude: userLat, longitude: userLng },
        {
          latitude: property.location.map.latitude,
          longitude: property.location.map.longitude,
        }
      );

      console.log(distance);
      // Check if distance is within maxDistanceInMeters
      return distance <= maxDistanceInMeters;
    });

    // Add distance to each nearby property
    const propertiesWithDistance = nearbyProperties.map((property) => {
      const distance = geolib.getDistance(
        { latitude: userLat, longitude: userLng },
        {
          latitude: property.location.map.latitude,
          longitude: property.location.map.longitude,
        }
      );

      // Convert distance from meters to kilometers and round to 2 decimal places

      return { ...property, distance };
    });

    res.json(propertiesWithDistance);
  }
);

const propertiesController = {
  getProperties,
  getSingleProperty,
  createProperty,
  updateProperty,
  deleteProperty,
  getMyProperties,
  getFeaturesProperties,
  getNearbyProperties,
};
export default propertiesController;
