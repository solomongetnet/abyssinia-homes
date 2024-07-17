import { Document, Schema, model } from "mongoose";

interface IUser extends Document {
  username: string;
  email: string;
  fullName: string;
  description: string;
  phoneNumber: number;
  password: string;
  avatar?: string;
  role: "user" | "admin" | "agent";
  socialMedia?: {
    telegram?: string;
    whatsapp?: string;
    facebook?: string;
    instagram?: string;
    linkedin?: string;
  };
  company?: string;
  job?: string;
  officeAddress?: string;
  officeNumber?: string;
  location?: string;
  subscription?: any;
  favorites?: [any];
  properties?: [any];
  resetToken?: any;
  resetTokenExpiry?: any;
}

const userSchema: Schema = new Schema<IUser>(
  {
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
      type: Schema.Types.ObjectId,
      ref: "Subscription",
      select: false,
    },
    favorites: [
      { type: Schema.Types.ObjectId, ref: "Property", select: false },
    ],
    properties: [{ type: Schema.Types.ObjectId, ref: "Property" }],
    password: {
      type: String,
      required: true,
      select: false,
    },
    resetToken: { type: String },
    resetTokenExpiry: { type: Date },
  },
  { timestamps: true }
);

const UserModel = model<IUser>("User", userSchema);
export default UserModel;
