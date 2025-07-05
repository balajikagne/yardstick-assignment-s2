// File: lib/db.ts
import mongoose from "mongoose";

const MONGODB_URI = process.env.MONGODB_URI || "mongodb+srv://balajikagnes1:Bkagne%402025@cluster0.udseelt.mongodb.net/financeApp?retryWrites=true&w=majority";

if (!MONGODB_URI) {
  throw new Error("⚠️ MONGODB_URI is not defined in environment variables");
}

let isConnected = false; // Avoid re-connecting in dev

export const connectToDB = async () => {
  if (isConnected) return;

  try {
    await mongoose.connect(MONGODB_URI, {
      dbName: "finance-app",
    });
    isConnected = true;
    console.log("✅ MongoDB connected");
  } catch (err) {
    console.error("❌ MongoDB connection failed", err);
    throw err;
  }
};
