"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_async_handler_1 = __importDefault(require("express-async-handler"));
const property_model_1 = __importDefault(require("../models/property.model"));
const validate_new_property_1 = require("../validator/validate-new-property");
const cloudinary_1 = require("../helper/cloudinary");
const cloudinary_2 = __importDefault(require("../config/cloudinary"));
const users_model_1 = __importDefault(require("../models/users.model"));
// import geolib from "geolib";
const geolib = require("geolib");
const getProperties = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const { propertyStatus, propertyType, minPrice, maxPrice, city, amenities, bedRooms, bathRooms, minSize, maxSize, } = req.query;
    // Build the query object
    let query = {};
    if (propertyStatus)
        query.propertyStatus = propertyStatus.toLowerCase();
    if (propertyType)
        query.propertyType = propertyType.toLowerCase();
    if (minPrice || maxPrice) {
        query["price.amount"] = {};
        if (minPrice)
            query["price.amount"].$gte = Number(minPrice);
        if (maxPrice)
            query["price.amount"].$lte = Number(maxPrice);
    }
    if (minSize || maxSize) {
        query.size = {};
        if (minSize)
            query.size.$gte = Number(minSize);
        if (maxSize)
            query.size.$lte = Number(maxSize);
    }
    if (city)
        query["location.city"] = city;
    if (amenities)
        query.amenities = { $all: amenities.split(",") };
    if (bedRooms)
        query.bedRooms = Number(bedRooms);
    if (bathRooms)
        query.bathRooms = Number(bathRooms);
    const properties = yield property_model_1.default.find(query)
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 });
    const count = yield property_model_1.default.find(query).countDocuments();
    res.json({
        properties,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        totalCount: count,
    });
}));
const getFeaturesProperties = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const properties = yield property_model_1.default.find()
        .limit(8)
        .sort({ createdAt: -1 });
    res.json(properties);
}));
const getSingleProperty = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const propertyId = req.params.id;
    const propertyData = yield property_model_1.default.findById(propertyId).populate({
        path: "author",
        select: "socialMedia fullName username properties phoneNumber avatar",
    });
    if (!propertyData) {
        res.status(404);
        throw new Error("We can't found this property");
    }
    res.json(propertyData);
}));
const createProperty = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    // Checking if there is validation error
    const { error } = (0, validate_new_property_1.validateNewProperty)(req.body);
    if (error) {
        res.status(400);
        throw new Error(error);
    }
    // Uploading images files on clodinary then get secure url;
    let files = (_a = req === null || req === void 0 ? void 0 : req.files) === null || _a === void 0 ? void 0 : _a.images;
    if (!Array.isArray(files)) {
        files = [files]; // If only one file, make it an array
    }
    const uploadPromises = files.map((file) => {
        return (0, cloudinary_1.uploader)(file.tempFilePath, "property_images");
    });
    const results = yield Promise.all(uploadPromises);
    const uploadedImages = results.map((result) => {
        return result.secure_url;
    });
    // // Creating new property data
    const createdProperty = yield property_model_1.default.create(Object.assign(Object.assign({ author: req.user._id }, req.body), { images: uploadedImages }));
    // saving in to user schema
    yield users_model_1.default.findByIdAndUpdate(req === null || req === void 0 ? void 0 : req.user._id, {
        $push: { properties: createdProperty._id },
    });
    res.json({ message: "Created Successfull" });
}));
const updateProperty = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    var _a;
    const data = req.body;
    const userId = (_a = req.user) === null || _a === void 0 ? void 0 : _a._id;
    const propertyId = req.params.id;
    const propertyData = yield property_model_1.default.findOne({
        _id: propertyId,
        author: userId,
    });
    //check the user is author of the post
    if (!propertyData) {
        res.status(403);
        throw new Error("you can't access this property");
    }
    // Update the data
    const updated = yield property_model_1.default.findByIdAndUpdate(propertyId, data);
    console.log("Updated Data", updated);
    res.json({ message: "Updated Successfull" });
}));
const deleteProperty = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const userId = req.user._id;
    const propertyId = req.params.id;
    const propertyData = yield property_model_1.default.findById(propertyId);
    // Checking is the user is author of this data
    const isAuthor = userId.toString() === propertyData.author.toString();
    if (!isAuthor && req.user.role !== "admin") {
        res.status(403);
        throw new Error("You can't delete this property!");
    }
    const deletedProperty = yield property_model_1.default.findByIdAndDelete(propertyId);
    if (!deletedProperty) {
        throw new Error("Can't delete please try again");
    }
    // remove id from users favorite;
    yield users_model_1.default.updateMany({
        favorites: propertyId,
    }, { $pull: { favorites: propertyId } });
    // remove property id from user properties;
    yield users_model_1.default.updateMany({
        properties: propertyId,
    }, { $pull: { properties: propertyId } });
    // Removing deleted property images from cloudinary
    const images = deletedProperty === null || deletedProperty === void 0 ? void 0 : deletedProperty.images;
    const publicIds = [];
    for (let secureUrl of images) {
        const publicId = (0, cloudinary_1.extractPublicIdFromUrl)(secureUrl, "property_images");
        publicIds.push(publicId);
    }
    const result = yield cloudinary_2.default.api.delete_resources(publicIds);
    res.json({ message: "Deleted Successfull" });
}));
const getMyProperties = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const page = Number(req.query.page) || 1;
    const limit = Number(req.query.limit) || 10;
    const userId = req.user._id;
    const properties = yield property_model_1.default.find({ author: userId })
        .limit(limit * 1)
        .skip((page - 1) * limit)
        .sort({ createdAt: -1 });
    const count = yield property_model_1.default.countDocuments({ author: userId });
    res.json({
        properties,
        totalPages: Math.ceil(count / limit),
        currentPage: page,
        totalCount: count,
    });
}));
const getNearbyProperties = (0, express_async_handler_1.default)((req, res) => __awaiter(void 0, void 0, void 0, function* () {
    // Example coordinates of two points
    const userLat = Number(req.query.latitude);
    const userLng = Number(req.query.longitude);
    const maxDistanceInMeters = Number(req.query.maxDistance) || 5000; // Max distance in meters
    if (!userLat || !userLng) {
        res.status(400);
        throw new Error("Invalid Request");
    }
    // Fetch all properties from database
    const properties = yield property_model_1.default.find().lean();
    // Calculate distances and filter nearby properties (within 5 kilometers)
    // Calculate distances using geolib and filter nearby properties
    const nearbyProperties = properties.filter((property) => {
        const distance = geolib.getDistance({ latitude: userLat, longitude: userLng }, {
            latitude: property.location.map.latitude,
            longitude: property.location.map.longitude,
        });
        console.log(distance);
        // Check if distance is within maxDistanceInMeters
        return distance <= maxDistanceInMeters;
    });
    // Add distance to each nearby property
    const propertiesWithDistance = nearbyProperties.map((property) => {
        const distance = geolib.getDistance({ latitude: userLat, longitude: userLng }, {
            latitude: property.location.map.latitude,
            longitude: property.location.map.longitude,
        });
        // Convert distance from meters to kilometers and round to 2 decimal places
        return Object.assign(Object.assign({}, property), { distance });
    });
    res.json(propertiesWithDistance);
}));
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
exports.default = propertiesController;
