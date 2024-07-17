import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI;

async function connectDB(): Promise<void> {
  try {
    await mongoose.connect(MONGODB_URI!);
    console.log("MongoDB connected".america);
  } catch (error) {
    console.error("MongoDB connection error:", error);
    process.exit(1); // Exit process with failure
  }
}

export default connectDB;
