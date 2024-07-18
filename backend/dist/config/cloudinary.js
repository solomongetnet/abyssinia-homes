"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const cloudinary_1 = require("cloudinary");
// Configuration
cloudinary_1.v2.config({
    cloud_name: "djwb017ip" || process.env.CLOUDINARY_CLOUD_NAME,
    api_key: "466366784735428" || process.env.CLOUDINARY_API_KEY,
    api_secret: "0DM3i4R88NqDoYOrNn3rkkm8DDE" || process.env.CLOUDINARY_API_SECRET,
});
exports.default = cloudinary_1.v2;
