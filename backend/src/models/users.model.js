"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const userSchema = new mongoose_1.Schema({
    username: {
        type: String,
        required: true,
        unique: true,
    },
    description: String,
    email: {
        type: String,
        required: true,
        unique: true,
    },
    fullName: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: Number,
        required: true,
    },
    socialMedia: {
        telegram: String,
        instagram: String,
        facebook: String,
        whatsapp: String,
        linkedin: String,
    },
    avatar: {
        type: String,
    },
    company: {
        type: String,
    },
    job: {
        type: String,
    },
    location: {
        type: String,
    },
    officeAddress: {
        type: String,
    },
    officeNumber: {
        type: String,
    },
    role: {
        type: String,
        enum: ["admin", "user", "agent"],
        default: "user",
    },
    subscription: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: "Subscription",
        select: false,
    },
    favorites: [
        { type: mongoose_1.Schema.Types.ObjectId, ref: "Property", select: false },
    ],
    properties: [{ type: mongoose_1.Schema.Types.ObjectId, ref: "Property" }],
    password: {
        type: String,
        required: true,
        select: false,
    },
    resetToken: { type: String },
    resetTokenExpiry: { type: Date },
}, { timestamps: true });
const UserModel = (0, mongoose_1.model)("User", userSchema);
exports.default = UserModel;
