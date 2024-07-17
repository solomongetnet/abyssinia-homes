import { Schema, Document, model } from "mongoose";

// Define interface for Subscription schema
interface IProperty extends Document {
  user: string; // Reference to the user who subscribed
  plan: string; // Name or ID of the subscription plan
  startDate: Date;
  endDate?: Date;
  active: boolean;
}

// Define the Subscription schema
const SubscriptionSchema: Schema = new Schema({
  user: { type: Schema.Types.ObjectId, ref: "User", required: true }, // Reference to User schema
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
const SubscriptionModel = model<IProperty>("Subscription", SubscriptionSchema);
export default SubscriptionModel;
