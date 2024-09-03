import mongoose from "mongoose";
import { logger } from ".";

const connectToDb = async function () {
  try {
    await mongoose.connect(
      `mongodb://${process.env.MONGO_HOSTNAME}:${process.env.MONGO_PORT}/${process.env.MONGO_DB}`
    );
    logger.info("✅ Connected to MongoDB");
  } catch (err) {
    console.log(err);
    process.exit(1);
  }
};

export default connectToDb;
