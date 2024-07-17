"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
// Define the Subscription schema
const SubscriptionSchema = new mongoose_1.Schema({
    user: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User schema
    plan: {
        type: String,
        required: true,
        enum: ["PERSONAL", "PROFESSIONAL", "BUSINESS"],
    },
    startDate: { type: Date, required: true },
    endDate: { type: Date }, // Optional, if subscription has an end date
    active: { type: Boolean, default: true }, // Indicates if the subscription is currently active
});
// Create and export the Subscription model
const SubscriptionModel = (0, mongoose_1.model)("Subscription", SubscriptionSchema);
exports.default = SubscriptionModel;
