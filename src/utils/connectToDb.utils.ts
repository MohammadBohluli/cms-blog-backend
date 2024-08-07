import config from "config";
import mongoose from "mongoose";
import { logger } from ".";

const connectToDb = async function () {
  const DB_URI = config.get<string>("dbURI");

  try {
    await mongoose.connect(DB_URI);
    logger.info("✅ Connected to MongoDB");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default connectToDb;
