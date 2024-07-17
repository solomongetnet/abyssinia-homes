"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Define the Property schema
const PropertySchema = new mongoose_1.Schema({
    author: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User schema
    title: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    price: {
        currency: { type: String, required: true },
        amount: { type: Number, required: true },
    },
    builtYear: {
        type: Number,
        required: true,
    },
    propertyType: {
        type: String,
        enum: [
            "apartment",
            "house",
            "condo",
            "townhouse",
            "shop",
            "office",
            "villa",
            "realState",
        ],
        required: true,
    },
    propertyStatus: {
        type: String,
        enum: ["for rent", "for sale", "sold", "rented"],
        required: true,
    },
    constructionType: {
        type: String,
        enum: ["wood", "concrete", ""],
        default: "",
    },
    floorNumber: Number,
    roomsSize: Number,
    images: [String],
    videoUrl: String,
    amenities: [String],
    bathRooms: Number,
    bedRooms: Number,
    location: {
        map: {
            longitude: Number,
            latitude: Number,
        },
        address: { type: String },
        country: { type: String },
        city: { type: String },
        street: { type: String },
        zipCode: { type: Number },
    },
    size: { type: Number, required: true },
}, {
    timestamps: true,
});
// Create and export the Property model
const PropertyModel = (0, mongoose_1.model)("Property", PropertySchema);
exports.default = PropertyModel;
