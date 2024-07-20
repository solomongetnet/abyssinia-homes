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
        period: { type: String },
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
    company: {
        type: String,
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
        country: { type: String },
        address: { type: String },
        city: { type: String },
        street: { type: String },
        subcity: { type: String },
        neighborhood: { type: String },
        region: { type: String },
        zipCode: { type: Number },
    },
    size: { type: Number, required: true },
}, {
    timestamps: true,
});
// Create and export the Property model
const PropertyModel = (0, mongoose_1.model)("Property", PropertySchema);
exports.default = PropertyModel;
{
    /*
          
           map: {
        longitude: 0;
        latitude: 0;
      };
      address: string;
      country: string;
      city: string;
      street?: string;
      subcity?: string;
      neighborhood?: string;
      region?: string;
      zipCode?: number;*/
}
